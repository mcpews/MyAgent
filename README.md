# MyAgent
The Minecraft agent generator&amp;controller written in node.js

<b>[MyAgent Project](http://agent.vanillahh.online)</b>

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


# MyAgent - 中文
一个使用node.js编写的我的世界吉祥物生成/控制器<br/>
<b><a href="http://agent.vanillahh.online">MyAgent Project</a></b><br/>[![cOd](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/ntaa8z8)
## 安装 Node.Js
* WINDOWS: 下载 nodejs <code>https://nodejs.org/en/download/</code>
* LINUX: 需要先安装 <code>gcc g++ make</code> ,然后<br/>
执行命令:<pre><code>chmod +x configure
./configure</code></pre>
最后等待一个小时左右.
## 运行
WINDOWS:首先执行如下指令:<br/>
<pre><code>npm install</code></pre>
然后执行这个指令:<code>node myagent.js</code>
LINUX: 安装node.js后执行命令:<code>node myagent.js</code>
## 连接
在我的世界基岩版中（包括中国版手游）输入指令:<br>
<code>/connect [ip]:19131</code>
## MyAgent 守护进程
* 仅 LINUX
### 构建
使用gcc构建:<br/>
首先，切换目录到<code>plugins/myagentd</code><br/>
然后执行<pre><code>make</code></pre>
### 运行
MyAgent会在启动时自动加载它.
### 杀死
<pre><code>killall node</code></pre>
## Bug反馈
发一个issue即可。
## 协议
GNU GPL v3
## 作者
[許嘉鋅](https://github.com/TheXuJiaXin),[LNSSPsd](https://github.com/LNSSPsd),[CAIMEO](https://github.com/CAIMEOX) &amp; [Torrekie](https://github.com/Torrekie).
## 联系我们
MJTG QQ群:<code>590352162</code>
