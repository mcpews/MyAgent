let ws,callbacks,Methods;

class CommandProcessor{
	constructor(ws1,callbacks1,Methods1){
		ws=ws1;
		callbacks=callbacks1;
		Methods=Methods1;
	}

	executeCommand(command,callback){
		let iiid=Methods.genUUID();
		ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": command,
				"version": 1
			},
			"header": {
				"requestId": iiid,//"0ffae098-00ff-ffff-abbbbbdf3f44",
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
		}));
		if(callback!=undefined){
		let empty=callbacks.findEmpty(callbacks);
		if(empty!=null){
			callbacks.callbackz.splice(empty+1,1,[iiid,callback]);
		}else{
			callbacks.callbackz.push([iiid,callback]);
		}}
	}

	executeNCommand(cmd){
		ws.send(JSON.stringify({
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
		ws.send(JSON.stringify({
			"body": {
				"eventName": ev
			},
			"header": {
				"requestId": Methods.genUUID(),
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