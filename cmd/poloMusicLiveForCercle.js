// poloMusicLiveForCercle
const childpro = require('child_process');
childpro.execFileSync("mpv", ["https://www.youtube.com/watch?v=CsGauHXioos"], {stdio: "inherit"})
process.exit()
