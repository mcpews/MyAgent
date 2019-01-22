#!/usr/bin/env node


//Info & Settings
var version="Unknown";
var settings={
	looplimit: -1,//-1: no limit
	port: 19131,
	log: true,
	errtrace: false,
	loopinterval: 500
};
var test=false;

if(settings.errtrace){
process.on("uncaughtException",function trace(error){
	console.error("[ERROR] uncaughtException: %s.",error);
	const err={name:"MyAgent Error Tracing",message:error};
	Error.stackTraceLimit=30;
	Error.captureStackTrace(err,trace);
	console.error(err.stack);
	const dt=new Date();
	const fs=require("fs");fs.writeFileSync(process.env.HOME+"/myagent-crash-tracing-"+dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate()+"-"+dt.getHours()+"-"+dt.getMinutes()+"-"+dt.getSeconds()+"-"+dt.getMilliseconds()+".log",
"====MyAgent Crash Tracing====\nAt:"+Date()+"\nVersion:"+version+"\n"+err.stack+"\n====End Tracing====");
	process.exit(3);
});
}

console.log("=MyAgent=");
console.log("Author: LNSSPsd");
try{console.log("Version: %s",version=gv());}catch(to){}
console.log("Maintainers(github username): LNSSPsd,TheXuJiaXin,Torrekie,CAIMEOX");
console.log("https://github.com/mcpews/MyAgent");
console.log("https://npmjs.com/myagent");


try{
if(process.argv.splice(2)=="-d"){
console.log("MyAgent Service");
try{var DBus=require("dbus");
var serv=DBus.registerService("session","com.mcpews.myagent");
var sobj=serv.prototype.createObject("/com/mcpews/myagent/control");
var itf=sobj.createInterface("com.mcpews.myagent.i");
itf.prototype.addMethod("line",{in: DBus.Define(String)},function(line,callback){online(line);callback(null);});
itf.update();
}catch(undefined){}
}
if(process.argv.splice(2)=="test"){ //Test mode is made for binary file build test.
	console.log("TEST MODE: true");//TestMode:Quit when myagent loaded successfully.
	test=true;
}
if(process.argv.splice(2)=="port"){
	settings.port=process.argv.splice(3);
	console.log("PORT: %d",settings.port);
}
}catch(n){}

function gv(){
const fss=require("fs");
return JSON.parse(fss.readFileSync(__dirname+"/package.json").toString()).version;
}

const os = require("os");

try {
	console.log("HOST: %s",require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[1]][0].address);
} catch (e) {
}


try {
	var fs = require("fs");
try{
	var settingsstr;
	settingsstr=fs.readFileSync(process.env.HOME+"/.myagentcfg").toString();
	settings=JSON.parse(settingsstr);
}catch(errx){}
console.log("PORT: %d",settings.port);

var readline=require("readline");
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var WSk = require("ws");
var wss = new WSk.Server({
	port: settings.port
});
} catch(err) {
	console.error("[ERROR] Error when loading require packages: %s.", err.message);
	process.exit(1);
}

console.log("");

if(test==true){process.exit(0);}
var allws=[];
var idp=1;

function online(line){
	spl=line.split(" ");
	/*if(spl[0]=="+log"){
		settings.log=true;
		console.log("[SET] log=true");
		return;
	}*/
	if(spl[0]=="-repl"){
		const repl=require("repl");
		rl.close();
		repl.start().on("exit",function(){process.exit(0);});
		return;
	}
	if(spl[0]=="-log"){
		if(spl[1]==undefined){console.log("[SET/ERROR]No args\n-log [true/false]");return;}
		if(spl[1]=="false"){
			settings.log=false;
		}else{
			settings.log=true;
		}
		console.log("[SET] log=%s",settings.log.toString());
		return;
	}
	if(spl[0]=="-kickid"){
		try{findid(parseInt(spl[1])).ws.terminate();}catch(err){console.log("[KickId] Failed.");return;}
		console.log("[KickId] Success.");
		return;
	}
	if(spl[0]=="-listid"){
		console.log("Websocket - live:");
		allws.forEach(function(e,i){
			try{e.ws.send("");console.log(e.id.toString());}catch(tr){}
		});
		console.log("ID Added to:%d",idp);
		return;
	}
	if(spl[0]=="-exit"||spl[0]=="-bye"||spl[0]=="-quit"){
		shutdown();
	}
	if(spl[0]=="-reset"||spl[0]=="-reboot"||spl[0]=="-restart"||spl[0]=="-reload"){
		reset();
	}

	allws.forEach(function(e,i){
		try{e.ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": line,
				"version": 1
			},
			"header": {
				"requestId": "00000000-0001-0000-000000000000",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));}catch(ne){allws.splice(i,1);}
	});
}

rl.on("line",function (line){online(line);});

function shutdown(){
	allws.forEach(function(e,i){
		try{e.ws.terminate();}catch(eee){}
	});
	console.log("\nTerminated all clients.");
	wss.close();
	console.log("Server closed");
	console.log("Bye.");
	process.exit(0);
}
function reset(){
	allws.forEach(function(e,i){
		try{e.ws.terminate();}catch(eee){}
	});
	console.log("Terminated all clients.");
	allws=[];
	console.log("Resetted websocket array");
	idp=1;
	console.log("Resetted ID Pool to 1.");
	console.log("MyAgent Resetted.");
}

function findid(id){
	var bws={
		id:-1,
		ws:-1
	};
	allws.forEach(function(e,i){
		if(e.id==id){
			bws=e;
		}
	});
	if(bws.id==-1){
		throw new Error("Id not found.");
	}
	return bws;
}

rl.on("SIGINT",function(){shutdown();});

wss.on('connection',
function connection(ws,req) {
	var wsi={
		id: idp,
		ws: ws
	};
	idp++;
	allws.push(wsi);
	function gamecmd(cmd) {
		ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": cmd,
				"version": 1
			},
			"header": {
				"requestId": "0ffae098-00ff-ffff-abbbbbdf3f44",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}

	function gamecmds(cmd) {
		ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": cmd,
				"version": 1
			},
			"header": {
				"requestId": "00000000-0001-0000-000000000000",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}
	
	
	

	function serverinf(msg) {

		//console.log("[Server] %s",msg);
		gamecmds("say " + msg);

		//gamecmds("msg @s |\n"+msg);
	}
		
	
	var logtogame=false;
	console.log("[Info] A new client connected,ID: %d,IP: %s",wsi.id,req.connection.remoteAddress);
	
	ws.send(JSON.stringify({
		"body": {
			"eventName": "AgentCreated"
		},
		"header": {
			"requestId": "0ddbe098-00ff-ffff-abbbbbbbbbdd3344",
			"messagePurpose": "subscribe",
			"version": 1,
			"messageType": "commandRequest"
		}
	}));
	ws.send(JSON.stringify({
		"body": {
			"eventName": "AgentCommand"
		},
		"header": {
			"requestId": "0ffae090-00ff-ffff-abbbbbbbbbdd3344",
			"messagePurpose": "subscribe",
			"version": 1,
			"messageType": "commandRequest"
		}
	}));
	ws.send(JSON.stringify({
		"body": {
			"eventName": "PlayerMessage"
		},
		"header": {
			"requestId": "0ffae098-00ff-ffff-abbbbbbbbbdf3344",
			"messagePurpose": "subscribe",
			"version": 1,
			"messageType": "commandRequest"
		}
	}));
	var retac=false;
	serverinf("MyAgent Connected.\nYour ID: "+wsi.id+"\nType */help for get help.\n[MyAgent By LNSSPsd]");
	/*gamecmd("agent create",ws);// /connect 127.0.0.1:19131
	gamecmd("agent till forward",ws);*/

	/*setTimeout(function(){
		if(checked==false){serverinf("Websocket check time out.\nDisconnecting...",ws);}
	},21000);
	setTimeout(function(){
		if(checked==false){ws.terminate();}
	},22000);*/

	var stopfp=false;
	
	ws.on('message',
	function (message) {
		if(message=="")return;
		try{JSON.parse(message)}catch(error){console.log("[ERROR on Client %d] %s",wsi.id,error);return;ws.terminate();}
		if(settings.log==true){
		console.log("[Client ID%d] Received: %s",wsi.id, message);
		}
		if (JSON.parse(message).body.eventName == "PlayerMessage") {
			if (JSON.parse(message).body.properties.MessageType == "me" || JSON.parse(message).body.properties.MessageType == "say") {
				return;
			}
		}

		if (JSON.parse(message).header.messagePurpose == "commandResponse" && JSON.parse(message).header.requestId != "00000000-0001-0000-000000000000" && JSON.parse(message).header.requestId != "00000000-0fe1-0000-000000000000") {
			serverinf("Command Response:\nMessage:" + JSON.parse(message).body.statusMessage);
		}
		
		if(JSON.parse(message).header.messagePurpose == "commandResponse" && JSON.parse(message).header.requestId != "00000000-0fe1-0000-000000000000"){
			
			return;
		}
		
		
		if (JSON.parse(message).body.eventName == "AgentCommand") {
			if(retac==true){serverinf("Received AgentCommand,Result: "+JSON.parse(message).body.properties.Result);}
		}
		if (JSON.parse(message).body.eventName == "PlayerMessage"
		/* && JSON.parse(message).body.properties.MessageType=="chat"*/
		/*&& JSON.parse(message).header.requestId != "00000000-0001-0000-000000000000"*/) {
			if (JSON.parse(message).body.properties.Message.substring(0, 2) == "./") {
				gamecmd(JSON.parse(message).body.properties.Message.split("/")[1]);
			}
			if (JSON.parse(message).body.properties.Message.substring(1, 2) == "/" && JSON.parse(message).body.properties.Message.substring(0, 1) == ":" && JSON.parse(message).body.properties.Message.substring(0, 1) != ".") {
				try {
					/*if(logtogame==false){
					serverinf("Start Do a Loop.");
					}*/
					var sped = JSON.parse(message).body.properties.Message.split("/");
					var spee = sped[1].split("~");
					var qs = parseInt(spee[1]);
					if(settings.looplimit!=-1){
						if(qs>settings.looplimit){
							serverinf("Loop hit limit.Aborted!")
							throw new Error("Loop hit limit.");
						}
					}
					var ed = 1;
					while (true) {
						if (qs < ed) {
							break;
						}
						if(logtogame==false){
							setTimeout(function() {gamecmds("agent "+spee[0]);},settings.loopinterval * ed);
							ed++;
							continue;
						}
						setTimeout(function() {gamecmd("agent "+spee[0]);},settings.loopinterval * ed);
						setTimeout(function() {
 						gamecmd("agent "+sped[1]);
 					},
 					500 * ed);
						ed++;
					}
				} catch(ew) {
					serverinf("Error when doing loop");
					return;
				}
				return;
			}
			
			if (JSON.parse(message).body.properties.Message.substring(1, 2) == "/" && JSON.parse(message).body.properties.Message.substring(0, 1) == "!" && JSON.parse(message).body.properties.Message.substring(0, 1) != ".") {
				try {
					var sped = JSON.parse(message).body.properties.Message.split("/");
					var spee = sped[1].split("~");
					var qs = parseInt(spee[1]);
					if(settings.looplimit!=-1){
						if(qs>settings.looplimit){
							serverinf("Loops hit limit.Abort!");
							throw new Error("Loop hit limit");
						}
					}
					var ed = 1;
					while (true) {
						if (qs < ed) {
							break;
						}
						if(logtogame==false){
							setTimeout(function() {gamecmds(spee[0]);},settings.loopinterval * ed);
							ed++;
							continue;
						}
						setTimeout(function() {gamecmd(spee[0]);},settings.loopinterval * ed);
						ed++;
					}
				} catch(ew) {
					serverinf("Error when doing loop");
					return;
				}
				return;
			}
			
			//var stopfp=false;
			
			if (JSON.parse(message).body.properties.Message.substring(0, 2) == "*/") {
				if (JSON.parse(message).body.properties.Message == "*/bye") {
					serverinf("Disconnecting..\nGoodBye!");
					setTimeout(function(){ws.terminate();},1000);
					return;
				}

				try{
					var spl=JSON.parse(message).body.properties.Message.split(" ");
					if(spl[0]=="*/cmdfile"){
						try{
							var file=JSON.parse(fs.readFileSync(spl[1]).toString());
							var d=0;
							if(file.type!="cmdfile"){serverinf("Not a cmdfile.");throw new Error("Invalid file");}
							var intv=500;
							if(file.commands_interval!=undefined){
								intv=file.commands_interval;
							}
							if(file.name!=undefined && file.author!=undefined){
								d=1;
								serverinf("Start execute cmdfile: "+file.name+"\nAuthor: "+file.author);
							}
							file.commands.forEach(function(e,i){
								setTimeout(function(){gamecmds(e);},intv*d);
								d++;
							});
							return;
						}catch(err){
							serverinf("Failed to run cmdfile,Error message: "+err.message);
							return;
						}
					}
				}catch(tr){}
				
				switch (JSON.parse(message).body.properties.Message) {
				case "*/help":
					serverinf("§\"MyAgent by LNSSPsd\n*/create: Create Agent.\n\
*/move <direction>:move to selected direction.\n\
(Direction: forward|back|up|down|left|right)\n\
(turnDirection: left|right)\n\
(quantity: 0-255)\n\
*/turn <turnDirection>:turn left or right.\n\
*/attack <direction>:attack target in <direction>.\n\
*/destroy <direction>:destroy block in <direction>.\n\
*/drop <slot:int> <quantity:int> <direction>:drop item in <slot:quantity> to <direction>.\n§\"");
					serverinf("§\"*/dropall <direction>:drop all item from agent's bag to <direction>.\n\
*/inspect <direction>:inspect what block in front.\n\
*/inspectdata <direction>:inspect block data in front.\n\
*/detect <direction>:Unknown because Result is 'false'?\n\
*/detectredstone <direction>:Detect redstone activated in <direction>?\n§\"");
					serverinf("§\"*/transfer <srcSlotNum:int> <quantity:int> <dstSlotNum:int>:transfer <quntity> <src> to <dst>\n\
*/tp:tp agent to player.\n\
*/collect <item:string>:collect <item>.\n\
*/till <direction>:till for <direction>.\n\
*/place <slotNum:int> <direction>:Put <slotNum>'s block to <direction>.\n\
*/getitemcount|getitemspace|getitemdetail <slotNum:item>§\"");
					serverinf("§\"*/bye:Disconnect Websocket.\n\
*/wlg <true|false>:Set log when doing a loop.\n\
*/retac <true|false>:Set AgentCommand Result Report to game.\n\
*/fenchant:Fast enchant your items to top level.\n\
*/setitem <slot> <item> <count> <data>:set item to agent.\n\
*/getposition:Get position of agent.\n\
*/tp [x y z]:tp to position\n\
*/collect all:collect all drops\n\
*/cmdfile <file>: Execute all commands in <file>.§\"");

					break;
					case "*/retac true":
						retac=true;
						serverinf("retac=true;");
						break;
					case "*/retac false":
						retac=false;
						serverinf("retac=false;");
						break;
				case "*/wlg true":
						logtogame=true;
						serverinf("logtogame=true;");
						break;
					break;
					case "*/wlg false":
						logtogame=false;
						serverinf("logtogame=false;");
						break;
					case "*/fenchant":
						for(var i=0;i<33;i++){
							if(i==10||i==11||i==16||i==30){continue;}
							function enc(level){gamecmds("enchant @s "+i+" "+level);}
							switch(i){
								case 0:
									enc(4);break;
								case 1:
									enc(4);break;
								case 2:
									enc(4);break;
								case 3:
									enc(4);break;
								case 4:
									enc(4);break;
								case 5:
									enc(3);break;
								case 6:
									enc(3);break;
								case 7:
									enc(3);break;
								case 8:
									enc(1);break;
								case 9:
									enc(5);break;
								case 10:
									enc(5);break;
								case 11:
									enc(5);break;
								case 12:
									enc(2);break;
								case 13:
									enc(2);break;
								case 14:
									enc(3);break;
								case 15:
									enc(5);break;
								case 16:
									enc(1);break;
								case 17:
									enc(3);break;
								case 18:
									enc(3);break;
								case 19:
									enc(5);break;
								case 20:
									enc(2);break;
								case 21:
									enc(1);break;
								case 22:
									enc(1);break;
								case 23:
									enc(3);break;
								case 24:
									enc(3);break;
								case 25:
									enc(2);break;
								case 26:
									enc(1);break;
								case 27:
									enc(1);break;
								case 28:
									enc(1);break;
								case 29:
									enc(5);break;
								case 30:
									enc(3);break;
								case 31:
									enc(3);break;
								case 33:
									enc(1);break;
								case 34:
									enc(1);break;
								case 35:
									enc(1);break;
								case 32:
								default:
									enc(1);break;
							}
						}
						serverinf("FastEnchant: Enchant is OK!");
						break;
				default:
					gamecmd("agent " + JSON.parse(message).body.properties.Message.split("/")[1]);
					//serverinf("Unknown command.",ws);
				}
			}
			console.log("ID%d:<%s> %s",wsi.id, JSON.parse(message).body.properties.Sender, JSON.parse(message).body.properties.Message);
		}
	});
});
