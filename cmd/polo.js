// polo
const childpro = require('child_process');
childpro.execFileSync("mpv", ["https://www.youtube.com/watch?v=gB98kRDUTM4"], {stdio: "inherit"})
process.exit()
