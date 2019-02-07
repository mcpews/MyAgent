class Callbacks{
	constructor(){
		this.callbacks=[];
	}

	doCallback(rid,packet){
		let callback=this.findCallback(rid);
	    	if(callback!=null){
			if(this.callbacks[callback[1]][1]==false){
			this.callbacks[callback[1]][0]=packet;
			this.callbacks[callback[1]][1]=true;
			}else{
		    callback[0](packet);
		    this.callbacks[callback[1]]="died";}
		}
	}

	findCallback(uid){
		let calb=null;
		this.callbacks.forEach((e,i)=>{
			if(e=="died")return;
			if(uid==e[0]){calb=[e[1],i]}
		});
		return calb;
	}

	findEmpty(array){
		let emp=null;
		array.forEach(function(e,i){
			if(emp!=null)return;
			if(e=="died"){
				emp=i;
			}});
		return emp;
	}

	get callbackz(){
		return this.callbacks;
	}
}

module.exports=Callbacks