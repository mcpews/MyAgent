# MyAgent
The Minecraft agent generator&amp;controller written in node.js

[![MyAgent](myagent.png)](https://github.com/mcpewebsocket-dev/MyAgent)

**[MyAgent Project](http://agent.vanillahh.online)**

[![Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/ntaa8z8)
[![CircleCI](https://circleci.com/gh/mcpewebsocket-dev/MyAgent.svg?style=svg)](https://circleci.com/gh/mcpewebsocket-dev/MyAgent)
[![MyAgent NPM](https://img.shields.io/badge/npm-myagent-blue.svg)](https://www.npmjs.com/myagent)

## Fast install
Execute `npm i myagent -g` to install myagent.

Execute `myagent` command to start myagent.
## MyAgent Binary File
You can download builded binary file of myagent in CircleCI.
## READ ME if you want to make
* File `Makefile` is for make binary version of myagent. So DON'T run it if you only want to spawn your agent.
* If you only want to spawn your own agent, only do the `node myagent.js`.
## Install Node.Js
* WINDOWS: download nodejs at `https://nodejs.org/en/download/`
* LINUX: Please execute following commands to install Node.JS x64 version.
```
./install_node
```
execute `./install_node_x86` to install x86 version of Node.JS
## Run
First,please execute following commands:
````
npm install
````
Then,run command:`node myagent.js`

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
