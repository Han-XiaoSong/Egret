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

class Main extends eui.UILayer {

    public Top_Slot = new TopSlot();
    public Bottom_Slot = new BottomSlot();
    public Trash_can = new TrashCan();
    private flag: number = 1;


    protected createChildren(): void {
        super.createChildren();
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene()
        const result = await RES.getResAsync("description_json")
        //this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene() {
       this.addChild(this.Top_Slot);
       this.addChild(this.Trash_can);
       this.addChild(this.Bottom_Slot);
       this.Trash_can.addEventListener(egret.Event.ADDED,this.onComplete,this); 
    }


    private onComplete(){
        //游戏开始移除对垃圾桶容器的监听
        this.Trash_can.removeEventListener(egret.Event.ADDED,this.onComplete,this);
        this.Top_Slot.setMask();   
        //开始监听卡槽
        this.Top_Slot.slot_one.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playGame,this);
        this.Top_Slot.slot_two.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playGame,this);
        this.Top_Slot.slot_there.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playGame,this);
        this.Top_Slot.slot_four.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playGame,this);
    }


    /**
     * 游戏开始
     */
    public playGame(e: egret.TouchEvent, slotArrayName: any){
        //根据选择的卡槽，获取对应的数组
        if(e.currentTarget === this.Top_Slot.slot_one)
            slotArrayName = this.Top_Slot.slotOneArray;
        else if(e.currentTarget === this.Top_Slot.slot_two)
            slotArrayName = this.Top_Slot.slotTwoArray;
        else if(e.currentTarget === this.Top_Slot.slot_there)
            slotArrayName = this.Top_Slot.slotThereArray;
        else
            slotArrayName = this.Top_Slot.slotFourArray;

        //给相应的卡槽增加卡牌
        if(this.Top_Slot.addCarded(this.Bottom_Slot.bottomSourceArray[1],slotArrayName))
        {
            //如果增加完成，则将更新的卡牌更新出来，同时更新底部两张卡牌
            this.Top_Slot.updateCard(e.currentTarget,this.Bottom_Slot.bottomSourceArray[1],slotArrayName,1,0,0);
            this.Bottom_Slot.changeCards(0);
        }
        //调用移动卡牌的方法
        this.MoveCards();
    }

    /**
     * 移动卡牌
     */
    public MoveCards()
    {
        let offsetX: number;
        let offsetY: number;
        let draggedObject: egret.Shape;
        this.Bottom_Slot.card_two.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
        this.Bottom_Slot.card_two.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);

        function startMove(evt: egret.TouchEvent): void
        {
            //把手指按到的对象记录下来
            draggedObject = evt.currentTarget;
            //计算手指和要拖动的卡牌之间的距离
            offsetX = evt.stageX - draggedObject.x;
            offsetY = evt.stageY - draggedObject.y;
            //把触摸的对象添加到显示容器的顶层
            this.addChild(draggedObject);
            //手指在屏幕上移动，触发onMove事件
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
        }

        function onMove(evt: egret.TouchEvent): void
        {
            //计算手指在屏幕上的位置，达到跟随手指的效果
            draggedObject.x = evt.stageX - offsetX;
            draggedObject.y = evt.stageY - offsetY;
        }

        function stopMove()
        {
            //手指离开屏幕，移除屏幕的事件监听
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
            console.log("x="+draggedObject.x+"y="+draggedObject.y)
            //调用设置方法，将卡牌放置到对应的卡槽中
            this.setCard(draggedObject.x, draggedObject.y);
        }
    }


    /**
     * 根据移动卡牌后的位置，放入相应的卡槽中
     */
    public setCard(siteX: number, siteY: number): void{
        if(8<siteX&&siteX<83 && 150<siteY&&siteY <(this.Top_Slot.slotOneArray.length - 1)*50 + 275){
            this.flag = 1;
            this.set(1,siteX,siteY);
        }
        else if(166<siteX&&siteX<241 && 150<siteY&&siteY <(this.Top_Slot.slotTwoArray.length - 1)*50 + 275){
            this.flag = 1;
            this.set(2,siteX,siteY);
        }
        else if(324<siteX&&siteX<399 && 150<siteY&&siteY <(this.Top_Slot.slotThereArray.length - 1)*50 + 275){
            this.flag = 1;
            this.set(3,siteX,siteY);
        }
        else if(482<siteX&&siteX<567 && 150<siteY&&siteY <(this.Top_Slot.slotFourArray.length - 1)*50 + 275){
            this.flag = 1;
            this.set(4,siteX,siteY);
        }
        else if((400<siteX&&siteX<500)&&(740<siteY&&siteY<950)&&this.Trash_can.trash_can_array.length <= 1){
            this.Bottom_Slot.card_two.removeChild(this.Bottom_Slot.newCard1);
            this.Bottom_Slot.card_two.x = 295;
            this.Bottom_Slot.card_two.y = 800;
            this.Bottom_Slot.changeCards(1);
            console.log("扔进垃圾桶")
            this.Trash_can.trash_can_array.push(1);
            if(this.Trash_can.trash_can_array.length)
                this.Trash_can.trash_can_label.text = this.Trash_can.trash_can_array.length.toString() + "/2";
            this.flag = 0;
        }
        else{
            this.Bottom_Slot.card_two.x = 295;
            this.Bottom_Slot.card_two.y = 800;
            console.log("reset")
            this.flag = 0;
        }
    }
    public set(codeNumber: number, siteX: number, siteY: number){
        if(this.flag){
            let slotArrayName: any;
            let slotName: any;
            if(codeNumber === 1){
                slotName = this.Top_Slot.slot_one;
                slotArrayName = this.Top_Slot.slotOneArray;
                console.log("slot_one");
            }
            else if(codeNumber === 2){
                slotName = this.Top_Slot.slot_two;
                slotArrayName = this.Top_Slot.slotTwoArray;   
            }
            else if(codeNumber === 3){
                slotName = this.Top_Slot.slot_there;
                slotArrayName = this.Top_Slot.slotThereArray;  
            }
            else if(codeNumber === 4){
                slotName = this.Top_Slot.slot_four;
                slotArrayName = this.Top_Slot.slotFourArray;
            }
            if(this.Top_Slot.addCarded(this.Bottom_Slot.bottomSourceArray[1],slotArrayName)){
                this.Top_Slot.updateCard(slotName,this.Bottom_Slot.bottomSourceArray[1],slotArrayName,2,siteX,siteY);
                this.Bottom_Slot.card_two.removeChild(this.Bottom_Slot.newCard1);
                console.log("remove from card_two successfully")
                this.Bottom_Slot.card_two.x = 295;
                this.Bottom_Slot.card_two.y = 800;
                console.log("reset card_two successfully")
                this.Bottom_Slot.changeCards(1);
            }
        }
    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
