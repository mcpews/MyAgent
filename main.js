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
const fs=require("fs");

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

	parseBOOL(i){
		if(i=="true")return true;
		if(i=="false")return false;
		if(i=="0")return true;
		if(i=="1")return false;
		return false;
	}

	constructor(){
		this.version="Unknown";
		this.test=false;
		this.lastagentresp=null;


		if(settings.errtrace){
			let ErrorTracer=require("./modules/errortrace.js");
			new ErrorTracer();
		}

		this.printInfo();

		try {
			console.log("HOST: %s",Methods.getHost());
		} catch (e) {
		}

		console.log("");

		if(this.test==true){process.exit(0);}
	}

	asleep(time){
		return new Promise((ok)=>{
			setTimeout(ok,time);
		});
	}

	async onMessage(message,wsi,callbacks,cmdproc){
		if(message=="")return;
		let packet;
		try{
			packet=JSON.parse(message);
		}catch(error){
			console.log("[Error] Parse packet of client %d:%s",wsi.id,error);
			try{cmdproc.sendText("Bad Packet!");wsi.ws.send("Bad packet!\nYou are trying to fuck our server??");cmdproc.executeNCommand("closewebsocket");ws.terminate();}catch(undefined){try{ws.terminate();}catch(undefined){}}
		}
		if(settings.log==true){
			console.log("[Trace] [Client ID%d] Received: %s",wsi.id, message);
		}
		if(packet.header.messagePurpose=="commandResponse"){
			if(callbacks.isAgentCB(packet.header.requestId)&&packet.body.statusCode==0){
				if(this.lastagentresp!=null){
					callbacks.doCallback(packet.header.requestId,[packet,this.lastagentresp]);
					this.lastagentresp=null;
				}else{
					let counter=0;
					let iv=setInterval(()=>{
						if(counter>=8){clearInterval(iv);callbacks.doCallback(packet.header.requestId,packet);}
						if(this.lastagentresp!=null){
							callbacks.doCallback(packet.header.requestId,[packet,this.lastagentresp]);
							this.lastagentresp=null;
							clearInterval(iv);
						}
						counter++;
					},100);
				}
			}else{
				callbacks.doCallback(packet.header.requestId,packet);
			}
			return;
		}
		if (packet.body.eventName == "PlayerMessage"&&(packet.body.properties.MessageType == "me" || packet.body.properties.MessageType == "say")) {
			return;
		}
		if(packet.body==''||packet.body==undefined||packet.header==undefined){console.log("[Error] Client %d: Packet without body or header!!",wsi.id);try{wsi.ws.terminate();}catch(undefined){}return;}

		if(packet.body.eventName != undefined && packet.body.properties==undefined){console.log("[ERROR on Client %d] Packet without properties!",wsi.id);try{ws.terminate();}catch(undefined){}return;}
		if (packet.body.eventName == "AgentCommand") {
			this.lastagentresp=packet;
			setTimeout(()=>{
				if(this.lastagentresp==packet)this.lastagentresp=null;
			},800);
			return;
			//if(settings.agentcommand_ret==true){cmdproc.sendText("Received AgentCommand:"+JSON.stringify(packet));}
		}
		if (packet.body.eventName == "PlayerMessage") {
			if (packet.body.properties.Message.substring(0, 2) == "./") {
				let resp=await cmdproc.executeCommandSync(packet.body.properties.Message.split("/")[1]);
				if(resp.body.statusCode==0){
					cmdproc.sendText("Command executed successfully,response message:\n"+resp.body.statusMessage);
				}else{
					cmdproc.sendText("Command executed fail,response message:\n"+resp.body.statusMessage);
				}
				return;
			}else if (packet.body.properties.Message.substring(0, 2) == ":/") {
				try {
					/*if(logtogame==false){
					cmdproc.sendText("Start Do a Loop.");
					}*/
					let sped = packet.body.properties.Message.split("/");
					let spr=sped;
					spr.splice(0,1);
					spr.join("/");
					let spee = spr.split("~");
					let qs = parseInt(spee[1]);
					if(settings.looplimit!=-1){
						if(qs>settings.looplimit){
							cmdproc.sendText("Loop hit limit.Aborted!")
							throw new Error("Loop hit limit.");
						}
					}
					for(let ed=1;qs>=ed;ed++) {
						cmdproc.executeNCommand("agent "+spee[0]);
						await this.asleep(settings.loopinterval);
					}
					cmdproc.sendText("Loop: Done");
				} catch(ew) {
					cmdproc.sendText("Error when doing loop");
					return;
				}
				return;
			}else if(packet.body.properties.Message.substring(0, 2) == "!/") {
				try {
					let sped = packet.body.properties.Message.split("/");
					let spr=sped;
					spr.splice(0,1);
					spr=spr.join("/");
					let spee = spr.split("~");
					var qs = parseInt(spee[1]);
					if(settings.looplimit!=-1){
						if(qs>settings.looplimit){
							cmdproc.sendText("Loops hit limit.Abort!");
							throw new Error("Loop hit limit");
						}
					}
					for(let ed=1;qs>=ed;ed++) {
						cmdproc.executeNCommand(spee[0]);
						await this.asleep(settings.loopinterval);
					}
					cmdproc.sendText("Loop: Done");
				} catch(ew) {
					cmdproc.sendText("Error when doing loop: "+ew);
					return;
				}
				return;
			}else if (packet.body.properties.Message.substring(0, 2) == "*/") {
				let sentmsg=packet.body.properties.Message;
				if (sentmsg == "*/bye") {
					cmdproc.sendText("Disconnecting..\nGoodBye!");
					await this.asleep(800);
					wsi.ws.terminate();
					return;
				}
				let cmd=sentmsg.split(" ");
				switch (cmd[0]) {
					case "*/cmdfile":
						try{
							let fn=cmd;fn.splice(0,1);fn=fn.join(" ");
							let file=JSON.parse(fs.readFileSync(fn).toString());
							CmdFileProcessor.run(file,cmdproc);
						}catch(err){
							cmdproc.sendText("Failed to run cmdfile,Error message: "+err.message);
							return;
						}
					case "*/help":
						try{
							Helps.showHelp(cmdproc,cmd[1]);
						}catch(t){cmdproc.sendText(t);}
						return;
					case "*/retac":
						settings.agentcommand_ret=this.parseBOOL(cmd[1]);
						cmdproc.sendText("retac="+this.parseBOOL(cmd[1])+";");
						break;
					case "*/wlg":
						settings.logtogame=this.parseBOOL(cmd[1]);
						cmdproc.sendText("logtogame="+this.parseBOOL(cmd[1])+";");
						break;
					case "*/fenchant":
						await FastEnchanter.enchant(cmdproc);
						cmdproc.sendText("FastEnchant: Enchant is OK!");
						break;
					default:
						let resp=await cmdproc.executeAgentCommandSync("agent " + sentmsg.split("/")[1]);
						if(resp[1]===undefined)resp[1]={body:{properties:{}}};
						if(resp[0]===undefined)resp[0]=resp;
						cmdproc.sendText("Command Result:\n"+resp[0].body.statusMessage+"\n\nAgent Command Result:\n"+resp[1].body.properties.Result);
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

		setTimeout(()=>{cmdproc.subarray(["AgentCreated","AgentCommand","PlayerMessage"]);},1000);

		setTimeout(()=>{cmdproc.sendText("MyAgent Connected.\nYour ID: "+wsi.id+"\nType */help to get help.\n[MyAgent v4 by LNSSPsd]");},1000);

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
