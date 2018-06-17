// git add all and commit and push
//
//const shell = require('shelljs');
const childpro = require('child_process');

childpro.execFileSync('git', ['status'], {stdio: 'inherit'});

childpro.execFileSync('git', ['add', '.'], {stdio: 'inherit'});
childpro.execFileSync('git', ['commit'], {stdio: 'inherit'});
childpro.execFileSync('git', ['push'], {stdio: 'inherit'});
childpro.execFileSync('git', ['status'], {stdio: 'inherit'});

process.exit();
