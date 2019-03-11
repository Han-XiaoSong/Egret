class TrashCan extends eui.Component implements  eui.UIComponent {
	
	public trash_can: eui.Image;
	public trash_can_array: number[] = [];
	public trash_can_label: eui.Label;

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
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onComplete,this);
	}
	
	protected onComplete(): void
	{
		this.trash_can.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updateTrash,this);
		this.trash_can_label.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updateTrash,this);
	}

	/**
	 * 更新垃圾桶数组
	 */
	public updateTrash(sourceNumber: number){
		if(this.trash_can_array.length  === 2){
			this.trash_can_array = [];
			this.trash_can_label.text = "0/2";
		}
	}
}