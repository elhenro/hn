//git branch

const childpro = require('child_process');
childpro.execFileSync('git', ['branch', '-va'], {stdio: 'inherit'});


process.exit();
