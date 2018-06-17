// lsl
const childpro = require('child_process');
childpro.execFileSync("ls", ["-l"], {stdio: "inherit"})
process.exit()
