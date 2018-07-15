English-
# MyAgent
The Minecraft agent generator&amp;controller written in node.js<br/>
<b><a href="http://agent.vanillahh.online">MyAgent Project</a></b>
## Install Node.Js
* WINDOWS: download nodejs at <code>https://nodejs.org/en/download/</code>
* LINUX: Please install packages <code>gcc g++ make</code> first,then<br/>
Run commands:<pre><code>chmod +x configure
./configure</code></pre>
and wait about 1 hour.
## Run
In WINDOWS:First,please run following commands:<br/>
<pre><code>npm install fs
npm install ws</code></pre>
Then,run command:<code>node myagent.js</code>
In LINUX: Do step Install Node.JS and then run command:<code>node myagent.js</code>
## Connect
type command in game:<br>
<code>/connect [ip]:19131</code>
## About Key
The key of myagent is in the keys.txt
Format is: <code>KEY01 KEY02</code>
## Command Collections
Command Collections can start at game.<br>
When you enter <code>*/cmdc</code> at game,it can be run.<br>
The <code>cmdc.txt</code> is an example of command collections.<br>
We use char <code>$</code> to split commands.
## MyAgent Daemon
* Only LINUX
### Build
Build it with gcc:<pre><code>gcc myagentd.c -o myagentd</code></pre>
### Run
<pre><code>./myagentd</code></pre>
### KILL
<pre><code>killall myagentd</code></pre>
## Report a bug
Submit a issue to report bug.
## LICENSE
GNU GPL v3
## Authors
[許嘉鋅](https://github.com/TheXuJiaXin),[LNSSPsd](https://github.com/LNSSPsd),[CAIMEO](https://github.com/CAIMEOX) &amp; [Torrekie](https://github.com/Torrekie).
## Contact Us
MJTG QQ Group:<code>590352162</code>
<br>
<br>
中文-
# MyAgent
一个使用node.js编写的我的世界吉祥物生成/控制器<br/>
<b><a href="http://agent.vanillahh.online">MyAgent Project</a></b>
## 安装 Node.Js
* WINDOWS: 下载 nodejs <code>https://nodejs.org/en/download/</code>
* LINUX: 需要安装 <code>gcc g++ make</code> first,then<br/>
执行命令:<pre><code>chmod +x configure
./configure</code></pre>
然后等待一个小时左右.
## 运行
WINDOWS:首先执行如下指令:<br/>
<pre><code>npm install fs
npm install ws</code></pre>
然后执行这个指令:<code>node myagent.js</code>
LINUX: 安装node.js后执行命令:<code>node myagent.js</code>
## 连接
在我的世界基岩版中（包括中国版手游）输入指令:<br>
<code>/connect [ip]:19131</code>
## 关于“key”
所有用于进入MyAgent的“key”都保存在keys.txt
格式: <code>KEY01 KEY02</code>
## 指令集合功能
指令集合可以在游戏中运行<br>
当输入<code>*/cmdc</code>时,其中包含的指令都会被运行<br>
<code>cmdc.txt</code> 是一个“指令集合”的示例。<br>
使用字符<code>$</code>来执行指令.
## MyAgent 进程
* 仅 LINUX
### 搭建
使用gcc搭建:<pre><code>gcc myagentd.c -o myagentd</code></pre>
### 运行
<pre><code>./myagentd</code></pre>
### 结束
<pre><code>killall myagentd</code></pre>
## Bug反馈
发一个issue即可。
## 证书
GNU GPL v3
## 作者
[許嘉鋅](https://github.com/TheXuJiaXin),[LNSSPsd](https://github.com/LNSSPsd),[CAIMEO](https://github.com/CAIMEOX) &amp; [Torrekie](https://github.com/Torrekie).
## 联系我们
MJTG QQ群:<code>590352162</code>
