if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Setting_Params {
    order?: boolean;
    keywords?: string;
    cleanKeywords?;
    cameraMemoList?: DeviceDate[];
    cameraOriginDevice?: DeviceDate[];
    radarMemoList?: DeviceDate[];
    radarOriginDevice?: DeviceDate[];
    showEditDialog?: boolean;
    NameEdit?: string;
    DescribeEdit?: string;
    currentId?: number;
    currentTab?: string;
    createMemo?;
}
import { EditDialog } from "@bundle:com.example.pageanddata/entry/ets/view/EditDialog";
import DeviceSearch from "@bundle:com.example.pageanddata/entry/ets/view/DeviceSearch";
import DeviceDate from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceData";
import DeviceItem from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceItem";
export default class Setting extends ViewPU {
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
        this.__cameraMemoList = new ObservedPropertyObjectPU([], this, "cameraMemoList");
        this.__cameraOriginDevice = new ObservedPropertyObjectPU([], this, "cameraOriginDevice");
        this.__radarMemoList = new ObservedPropertyObjectPU([], this, "radarMemoList");
        this.__radarOriginDevice = new ObservedPropertyObjectPU([], this, "radarOriginDevice");
        this.__showEditDialog = new ObservedPropertySimplePU(false, this, "showEditDialog");
        this.__NameEdit = new ObservedPropertySimplePU('', this, "NameEdit");
        this.__DescribeEdit = new ObservedPropertySimplePU('', this, "DescribeEdit");
        this.__currentId = new ObservedPropertySimplePU(-1, this, "currentId");
        this.__currentTab = new ObservedPropertySimplePU('摄像头', this, "currentTab");
        this.createMemo = () => {
            const newMemo: DeviceDate = new DeviceDate(this.currentId, this.NameEdit, this.DescribeEdit);
            if (this.currentTab === '摄像头') {
                this.cameraOriginDevice.push(newMemo);
                this.cameraMemoList = this.cameraOriginDevice;
            }
            else {
                this.radarOriginDevice.push(newMemo);
                this.radarMemoList = this.radarOriginDevice;
            }
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("order", this.onOrderChange);
        this.declareWatch("keywords", this.onKeywordsChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Setting_Params) {
        if (params.order !== undefined) {
            this.order = params.order;
        }
        if (params.keywords !== undefined) {
            this.keywords = params.keywords;
        }
        if (params.cleanKeywords !== undefined) {
            this.cleanKeywords = params.cleanKeywords;
        }
        if (params.cameraMemoList !== undefined) {
            this.cameraMemoList = params.cameraMemoList;
        }
        if (params.cameraOriginDevice !== undefined) {
            this.cameraOriginDevice = params.cameraOriginDevice;
        }
        if (params.radarMemoList !== undefined) {
            this.radarMemoList = params.radarMemoList;
        }
        if (params.radarOriginDevice !== undefined) {
            this.radarOriginDevice = params.radarOriginDevice;
        }
        if (params.showEditDialog !== undefined) {
            this.showEditDialog = params.showEditDialog;
        }
        if (params.NameEdit !== undefined) {
            this.NameEdit = params.NameEdit;
        }
        if (params.DescribeEdit !== undefined) {
            this.DescribeEdit = params.DescribeEdit;
        }
        if (params.currentId !== undefined) {
            this.currentId = params.currentId;
        }
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.createMemo !== undefined) {
            this.createMemo = params.createMemo;
        }
    }
    updateStateVars(params: Setting_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__order.purgeDependencyOnElmtId(rmElmtId);
        this.__keywords.purgeDependencyOnElmtId(rmElmtId);
        this.__cameraMemoList.purgeDependencyOnElmtId(rmElmtId);
        this.__cameraOriginDevice.purgeDependencyOnElmtId(rmElmtId);
        this.__radarMemoList.purgeDependencyOnElmtId(rmElmtId);
        this.__radarOriginDevice.purgeDependencyOnElmtId(rmElmtId);
        this.__showEditDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__NameEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__DescribeEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__currentId.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__order.aboutToBeDeleted();
        this.__keywords.aboutToBeDeleted();
        this.__cameraMemoList.aboutToBeDeleted();
        this.__cameraOriginDevice.aboutToBeDeleted();
        this.__radarMemoList.aboutToBeDeleted();
        this.__radarOriginDevice.aboutToBeDeleted();
        this.__showEditDialog.aboutToBeDeleted();
        this.__NameEdit.aboutToBeDeleted();
        this.__DescribeEdit.aboutToBeDeleted();
        this.__currentId.aboutToBeDeleted();
        this.__currentTab.aboutToBeDeleted();
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
        orderList = this.cameraMemoList.sort((a, b) => {
            if (this.order) {
                return a.id - b.id;
            }
            else {
                return b.id - a.id;
            }
        });
        this.cameraMemoList = orderList;
        orderList = this.radarMemoList.sort((a, b) => {
            if (this.order) {
                return a.id - b.id;
            }
            else {
                return b.id - a.id;
            }
        });
        this.radarMemoList = orderList;
    }
    private __keywords: ObservedPropertySimplePU<string>;
    get keywords() {
        return this.__keywords.get();
    }
    set keywords(newValue: string) {
        this.__keywords.set(newValue);
    }
    onKeywordsChange() {
        if (this.keywords.length === 0) {
            this.cameraMemoList = this.cameraOriginDevice;
            this.radarMemoList = this.radarOriginDevice;
            this.onOrderChange();
        }
        else {
            let cameraResultList: DeviceDate[] = [];
            for (const deviceItem of this.cameraOriginDevice) {
                if (deviceItem.name.includes(this.keywords)) {
                    cameraResultList.push(deviceItem);
                }
            }
            this.cameraMemoList = cameraResultList;
            let radarResultList: DeviceDate[] = [];
            for (const deviceItem of this.radarOriginDevice) {
                if (deviceItem.name.includes(this.keywords)) {
                    radarResultList.push(deviceItem);
                }
            }
            this.radarMemoList = radarResultList;
        }
    }
    private cleanKeywords;
    // 新增摄像头相关列表
    private __cameraMemoList: ObservedPropertyObjectPU<DeviceDate[]>;
    get cameraMemoList() {
        return this.__cameraMemoList.get();
    }
    set cameraMemoList(newValue: DeviceDate[]) {
        this.__cameraMemoList.set(newValue);
    }
    private __cameraOriginDevice: ObservedPropertyObjectPU<DeviceDate[]>;
    get cameraOriginDevice() {
        return this.__cameraOriginDevice.get();
    }
    set cameraOriginDevice(newValue: DeviceDate[]) {
        this.__cameraOriginDevice.set(newValue);
    }
    // 新增雷达相关列表
    private __radarMemoList: ObservedPropertyObjectPU<DeviceDate[]>;
    get radarMemoList() {
        return this.__radarMemoList.get();
    }
    set radarMemoList(newValue: DeviceDate[]) {
        this.__radarMemoList.set(newValue);
    }
    private __radarOriginDevice: ObservedPropertyObjectPU<DeviceDate[]>;
    get radarOriginDevice() {
        return this.__radarOriginDevice.get();
    }
    set radarOriginDevice(newValue: DeviceDate[]) {
        this.__radarOriginDevice.set(newValue);
    }
    private __showEditDialog: ObservedPropertySimplePU<boolean>;
    get showEditDialog() {
        return this.__showEditDialog.get();
    }
    set showEditDialog(newValue: boolean) {
        this.__showEditDialog.set(newValue);
    }
    private __NameEdit: ObservedPropertySimplePU<string>;
    get NameEdit() {
        return this.__NameEdit.get();
    }
    set NameEdit(newValue: string) {
        this.__NameEdit.set(newValue);
    }
    private __DescribeEdit: ObservedPropertySimplePU<string>;
    get DescribeEdit() {
        return this.__DescribeEdit.get();
    }
    set DescribeEdit(newValue: string) {
        this.__DescribeEdit.set(newValue);
    }
    private __currentId: ObservedPropertySimplePU<number>;
    get currentId() {
        return this.__currentId.get();
    }
    set currentId(newValue: number) {
        this.__currentId.set(newValue);
    }
    private __currentTab: ObservedPropertySimplePU<string>; // 新增变量记录当前页签
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: string) {
        this.__currentTab.set(newValue);
    }
    private createMemo;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Setting.ets(84:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Setting.ets(85:7)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.margin({ top: '48vp', bottom: '12vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('探测装置');
            Text.debugLine("entry/src/main/ets/view/Setting.ets(86:9)", "entry");
            Text.fontWeight(700);
            Text.fontSize('26fp');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777426, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/Setting.ets(89:9)", "entry");
            Image.width('30vp');
            Image.height('30vp');
            Image.onClick(() => {
                this.showEditDialog = true;
                this.NameEdit = ''; // 重置设备名称输入框
                this.DescribeEdit = '';
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showEditDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new EditDialog(this, {
                                    NameEdit: this.__NameEdit,
                                    DescribeEdit: this.__DescribeEdit,
                                    onClose: () => {
                                        this.showEditDialog = false;
                                    },
                                    onCreate: () => {
                                        let targetList: DeviceDate[];
                                        if (this.currentTab === '摄像头') {
                                            targetList = this.cameraOriginDevice;
                                        }
                                        else {
                                            targetList = this.radarOriginDevice;
                                        }
                                        const index = targetList.findIndex((device) => device.id === this.currentId);
                                        if (index !== -1) {
                                            targetList.splice(index, 1); // 先删除旧的item
                                        }
                                        this.currentId++; // 确保id唯一，可根据实际情况调整
                                        const updatedMemo: DeviceDate = new DeviceDate(this.currentId, this.NameEdit, this.DescribeEdit);
                                        if (this.currentTab === '摄像头') {
                                            this.cameraOriginDevice.push(updatedMemo);
                                            this.cameraMemoList = this.cameraOriginDevice;
                                        }
                                        else {
                                            this.radarOriginDevice.push(updatedMemo);
                                            this.radarMemoList = this.radarOriginDevice;
                                        }
                                        console.log('创建设备信息，名称：', this.NameEdit, '描述：', this.DescribeEdit);
                                        this.showEditDialog = false;
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Setting.ets", line: 103, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        NameEdit: this.NameEdit,
                                        DescribeEdit: this.DescribeEdit,
                                        onClose: () => {
                                            this.showEditDialog = false;
                                        },
                                        onCreate: () => {
                                            let targetList: DeviceDate[];
                                            if (this.currentTab === '摄像头') {
                                                targetList = this.cameraOriginDevice;
                                            }
                                            else {
                                                targetList = this.radarOriginDevice;
                                            }
                                            const index = targetList.findIndex((device) => device.id === this.currentId);
                                            if (index !== -1) {
                                                targetList.splice(index, 1); // 先删除旧的item
                                            }
                                            this.currentId++; // 确保id唯一，可根据实际情况调整
                                            const updatedMemo: DeviceDate = new DeviceDate(this.currentId, this.NameEdit, this.DescribeEdit);
                                            if (this.currentTab === '摄像头') {
                                                this.cameraOriginDevice.push(updatedMemo);
                                                this.cameraMemoList = this.cameraOriginDevice;
                                            }
                                            else {
                                                this.radarOriginDevice.push(updatedMemo);
                                                this.radarMemoList = this.radarOriginDevice;
                                            }
                                            console.log('创建设备信息，名称：', this.NameEdit, '描述：', this.DescribeEdit);
                                            this.showEditDialog = false;
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "EditDialog" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Setting.ets(135:7)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.debugLine("entry/src/main/ets/view/Setting.ets(136:9)", "entry");
            Tabs.onChange((index: number) => {
                this.currentTab = index === 0 ? '摄像头' : '雷达'; // 更新当前页签
            });
            Tabs.height('100%');
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/Setting.ets(138:13)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new DeviceSearch(this, { keywords: this.__keywords, cleanKeywords: this.cleanKeywords }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Setting.ets", line: 139, col: 15 });
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
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.debugLine("entry/src/main/ets/view/Setting.ets(140:15)", "entry");
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/Setting.ets(141:17)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const memo = _item;
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new DeviceItem(this, {
                                        memo: memo,
                                        editCallback: () => {
                                            this.currentId = memo.id;
                                            this.showEditDialog = true;
                                            this.NameEdit = memo.name;
                                            this.DescribeEdit = memo.description;
                                        },
                                        deleteCallback: () => {
                                            let targetList: DeviceDate[];
                                            if (this.currentTab === '摄像头') {
                                                targetList = this.cameraOriginDevice;
                                            }
                                            else {
                                                targetList = this.radarOriginDevice;
                                            }
                                            if (this.currentId !== -1) {
                                                const index = targetList.findIndex((device) => device.id === this.currentId);
                                                if (index !== -1) {
                                                    targetList.splice(index, 1);
                                                    if (this.currentTab === '摄像头') {
                                                        this.cameraMemoList = this.cameraOriginDevice;
                                                    }
                                                    else {
                                                        this.radarMemoList = this.radarOriginDevice;
                                                    }
                                                }
                                            }
                                        }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Setting.ets", line: 145, col: 23 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            memo: memo,
                                            editCallback: () => {
                                                this.currentId = memo.id;
                                                this.showEditDialog = true;
                                                this.NameEdit = memo.name;
                                                this.DescribeEdit = memo.description;
                                            },
                                            deleteCallback: () => {
                                                let targetList: DeviceDate[];
                                                if (this.currentTab === '摄像头') {
                                                    targetList = this.cameraOriginDevice;
                                                }
                                                else {
                                                    targetList = this.radarOriginDevice;
                                                }
                                                if (this.currentId !== -1) {
                                                    const index = targetList.findIndex((device) => device.id === this.currentId);
                                                    if (index !== -1) {
                                                        targetList.splice(index, 1);
                                                        if (this.currentTab === '摄像头') {
                                                            this.cameraMemoList = this.cameraOriginDevice;
                                                        }
                                                        else {
                                                            this.radarMemoList = this.radarOriginDevice;
                                                        }
                                                    }
                                                }
                                            }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        memo: memo
                                    });
                                }
                            }, { name: "DeviceItem" });
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.cameraMemoList, forEachItemGenFunction, (memo: DeviceDate) => {
                        return memo.name;
                    }, true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                Scroll.pop();
                Column.pop();
            });
            TabContent.tabBar('摄像头');
            TabContent.debugLine("entry/src/main/ets/view/Setting.ets(137:11)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/Setting.ets(187:13)", "entry");
                    Column.width('100%');
                    Column.height('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new DeviceSearch(this, { keywords: this.__keywords, cleanKeywords: this.cleanKeywords }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Setting.ets", line: 188, col: 15 });
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
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.debugLine("entry/src/main/ets/view/Setting.ets(189:15)", "entry");
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/Setting.ets(190:17)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const memo = _item;
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new DeviceItem(this, {
                                        memo: memo,
                                        editCallback: () => {
                                            this.currentId = memo.id;
                                            this.showEditDialog = true;
                                            this.NameEdit = memo.name;
                                            this.DescribeEdit = memo.description;
                                        },
                                        deleteCallback: () => {
                                            let targetList: DeviceDate[];
                                            if (this.currentTab === '摄像头') {
                                                targetList = this.cameraOriginDevice;
                                            }
                                            else {
                                                targetList = this.radarOriginDevice;
                                            }
                                            if (this.currentId !== -1) {
                                                const index = targetList.findIndex((device) => device.id === this.currentId);
                                                if (index !== -1) {
                                                    targetList.splice(index, 1);
                                                    if (this.currentTab === '摄像头') {
                                                        this.cameraMemoList = this.cameraOriginDevice;
                                                    }
                                                    else {
                                                        this.radarMemoList = this.radarOriginDevice;
                                                    }
                                                }
                                            }
                                        }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Setting.ets", line: 194, col: 23 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            memo: memo,
                                            editCallback: () => {
                                                this.currentId = memo.id;
                                                this.showEditDialog = true;
                                                this.NameEdit = memo.name;
                                                this.DescribeEdit = memo.description;
                                            },
                                            deleteCallback: () => {
                                                let targetList: DeviceDate[];
                                                if (this.currentTab === '摄像头') {
                                                    targetList = this.cameraOriginDevice;
                                                }
                                                else {
                                                    targetList = this.radarOriginDevice;
                                                }
                                                if (this.currentId !== -1) {
                                                    const index = targetList.findIndex((device) => device.id === this.currentId);
                                                    if (index !== -1) {
                                                        targetList.splice(index, 1);
                                                        if (this.currentTab === '摄像头') {
                                                            this.cameraMemoList = this.cameraOriginDevice;
                                                        }
                                                        else {
                                                            this.radarMemoList = this.radarOriginDevice;
                                                        }
                                                    }
                                                }
                                            }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        memo: memo
                                    });
                                }
                            }, { name: "DeviceItem" });
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.radarMemoList, forEachItemGenFunction, (memo: DeviceDate) => {
                        return memo.name;
                    }, true, false);
                }, ForEach);
                ForEach.pop();
                Column.pop();
                Scroll.pop();
                Column.pop();
            });
            TabContent.tabBar('雷达');
            TabContent.debugLine("entry/src/main/ets/view/Setting.ets(186:11)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "Setting", new Setting(undefined, {}));
    previewComponent();
}
else {
}
