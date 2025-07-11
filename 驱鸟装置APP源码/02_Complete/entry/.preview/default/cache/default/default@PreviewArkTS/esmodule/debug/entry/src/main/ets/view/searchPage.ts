if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchPage_Params {
}
export default class SearchPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchPage_Params) {
    }
    updateStateVars(params: SearchPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.debugLine("entry/src/main/ets/view/searchPage.ets(6:5)", "entry");
            Tabs.height('100%');
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('首页的内容');
                    Text.debugLine("entry/src/main/ets/view/searchPage.ets(8:9)", "entry");
                    Text.fontSize(30);
                }, Text);
                Text.pop();
            });
            TabContent.tabBar('首页');
            TabContent.debugLine("entry/src/main/ets/view/searchPage.ets(7:7)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('推荐的内容');
                    Text.debugLine("entry/src/main/ets/view/searchPage.ets(13:9)", "entry");
                    Text.fontSize(30);
                }, Text);
                Text.pop();
            });
            TabContent.tabBar('推荐');
            TabContent.debugLine("entry/src/main/ets/view/searchPage.ets(12:7)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('发现的内容');
                    Text.debugLine("entry/src/main/ets/view/searchPage.ets(18:9)", "entry");
                    Text.fontSize(30);
                }, Text);
                Text.pop();
            });
            TabContent.tabBar('发现');
            TabContent.debugLine("entry/src/main/ets/view/searchPage.ets(17:7)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('我的内容');
                    Text.debugLine("entry/src/main/ets/view/searchPage.ets(23:9)", "entry");
                    Text.fontSize(30);
                }, Text);
                Text.pop();
            });
            TabContent.tabBar("我的");
            TabContent.debugLine("entry/src/main/ets/view/searchPage.ets(22:7)", "entry");
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
    registerNamedRoute(() => new SearchPage(undefined, {}), "", { bundleName: "com.example.pageanddata", moduleName: "entry", pagePath: "view/searchPage", pageFullPath: "entry/src/main/ets/view/searchPage", integratedHsp: "false", moduleType: "followWithHap" });
}
