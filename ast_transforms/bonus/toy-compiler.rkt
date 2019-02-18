#lang nanopass

(define (variable? x)
  (symbol? x))

(define (constant? x)
  (number? x))

(define (nil? x)
  (eq? 'nil x))

(define-language L0
  (terminals
    (variable (v))
    (constant (c))
    (nil (n)))
  (Expr (e)
    v
    c
    n
    (lambda (v* ...) e* ... e)
    (e0 e1 ...)))

(define-language L1
  (extends L0)
  (Expr (e)
    (- (lambda (v* ...) e* ... e))
    (+ (lambda (v* ...) e))))

(define-language L2
  (extends L1)
  (Expr (e)
    (- (lambda (v* ...) e))
    (+ (lambda (v) e))
    (- (e0 e1 ...))
    (+ (e0 e1))))

(define-parser parse-L0 L0)

(define-pass L0->L1 : L0 (ast) -> L1 ()
  (Expr : Expr (e) -> Expr ()
    [(lambda (,v* ...) ,[e*] ... ,[e])
     `(lambda (,v* ...) (begin ,e* ... ,e))]))

; curries all lambdas and applications
(define-pass L1->L2 : L1 (ast) -> L2 ()
  (Expr : Expr (e) -> Expr ()
    [(lambda (,v* ...) ,[e])
     (letrec ([desugar (lambda (vars)
                        (case (length vars)
                          [(0) `(lambda (x) ,e)] ; add extra arg
                          [(1) `(lambda (,(car vars)) ,e)]
                          [else `(lambda (,(car vars)) ,[desugar (cdr vars)])]))])
       (desugar v*))]
    [(,[e0] ,[e1] ...)
     (letrec ([desugar (lambda (f args)
                         (case (length args)
                           [(0) `(,f nil)] ; used to be a lambda with 0 args
                           [(1) `(,f ,(car args))]
                           [else (let* ([first-arg (car args)]
                                        [rest-args (cdr args)]
                                        [new-f `(,f ,first-arg)])
                                   (desugar new-f rest-args))]))])
       (desugar e0 e1))]))

(define-pass L2->racket : L2 (ast) -> * ()
  (Expr : Expr (e) -> * ()
    [,v v]
    [,c c]
    [,n n]
    [(lambda (,v) ,e) `(lambda (,v) ,[Expr e])]
    [(,e0 ,e1) `(,[Expr e0] ,[Expr e1])]))

(define expr1
  '(lambda (a b)
     ((lambda (x y) x y) ((lambda (c d e) 1 2)) 3)))
(define expr2
  '((lambda (x y z) x) 1 2 3))

(define (compile expr)
  (L2->racket (L1->L2 (L0->L1 (parse-L0 expr)))))

(define transformed-exprs
  (map compile (list expr1 expr2)))

(pretty-print transformed-exprs)

