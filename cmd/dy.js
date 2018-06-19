// dy
const childpro = require('child_process');

const pars = [];
process.argv.slice(2).forEach(function (parameter) {
    pars.push(parameter);
});

childpro.execFileSync("youtube-dl", [pars[1]], {stdio: "inherit"})
process.exit()
