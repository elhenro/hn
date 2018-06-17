// trashInfo
const childpro = require('child_process');
childpro.execFileSync("sh", ['/home/chrx/.do/trashInfo.sh'], {stdio: "inherit"})
process.exit()
