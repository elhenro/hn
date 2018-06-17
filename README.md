# hn
![hn usage exmaple](https://i.imgur.com/yzsfDmS.gif)

## simple nodejs bash and js command shortcut runner

### requirements
* npm >= 5.6
* node >= 8

### optional requirements

#### terminal file manager
* [lf](https://github.com/gokcehan/lf)

#### system monitors
* [gtop](https://github.com/aksakalli/gtop)
* [htop](https://github.com/hishamhm/htop)
* [bmon](https://github.com/tgraf/bmon)

#### theme changer
* [wal color scheme generator script](https://github.com/dylanaraps/wal)

#### Features

* console prompt with arrow navigation and live search while typing

* run bash and js commands
* shortcuts for ssh connections
* shortctus for project directory
* shortctus for bash aliases
* shortcuts to open websites in chrome
* add js or bash commands
* add websites to list
* change wallpaper and colorscheme with wal and feh
* suspend (sleep)
* shutdown

#### files and directoris I use with hn (example)

(to be changed at top of index.js)

* bash aliases `~/.bash_aliases`
* website list `~/.websites`
* project dir `~/web/`
* Wallper dir `~/Dropbox/lnx/wp/`
* wal script `~/bin/wal/wal/`

#### installation

* clone
* `npm i`
* `echo "alias hn='node path/to/hn/index.js';" >> .bash_aliases`
* `. ~/.bash_aliases`
* `hn`

##### or use the single executable in /bin

* `sudo mv bin/hn /usr/bin/hn`

##### or if you use i3wm you can even bind hn to open on a keypress

* `mkdir ~/.do`
* `echo "#!/bin/sh" >> ~/.do/openHn.sh && echo "node ~/web/hn/index.js" >> ~/.do/openHn.sh`
* `echo "bindsym $mod+n exec i3-sensible-terminal -e sh ~/.do/openHn.sh" >> ~/.config/i3/config`

Note the single executable is still 36M, I will try to compile it smaller.

#### usage

run commands like this:

* `hn v`    -   version
* `hn help` -   help info
* `hn gs`   -   git status
* `hn`      -   main menu

it is also possible to run hn commands directly:

* `hn ls`
