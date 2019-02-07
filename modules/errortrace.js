class ErrorTracer{
	constructor(){
		process.on("uncaughtException",function trace(error){
	console.error("[ERROR] uncaughtException: %s.",error);
	const err={name:"MyAgent Error Tracing",message:error};
	Error.stackTraceLimit=30;
	Error.captureStackTrace(err,trace);
	console.error(err.stack);
	const dt=new Date();
	const fs=require("fs");fs.writeFileSync(process.env.HOME+"/myagent-crash-tracing-"+dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate()+"-"+dt.getHours()+"-"+dt.getMinutes()+"-"+dt.getSeconds()+"-"+dt.getMilliseconds()+".log",
"====MyAgent Crash Tracing====\nAt:"+Date()+"\nVersion:"+version+"\n"+err.stack+"\n====End Tracing====");
	process.exit(3);
});
}}

module.exports=ErrorTracer;