//git status
const childpro = require('child_process');
childpro.execFileSync('git', ['status'], {stdio: 'inherit'});

process.exit();
