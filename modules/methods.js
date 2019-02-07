class Methods{
	static genUUID(){
		var ac = "0123456789abcdef";
	　　var id="";
	　　function flen(len){for (let i = 0; i < len; i++) {
		　　　　id += ac.charAt(Math.floor(Math.random() * ac.length));
		　　}}
	flen(8);id+="-";flen(4);id+="-";flen(4);id+="-";flen(4);id+="-";flen(12);
	　　return id;
	}

	static getVersion(){
		const fs=require("fs");
		return JSON.parse(fs.readFileSync(__dirname+"/../package.json").toString()).version;
	}

	static getHost(){
		return require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[1]][0].address;
	}
}

module.exports=Methods;