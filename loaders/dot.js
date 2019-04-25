const promisify = require("util").promisify;
const exec = promisify(require("child_process").exec);

module.exports = async function(input) {
  this.cacheable();
  const done = this.async();
  // TODO add check to see if dot exists

  const trimmedInput = input.replace("export default", "");
  const result = await exec(`echo ${trimmedInput} | dot -Tsvg`);
  if (result.stderr) {
    done(null, new Error(result.stderr));
  }

  done(null, result.stdout);
};
