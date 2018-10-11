#!/usr/bin/env node

const fs=require("fs");
var settings={
	looplimit: -1,
	port: 19131,
	log: true
};

try{
	settings=JSON.parse(fs.readFileSync(process.env.HOME+"/.myagentcfg").toString());
}catch(nn){}

if(process.argv.length==2){
	console.log("MyAgent Control\nmyagentctl set <settings> <set>\nmyagentctl rmconf\n%s",JSON.stringify(settings));
	process.exit(0);
}

if(process.argv[2]=="set" && process.argv.length==5){
	try{
	eval("settings."+process.argv[3]+"="+process.argv[4]+";");
		fs.writeFileSync(process.env.HOME+"/.myagentcfg",JSON.stringify(settings));
	}catch(h){console.log("Failed to set.");process.exit(0);}
	console.log("Done");
	process.exit(0);
}

if(process.argv[2]=="rmconf"){
	fs.unlinkSync(process.env.HOME+"/.myagentcfg");
	process.exit(0);
}
console.log("error");
