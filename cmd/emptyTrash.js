// emptyTrash
const childpro = require('child_process');
childpro.execFileSync("sh", ['/home/chrx/.do/emptyTrash.sh'], {stdio: "inherit"})
process.exit()
