// update
const childpro = require('child_process');
childpro.execFileSync("sh", ['/home/chrx/.do/update.sh'], {stdio: "inherit"})
process.exit()
