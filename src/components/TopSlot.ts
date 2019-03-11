class TopSlot extends eui.Component implements  eui.UIComponent {
	
	public slot_one: eui.Group;
	public slot_two: eui.Group;
	public slot_there: eui.Group;
	public slot_four: eui.Group;

	private pb: eui.ProgressBar;
	private score: eui.Label;
	private preLevel: eui.Label;
	private nextLevel: eui.Label;
	private maskofpb: eui.Rect;
	private scoreNumber: number = 0;
	private temp: number = 0;

	public slotOneArray:number[] = [];
	public slotTwoArray:number[] = [];
	public slotThereArray:number[] = [];
	public slotFourArray:number[] = [];

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	/**
	 * 创建进度条，增加圆角遮罩
	 */
	public setMask(){
		this.pb.maximum = Number(this.preLevel.text) * 1000;
		let pbmask: eui.Rect = new eui.Rect(530,30,0xff0000);
		pbmask.x = 55;
		pbmask.y = 89;
		pbmask.ellipseWidth = 30;
		pbmask.ellipseHeight = 30;
		this.pb.mask = pbmask;
		this.addChild(pbmask);
	}
	/**
	 * 增加数组
	 */
	public addCarded(sourceNumber: number, slotArrayName: any): number{
		if(slotArrayName.length < 8){
			slotArrayName.push(sourceNumber);
			console.log("slotArrayName.length = "+slotArrayName.length)
			return 1;
		}else
			return 0;
	}

	/**
	 * 更新卡牌（只添加最后一张）
	 */
	public updateCard(slotName:eui.Group, sourceNumber: number, slotArrayName: any,
		mark: number, positionX: number, positionY: number){
		let newCard = new eui.Image;
		newCard.width = 150;
		newCard.height = 250;
		console.log("<><><><><><><>"+sourceNumber);
		newCard.source = sourceNumber.toString() + "_png";
		slotName.addChild(newCard);
		
		if(mark === 1){
			//从底部移动一张卡牌
			newCard.x = 270 - slotName.x;
			newCard.y = 800;
			let tw = egret.Tween.get(newCard);
			tw.to({x:0,y:(slotArrayName.length - 1) * 50},600);
			tw.call(()=>{this.mergeCard(slotArrayName,slotName)});
		}else if(mark === 0){
			//从合并前的位置移动一张卡牌
			newCard.x = 0;
			newCard.y = slotArrayName.length * 50;
			let tw = egret.Tween.get(newCard);
			tw.to({x:0,y:(slotArrayName.length - 1) * 50},300);
			tw.call(()=>{this.mergeCard(slotArrayName,slotName)});
			//只有合并的时候才会更新等级进度，每次更新的值等于加入的卡牌的值
			this.scoreNumber += sourceNumber;
			this.temp += sourceNumber;
			this.score.text = this.scoreNumber.toString();
			if( this.temp >= this.pb.maximum){
				this.preLevel.text = (Number(this.preLevel.text) + 1).toString();
				this.nextLevel.text = (Number(this.nextLevel.text) + 1).toString();
				this.pb.maximum = Number(this.preLevel.text) * 1000;
				this.temp -= (Number(this.preLevel.text) - 1) * 1000;
				this.pb.value = this.temp;
			}
			else{
				this.pb.value = this.temp;
			}
		}else if(mark === 2){
			//从卡牌被移动的位置移动该卡牌
			newCard.x = positionX - slotName.x;
			newCard.y = positionY;
			let tw = egret.Tween.get(newCard);
			tw.to({x:0,y:(slotArrayName.length - 1) * 50},300);
			tw.call(()=>{this.mergeCard(slotArrayName,slotName)});
		}

		if(sourceNumber === 2048){
			console.log("it is 2048")
			console.log(this.slotOneArray[0])
			//如果合成2048，将这一列全部清空
			slotName.removeChildren();
			let newSlot = new eui.Image;
			newSlot.width = 150;
			newSlot.height = 250;
			newSlot.source = "resource/assets/slot.png";
			slotName.addChild(newSlot);

		}
	}


	/**
	 * 合并数组
	 */
	public mergeCard(slotArrayName: any, slotName: eui.Group){
		let length = slotArrayName.length;
		while(length > 1){
			if(slotArrayName[length - 1] === 0){
				slotArrayName[length - 2] = 2 * slotArrayName[length - 2];
				slotArrayName.pop();
				//合并成功，删除合并之前的两张卡牌
				this.deleteCard(slotName);
				//删除之后将新的卡牌显示到卡槽容器中
				console.log("准备更新"+slotArrayName[length - 2]);
				console.log("current length"+slotArrayName.length)
				this.updateCard(slotName, slotArrayName[length - 2],slotArrayName,0,0,0);
				//将对应的数组里的2048删除掉
			}
			else if(slotArrayName[length - 1] === slotArrayName[length - 2]){
				slotArrayName[length - 2] = 2 * slotArrayName[length - 1];
				slotArrayName.pop();
				//合并成功，删除合并之前的两张卡牌
				this.deleteCard(slotName);
				//删除之后将新的卡牌显示到卡槽容器中
				this.updateCard(slotName, slotArrayName[length - 2],slotArrayName,0,0,0);
			}else{
				length = 0;
			}
		}
		//删除一个组中的2048
		if(slotArrayName[slotArrayName.length - 1] == 2048){
			slotArrayName.pop();
			console.log()
		}
		console.log(">>>>>>>>>>>><<<<<<<<<<<<<<");
		console.log('length of one '+this.slotOneArray.length);
		for(let i=0; i<this.slotOneArray.length;i++){
			console.log(i+"="+this.slotOneArray[i]);
		}
	}


	/**
	 * 删除卡牌（合并之后，连续删除两张）
	 */
	public deleteCard(slotName:eui.Group){
		for(let t = Date.now(); Date.now() - t <= 200;){;}
		if(slotName.numChildren > 1){
			slotName.removeChildAt(slotName.numChildren - 1);
			slotName.removeChildAt(slotName.numChildren - 1);
		}
	}
}