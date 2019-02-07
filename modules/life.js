class Life{
	constructor(id,ws){
		this.id=id;
		this.ws=ws;
	}

	shutdown(){
		this.id.killme();
		console.log("\nTerminated all clients.");
		this.ws.close();
		console.log("Server closed");
		console.log("Bye.");
		process.exit(0);
	}

	reset(){
		this.id.reset();
	}
}
module.exports=Life;