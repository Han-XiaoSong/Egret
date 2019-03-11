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
var BottomSlot = (function (_super) {
    __extends(BottomSlot, _super);
    function BottomSlot() {
        var _this = _super.call(this) || this;
        _this.newCard0 = new eui.Image;
        _this.newCard1 = new eui.Image;
        _this.bottomSourceArray = [4, 4];
        _this.draggedObject = new eui.Group;
        return _this;
    }
    BottomSlot.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BottomSlot.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.showCards, this);
    };
    /**
     * 显示底部卡牌
     */
    BottomSlot.prototype.showCards = function () {
        for (var i = 0; i <= 1; i++) {
            if (i) {
                this.newCard1.width = 150;
                this.newCard1.height = 250;
                this.newCard1.source = this.bottomSourceArray[i].toString() + "_png";
                this.card_two.addChild(this.newCard1);
                this.newCard1.x = -100;
                var twTwo = egret.Tween.get(this.newCard1);
                twTwo.to({ x: 0 }, 500);
            }
            else {
                this.newCard0.width = 150;
                this.newCard0.height = 250;
                this.newCard0.source = this.bottomSourceArray[i].toString() + "_png";
                this.card_one.addChild(this.newCard0);
                var twOne = egret.Tween.get(this.newCard0);
            }
        }
    };
    /**
     * 修改底部卡槽数组
     */
    BottomSlot.prototype.changeCards = function (flag) {
        var number_to_slot = [0, 0, 0, 0, 0, 0, 64, 64, 64, 64];
        this.card_one.removeChildAt(this.card_one.numChildren - 1);
        //
        if (!flag)
            this.card_two.removeChildAt(this.card_two.numChildren - 1);
        this.bottomSourceArray[1] = this.bottomSourceArray[0];
        this.bottomSourceArray[0] = number_to_slot[Math.floor(Math.random() * 10)];
        //console.log("[0]="+this.bottomSourceArray[0]+",[1]="+this.bottomSourceArray[1])
        this.showCards();
    };
    return BottomSlot;
}(eui.Component));
__reflect(BottomSlot.prototype, "BottomSlot", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BottomSlot.js.map