//git branch

const childpro = require('child_process');
childpro.execFileSync('git', ['pull'], {stdio: 'inherit'});

process.exit();
