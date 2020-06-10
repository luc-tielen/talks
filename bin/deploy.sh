#!/bin/bash

set -e

DIRS=(
  ast_transforms
  property_based_testing
  higher_order_functions
  haskell/introduction
  haskell/polymorphism_and_typeclasses
  haskell/semigroups_and_monoids
  haskell/functors
  haskell/applicative_functors
  haskell/monads
  haskell/bf
  haskell/gadts
  haskell/recursion_schemes
  haskell/free
)

function setup_node_modules() {
  # Hack for being able to do static builds with mdx-deck.
  FILE=node_modules/mdx-deck/lib/html.js
  sed -i "s/'mdx-deck\/layouts']/'mdx-deck\/layouts', 'mdx-deck-code-surfer', 'mdx-deck-kabisa-theme']/g" $FILE
}

function setup_working_directory() {
  git stash > /dev/null
  echo "Cleaning dist folder..."
  rm -rf dist/
}

function build_talk() {
  DIR=$1
  echo "Building presentation: $DIR..."
  yarn mdx-deck build --no-html --webpack webpack.config.js $DIR/presentation.mdx
}

function prepare_talk_for_deploy() {
  FILES=$(find dist/ -type f -depth 1)
  mkdir -p dist/$DIR
  mv $FILES dist/$DIR > /dev/null || echo "Finished building: $DIR..."
}

function build_talks() {
  for DIR in "${DIRS[@]}"; do
    build_talk $DIR
    prepare_talk_for_deploy $DIR
  done
}

function build_readme() {
  echo "Generating README.md..."
  node ./bin/generate_README.js "${DIRS[@]}"
}

function prepare_deploy() {
  echo "Preparing deploy..."
  git checkout gh-pages
  rm -rf "${DIRS[@]}"
  mv dist/* .
}

function deploy() {
  echo "Deploying to github pages..."
  git add "${DIRS[@]}" README.md
  git commit -m 'Update talks'
  git push
}

function restore_working_directory() {
  echo "Finished deploy, cleaning up working directory..."
  git checkout -
  git stash pop > /dev/null || echo
}


setup_node_modules
setup_working_directory
build_talks
build_readme
prepare_deploy
deploy
restore_working_directory

echo "Done!"
exit 0
