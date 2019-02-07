class CmdFileProcessor{
	run(content,cmdproc){
		let d=0;
		if(content.type!="cmdfile"){throw new Error("Invalid file type.");}
		let intv=500;
		if(file.commands_interval!=undefined){
			intv=file.commands_interval;
		}
		if(content.name!=undefined && content.author!=undefined){
			d=1;
			cmdproc.sendText("Start execute cmdfile: "+content.name+"\nAuthor: "+content.author);
		}
		for(let e of content.commands){
			setTimeout(function(){cmdproc.executeNCommand(e);},intv*d);
			d++;
		}
		return;
	}
}
module.exports=CmdFileProcessor;