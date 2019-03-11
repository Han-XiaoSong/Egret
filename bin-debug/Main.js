//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Top_Slot = new TopSlot();
        _this.Bottom_Slot = new BottomSlot();
        _this.Trash_can = new TrashCan();
        _this.flag = 1;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            //this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        //this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        //this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.addChild(this.Top_Slot);
        this.addChild(this.Trash_can);
        this.addChild(this.Bottom_Slot);
        this.Trash_can.addEventListener(egret.Event.ADDED, this.onComplete, this);
    };
    Main.prototype.onComplete = function () {
        //游戏开始移除对垃圾桶容器的监听
        this.Trash_can.removeEventListener(egret.Event.ADDED, this.onComplete, this);
        this.Top_Slot.setMask();
        //开始监听卡槽
        this.Top_Slot.slot_one.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playGame, this);
        this.Top_Slot.slot_two.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playGame, this);
        this.Top_Slot.slot_there.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playGame, this);
        this.Top_Slot.slot_four.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playGame, this);
    };
    /**
     * 游戏开始
     */
    Main.prototype.playGame = function (e, slotArrayName) {
        //根据选择的卡槽，获取对应的数组
        if (e.currentTarget === this.Top_Slot.slot_one)
            slotArrayName = this.Top_Slot.slotOneArray;
        else if (e.currentTarget === this.Top_Slot.slot_two)
            slotArrayName = this.Top_Slot.slotTwoArray;
        else if (e.currentTarget === this.Top_Slot.slot_there)
            slotArrayName = this.Top_Slot.slotThereArray;
        else
            slotArrayName = this.Top_Slot.slotFourArray;
        //给相应的卡槽增加卡牌
        if (this.Top_Slot.addCarded(this.Bottom_Slot.bottomSourceArray[1], slotArrayName)) {
            //如果增加完成，则将更新的卡牌更新出来，同时更新底部两张卡牌
            this.Top_Slot.updateCard(e.currentTarget, this.Bottom_Slot.bottomSourceArray[1], slotArrayName, 1, 0, 0);
            this.Bottom_Slot.changeCards(0);
        }
        //调用移动卡牌的方法
        this.MoveCards();
    };
    /**
     * 移动卡牌
     */
    Main.prototype.MoveCards = function () {
        var offsetX;
        var offsetY;
        var draggedObject;
        this.Bottom_Slot.card_two.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
        this.Bottom_Slot.card_two.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);
        function startMove(evt) {
            //把手指按到的对象记录下来
            draggedObject = evt.currentTarget;
            //计算手指和要拖动的卡牌之间的距离
            offsetX = evt.stageX - draggedObject.x;
            offsetY = evt.stageY - draggedObject.y;
            //把触摸的对象添加到显示容器的顶层
            this.addChild(draggedObject);
            //手指在屏幕上移动，触发onMove事件
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
        }
        function onMove(evt) {
            //计算手指在屏幕上的位置，达到跟随手指的效果
            draggedObject.x = evt.stageX - offsetX;
            draggedObject.y = evt.stageY - offsetY;
        }
        function stopMove() {
            //手指离开屏幕，移除屏幕的事件监听
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
            console.log("x=" + draggedObject.x + "y=" + draggedObject.y);
            //调用设置方法，将卡牌放置到对应的卡槽中
            this.setCard(draggedObject.x, draggedObject.y);
        }
    };
    /**
     * 根据移动卡牌后的位置，放入相应的卡槽中
     */
    Main.prototype.setCard = function (siteX, siteY) {
        if (8 < siteX && siteX < 83 && 150 < siteY && siteY < (this.Top_Slot.slotOneArray.length - 1) * 50 + 275) {
            this.flag = 1;
            this.set(1, siteX, siteY);
        }
        else if (166 < siteX && siteX < 241 && 150 < siteY && siteY < (this.Top_Slot.slotTwoArray.length - 1) * 50 + 275) {
            this.flag = 1;
            this.set(2, siteX, siteY);
        }
        else if (324 < siteX && siteX < 399 && 150 < siteY && siteY < (this.Top_Slot.slotThereArray.length - 1) * 50 + 275) {
            this.flag = 1;
            this.set(3, siteX, siteY);
        }
        else if (482 < siteX && siteX < 567 && 150 < siteY && siteY < (this.Top_Slot.slotFourArray.length - 1) * 50 + 275) {
            this.flag = 1;
            this.set(4, siteX, siteY);
        }
        else if ((400 < siteX && siteX < 500) && (740 < siteY && siteY < 950) && this.Trash_can.trash_can_array.length <= 1) {
            this.Bottom_Slot.card_two.removeChild(this.Bottom_Slot.newCard1);
            this.Bottom_Slot.card_two.x = 295;
            this.Bottom_Slot.card_two.y = 800;
            this.Bottom_Slot.changeCards(1);
            console.log("扔进垃圾桶");
            this.Trash_can.trash_can_array.push(1);
            if (this.Trash_can.trash_can_array.length)
                this.Trash_can.trash_can_label.text = this.Trash_can.trash_can_array.length.toString() + "/2";
            this.flag = 0;
        }
        else {
            this.Bottom_Slot.card_two.x = 295;
            this.Bottom_Slot.card_two.y = 800;
            console.log("reset");
            this.flag = 0;
        }
    };
    Main.prototype.set = function (codeNumber, siteX, siteY) {
        if (this.flag) {
            var slotArrayName = void 0;
            var slotName = void 0;
            if (codeNumber === 1) {
                slotName = this.Top_Slot.slot_one;
                slotArrayName = this.Top_Slot.slotOneArray;
                console.log("slot_one");
            }
            else if (codeNumber === 2) {
                slotName = this.Top_Slot.slot_two;
                slotArrayName = this.Top_Slot.slotTwoArray;
            }
            else if (codeNumber === 3) {
                slotName = this.Top_Slot.slot_there;
                slotArrayName = this.Top_Slot.slotThereArray;
            }
            else if (codeNumber === 4) {
                slotName = this.Top_Slot.slot_four;
                slotArrayName = this.Top_Slot.slotFourArray;
            }
            if (this.Top_Slot.addCarded(this.Bottom_Slot.bottomSourceArray[1], slotArrayName)) {
                this.Top_Slot.updateCard(slotName, this.Bottom_Slot.bottomSourceArray[1], slotArrayName, 2, siteX, siteY);
                this.Bottom_Slot.card_two.removeChild(this.Bottom_Slot.newCard1);
                console.log("remove from card_two successfully");
                this.Bottom_Slot.card_two.x = 295;
                this.Bottom_Slot.card_two.y = 800;
                console.log("reset card_two successfully");
                this.Bottom_Slot.changeCards(1);
            }
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map