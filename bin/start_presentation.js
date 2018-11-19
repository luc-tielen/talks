#!/usr/bin/env node

const { execSync } = require("child_process");

const folderName = process.argv[2];
if (!folderName) {
  process.stderr.write(
    "You need to specify a folder to start presenting from!\n"
  );
  process.exit(1);
}

execSync(`yarn mdx-deck ${folderName}/presentation.mdx`, { stdio: "inherit" });
process.exit(0);
