// git add all and commit and push
//
const shell = require('shelljs');

shell.exec('git status');

shell.exec('sleep 0.5');

shell.exec('git add .');
shell.exec('git commit -m');
shell.exec('git push');

shell.exec('git status');

//etc
