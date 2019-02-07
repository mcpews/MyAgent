class ID{
	constructor(){
		this.IDPool=1;
		this.IDWS=[];
	}

	findid(id){
		let bws={
			id:-1,
			ws:-1
		};
		this.IDWS.forEach(function(e,i){
			if(e.id==id){
				bws=e;
			}
		});
		if(bws.id==-1){
			throw new Error("Id not found.");
		}
		return bws;
	}

	getid(ws){
		let wsi={
			id: this.IDPool,
			ws: ws
		};
		this.IDPool++;
		this.IDWS.push(wsi);
		return wsi;
	}

	killme(){
		this.IDWS.forEach(function(e,i){
			try{e.ws.terminate();}catch(eee){}
		});
	}

	reset(){
		this.IDWS.forEach(function(e,i){
			try{e.ws.terminate();}catch(eee){}
		});
		console.log("Terminated all clients.");
		this.IDWS=[];
		console.log("Resetted websocket array");
		this.IDPool=1;
		console.log("Resetted ID Pool to 1.");
		console.log("MyAgent Resetted.");
	}

	get allws(){
		return this.IDWS;
	}

	get IDP(){
		return this.IDPool;
	}
}
module.exports=ID;