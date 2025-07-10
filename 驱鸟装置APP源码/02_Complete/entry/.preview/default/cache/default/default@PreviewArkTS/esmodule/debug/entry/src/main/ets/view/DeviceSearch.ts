if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceSearchPreview_Params {
    keywords?: string;
}
interface DeviceSearch_Params {
    keywords?: string;
    cleanKeywords?: () => void;
}
export default class DeviceSearch extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__keywords = new SynchedPropertySimpleTwoWayPU(params.keywords, this, "keywords");
        this.cleanKeywords = () => {
            this.keywords = '';
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceSearch_Params) {
        if (params.cleanKeywords !== undefined) {
            this.cleanKeywords = params.cleanKeywords;
        }
    }
    updateStateVars(params: DeviceSearch_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__keywords.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__keywords.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __keywords: SynchedPropertySimpleTwoWayPU<string>;
    get keywords() {
        return this.__keywords.get();
    }
    set keywords(newValue: string) {
        this.__keywords.set(newValue);
    }
    private cleanKeywords: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/DeviceSearch.ets(9:1)", "entry");
            Row.padding({ left: 20, right: 20 });
            Row.margin({ top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/DeviceSearch.ets(10:3)", "entry");
            Row.padding({ right: 52 });
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(16);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777431, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/DeviceSearch.ets(11:5)", "entry");
            Image.width(16);
            Image.margin({ left: 10 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: '请输入需要查找的设备名称',
                text: this.keywords
            });
            TextInput.debugLine("entry/src/main/ets/view/DeviceSearch.ets(14:5)", "entry");
            TextInput.onChange((value: string) => {
                this.keywords = value;
            });
            TextInput.backgroundColor('#FFFFFF');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.keywords) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777430, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/DeviceSearch.ets(23:7)", "entry");
                        Image.width(16);
                        Image.margin({ right: 10 });
                        Image.onClick(() => {
                            this.cleanKeywords();
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class DeviceSearchPreview extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__keywords = new ObservedPropertySimplePU('1', this, "keywords");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceSearchPreview_Params) {
        if (params.keywords !== undefined) {
            this.keywords = params.keywords;
        }
    }
    updateStateVars(params: DeviceSearchPreview_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__keywords.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__keywords.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __keywords: ObservedPropertySimplePU<string>;
    get keywords() {
        return this.__keywords.get();
    }
    set keywords(newValue: string) {
        this.__keywords.set(newValue);
    }
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceSearch(this, { keywords: this.__keywords }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/DeviceSearch.ets", line: 47, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            keywords: this.keywords
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "DeviceSearch" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "DeviceSearchPreview", new DeviceSearchPreview(undefined, {}));
    previewComponent();
}
else {
}
