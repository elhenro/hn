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
        //process.exit();
    }
});

const choices = [
        'run node.js cmd',
        'run alias',
        'add cmd',
        'monitor',
        'change theme',
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
            message: 'hn',
            source: searchMenuChoices,
            pageSize: 5,
            validate: function(val) {
                return val
                    ? true
                        : '..';}}
	]).then(function(res) {
        //require(cmdDir + res.cmd);
    console.log(res.cmd);
    if (res.cmd === 'run alias'){runAlias();}
    else if (res.cmd === 'change theme'){changeTheme();}
    else if (res.cmd === 'monitor'){monitor();}
    else if (res.cmd === 'run node.js cmd'){runCmd();}
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
    // TODO
// prompt: alias like:
    // enter name: commit
    // enter cmd: git commit -m
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
    shell.exec(rootDir + '/action/run.sh ' + answers.alias).code;
    shell.exec(rootDir + '/action/run.sh ' + answers.alias).output;
    shell.exit();
    //shell.exec(answers.alias);
  });
    }
}

function changeTheme() {
    inquirer
  .prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'choose theme',
      choices: [
        'solance',
        'dark',
        'paradise',
        'swirl',
        'orange future',
        'leave',
        'cool magazine',
      ]
    },
])
  .then(res => {
    function setWp(imgName){
		const wpCmd = (require('os').homedir() + '/bin/wal/wal -i ~/Dropbox/lnx/wp/' + imgName);
        shell.exec(rootDir + '/action/run.sh . ' + wpCmd);
    }
    const th = res.theme;

    if (th === 'solance'){ setWp('solance.jpg')}
    if (th === 'dark'){ setWp('1504928142752.jpg')}
    if (th === 'paradise'){ setWp('pink-cloud.png')}
    if (th === 'swirl'){ setWp('swirl.png')}
    if (th === 'orange future'){ setWp('orange-future.png')}
    if (th === 'leave'){ setWp('morningleave.jpg')}
    if (th === 'cool magazine'){ setWp('cool-magazine.jpg')}

    console.log('\r\n theme changed to ' + th);
    process.exit();
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
    shell.exec(rootDir + '/action/run.sh ' + res.monitor);
    process.exit();
  });
}

