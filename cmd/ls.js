// ls
const childpro = require('child_process');
childpro.execFileSync("ls", {stdio: "inherit"})
process.exit()
