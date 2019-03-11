class BottomSlot extends eui.Component implements  eui.UIComponent {
	
	public card_one: eui.Group;
	public card_two: eui.Group;
	public newCard0 = new eui.Image;
	public newCard1 = new eui.Image;
	public bottomSourceArray: number [] = [4,4];
	private offsetX: number;
	private offsetY: number;

	private draggedObject = new eui.Group;
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
		this.addEventListener(eui.UIEvent.COMPLETE,this.showCards,this);
	}

	/**
	 * 显示底部卡牌 
	 */
	public showCards() {
		for(let i = 0; i <= 1; i++){
			if(i){
				this.newCard1.width = 150;
				this.newCard1.height = 250;
				this.newCard1.source = this.bottomSourceArray[i].toString() + "_png";
				this.card_two.addChild(this.newCard1);
				this.newCard1.x = -100;
				let twTwo = egret.Tween.get(this.newCard1);
				twTwo.to({x:0},500)
			}else{
				this.newCard0.width = 150;
				this.newCard0.height = 250;
				this.newCard0.source = this.bottomSourceArray[i].toString() + "_png";
				this.card_one.addChild(this.newCard0);
				let twOne = egret.Tween.get(this.newCard0);
			}
		}
	}

	/**
	 * 修改底部卡槽数组
	 */
	public changeCards(flag: number){
		let number_to_slot: number[] = [0,0,0,0,0,0,64,64,64,64];

		this.card_one.removeChildAt(this.card_one.numChildren - 1);
		//
		if(!flag)
			this.card_two.removeChildAt(this.card_two.numChildren - 1);
		this.bottomSourceArray[1] = this.bottomSourceArray[0];
		this.bottomSourceArray[0] = number_to_slot[Math.floor(Math.random()*10)];
		//console.log("[0]="+this.bottomSourceArray[0]+",[1]="+this.bottomSourceArray[1])
		this.showCards();
	}
}