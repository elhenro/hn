//backup
//const shell = require('shelljs');
const childpro = require('child_process');

const backupScript = '/home/chrx/.do/backup_config.sh';

childpro.execFileSync('sh', [backupScript], {stdio: 'inherit'});

process.exit();
