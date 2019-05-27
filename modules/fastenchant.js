let cmdprocs;

class FastEnchanter{
	async enc(level,i){
		await cmdprocs.executeCommandSync("enchant @s "+i+" "+level);
	}

	async enchant(cmdproc){
		cmdprocs=cmdproc;
		for(let i=0;i<33;i++){
			if(i==10||i==11||i==16||i==30){continue;}
			switch(i){
				case 0:
					await this.enc(4,i);break;
				case 1:
					await this.enc(4,i);break;
				case 2:
					await this.enc(4,i);break;
				case 3:
					await this.enc(4,i);break;
				case 4:
					await this.enc(4,i);break;
				case 5:
					await this.enc(3,i);break;
				case 6:
					await this.enc(3,i);break;
				case 7:
					await this.enc(3,i);break;
				case 8:
					await this.enc(1,i);break;
				case 9:
					await this.enc(5,i);break;
				case 10:
					await this.enc(5,i);break;
				case 11:
					await this.enc(5,i);break;
				case 12:
					await this.enc(2,i);break;
				case 13:
					await this.enc(2,i);break;
				case 14:
					await this.enc(3,i);break;
				case 15:
					await this.enc(5,i);break;
				case 16:
					await this.enc(1,i);break;
				case 17:
					await this.enc(3,i);break;
				case 18:
					await this.enc(3,i);break;
				case 19:
					await this.enc(5,i);break;
				case 20:
					await this.enc(2,i);break;
				case 21:
					await this.enc(1,i);break;
				case 22:
					await this.enc(1,i);break;
				case 23:
					await this.enc(3,i);break;
				case 24:
					await this.enc(3,i);break;
				case 25:
					await this.enc(2,i);break;
				case 26:
					await this.enc(1,i);break;
				case 27:
					await this.enc(1,i);break;
				case 28:
					await this.enc(1,i);break;
				case 29:
					await this.enc(5,i);break;
				case 30:
					await this.enc(3,i);break;
				case 31:
					await this.enc(3,i);break;
				case 33:
					await this.enc(1,i);break;
				case 34:
					await this.enc(1,i);break;
				case 35:
					await this.enc(1,i);break;
				case 32:
				default:
					await this.enc(1,i);break;
			}
		}
	}
}
module.exports=FastEnchanter;
