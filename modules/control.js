#!/usr/bin/env node

const fs=require("fs");
const settingz=new (require("./settings"))();
const settings=settingz.settings;

class Control{

	Help(){
		console.log("MyAgent Control\nmyagent control set <config> <value>\nmyagent control rmconf\n\n%s",JSON.stringify(settings));
	}

	constructor(){
		console.log("MyAgent Control Module Loaded.");
		if(process.argv.length==3){
			this.Help();
			return;
		}

		if(process.argv[3]=="set" && process.argv.length==6){
			try{
				eval("settings."+process.argv[4]+"="+process.argv[5]+";");
				fs.writeFileSync(process.env.HOME+"/.myagentcfg",JSON.stringify(settings));
			}catch(h){console.log("Failed to set.");process.exit(0);}
			console.log("Done");
			return;
		}

		if(process.argv[3]=="rmconf"){
			try{fs.unlinkSync(process.env.HOME+"/.myagentcfg");}catch(thr){}
			return;
		}
		throw new Error("No such method: "+process.argv[3]);
	}
}


module.exports=Control;
