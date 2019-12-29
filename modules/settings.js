let oset={
	looplimit: -1,//-1: no limit
	port: 19131,
	log: true,
	errtrace: false,
	loopinterval: 500,
	agentcommand_ret: false,
	logtogame: false,
	respacket: false,
	fromfile: false
};

class Settings{
	constructor(){
		try{
			var settingsstr=fs.readFileSync(process.env.HOME+"/.myagentcfg").toString();
			oset=JSON.parse(settingsstr);
			oset.fromfile=true;
		}catch(th){}
	}

	get settings(){
		return oset;
	}

	set settings(ts){
		for(let i in ts){
			if(oset[i]==undefined)throw new Error("Undefined setting:"+i+".");
			oset[i]=ts[i];
		}
	}

	registerSetting(setting){
		oset[setting]=null;
	}
}

module.exports=Settings;
