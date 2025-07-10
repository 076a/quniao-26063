if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    currentIndex?: number;
    tabsController?: TabsController;
}
import Home from "@bundle:com.example.pageanddata/entry/ets/view/Home";
import Setting from "@bundle:com.example.pageanddata/entry/ets/view/Setting";
export function MainPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MainPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 21, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MainPage" });
    }
}
export class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.tabsController = new TabsController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private tabsController: TabsController;
    TabBuilder(title: Resource, index: number, selectedImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor('#F1F3F5');
            Column.justifyContent(FlexAlign.Center);
            Column.height('56vp');
            Column.width('100%');
            Column.onClick(() => {
                this.currentIndex = index;
                this.tabsController.changeIndex(this.currentIndex);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(selectedImg);
            SymbolGlyph.fontSize('24fp');
            SymbolGlyph.renderingStrategy(SymbolRenderingStrategy.MULTIPLE_OPACITY);
            SymbolGlyph.symbolEffect(new BounceSymbolEffect(EffectScope.WHOLE, EffectDirection.UP), this.currentIndex === index ? true : false);
            SymbolGlyph.fontColor(this.currentIndex === index ? ['#0a59f7'] : ['#66000000']);
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.margin({ top: '4vp' });
            Text.fontSize(10);
            Text.fontWeight(500);
            Text.fontColor(this.currentIndex === index ? '#0a59f7' : '#66000000');
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Tabs.create({
                        barPosition: BarPosition.End,
                        controller: this.tabsController
                    });
                    Tabs.margin({ bottom: '64vp' });
                    Tabs.width('100%');
                    Tabs.height('100%');
                    Tabs.barHeight('80vp');
                    Tabs.barMode(BarMode.Fixed);
                    Tabs.onChange((index: number) => {
                        this.currentIndex = index;
                    });
                }, Tabs);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new Home(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 64, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "Home" });
                        }
                    });
                    TabContent.padding({
                        left: '12vp',
                        right: '12vp'
                    });
                    TabContent.backgroundColor('#F1F3F5');
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, 0, { "id": 125831534, "type": 40000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        } });
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new Setting(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 74, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "Setting" });
                        }
                    });
                    TabContent.padding({
                        left: '12vp',
                        right: '12vp'
                    });
                    TabContent.backgroundColor('#F1F3F5');
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, 1, { "id": 125831559, "type": 40000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        } });
                }, TabContent);
                TabContent.pop();
                Tabs.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/MainPage" });
            NavDestination.height('100%');
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#F1F3F5');
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("MainPage", wrapBuilder(MainPageBuilder));
    }
})();
