const pathToHn = '/web/hn';
const rootDir = require('os').homedir() + pathToHn;
const cmdDir = rootDir + '/cmd/';

const os = 'macOs';
// determine os
const isOsx = process.platform === 'darwin';

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

if ( pars[0] === 'pro'){
    runProjects();
} else
if ( pars[0] === 'w'){
    runWeb();
} else
if ( pars[0] === 'web'){
    runWeb();
} else
if ( pars[0] === 'p'){
    runProjects();
} else
if ( pars[0] === 'cmd'){
    runCmd();
} else
if ( pars[0] === 'addcmd'){
    addCmd();
} else
if ( pars[0] === 'ali'){
    runAlias();
} else
if ( pars[0] === 'ct'){
    changeTheme();
} else
if ( pars[0] === 'mon'){
    monitor();
} else
if ( pars[0] === 'music'){
    runMusic();
} else
if ( pars[0] === 'm'){
    runMusic();
} else
if ( pars[0] === 'ssh'){
    runSsh();
} else

if ( pars[0] == undefined) {

const choices = [
        'run command',
        'ssh',
        'web',
        'projects',
        'aliases',
        'music',
        'add cmd',
        'edit cmd',
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
            pageSize: 5,
            validate: function(val) {
                return val
                    ? true
                        : '..';}}
	]).then(function(res) {
    //console.log(res.cmd);
    if (res.cmd === 'aliases'){runAlias();}
    else if (res.cmd === 'change theme'){changeTheme();}
    else if (res.cmd === 'monitor'){monitor();}
    else if (res.cmd === 'run command'){runCmd();}
    else if (res.cmd === 'add cmd'){addCmd();}
    else if (res.cmd === 'edit cmd'){editCmd();}
    else if (res.cmd === 'add website'){addWebsite();}
    else if (res.cmd === 'ssh'){runSsh();}
    else if (res.cmd === 'projects'){runProjects();}
    else if (res.cmd === 'music'){runMusic();}
    else if (res.cmd === 'web'){runWeb();}
    else if (res.cmd === 'sleep'){
        childpro.execFileSync('sudo', ['pm-suspend'], {stdio: 'inherit'});}
    else if (res.cmd === 'shutdown'){
        childpro.execFileSync('shutdown', ['now'], {stdio: 'inherit'});}
    else if (res.cmd === 'exit'){
        console.log('bye bye');
        process.exit();}
    });
}

function runCmd(){
    liveSearchOptionsToRequire(pathToHn+'/cmd', 'cmd', '  hn - run command', 5);
}

function addCmd(cmd){
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
    liveSearchInFileLines(require('os').homedir() + '/.bash_aliases', 'aliases', 'hn - aliases', 10, (rootDir + '/action/run.sh'))
}

function changeTheme() {
    liveSearchOptionsFromDir('Dropbox/lnx/wp', 'wallpaper', '  hn - change theme', 7, 'wal');
}

function monitor() {
    const choices = [
        'gtop',
        'htop',
        'bmon',
        'slurp',
        'netmon',
        'top'
    ];
    promptCommands('list', 'monitor', 'monitor', choices);
}

function runSsh() {
    const sshListFile = require('os').homedir() + '/.bash_ssh-shortcuts'
    liveSearchInFileLines(sshListFile, 'ssh', 'hn - connect to server', 10, 'ssh')
}

function runProjects(){
    liveSearchOptionsFromDir('web', 'pro', '  hn - projects', 10, 'lf');
}

function runWeb() {
    if (isOsx) {
        liveSearchInFileLines(require('os').homedir() + '/.websites', 'websites', 'hn - websites', 10, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '--kiosk')
    } else {
        liveSearchInFileLines(require('os').homedir() + '/.websites', 'websites', 'hn - websites', 10, 'google-chrome')
    }
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
        u(path, res.site + '\r\n');
        console.log(res.site, ' added ');});
}

function runMusic() {
    liveSearchOptionsFromDir('Music', 'music', '  hn - music', 20, 'mpv');
}

function editCmd() {
    liveSearchOptionsToEdit(pathToHn+'/cmd', 'cmd', '  hn - edit command', 5, 'vim');
}

function liveSearchOptionsFromDir(dir, name, message, listSize, command){
    const searchDir = require('os').homedir()+'/'+ dir;
    const searchList = [];
    fs.readdirSync(searchDir).forEach(file => {
        searchList.push(file);
    })
    function search(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, searchList);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));}, _.random(30, 500));});}
    inquirer.prompt([{
            type: 'autocomplete',
            name: 'item',
            suggestOnly: false,
            message: message,
            source: search,
            pageSize: listSize,
            validate: function(val) {return val? true: '..';}}
	]).then(function(res) {
        const resPath = searchDir + '/' + res.item;
        const imgPath = '"' + resPath + '"';
        if (command === 'wal'){
            if (isOsx) {
                // note that this will shuffle (select random image from dir) if system settings/wallpaper is using the same directory
                childpro.execFileSync('osascript', ['-e', ('tell application "Finder" to set desktop picture to POSIX file '+ imgPath +'')], {silent: false, stdio: 'inherit'});
            }else{
                childpro.execFileSync(require('os').homedir()+'/bin/wal/wal' , ['-i', resPath], {silent: false, stdio: 'inherit'});
                require('./cmd/c.js');
            }
        } else {
            childpro.execFileSync(command , [resPath], {stdio: 'inherit'});
        }
    });
}
function liveSearchOptionsToRequire(dir, name, message, listSize){
    const searchDir = require('os').homedir()+'/'+ dir;
    const searchList = [];
    fs.readdirSync(searchDir).forEach(file => {
        searchList.push(file);
    })
    function search(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, searchList);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));}, _.random(30, 500));});}
    inquirer.prompt([{
            type: 'autocomplete',
            name: 'item',
            suggestOnly: false,
            message: message,
            source: search,
            pageSize: listSize,
            validate: function(val) {return val? true: '..';}}
	]).then(function(res) {
        const resPath = searchDir + '/' + res.item;
        require(cmdDir + res.item);
    });
}
function liveSearchOptionsToEdit(dir, name, message, listSize, command){
    const searchDir = require('os').homedir()+'/'+ dir;
    const searchList = [];
    fs.readdirSync(searchDir).forEach(file => {
        searchList.push(file);
    })
    function search(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, searchList);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));}, _.random(30, 500));});}
    inquirer.prompt([{
            type: 'autocomplete',
            name: 'item',
            suggestOnly: false,
            message: message,
            source: search,
            pageSize: listSize,
            validate: function(val) {return val? true: '..';}}
	]).then(function(res) {
        const resPath = searchDir + '/' + res.item;
        //console.log(command, res.item);
        const itemPath = cmdDir + res.item;
        childpro.execFileSync(command, [itemPath], {stdio: 'inherit'});
    });
}

function liveSearchInFileLines(file, name, message, listSize, command, par1, par2){
    const List = [];
    fs.readFile( file, 'utf8',
      function (err, data) {
       if(err) throw err;
        fillList(data.match(/[^\r\n]+/g));
    });
    function fillList(items){
        items.forEach(function(item){
            List.push(item);
        });
    }
    function search(answers, input) {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
            var fuzzyResult = fuzzy.filter(input, List);
            resolve(fuzzyResult.map(function(el) {
                return el.original;
            }));
        }, _.random(30, 500));
    });
    }
    inquirer.prompt([
          {
            type: 'autocomplete',
            name: 'item',
            suggestOnly: false,
            message: message,
            source: search,
            pageSize: listSize,
            validate: function(val) {return val? true: '..';}}
	]).then(function(res) {
        console.log(res.item);
        // remove bash alias='...' strucutre
        if (command === (rootDir + '/action/run.sh')){
            const alias = res.item.split('=');
            const cmd = alias[1].substring(1, (alias[1]).length - 1);
            console.log(cmd);
            childpro.execFileSync(command, [cmd], {stdio: 'inherit'});
        } else {
            childpro.execFileSync(command, [res.item, par1, par2], {stdio: 'inherit'});
        }
    });
}

function promptCommands(type, name, message, list) {
    inquirer
    .prompt([
    {
      type: type,
      name: 'item',
      message: message,
      choices: list
    },
    ])
  .then(res => {
    childpro.execFileSync(res.item, [''], {stdio: 'inherit'});
  });
}

