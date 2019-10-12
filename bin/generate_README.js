#!/usr/bin/env node

const { promisify } = require("util");
const fs = require("fs");
const writeFile = promisify(fs.writeFile);

const BASE_URL = "https://luc-tielen.github.io/talks/";

const getLinks = dirs => {
  const categories = dirs.reduce((acc, dir) => {
    const [category, ...rest] = dir.split("/");
    return {
      ...acc,
      [category]: (acc[category] || []).concat(rest.join("\n"))
    };
  }, {});

  return categories;
};

const generateREADME = categories =>
  `This page contains a collection of talks I have given in the past:

${Object.entries(categories)
    .map(
      ([category, values]) =>
        values.length === 1
          ? `- [${category}](${BASE_URL}${category}/${values[0]})\n`
          : `- ${category}\n${values
              .map(dir => `  - [${dir}](${BASE_URL}${category}/${dir})`)
              .join("\n")}
  `
    )
    .join("")}

Source code for the talks can be found in this [repo](https://github.com/luc-tielen/talks).
`;

const main = async () => {
  const dirs = process.argv.slice(2);
  const links = getLinks(dirs);
  const contents = generateREADME(links);
  await writeFile("dist/README.md", contents);
};

main();
