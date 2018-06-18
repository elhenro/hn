const pathToHn = '/web/hn';
const rootDir = require('os').homedir() + pathToHn;
const cmdDir = rootDir + '/cmd/';

const shell = require('shelljs');
const inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const fuzzy = require('fuzzy');
const _ = require('lodash');
const Promise = require('promise');
const fs = require('fs');
const childpro = require('child_process');

const pars = [];
process.argv.slice(2).forEach(function (parameter) {
    pars.push(parameter);
});

const cmdList = [];
fs.readdirSync(cmdDir).forEach(file => {
    cmdList.push(file);
})

cmdList.forEach(function( el ){
    if ( pars[0] === (el.split('.')[0])){
        require(cmdDir + el);
    }
});

const choices = [
        'run command',
        'ssh',
        'web',
        'projects',
        'aliases',
        'add cmd',
        'add website',
        'monitor',
        'change theme',
        'sleep',
        'shutdown',
        'exit',
      ]

function searchMenuChoices(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, choices);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));
        }, _.random(30, 500));
    });
}
    inquirer.prompt([
          {
            type: 'autocomplete',
            name: 'cmd',
            suggestOnly: false,
            message: '  hn',
            source: searchMenuChoices,
            pageSize: 13,
            validate: function(val) {
                return val
                    ? true
                        : '..';}}
	]).then(function(res) {
    console.log(res.cmd);
    if (res.cmd === 'aliases'){runAlias();}
    else if (res.cmd === 'change theme'){changeTheme();}
    else if (res.cmd === 'monitor'){monitor();}
    else if (res.cmd === 'run command'){runCmd();}
    else if (res.cmd === 'add cmd'){addCmd();}
    else if (res.cmd === 'add website'){addWebsite();}
    else if (res.cmd === 'ssh'){runSsh();}
    else if (res.cmd === 'projects'){runProjects();}
    else if (res.cmd === 'web'){runWeb();}
    else if (res.cmd === 'sleep'){
        childpro.execFileSync('sudo', ['pm-suspend'], {stdio: 'inherit'});}
    else if (res.cmd === 'shutdown'){
        childpro.execFileSync('shutdown', ['now'], {stdio: 'inherit'});}
    else if (res.cmd === 'exit'){process.exit();}
    });


function runCmd(cmd){
    const commandFiles = [];
    fs.readdir((cmdDir), (err, files) => {
        files.forEach(file => {
            commandFiles.push(file);
        });
    })

    function searchCmds(answers, input) {
          input = input || '';
          return new Promise(function(resolve) {
                  setTimeout(function() {
                            var fuzzyResult = fuzzy.filter(input, commandFiles);
                            resolve(fuzzyResult.map(function(el) {
                                        return el.original;
                                      }));
                          }, _.random(30, 500));
                });
    }

    inquirer.prompt([
          {
                  type: 'autocomplete',
                  name: 'cmd',
                  suggestOnly: false,
                  message: 'run node.js cmd',
                  source: searchCmds,
                  pageSize: 10,
                  validate: function(val) {
                            return val
                              ? true
                              : 'Type something!';
                          }
                }
	]).then(function(res) {
        require(cmdDir + res.cmd);
    });
}

function addCmd(cmd){
    // prompt
    // write new cmd.js file
    inquirer.prompt([
    {
        type: 'input',
        name: 'cmdName',
        message: "What should the new command be?",
    },
    {
        type: 'input',
        name: 'cmd',
        message: "What should it do?",
    }
    ]).then(function(res) {
        console.log(res.cmdName, ' does ', res.cmd);

        function w(path, data){
            fs.appendFileSync(path, data);
        };
        const path = cmdDir + res.cmdName + '.js';
        const headNote = '// ' + res.cmdName;
        const requireCP = "const childpro = require('child_process');";
        const cmdP = res.cmd.split(' ');
        let command = '';

        if (cmdP[3] != undefined){
            command = 'childpro.execFileSync("'+cmdP[0]+'", ["'+[cmdP[1]+'", "'+cmdP[2]+'", "'+cmdP[3]]+'"], {stdio: "inherit"})';
        } else
        if (cmdP[2] != undefined){
            command = 'childpro.execFileSync("'+cmdP[0]+'", ["'+cmdP[1]+'", "'+cmdP[2]+'"], '+', {stdio: "inherit"})';
        } else
        if (cmdP[1] != undefined){
            command = 'childpro.execFileSync("'+cmdP[0]+'", ["'+cmdP[1]+'"], {stdio: "inherit"})';
        } else
        if (cmdP[0] != undefined){
            command = 'childpro.execFileSync("'+cmdP[0]+'", {stdio: "inherit"})';
        } else {
            throw (res.cmd + ' has no valid parameter input');
        }
        const exitCmd = 'process.exit()';

        // TODO: check for headNote if exists
        w(path, headNote + '\r\n');
        w(path, requireCP + '\r\n');
        w(path, command + '\r\n');
        w(path, exitCmd + '\r\n');
    });
}
function runAlias(){
    const bashAlis = '/home/chrx/.bash_aliases';
    const aliases = [];
    fs.readFile( bashAlis, 'utf8',
      function (err, data) {
        if(err) throw err;
        prompt(data.match(/[^\r\n]+/g));
    });
    function prompt(choices){

        const cmds = [];
        choices.forEach(function(el){
            const splitCmd = el.split('=');
            const cmd = splitCmd[1].substring(1, (splitCmd[1]).length - 1);

            const alias = ['name', cmd];
            cmds.push(cmd);
        });

        inquirer.prompt([
        {
        type: 'list',
        name: 'alias',
        message: 'Which alias to run?',
        choices: cmds,
        filter: function(val) {
            return val.toLowerCase();
        }
        },
        ])
  .then(answers => {
    shell.echo('doing ' + answers.alias);
    const aliasCmd = rootDir + '/action/run.sh';
    childpro.execFileSync(aliasCmd, [answers.alias], {stdio: 'inherit'});
    //shell.exec(rootDir + '/action/run.sh ' + answers.alias);
    //shell.exit();
    //shell.exec(answers.alias);
  });
    }
}

function changeTheme() {
    const images = [];
    const wpPath = require('os').homedir()+'/Dropbox/lnx/wp';

    fs.readdir(wpPath, (err, files) => {
        files.forEach(file => {
            images.push(file);
        });
    })
    function searchImages(answers, input) {
          input = input || '';
          return new Promise(function(resolve) {
                  setTimeout(function() {
                            var fuzzyResult = fuzzy.filter(input, images);
                            resolve(fuzzyResult.map(function(el) {
                                        return el.original;
                                      }));
                          }, _.random(30, 500));});}
    inquirer.prompt([{
                  type: 'autocomplete',
                  name: 'image',
                  suggestOnly: false,
                  message: 'hn  -   change theme - choose image to generate colorscheme',
                  source: searchImages,
                  pageSize: 15,
                  validate: function(val) {
                            return val
                              ? true
                              : 'Type to search images..';}}
	]).then(function(res) {
        const imgPath = wpPath + '/' + res.image;
        const wal = (require('os').homedir() + '/bin/wal/wal');
        childpro.execFileSync(wal, ['-i', imgPath], {stdio: 'inherit'});
    });
}

function monitor() {
    inquirer
  .prompt([
    {
      type: 'list',
      name: 'monitor',
      message: 'monitor',
      choices: [
        'gtop',
        'htop',
        'bmon',
        'slurp',
        'netmon',
        'top'
      ]
    },
])
  .then(res => {
    childpro.execFileSync(res.monitor, [''], {stdio: 'inherit'});
    //shell.exec((rootDir + '/action/run.sh ' + res.monitor), {stdio: 'inherit'});
    //shell.exec(rootDir + '/action/run.sh ' + res.monitor);
    process.exit();
  });
}

function runSsh() {

    const SshList = [];
    const sshFile = require('os').homedir() + '/.bash_ssh-shortcuts';
    fs.readFile( sshFile, 'utf8',
      function (err, data) {
       if(err) throw err;
          //data.split().forEach(function (line) {
            //SshList.push(line);
        fillSshList(data.match(/[^\r\n]+/g));
    });

    function fillSshList(choices){
        choices.forEach(function(el){
            const splitCmd = el.split('=');
            const cmd = splitCmd[1].substring(1, (splitCmd[1]).length - 1);

            const alias = ['name', cmd];
            SshList.push(cmd);
        });
    }

    function searchSSHChoices(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, SshList);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));
        }, _.random(30, 500));
    });
}
    inquirer.prompt([
          {
            type: 'autocomplete',
            name: 'ssh',
            suggestOnly: false,
            message: '  hn',
            source: searchSSHChoices,
            pageSize: 5,
            validate: function(val) {
                return val
                    ? true
                        : '..';}}
	]).then(function(res) {
        console.log('connecting to ' + res.ssh);
        // connect to res.ssh
        childpro.execFileSync('ssh', [res.ssh], {stdio: 'inherit'});
    });
}

function runProjects(){
    const proDir = require('os').homedir() + '/web';
    const proList = [];
    fs.readdirSync(proDir).forEach(file => {
        proList.push(file);
    })

    function searchProjects(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, proList);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));
        }, _.random(30, 500));
    });
}
    inquirer.prompt([
          {
            type: 'autocomplete',
            name: 'pro',
            suggestOnly: false,
            message: '  hn - projects',
            source: searchProjects,
            pageSize: 10,
            validate: function(val) {
                return val
                    ? true
                        : '..';}}
	]).then(function(res) {
        const resPath = proDir + '/' + res.pro;
        console.log('   opening:    ' + resPath);
        //require(cmdDir + 'ls.js');
        //shell.exec('vim ' + resPath);
        childpro.execFileSync('vim' , [resPath], {cwd: resPath, stdio: 'inherit'});
        //childpro.execFileSync('sh',[(cmdDir+'run.sh'), 'cd', [resPath]], {cwd: resPath, stdio: 'inherit'});
        //process.exit();
    });

}

function runWeb() {
    const webList = [];
    const webFile = require('os').homedir() + '/.websites';

    fs.readFile( webFile, 'utf8',
      function (err, data) {
       if(err) throw err;
        fillSshList(data.match(/[^\r\n]+/g));
    });

    function fillSshList(sites){
        sites.forEach(function(site){
            webList.push(site);
        });
    }

    function searchWebsites(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, webList);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));
        }, _.random(30, 500));
    });
}
    inquirer.prompt([
          {
            type: 'autocomplete',
            name: 'website',
            suggestOnly: false,
            message: '  hn - websites',
            source: searchWebsites,
            pageSize: 10,
            validate: function(val) {
                return val
                    ? true
                        : '..';}}
	]).then(function(res) {
        console.log(res.website);
        childpro.execFileSync('google-chrome', [res.website], {stdio: 'inherit'});});
}

function addWebsite(site){
    inquirer.prompt([{
        type: 'input',
        name: 'site',
        message: "tell me the website url to add: ",}
        ]).then(function(res) {
        function w(path, data){
            fs.appendFileSync(path, data);};
        const path =  require('os').homedir() + '/.websites';
        w(path, res.site + '\r\n');
        console.log(res.site, ' added ');});
}

