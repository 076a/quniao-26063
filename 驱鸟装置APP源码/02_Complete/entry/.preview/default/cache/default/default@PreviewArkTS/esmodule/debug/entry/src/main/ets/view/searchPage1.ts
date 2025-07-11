if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchPage_Params {
    order?: boolean;
    keywords?: string;
    cleanKeywords?;
    memoList?: DeviceDate[];
    originDevice?: DeviceDate[];
}
import DeviceSearch from "@bundle:com.example.pageanddata/entry/ets/view/DeviceSearch";
import type DeviceDate from '../viewmodel/DeviceData';
export default class SearchPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__order = new ObservedPropertySimplePU(true, this, "order");
        this.__keywords = new ObservedPropertySimplePU('', this, "keywords");
        this.cleanKeywords = () => {
            this.keywords = '';
        };
        this.__memoList = new ObservedPropertyObjectPU([], this, "memoList");
        this.originDevice = [];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchPage_Params) {
        if (params.order !== undefined) {
            this.order = params.order;
        }
        if (params.keywords !== undefined) {
            this.keywords = params.keywords;
        }
        if (params.cleanKeywords !== undefined) {
            this.cleanKeywords = params.cleanKeywords;
        }
        if (params.memoList !== undefined) {
            this.memoList = params.memoList;
        }
        if (params.originDevice !== undefined) {
            this.originDevice = params.originDevice;
        }
    }
    updateStateVars(params: SearchPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__order.purgeDependencyOnElmtId(rmElmtId);
        this.__keywords.purgeDependencyOnElmtId(rmElmtId);
        this.__memoList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__order.aboutToBeDeleted();
        this.__keywords.aboutToBeDeleted();
        this.__memoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __order: ObservedPropertySimplePU<boolean>;
    get order() {
        return this.__order.get();
    }
    set order(newValue: boolean) {
        this.__order.set(newValue);
    }
    onOrderChange() {
        let orderList: DeviceDate[] = [];
        orderList = this.memoList.sort((a, b) => {
            if (this.order) {
                return a.id - b.id;
            }
            else {
                return b.id - a.id;
            }
        });
        this.memoList = orderList;
    }
    private __keywords: ObservedPropertySimplePU<string>;
    get keywords() {
        return this.__keywords.get();
    }
    set keywords(newValue: string) {
        this.__keywords.set(newValue);
    }
    onKeywordsChange() {
        if (this.keywords.length == 0) {
            this.memoList = this.originDevice;
            this.onOrderChange();
        }
        else {
            let resultList: DeviceDate[] = [];
            for (const DeviceItem of this.originDevice) {
                if (DeviceItem.name.includes(this.keywords)) {
                    resultList.push(DeviceItem);
                }
            }
            this.memoList = resultList;
        }
    }
    private cleanKeywords;
    private __memoList: ObservedPropertyObjectPU<DeviceDate[]>;
    get memoList() {
        return this.__memoList.get();
    }
    set memoList(newValue: DeviceDate[]) {
        this.__memoList.set(newValue);
    }
    private originDevice: DeviceDate[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.debugLine("entry/src/main/ets/view/searchPage1.ets(45:5)", "entry");
            Tabs.height('100%');
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/searchPage1.ets(47:9)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new DeviceSearch(this, { keywords: this.__keywords, cleanKeywords: this.cleanKeywords }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/searchPage1.ets", line: 48, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    keywords: this.keywords,
                                    cleanKeywords: this.cleanKeywords
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "DeviceSearch" });
                }
                Column.pop();
            });
            TabContent.tabBar('摄像头');
            TabContent.debugLine("entry/src/main/ets/view/searchPage1.ets(46:7)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create();
            TabContent.tabBar('雷达');
            TabContent.debugLine("entry/src/main/ets/view/searchPage1.ets(55:7)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SearchPage";
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "SearchPage", new SearchPage(undefined, {}));
    previewComponent();
}
else {
    registerNamedRoute(() => new SearchPage(undefined, {}), "", { bundleName: "com.example.pageanddata", moduleName: "entry", pagePath: "view/searchPage1", pageFullPath: "entry/src/main/ets/view/searchPage1", integratedHsp: "false", moduleType: "followWithHap" });
}
