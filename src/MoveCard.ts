class MoveCard extends BottomSlot{

    public constructor(){
        super();
        this.moveCard();
    }


    public moveCard(){
		console.log("start move");
        console.log(this.card_two.x);
		// this.Bottom_Slot.card_there.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
		// this.Bottom_Slot.card_there.removeEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
		
		// this.Bottom_Slot.card_there.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
		// this.Bottom_Slot.card_there.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
		// console.log("x="+this.Bottom_Slot.card_there.x+"y="+this.Bottom_Slot.card_there.y);
		// return [this.Bottom_Slot.card_there.x, this.Bottom_Slot.card_there.y]

	    // function startMove(e:egret.TouchEvent):void
        // {
   		//     //计算手指和要拖动的对象的距离
		//     console.log("start moving")
		//     this.offsetX = e.stageX - this.Bottom_Slot.card_there.x;
   		//     this.offsetY = e.stageY - this.Bottom_Slot.card_there.y;
   		//     //把触摸的对象放在显示列表的顶层
		//     this.addChild(this.Bottom_Slot.card_there);
        //     //手指在屏幕上移动，会触发 onMove 方法
   		//     this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
	    // }


	    // function onMove(e:egret.TouchEvent): void
        // {
   		//     //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
		//     this.Bottom_Slot.card_there.x = e.stageX - this.offsetX;
   		//     this.Bottom_Slot.card_there.y = e.stageY - this.offsetY;
	    // }

	    // function stopMove()
        // {
		//     //手指移开屏幕，移出屏幕的检测事件
		//     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,()=>{},this);
        //     this.setCard(this.Bottom_Slot.card_there.x,this.Bottom_Slot.card_there.y,this.Bottom_Slot.card_there);
	    // }
    }

// public setCard(siteX: number, siteY: number, cardToRemove:eui.Image){
//         let slot_name: any;
//         let source_slot_name: any;
//         let flag: number = 0;
//         //确定卡牌移动到哪个卡槽的位置上了
//         if((-92 < siteX&&siteX < -17) && (150<siteY&&siteY <= (this.Top_Slot.source_slot_one.length * 60 + 225))){
//             slot_name = this.Top_Slot.slot_one;
//             source_slot_name = this.Top_Slot.source_slot_one;
//             flag = 1;
//         }else if((66<siteX&&siteX < 141) && (150<siteY&&siteY <= (this.Top_Slot.source_slot_two.length * 60 + 225))){
//             slot_name = this.Top_Slot.slot_two;
//             source_slot_name = this.Top_Slot.source_slot_two;
//             flag = 1;
//         }else if((224<siteX&&siteX < 299) && (150<siteY&&siteY <= (this.Top_Slot.source_slot_there.length * 60 + 225))){
//             slot_name = this.Top_Slot.slot_there;
//             source_slot_name = this.Top_Slot.source_slot_there;
//             flag = 1;
//         }else if((382<siteX&&siteX < 457) && (150<siteY&&siteY <= (this.Top_Slot.source_slot_four.length * 60 + 225))){
//             slot_name = this.Top_Slot.slot_four;
//             source_slot_name = this.Top_Slot.source_slot_four;
//             flag = 1;
//         }else if((340<siteX&&siteX<370)&&(740<siteY&&siteY<830)&&this.Trash_can.trash_can_array.length <= 1){
//             console.log(this.Trash_can.trash_can_array.length);
//             console.log("可以扔进垃圾桶")
//             this.Bottom_Slot.card_there.removeChild(cardToRemove);
//             this.Bottom_Slot.card_there.x = 170;
//             this.Bottom_Slot.card_there.y = 800;
//             this.Bottom_Slot.changeCards(1);
//             console.log("扔进垃圾桶")
//             this.Trash_can.trash_can_array.push(1);
//             if(this.Trash_can.trash_can_array.length)
//                 this.Trash_can.trash_can_label.text = this.Trash_can.trash_can_array.length.toString() + "/2";
//             flag = 0;
//         }else{
//             console.log("重置成功");
//             this.Bottom_Slot.card_there.x = 170;
//             this.Bottom_Slot.card_there.y = 800;
//         }
//         if(flag && source_slot_name.length<8){
//             this.Bottom_Slot.card_there.removeChild(cardToRemove);
//             this.Bottom_Slot.card_there.x = 170;
//             this.Bottom_Slot.card_there.y = 800;
//             console.log("删除成功")
//             if(this.Top_Slot.addCarded(this.Bottom_Slot.source_bottom_slot[1],source_slot_name)){
//                 this.Top_Slot.updateCard(slot_name,this.Bottom_Slot.source_bottom_slot[1],source_slot_name,2,siteX,siteY);
//                 this.Bottom_Slot.changeCards(1);
//             }
//         }else{
//             console.log("当前槽已满,重置");
//             this.Bottom_Slot.card_there.x = 170;
//             this.Bottom_Slot.card_there.y = 800;
//         }
//     }
}