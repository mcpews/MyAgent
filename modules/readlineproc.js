const readline=require("readline");

let ID,settings,Life;

class ReadLineProcessor{
	constructor(IDv,settingss,Lifee){
		ID=IDv;
		settings=settingss;
		Life=Lifee;
		this.iface=readline.createInterface({input:process.stdin,output:process.stdout});
		this.iface.on("line",this.online);
		this.iface.on("SIGINT",function(){Life.shutdown();});
	}

	online(line){
		let spl=line.split(" ");
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
			try{ID.findid(parseInt(spl[1])).ws.terminate();}catch(err){console.log("[KickId] Failed.");return;}
			console.log("[KickId] Success.");
			return;
		}
		if(spl[0]=="-listid"){
			console.log("Websocket - live:");
			ID.allws.forEach(function(e,i){
				try{e.ws.send("");console.log(e.id.toString());}catch(tr){}
			});
			console.log("ID Added to:%d",ID.IDP);
			return;
		}
		if(spl[0]=="-exit"||spl[0]=="-bye"||spl[0]=="-quit"){
			Life.shutdown();
		}
		if(spl[0]=="-reset"||spl[0]=="-reboot"||spl[0]=="-restart"||spl[0]=="-reload"){
			Life.reset();
		}

		ID.allws.forEach(function(e,i){
			try{e.ws.send(JSON.stringify({
				"body": {
					"origin": {
						"type": "player"
					},
					"commandLine": line,
					"version": 1
				},
				"header": {
					"requestId": "00000000-0001-1000-ffff-000000000000",
					"messagePurpose": "commandRequest",
					"version": 1,
					"messageType": "commandRequest"
				}
			}));}catch(ne){ID.allws.splice(i,1);}
		});
	}}
module.exports=ReadLineProcessor;
