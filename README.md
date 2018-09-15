# MyAgent
The Minecraft agent generator&amp;controller written in node.js

**[MyAgent Project](http://agent.vanillahh.online)**

[![cOd](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/ntaa8z8)

[![CircleCI](https://circleci.com/gh/mcpewebsocket-dev/MyAgent.svg?style=svg)](https://circleci.com/gh/mcpewebsocket-dev/MyAgent)
## MyAgent Binary File
You can download builded binary file of myagent in CircleCI.
## Install Node.Js
* WINDOWS: download nodejs at `https://nodejs.org/en/download/`
* LINUX: Please install packages `gcc g++ make` first,then
Run commands:
```
chmod +x configure
./configure
```
and wait about 1 hour.
### Install Packages in Linux
#### Debian and debian - based systems
```
apt install gcc g++ make
```
#### CentOs and CentOS based systems
````
yum install gcc
yum install make
yum install gcc-c++
````
## Arch Linux
````
pacman -S gcc
pacman -S make
````
## Other Systems
[Search by Google](http://google.com)

[Search by bing](http://bing.com)

[Search by BAIDU](http://www.baidu.com)
## Run
In WINDOWS:First,please run following commands:
````
npm install
````
Then,run command:`node myagent.js`

In LINUX: Do step Install Node.JS and then run command:`node myagent.js`
## Connect
type command in game:
`/connect [ip]:19131`
## Enable Plugins
Execute following commands：
````
npm install ffi
````
and MyAgent will enable plugins when startup.
## MyAgent Daemon Plugin
* Only LINUX
### Build
change dir to `plugins/myagentd/`
And run the following command:
````
make
````
### Run
MyAgent will load it when execute.
### KILL
````
killall node
````
## Report a bug
Submit a issue to report bug.
## LICENSE
GNU GPL v3
## Authors
[許嘉鋅](https://github.com/TheXuJiaXin),[LNSSPsd](https://github.com/LNSSPsd),[CAIMEO](https://github.com/CAIMEOX) &amp; [Torrekie](https://github.com/Torrekie).
## Contact Us
MJTG QQ Group:<code>590352162</code>
