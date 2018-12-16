# MyAgent
The Minecraft agent generator & controller written in node.js

[![MyAgent](pmyagent.png)](https://github.com/mcpews/MyAgent)

[![Discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/ntaa8z8)
[![CircleCI](https://circleci.com/gh/mcpewebsocket-dev/MyAgent.svg?style=svg)](https://circleci.com/gh/mcpewebsocket-dev/MyAgent)
[![MyAgent NPM](https://img.shields.io/badge/npm-myagent-blue.svg)](https://www.npmjs.com/myagent)
[![MyAgent Version](https://img.shields.io/badge/dynamic/json.svg?label=myagent%20version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmcpews%2FMyAgent%2Fmaster%2Fpackage.json&query=%24.version&colorB=yellowgreen)](https://github.com/mcpews/MyAgent)
[![Video On Bilibili](https://img.shields.io/badge/Video-On%20Bilibili-ff69b4.svg)](http://www.bilibili.com/video/av37343451)
## Considerations
Agent Commands doesn't work in Minecraft Bedrock 1.7~1.8beta(1.8 is supported), that means you can't create or control Agent in these versions.
## Available Minecraft Versions
iOS: 1.0 ~ 1.6  
Android: 1.0 ~ 1.9b  
Windows 10: 1.0 ~ 1.9b  
PC(Minecraft Java Edition): Not Compatible  
Apple TV: 1.0 ~ 1.1.5  
(Note: 0.16~0.17[?] used another commandRequest format,so not compatible.)  
Also compatible with Minecraft China Edition and Minecraft Education Edition.
## ID Operation
### Kick ID
kick a target by using `-kickid [ID`
### List all live ID
`-listid` to show all live id.
## Fast install
### Global Install
Execute `npm i myagent -g` to install myagent.  
Execute `myagent` command to start myagent.  
`myagentctl` is the tool to change myagent's config.
### Normal Install
Execute `npm i myagent` to install myagent.  
Execute `npx myagent` to start myagent.
## MyAgent Binary File
You can download builded binary file of myagent in CircleCI.(Stopped Update)
## MyAgent Control
MyAgent Control can set the config of myagent.  
`myagentctl set <config> <value>` to set a config.  
`myagentctl rmconf` to remove config file of myagent (back to default configs)
## Execute myagent from source code
First,Clone a copy of myagent  
And then,please execute following command:
```
npm install
```
At last,execute command:`node myagent.js`
## Run
Install Node.JS First,And then execute:
```
npm i myagent -g
myagent
```
## Connect
type command in game:
`/connect [ip]:[port]`  
`[ip]` is IP of the server where you hosting myagent.  
`[port]` is the ip of myagent. Default value is 19131.
## Report a bug
Submit a issue to report bug.
## LICENSE
[GNU GPL v3](LICENSE)
## Author & Maintainers.
### Author
[LNSSPsd](https://github.com/LNSSPsd)
### Maintainers
[許嘉鋅](https://github.com/TheXuJiaXin),[LNSSPsd](https://github.com/LNSSPsd),[CAIMEO](https://github.com/CAIMEOX) &amp; [Torrekie](https://github.com/Torrekie).
## Contact Us
LNSSPsd's QQ:`2825121086`
