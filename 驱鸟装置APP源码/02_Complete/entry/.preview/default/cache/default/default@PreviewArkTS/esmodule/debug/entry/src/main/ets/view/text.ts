if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EditDialogPreview_Params {
}
interface EditDialog_Params {
    NameEdit?: string;
    DescribeEdit?: string;
    onClose?: () => void;
    onCreate?: () => void;
}
export default class EditDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__NameEdit = new SynchedPropertySimpleTwoWayPU(params.NameEdit, this, "NameEdit");
        this.__DescribeEdit = new SynchedPropertySimpleTwoWayPU(params.DescribeEdit, this, "DescribeEdit");
        this.onClose = undefined;
        this.onCreate = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditDialog_Params) {
        if (params.onClose !== undefined) {
            this.onClose = params.onClose;
        }
        if (params.onCreate !== undefined) {
            this.onCreate = params.onCreate;
        }
    }
    updateStateVars(params: EditDialog_Params) {
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
            Stack.debugLine("entry/src/main/ets/view/text.ets(8:1)", "entry");
            Stack.height('100%');
            Stack.width('100%');
            Stack.alignContent(Alignment.Bottom);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Rect.create();
            Rect.debugLine("entry/src/main/ets/view/text.ets(9:3)", "entry");
            Rect.height('100%');
            Rect.width('100%');
            Rect.fill('rgba(0,0,0,0.4)');
            Rect.onClick(() => {
                this.onClose();
            });
        }, Rect);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/text.ets(16:3)", "entry");
            Column.height('50%');
            Column.width('100%');
            Column.backgroundColor(Color.White);
            Column.borderRadius({ topLeft: 16, topRight: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/text.ets(17:5)", "entry");
            Column.height('80%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '请输入设备名称',
                text: this.NameEdit });
            TextArea.debugLine("entry/src/main/ets/view/text.ets(18:7)", "entry");
            TextArea.onChange((value: string) => {
                this.NameEdit = value;
            });
            TextArea.height('20%');
            TextArea.margin({ bottom: '20vp' });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '请输入设备描述',
                text: this.DescribeEdit });
            TextArea.debugLine("entry/src/main/ets/view/text.ets(27:7)", "entry");
            TextArea.onChange((value: string) => {
                this.DescribeEdit = value;
            });
            TextArea.height('40%');
        }, TextArea);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/text.ets(40:5)", "entry");
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("取消");
            Button.debugLine("entry/src/main/ets/view/text.ets(41:7)", "entry");
            Button.onClick(() => {
                this.onClose();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("确定");
            Button.debugLine("entry/src/main/ets/view/text.ets(46:7)", "entry");
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
class EditDialogPreview extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditDialogPreview_Params) {
    }
    updateStateVars(params: EditDialogPreview_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new EditDialog(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/text.ets", line: 70, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "EditDialog" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "EditDialogPreview", new EditDialogPreview(undefined, {}));
    previewComponent();
}
else {
}
