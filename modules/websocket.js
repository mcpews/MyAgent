const Websocket=require("ws");

class WS extends Websocket.Server{
	constructor(settings,connection){
		super({port:settings.port});
		this.on("connection",connection);
	}

	get wss(){
		return this;
	}
}

module.exports=WS;