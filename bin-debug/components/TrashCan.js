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
var TrashCan = (function (_super) {
    __extends(TrashCan, _super);
    function TrashCan() {
        var _this = _super.call(this) || this;
        _this.trash_can_array = [];
        return _this;
    }
    TrashCan.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TrashCan.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onComplete, this);
    };
    TrashCan.prototype.onComplete = function () {
        this.trash_can.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateTrash, this);
        this.trash_can_label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateTrash, this);
    };
    /**
     * 更新垃圾桶数组
     */
    TrashCan.prototype.updateTrash = function (sourceNumber) {
        if (this.trash_can_array.length === 2) {
            this.trash_can_array = [];
            this.trash_can_label.text = "0/2";
        }
    };
    return TrashCan;
}(eui.Component));
__reflect(TrashCan.prototype, "TrashCan", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TrashCan.js.map