//backup
//const shell = require('shelljs');
const childpro = require('child_process');

const backupScript = '/home/chrx/.do/backup_config.sh';

console.log('starting full system backup and clean');
childpro.execFileSync('sh', [backupScript], {stdio: 'inherit'});

console.log('Backup done!');
process.exit();
