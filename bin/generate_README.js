#!/usr/bin/env node

const { promisify } = require("util");
const fs = require("fs");
const writeFile = promisify(fs.writeFile);

const BASE_URL = "https://luc-tielen.github.io/talks/";

const getLinks = dirs => dirs.map(dir => `- [${dir}](${BASE_URL}${dir})`);

const generateREADME = links =>
  `This page contains a collection of talks I have given in the past:

${links.join("\n")}

Source code for the talks can be found in this [repo](https://github.com/luc-tielen/talks).
`;

const main = async () => {
  const dirs = process.argv.slice(2);
  const links = getLinks(dirs);
  const contents = generateREADME(links);
  await writeFile("dist/README.md", contents);
};

main();
