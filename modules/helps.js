let help={
	"create":"*/create: Create agent.",
	"move":"*/move <direction>:move to selected direction.",
	"Direction": "(Direction: forward|back|up|down|left|right)",
	"turnDirection": "(turnDirection: left|right)",
	"quantity":"(quantity: 0-255)",
	"turn":"*/turn <turnDirection>:turn left or right.",
	"attack":"*/attack <direction>:attack target in <direction>.",
	"destroy":"*/destroy <direction>:destroy block in <direction>.",
	"drop":"*/drop <slot:int> <quantity:int> <direction>:drop item in <slot:quantity> to <direction>.",
	"dropall":"*/dropall <direction>:drop all item from agent's bag to <direction>.",
	"inspect":"*/inspect <direction>:inspect what block in front.",
	"inspectdata":"*/inspectdata <direction>:inspect block data in front.",
	"detect":"*/detect <direction>",
	"detectredstone":"*/detectredstone <direction>:Detect redstone activated in <direction>",
	"transfer":"*/transfer <srcSlotNum:int> <quantity:int> <dstSlotNum:int>:transfer <quntity> <src> to <dst>.",
	"tp":"*/tp:tp agent to player.\n*/tp [x y z]:tp to position",
	"collect":"*/collect <item:string>:collect <item>.",
	"till":"*/till <direction>:till for <direction>.",
	"place":"*/place <slotNum:int> <direction>:Put <slotNum>'s block to <direction>.",
	"getitemcount":"*/getitemcount|getitemspace|getitemdetail <slotNum:item>",
	"getitemspace":"*/getitemcount|getitemspace|getitemdetail <slotNum:item>",
	"getitemdetail":"*/getitemcount|getitemspace|getitemdetail <slotNum:item>",
	"bye":"*/bye:Disconnect websocket connection.",
	"wlg":"*/wlg <true|false>:Set log when doing a loop.",
	"retac":"*/retac <true|false>:Set AgentCommand result report to game.",
	"fenchant":"*/fenchant:Fast enchant your items to top level.",
	"setitem":"*/setitem <slot> <item> <count> <data>:Set item to agent.",
	"getposition":"*/getposition:Get position of agent.",
	"collect":"*/collect <all|itemname>:collect all drops",
	"cmdfile":"*/cmdfile <file>: Execute all commands in <file>.",
	"help"":"*/help [item]:Show help of [item] or show all helps."
}


class Helps{
	static showUHelp(pr){
		let str;
		let c=0;
		for(let i in help){
			str+=help[i]+"\n";
			if(c==8){
				c=0;
				pr.sendText("§\""+str+"§\"");
				str="";
				continue;
			}
			c++;
		}
		if(c!=0){
			c=0;
			pr.sendText("§\""+str+"§\"");
			str="";
		}
	}

	static showHelp(pr,cmd){
		if(cmd==undefined){this.showUHelp(pr);return;}
		if(help[cmd]==undefined){
			throw new Error("No such help: "+cmd+".");
		}
		pr.sendText("§\""+help[cmd]+"§\"");
	}
}

module.exports=Helps