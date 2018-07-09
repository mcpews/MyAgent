# MyAgent
The agent generator&amp;controller written in node.js
## Install Node.Js
* WINDOWS: download nodejs at <code>https://nodejs.org</code>
* LINUX: download nodejs source code at <code>https://nodejs.org/dist/v8.11.3/node-v8.11.3.tar.gz</code> and run the following commands:<br/>
<pre><code>tar -xvzf node-v8.11.3.tar.gz
cd node-v8.11.3
./configure
make #this command will take about an hour.
make install</code></pre>
## Run
First,please run following commands:<br/>
<pre><code>npm install fs
npm install ws</code></pre>
Then,run command:<code>node myagent.js</code>
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
