if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AddDialog_Params {
    NameEdit?: string;
    DescribeEdit?: string;
    onClose?: () => void;
    onCreate?: () => void;
}
export class AddDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__NameEdit = new SynchedPropertySimpleTwoWayPU(params.NameEdit, this, "NameEdit");
        this.__DescribeEdit = new SynchedPropertySimpleTwoWayPU(params.DescribeEdit, this, "DescribeEdit");
        this.onClose = () => { };
        this.onCreate = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AddDialog_Params) {
        if (params.onClose !== undefined) {
            this.onClose = params.onClose;
        }
        if (params.onCreate !== undefined) {
            this.onCreate = params.onCreate;
        }
    }
    updateStateVars(params: AddDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__NameEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__DescribeEdit.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__NameEdit.aboutToBeDeleted();
        this.__DescribeEdit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __NameEdit: SynchedPropertySimpleTwoWayPU<string>;
    get NameEdit() {
        return this.__NameEdit.get();
    }
    set NameEdit(newValue: string) {
        this.__NameEdit.set(newValue);
    }
    private __DescribeEdit: SynchedPropertySimpleTwoWayPU<string>;
    get DescribeEdit() {
        return this.__DescribeEdit.get();
    }
    set DescribeEdit(newValue: string) {
        this.__DescribeEdit.set(newValue);
    }
    private onClose: () => void;
    private onCreate: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/view/AddDialog.ets(11:7)", "entry");
            Stack.height('100%');
            Stack.width('100%');
            Stack.alignContent(Alignment.Bottom);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Rect.create();
            Rect.debugLine("entry/src/main/ets/view/AddDialog.ets(12:9)", "entry");
            Rect.height('100%');
            Rect.width('100%');
            Rect.fill('rgba(0,0,0,0.4)');
            Rect.onClick(() => {
                this.onClose();
            });
        }, Rect);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/AddDialog.ets(19:9)", "entry");
            Column.height('50%');
            Column.width('100%');
            Column.backgroundColor(Color.White);
            Column.borderRadius({ topLeft: 16, topRight: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/AddDialog.ets(20:11)", "entry");
            Column.height('80%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({
                placeholder: '请输入设备名称',
                text: this.NameEdit
            });
            TextArea.debugLine("entry/src/main/ets/view/AddDialog.ets(21:13)", "entry");
            TextArea.onChange((value: string) => {
                this.NameEdit = value;
            });
            TextArea.height('20%');
            TextArea.margin({ bottom: '20vp' });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({
                placeholder: '请输入设备描述',
                text: this.DescribeEdit
            });
            TextArea.debugLine("entry/src/main/ets/view/AddDialog.ets(30:13)", "entry");
            TextArea.onChange((value: string) => {
                this.DescribeEdit = value;
            });
            TextArea.height('40%');
        }, TextArea);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/AddDialog.ets(42:11)", "entry");
            Row.margin({ top: '-80vp' });
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("取消");
            Button.debugLine("entry/src/main/ets/view/AddDialog.ets(43:13)", "entry");
            Button.onClick(() => {
                this.onClose();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("确定");
            Button.debugLine("entry/src/main/ets/view/AddDialog.ets(47:13)", "entry");
            Button.onClick(() => {
                this.onCreate();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
