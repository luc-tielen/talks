#!/bin/bash

set -e

FILE=node_modules/mdx-deck/lib/html.js
sed -i "s/'mdx-deck\/layouts']/'mdx-deck\/layouts', 'mdx-deck-code-surfer', 'mdx-deck-kabisa-theme']/g" $FILE

git stash > /dev/null

echo "Cleaning dist folder..."
rm -rf dist/

DIRS=(higher_order_functions)

for DIR in $DIRS; do
  echo "Building presentation: $DIR..."
  yarn mdx-deck build --webpack webpack.config.js $DIR/presentation.mdx
  mkdir dist/$DIR
  mv dist/* dist/$DIR > /dev/null || echo "Finished building: $DIR..."
done

echo "Preparing deploy..."
git checkout gh-pages
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
