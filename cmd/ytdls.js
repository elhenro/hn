// ytdls
const childpro = require('child_process');
const pars = [];
process.argv.slice(2).forEach(function (parameter) {
    pars.push(parameter);
});

//const url = "'" + pars[1] + "'";
//console.log(url);

const url = pars[1];

childpro.execFileSync('youtube-dl', ['--extract-audio', '--audio-format', 'mp3', url], {stdio: "inherit"})
//process.exit()
