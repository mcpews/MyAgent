class CommandProcessor{
	constructor(ws,callbacks,Methods){
		this.ws=ws;
		this.callbacks=callbacks;
		this.Methods=Methods;
	}

	executeCommand(command,callback){
		let iiid=this.Methods.genUUID();
		this.ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": command,
				"version": 1
			},
			"header": {
				"requestId": iiid,
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
		if(callback!=undefined){
		let empty=this.callbacks.findEmpty();
		if(empty!=null){
			this.callbacks.callbackz.splice(empty+1,1,[iiid,callback]);
		}else{
			this.callbacks.callbackz.push([iiid,callback]);
		}}
	}

	executeAgentCommandSync(command){
		return new Promise((done)=>{
		let iiid=this.Methods.genUUID();
		this.ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": command,
				"version": 1
			},
			"header": {
				"requestId": iiid,
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
		let empty=this.callbacks.findEmpty();
		if(empty!=null){
			this.callbacks.callbackz.splice(empty+1,1,[iiid,done,"agent"]);
		}else{
			this.callbacks.callbackz.push([iiid,done,"agent"]);
		}
		});
	}

	executeCommandSync(command){
		return new Promise((callout)=>{this.executeCommand(command,callout);});
	}

	executeNCommand(cmd){
		this.ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": cmd,
				"version": 1
			},
			"header": {
				"requestId": "00000000-0001-1000-ffff-000000000000",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}

	sendText(msg){
		this.executeNCommand("say " + msg);
	}

	subscribe(ev){
		this.ws.send(JSON.stringify({
			"body": {
				"eventName": ev
			},
			"header": {
				"requestId": this.Methods.genUUID(),
				"messagePurpose": "subscribe",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
	}

	subarray(evarray){
		for(let i of evarray){
			this.subscribe(i);
		}
	}
}

module.exports=CommandProcessor;