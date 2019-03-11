var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MoveCard = (function (_super) {
    __extends(MoveCard, _super);
    function MoveCard() {
        var _this = _super.call(this) || this;
        _this.moveCard();
        return _this;
    }
    MoveCard.prototype.moveCard = function () {
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
    };
    return MoveCard;
}(BottomSlot));
__reflect(MoveCard.prototype, "MoveCard");
//# sourceMappingURL=MoveCard.js.map