//clear
const childpro = require('child_process');

childpro.execFileSync('clear', [''], {stdio: 'inherit'});

process.exit();
