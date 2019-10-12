#!/bin/bash

set -e

DIRS=(property_based_testing higher_order_functions)

# Hack for being able to do static builds with mdx-deck.
FILE=node_modules/mdx-deck/lib/html.js
sed -i "s/'mdx-deck\/layouts']/'mdx-deck\/layouts', 'mdx-deck-code-surfer', 'mdx-deck-kabisa-theme']/g" $FILE

git stash > /dev/null

echo "Cleaning dist folder..."
rm -rf dist/


for DIR in "${DIRS[@]}"; do
  echo "Building presentation: $DIR..."
  yarn mdx-deck build --webpack webpack.config.js $DIR/presentation.mdx
  FILES=$(find dist/ -type f -depth 1)
  mkdir dist/$DIR
  mv $FILES dist/$DIR > /dev/null || echo "Finished building: $DIR..."
done

echo "Preparing deploy..."
git checkout gh-pages
rm -rf $DIRS
mv dist/* .

echo "Deploying to github pages..."
git add $DIRS
git commit -m 'Update talks'
git push

echo "Finished deploy, cleaning up working directory..."
git checkout -
git stash pop > /dev/null || echo

echo "Done!"
exit 0
