#!/usr/bin/env node

const fs=require("fs");
var settings={
	looplimit: -1,
	port: 19131,
	log: true
};

try{
	if(os.platform()=="win32"){
		settings=JSON.parse(fs.readFileSync(process.env.home+"\\.myagentcfg").toString());
	}else{
		settings=JSON.parse(fs.readFileSync(process.env.home+"/.myagentcfg").toString());
	}
}catch(nn){}

if(process.argv.length==2){
	console.log("MyAgent Control\nmyagentctl set <settings> <set>\nmyagentctl rmconf\n%s",JSON.stringify(settings));
}

if(process.argv[1]=="set" && process.argv.length==5){
	try{
	eval("settings."+process.argv[3]+"="+process.argv[4]+";");
	}catch(h){console.log("Failed to set.");}
	console.log("Done");
}

if(process.argv[2]=="rmconf"){
	fs.unlinkSync(process.env.home+"/.myagentcfg");
	process.exit(0);
}
console.log("error");
