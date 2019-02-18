#lang nanopass

(define-language L0
  (terminals
    (number (n))
    (operator (op)))
  (Expr (e)
    n
    (op e0 e1)))

(define-language L1
  (extends L0)
  (terminals
    (- (number (n)))
    (+ (variable (v))))
  (Expr (e)
    (- n)
    (+ v)
    (+ (lambda (v) e))
    (+ (apply e0 e1))))

(define-language L2
  (extends L1)
  (Expr (e)
    (+ op)
    (- (op e0 e1))))

(define-language L3
  (extends L2)
  (terminals
    (- (operator (op))))
  (Expr (e)
    (- op)))

(define (operator? x) (memq x '(+ - *)))
(define (variable? x) (symbol? x))

(define-parser parse-L0 L0)

; encoding numbers
(define-pass L0->L1 : L0 (ast) -> L1 ()
  (Expr : Expr (e) -> Expr ()
    [,n
      (letrec ([go (lambda (n)
                     (if (= n 0)
                       `x
                       `(apply f ,[go (- n 1)])))])
        `(lambda (f) (lambda (x) ,[go n])))]))

; curry operators
(define-pass L1->L2 : L1 (ast) -> L2 ()
  (Expr : Expr (e) -> Expr ()
    [(,op ,[e0] ,[e1])
     `(apply (apply ,op ,e0) ,e1)]))

; encode operators
(define-pass L2->L3 : L2 (ast) -> L3 ()
  (definitions
    (with-output-language (L3 Expr)
      (define plus
        `(lambda (m) (lambda (n) (lambda (f) (lambda (x)
           (apply (apply m f) (apply (apply n f) x)))))))
      (define pred
        `(lambda (n) (lambda (f) (lambda (x)
           (apply
             (apply
               (apply n (lambda (g) (lambda (h) (apply h (apply g f)))))
               (lambda (u) x))
             (lambda (u) u))))))
      (define minus
        `(apply
           (lambda (pred)
             (lambda (m) (lambda (n) (apply (apply n pred) m))))
           ,pred))
      (define multiply
        `(lambda (m) (lambda (n) (lambda (f)
           (apply m (apply n f))))))))
  (Expr : Expr (e) -> Expr ()
    [,op
     (case op
       [(+) plus]
       [(-) minus]
       [(*) multiply]
       [else (error 'encode-operators "unsupported operator ~s" op)])]))

; slightly different syntax since quasiquote is now same as in racket
(define-pass L3->racket : L3 (ast) -> * ()
  (Expr : Expr (e) -> * ()
    [,v v]
    [(apply ,e0 ,e1) `(,[Expr e0] ,[Expr e1])]
    [(lambda (,v) ,e) `(lambda (,v) ,[Expr e])]))

(define expr '(* (+ 1 2) (- 3 4)))
(define transformed-expr
  (L3->racket (L2->L3 (L1->L2 (L0->L1 (parse-L0 expr))))))

(pretty-print transformed-expr)

