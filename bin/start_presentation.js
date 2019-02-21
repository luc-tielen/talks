#!/usr/bin/env node

const { execSync } = require("child_process");
const { existsSync } = require("fs");
const tcpPortUsed = require("tcp-port-used");

const HOST = "127.0.0.1";
const PORT = 8080;

const main = async () => {
  const folderName = process.argv[2];
  if (!folderName) {
    process.stderr.write(
      "You need to specify a folder to start presenting from!\n"
    );
    process.exit(1);
  }

  const isPortInUse = await tcpPortUsed.check(PORT, HOST);
  if (isPortInUse) {
    process.stderr.write(`Port ${PORT} is already in use, aborting.\n`);
    process.exit(1);
  }

  const presentationFile = `${folderName}/presentation.mdx`;
  if (!existsSync(presentationFile)) {
    process.stderr.write(
      `File "${presentationFile}" does not exist, aborting.\n`
    );
    process.exit(1);
  }

  execSync(`yarn mdx-deck --webpack ./webpack.config.js ${presentationFile}`, {
    stdio: "inherit"
  });
  process.exit(0);
};

main();
