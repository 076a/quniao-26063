if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceItemPreview_Params {
    memo?: DeviceDate;
}
interface DeviceItem_Params {
    index?: number;
    memo?: DeviceDate;
    onDelete?: (index: number) => void;
    editCallback?: (index: number) => void;
    onMemoClick?: (memo: DeviceDate) => void;
    deleteCallback?: () => void;
}
import DeviceDate from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceData";
import "@bundle:com.example.pageanddata/entry/ets/view/EditDialog";
import router from "@ohos:router";
import type { BusinessError } from "@ohos:base";
import Logger from "@bundle:com.example.pageanddata/entry/ets/utils/Logger";
import axios from "@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/index";
import type { AxiosResponse } from "@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/index";
const instance = axios.create({
    baseURL: 'http://10.33.86.16:8080',
    timeout: 5000
});
export default class DeviceItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.index = 0;
        this.__memo = new SynchedPropertyNesedObjectPU(params.memo, this, "memo");
        this.onDelete = () => { };
        this.editCallback = () => { };
        this.onMemoClick = () => { };
        this.deleteCallback = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceItem_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        this.__memo.set(params.memo);
        if (params.onDelete !== undefined) {
            this.onDelete = params.onDelete;
        }
        if (params.editCallback !== undefined) {
            this.editCallback = params.editCallback;
        }
        if (params.onMemoClick !== undefined) {
            this.onMemoClick = params.onMemoClick;
        }
        if (params.deleteCallback !== undefined) {
            this.deleteCallback = params.deleteCallback;
        }
    }
    updateStateVars(params: DeviceItem_Params) {
        this.__memo.set(params.memo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__memo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__memo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private index: number;
    private __memo: SynchedPropertyNesedObjectPU<DeviceDate>;
    get memo() {
        return this.__memo.get();
    }
    private onDelete: (index: number) => void;
    private editCallback: (index: number) => void;
    private onMemoClick: (memo: DeviceDate) => void;
    private deleteCallback: () => void;
    aboutToAppear() {
        instance.get('/device/getRadarStatus', {
            params: {
                productKey: 'a18YHu3ff1d',
                deviceName: this.memo.name
            }
        }).then((response: AxiosResponse) => {
            this.memo.status = response.data.data;
            // 根据状态设置颜色
            this.memo.Color = this.memo.status === 'OFFLINE' ? '#808080' : '#00FF00'; // 灰色 : 绿色
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(36:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(37:7)", "entry");
            Row.margin({ top: '30vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(38:9)", "entry");
            Stack.padding({ left: '16vp', right: '16vp' });
            Stack.backgroundColor(Color.White);
            Stack.borderRadius('20vp');
            Stack.onClick(() => {
                // this.onMemoClick(this.memo)
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(39:11)", "entry");
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(40:13)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.margin({ top: '20vp', bottom: '12vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(41:15)", "entry");
            Row.justifyContent(FlexAlign.Start);
            Row.alignItems(VerticalAlign.Center);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用插值表达式获取正确数据
            Text.create(`${this.memo.name}`);
            Text.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(43:17)", "entry");
            // 使用插值表达式获取正确数据
            Text.fontWeight(600);
            // 使用插值表达式获取正确数据
            Text.fontSize('18fp');
        }, Text);
        // 使用插值表达式获取正确数据
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777425, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(46:17)", "entry");
            Image.width('20vp');
            Image.height('20vp');
            Image.margin({ left: '8vp' });
            Image.fillColor(this.memo.Color);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用插值表达式获取正确数据
            Text.create(`${this.memo.status}`);
            Text.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(52:17)", "entry");
            // 使用插值表达式获取正确数据
            Text.fontSize('15fp');
            // 使用插值表达式获取正确数据
            Text.margin({ left: '4vp' });
        }, Text);
        // 使用插值表达式获取正确数据
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777428, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(60:15)", "entry");
            Image.width('20vp');
            Image.height('20vp');
            Image.margin({ left: '-80vp' });
            Image.onClick(() => {
                this.editCallback(this.index);
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用插值表达式获取正确数据
            Text.create(`${this.memo.description}`);
            Text.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(73:13)", "entry");
            // 使用插值表达式获取正确数据
            Text.textAlign(TextAlign.Start);
            // 使用插值表达式获取正确数据
            Text.width('100%');
        }, Text);
        // 使用插值表达式获取正确数据
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(76:13)", "entry");
            Row.justifyContent(FlexAlign.End);
            Row.alignItems(VerticalAlign.Center);
            Row.width('100%');
            Row.margin({ top: '20vp', bottom: '20vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777422, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(77:15)", "entry");
            Image.width('22vp');
            Image.height('22vp');
            Image.margin({ right: 10 });
            Image.onClick(() => {
                Logger.info('DeviceItem', `Clicking settings for device ID: ${this.memo.id}`);
                // 跳转到第二页
                router.pushUrl({
                    url: 'view/Page',
                    params: { id: this.memo.id }
                }).then(() => {
                    Logger.info('DeviceItem', `Successfully navigated to Page with device ID: ${this.memo.id}`);
                }).catch((err: BusinessError) => {
                    Logger.error('DeviceItem', `Failed to navigate to Page. Code: ${err.code}, message: ${err.message}`);
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777429, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(93:15)", "entry");
            Image.width('18vp');
            Image.height('18vp');
            Image.onClick(() => {
                this.onDelete(this.index);
            });
        }, Image);
        Row.pop();
        Column.pop();
        Stack.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class DeviceItemPreview extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__memo = new ObservedPropertyObjectPU(new DeviceDate(1, '名字', '描述', 'color', '#00FF00'), this, "memo");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceItemPreview_Params) {
        if (params.memo !== undefined) {
            this.memo = params.memo;
        }
    }
    updateStateVars(params: DeviceItemPreview_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__memo.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__memo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __memo: ObservedPropertyObjectPU<DeviceDate>;
    get memo() {
        return this.__memo.get();
    }
    set memo(newValue: DeviceDate) {
        this.__memo.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/viewmodel/DeviceItem.ets(128:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ bottom: 20 });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceItem(this, { memo: this.memo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/viewmodel/DeviceItem.ets", line: 129, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            memo: this.memo
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        memo: this.memo
                    });
                }
            }, { name: "DeviceItem" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ bottom: 20 });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceItem(this, { memo: this.memo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/viewmodel/DeviceItem.ets", line: 131, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            memo: this.memo
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        memo: this.memo
                    });
                }
            }, { name: "DeviceItem" });
        }
        __Common__.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function fillColor(Blue: Color) {
    throw new Error('Function not implemented.');
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "DeviceItemPreview", new DeviceItemPreview(undefined, {}));
    previewComponent();
}
else {
}
