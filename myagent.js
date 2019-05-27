#!/usr/bin/env node

const Methods=require("./modules/methods");
const settingz=new (require("./modules/settings"))();
const settings=settingz.settings;
const ID=new (require("./modules/id"))();
const Callbacks=require("./modules/callbacks");
const CommandProcessor=require("./modules/cmdproc");
const CmdFileProcessor=new (require("./modules/cmdfileproc"))();
const FastEnchanter=new (require("./modules/fastenchant"))();
const WSS=new (require("./modules/websocket"))(settings,onConnection);
const Life=new (require("./modules/life"))(ID,WSS.wss);
const readlineprocessor=new (require("./modules/readlineproc"))(ID,settings,Life);
const Control=require("./modules/control");
const Helps=require("./modules/helps");

class MyAgent{

printInfo(){
	console.log("=MyAgent=");
	console.log("Author: LNSSPsd");
	try{console.log("Version: %s",this.version=Methods.getVersion());}catch(to){}
	console.log("Maintainers(github username): LNSSPsd,TheXuJiaXin,Torrekie,CAIMEOX");
	console.log("https://github.com/mcpews/MyAgent");
	console.log("https://npmjs.com/myagent");
	console.log("PORT: %d",settings.port);
}

constructor(){
this.version="Unknown";
this.test=false;


if(settings.errtrace){
	let ErrorTracer=require("./modules/errortrace.js");
	new ErrorTracer();
}

this.printInfo();

if(process.argv[2]=="test"){ //Test mode is made for binary file build test.
	console.log("TEST MODE: true");//TestMode:Quit when myagent loaded successfully.
	this.test=true;
}else if(process.argv[2]=="control"){
	new Control();
	process.exit(0);
}

try {
	console.log("HOST: %s",Methods.getHost());
} catch (e) {
}

console.log("");

if(this.test==true){process.exit(0);}
}

onMessage(message,wsi,callbacks,cmdproc){
	if(message=="")return;
	let packet;
		try{packet=JSON.parse(message);}catch(error){console.log("[ERROR on Client %d] %s",wsi.id,error);try{cmdproc.sendText("Bad Packet!");ws.send("Bad packet!\nYou are trying to fuck our server??");cmdproc.executeNCommand("closewebsocket");ws.terminate();}catch(undefined){try{ws.terminate();}catch(undefined){}}}
		if(packet.header.messagePurpose=="commandResponse"){
	    callbacks.doCallback(packet.header.requestId,packet);
		//return;
	    }
if (packet.body.eventName == "PlayerMessage") {
			if (packet.body.properties.MessageType == "me" || packet.body.properties.MessageType == "say") {
				return;
			}
		}
		if(settings.log==true&& packet.header.requestId != "00000000-0001-0000-000000000000"){
		console.log("[Client ID%d] Received: %s",wsi.id, message);
		}
		if(packet.body==''||packet.body==undefined||packet.header==undefined){console.log("[ERROR on Client %d] Packet without body or header!!",wsi.id);try{ws.terminate();}catch(undefined){}return;}

		if (packet.header.messagePurpose == "commandResponse" && packet.header.requestId != "00000000-0001-1000-ffff-000000000000") {
			settings.respacket?cmdproc.sendText("Command Response:" + JSON.stringify(packet)) : cmdproc.sendText("Command Response Message:\n" + packet.body.statusMessage);
		}
		
		if(packet.header.messagePurpose == "commandResponse"){
			
			return;
		}
		
		if(packet.body.eventName != undefined && packet.body.properties==undefined){console.log("[ERROR on Client %d] Packet without properties!",wsi.id);try{ws.terminate();}catch(undefined){}return;}
		if (packet.body.eventName == "AgentCommand") {
			if(settings.agentcommand_ret==true){cmdproc.sendText("Received AgentCommand:"+JSON.stringify(packet));}
		}
		if (packet.body.eventName == "PlayerMessage"
		/* && packet.body.properties.MessageType=="chat"*/
		&& packet.header.requestId != "00000000-0001-1000-ffff-000000000000") {
			if (packet.body.properties.Message.substring(0, 2) == "./") {
				cmdproc.executeCommand(packet.body.properties.Message.split("/")[1]);
			}
			if (packet.body.properties.Message.substring(1, 2) == "/" && packet.body.properties.Message.substring(0, 1) == ":" && packet.body.properties.Message.substring(0, 1) != ".") {
				try {
					/*if(logtogame==false){
					cmdproc.sendText("Start Do a Loop.");
					}*/
					var sped = packet.body.properties.Message.split("/");
					var spee = sped[1].split("~");
					var qs = parseInt(spee[1]);
					if(settings.looplimit!=-1){
						if(qs>settings.looplimit){
							cmdproc.sendText("Loop hit limit.Aborted!")
							throw new Error("Loop hit limit.");
						}
					}
					var ed = 1;
					while (true) {
						if (qs < ed) {
							break;
						}
						if(settings.logtogame==false){
							setTimeout(function() {cmdproc.executeNCommand("agent "+spee[0]);},settings.loopinterval * ed);
							ed++;
							continue;
						}
						setTimeout(function() {cmdproc.executeCommand("agent "+spee[0]);},settings.loopinterval * ed);
						setTimeout(function() {
 						cmdproc.executeCommand("agent "+sped[1]);
 					},
 					500 * ed);
						ed++;
					}
				} catch(ew) {
					cmdproc.sendText("Error when doing loop");
					return;
				}
				return;
			}
			
			if (packet.body.properties.Message.substring(1, 2) == "/" && packet.body.properties.Message.substring(0, 1) == "!" && packet.body.properties.Message.substring(0, 1) != ".") {
				try {
					var sped = packet.body.properties.Message.split("/");
					var spee = sped[1].split("~");
					var qs = parseInt(spee[1]);
					if(settings.looplimit!=-1){
						if(qs>settings.looplimit){
							cmdproc.sendText("Loops hit limit.Abort!");
							throw new Error("Loop hit limit");
						}
					}
					var ed = 1;
					while (true) {
						if (qs < ed) {
							break;
						}
						if(settings.logtogame==false){
							setTimeout(function() {cmdproc.executeNCommand(spee[0]);},settings.loopinterval * ed);
							ed++;
							continue;
						}
						setTimeout(function() {cmdproc.executeCommand(spee[0]);},settings.loopinterval * ed);
						ed++;
					}
				} catch(ew) {
					cmdproc.sendText("Error when doing loop");
					return;
				}
				return;
			}
			
			if (packet.body.properties.Message.substring(0, 2) == "*/") {
				if (packet.body.properties.Message == "*/bye") {
					cmdproc.sendText("Disconnecting..\nGoodBye!");
					setTimeout(function(){wsi.ws.terminate();},1000);
					return;
				}

				try{
					let spl=packet.body.properties.Message.split(" ");
					if(spl[0]=="*/cmdfile"){
						try{
							let file=JSON.parse(fs.readFileSync(spl[1]).toString());
							CmdFileProcessor.run(file,cmdproc);
						}catch(err){
							cmdproc.sendText("Failed to run cmdfile,Error message: "+err.message);
							return;
						}
					}else if(spl[0]=="*/help"){
						try{
						Helps.showHelp(cmdproc,spl[1]);
						}catch(t){cmdproc.sendText(t);}
						return;
					}
				}catch(tr){}
				
				switch (packet.body.properties.Message) {
					case "*/retac true":
						settings.agentcommand_ret=true;
						cmdproc.sendText("retac=true;");
						break;
					case "*/retac false":
						settings.agentcommand_ret=false;
						cmdproc.sendText("retac=false;");
						break;
				case "*/wlg true":
						settings.logtogame=true;
						cmdproc.sendText("logtogame=true;");
						break;
					break;
					case "*/wlg false":
						settings.logtogame=false;
						cmdproc.sendText("logtogame=false;");
						break;
					case "*/fenchant":
						FastEnchanter.enchant(cmdproc);
						cmdproc.sendText("FastEnchant: Enchant is OK!");
						break;
				default:
					cmdproc.executeCommand("agent " + packet.body.properties.Message.split("/")[1]);
					//cmdproc.sendText("Unknown command.",ws);
				}
			}
			console.log("ID%d:<%s> %s",wsi.id, packet.body.properties.Sender, packet.body.properties.Message);
		}
}

onConnection(ws,req) {
	let wsi=ID.getid(ws);

	const callbacks=new Callbacks();
	const cmdproc=new CommandProcessor(ws,callbacks,Methods);
	console.log("[Info] A new client connected,ID: %d,IP: %s",wsi.id,req.connection.remoteAddress);
	
	cmdproc.subarray(["AgentCreated","AgentCommand","PlayerMessage"]);

	cmdproc.sendText("MyAgent Connected.\nYour ID: "+wsi.id+"\nType */help for get help.\n[MyAgent By LNSSPsd]");
	
	ws.on('message',
	(message)=>{
		this.onMessage(message,wsi,callbacks,cmdproc);
	});
}

}

const myagent=new MyAgent();

function onConnection(ws,req){
	myagent.onConnection(ws,req);
}