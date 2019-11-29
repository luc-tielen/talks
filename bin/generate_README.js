#!/usr/bin/env node

const { promisify } = require("util");
const fs = require("fs");
const writeFile = promisify(fs.writeFile);

const BASE_URL = "https://luc-tielen.github.io/talks/";

const groupTalks = dirs =>
  dirs.reduce((acc, dir) => {
    const [category, ...rest] = dir.split("/");
    return {
      ...acc,
      [category]: (acc[category] || []).concat(rest.join("\n"))
    };
  }, {});

const formatSingleTalk = (category, dir) => {
  const location = dir === "" ? "" : `/${dir}`;
  return `- [${(category + location).replace(
    /[/_-]/,
    " "
  )}](${BASE_URL}${category}${location})\n`;
};

const formatMultipleTalks = (category, dirs) =>
  `- ${category}\n${dirs
    .map(
      dir => `  - [${dir.replace(/[/_-]/, " ")}](${BASE_URL}${category}/${dir})`
    )
    .join("\n")}
  `;

const generateREADME = talks =>
  `This page contains a collection of talks I have given in the past:

${Object.entries(talks)
    .map(
      ([category, values]) =>
        values.length === 1
          ? formatSingleTalk(category, values[0])
          : formatMultipleTalks(category, values)
    )
    .join("")}

Source code for the talks can be found in this [repo](https://github.com/luc-tielen/talks).
`;

const main = async () => {
  const dirs = process.argv.slice(2);
  const talks = groupTalks(dirs);
  const contents = generateREADME(talks);
  await writeFile("dist/README.md", contents);
};

main();
