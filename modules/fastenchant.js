let cmdprocs;

class FastEnchanter{
	enc(level,i){
		cmdprocs.executeNCommand("enchant @s "+i+" "+level);
	}

	enchant(cmdproc){
		cmdprocs=cmdproc;
					for(let i=0;i<33;i++){
							if(i==10||i==11||i==16||i==30){continue;}
							switch(i){
								case 0:
									this.enc(4,i);break;
								case 1:
									this.enc(4,i);break;
								case 2:
									this.enc(4,i);break;
								case 3:
									this.enc(4,i);break;
								case 4:
									this.enc(4,i);break;
								case 5:
									this.enc(3,i);break;
								case 6:
									this.enc(3,i);break;
								case 7:
									this.enc(3,i);break;
								case 8:
									this.enc(1,i);break;
								case 9:
									this.enc(5,i);break;
								case 10:
									this.enc(5,i);break;
								case 11:
									this.enc(5,i);break;
								case 12:
									this.enc(2,i);break;
								case 13:
									this.enc(2,i);break;
								case 14:
									this.enc(3,i);break;
								case 15:
									this.enc(5,i);break;
								case 16:
									this.enc(1,i);break;
								case 17:
									this.enc(3,i);break;
								case 18:
									this.enc(3,i);break;
								case 19:
									this.enc(5,i);break;
								case 20:
									this.enc(2,i);break;
								case 21:
									this.enc(1,i);break;
								case 22:
									this.enc(1,i);break;
								case 23:
									this.enc(3,i);break;
								case 24:
									this.enc(3,i);break;
								case 25:
									this.enc(2,i);break;
								case 26:
									this.enc(1,i);break;
								case 27:
									this.enc(1,i);break;
								case 28:
									this.enc(1,i);break;
								case 29:
									this.enc(5,i);break;
								case 30:
									this.enc(3,i);break;
								case 31:
									this.enc(3,i);break;
								case 33:
									this.enc(1,i);break;
								case 34:
									this.enc(1,i);break;
								case 35:
									this.enc(1,i);break;
								case 32:
								default:
									this.enc(1,i);break;
							}
						}
}
}
module.exports=FastEnchanter;