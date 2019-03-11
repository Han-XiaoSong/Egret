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
var TopSlot = (function (_super) {
    __extends(TopSlot, _super);
    function TopSlot() {
        var _this = _super.call(this) || this;
        _this.scoreNumber = 0;
        _this.temp = 0;
        _this.slotOneArray = [];
        _this.slotTwoArray = [];
        _this.slotThereArray = [];
        _this.slotFourArray = [];
        return _this;
    }
    TopSlot.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TopSlot.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    /**
     * 创建进度条，增加圆角遮罩
     */
    TopSlot.prototype.setMask = function () {
        this.pb.maximum = Number(this.preLevel.text) * 1000;
        var pbmask = new eui.Rect(530, 30, 0xff0000);
        pbmask.x = 55;
        pbmask.y = 89;
        pbmask.ellipseWidth = 30;
        pbmask.ellipseHeight = 30;
        this.pb.mask = pbmask;
        this.addChild(pbmask);
    };
    /**
     * 增加数组
     */
    TopSlot.prototype.addCarded = function (sourceNumber, slotArrayName) {
        if (slotArrayName.length < 8) {
            slotArrayName.push(sourceNumber);
            console.log("slotArrayName.length = " + slotArrayName.length);
            return 1;
        }
        else
            return 0;
    };
    /**
     * 更新卡牌（只添加最后一张）
     */
    TopSlot.prototype.updateCard = function (slotName, sourceNumber, slotArrayName, mark, positionX, positionY) {
        var _this = this;
        var newCard = new eui.Image;
        newCard.width = 150;
        newCard.height = 250;
        console.log("<><><><><><><>" + sourceNumber);
        newCard.source = sourceNumber.toString() + "_png";
        slotName.addChild(newCard);
        if (mark === 1) {
            //从底部移动一张卡牌
            newCard.x = 270 - slotName.x;
            newCard.y = 800;
            var tw = egret.Tween.get(newCard);
            tw.to({ x: 0, y: (slotArrayName.length - 1) * 50 }, 600);
            tw.call(function () { _this.mergeCard(slotArrayName, slotName); });
        }
        else if (mark === 0) {
            //从合并前的位置移动一张卡牌
            newCard.x = 0;
            newCard.y = slotArrayName.length * 50;
            var tw = egret.Tween.get(newCard);
            tw.to({ x: 0, y: (slotArrayName.length - 1) * 50 }, 300);
            tw.call(function () { _this.mergeCard(slotArrayName, slotName); });
            //只有合并的时候才会更新等级进度，每次更新的值等于加入的卡牌的值
            this.scoreNumber += sourceNumber;
            this.temp += sourceNumber;
            this.score.text = this.scoreNumber.toString();
            if (this.temp >= this.pb.maximum) {
                this.preLevel.text = (Number(this.preLevel.text) + 1).toString();
                this.nextLevel.text = (Number(this.nextLevel.text) + 1).toString();
                this.pb.maximum = Number(this.preLevel.text) * 1000;
                this.temp -= (Number(this.preLevel.text) - 1) * 1000;
                this.pb.value = this.temp;
            }
            else {
                this.pb.value = this.temp;
            }
        }
        else if (mark === 2) {
            //从卡牌被移动的位置移动该卡牌
            newCard.x = positionX - slotName.x;
            newCard.y = positionY;
            var tw = egret.Tween.get(newCard);
            tw.to({ x: 0, y: (slotArrayName.length - 1) * 50 }, 300);
            tw.call(function () { _this.mergeCard(slotArrayName, slotName); });
        }
        if (sourceNumber === 2048) {
            console.log("it is 2048");
            console.log(this.slotOneArray[0]);
            //如果合成2048，将这一列全部清空
            slotName.removeChildren();
            var newSlot = new eui.Image;
            newSlot.width = 150;
            newSlot.height = 250;
            newSlot.source = "resource/assets/slot.png";
            slotName.addChild(newSlot);
        }
    };
    /**
     * 合并数组
     */
    TopSlot.prototype.mergeCard = function (slotArrayName, slotName) {
        var length = slotArrayName.length;
        while (length > 1) {
            if (slotArrayName[length - 1] === 0) {
                slotArrayName[length - 2] = 2 * slotArrayName[length - 2];
                slotArrayName.pop();
                //合并成功，删除合并之前的两张卡牌
                this.deleteCard(slotName);
                //删除之后将新的卡牌显示到卡槽容器中
                console.log("准备更新" + slotArrayName[length - 2]);
                console.log("current length" + slotArrayName.length);
                this.updateCard(slotName, slotArrayName[length - 2], slotArrayName, 0, 0, 0);
                //将对应的数组里的2048删除掉
            }
            else if (slotArrayName[length - 1] === slotArrayName[length - 2]) {
                slotArrayName[length - 2] = 2 * slotArrayName[length - 1];
                slotArrayName.pop();
                //合并成功，删除合并之前的两张卡牌
                this.deleteCard(slotName);
                //删除之后将新的卡牌显示到卡槽容器中
                this.updateCard(slotName, slotArrayName[length - 2], slotArrayName, 0, 0, 0);
            }
            else {
                length = 0;
            }
        }
        if (slotArrayName[0] == 2048) {
            slotArrayName.pop();
            console.log();
        }
        console.log(">>>>>>>>>>>><<<<<<<<<<<<<<");
        console.log('length of one ' + this.slotOneArray.length);
        for (var i = 0; i < this.slotOneArray.length; i++) {
            console.log(i + "=" + this.slotOneArray[i]);
        }
    };
    /**
     * 删除卡牌（合并之后，连续删除两张）
     */
    TopSlot.prototype.deleteCard = function (slotName) {
        for (var t = Date.now(); Date.now() - t <= 200;) {
            ;
        }
        if (slotName.numChildren > 1) {
            slotName.removeChildAt(slotName.numChildren - 1);
            slotName.removeChildAt(slotName.numChildren - 1);
        }
    };
    return TopSlot;
}(eui.Component));
__reflect(TopSlot.prototype, "TopSlot", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TopSlot.js.map