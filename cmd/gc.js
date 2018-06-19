// gc
const childpro = require('child_process');
childpro.execFileSync("git", ["commit"], {stdio: "inherit"})
process.exit()
