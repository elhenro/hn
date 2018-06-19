// goo
const isOsx = process.platform === 'darwin';
const childpro = require('child_process');
const pars = [];
process.argv.slice(2).forEach(function (parameter) {
    pars.push(parameter);
});

const url = "https://www.google.com/search?q=" + pars[1];
if(!isOsx){
    childpro.execFileSync("google-chrome", [url], {stdio: "inherit"})
} else {
    childpro.execFileSync("'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '--kiosk'", [url], {stdio: "inherit"})
}
process.exit()
