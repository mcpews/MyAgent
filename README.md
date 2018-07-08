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
## About Key
The key of myagent is in the keys.txt
Format is: <code>KEY01 KEY02 </code>
<br>The end of keys.txt file must have a space.
## LICENSE
GNU GPL v3
