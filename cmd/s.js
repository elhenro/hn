// s
const childpro = require('child_process');
//childpro.execFileSync("ack", ["-i"], {stdio: "inherit"})


const pars = [];
process.argv.slice(2).forEach(function (parameter) {
    pars.push(parameter);
});

// attention: use pars[1] because [0] would be 's'
childpro.execFileSync("ack", ["-i", pars[1]], {stdio: "inherit"})
process.exit
