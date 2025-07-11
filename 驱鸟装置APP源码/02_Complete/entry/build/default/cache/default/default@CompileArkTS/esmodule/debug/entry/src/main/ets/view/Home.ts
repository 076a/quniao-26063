if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Home_Params {
    NameEdit?: string;
    DescribeEdit?: string;
    showEditDialog?: boolean;
    isAddDialogShow?: boolean;
    memoList?: DeviceDate[];
    originDevice?: DeviceDate[];
    order?: boolean;
    keywords?: string;
    editingMemoIndex?: number;
    currentId?: number;
    cleanKeywords?;
    MemoTable?;
    createMemo?;
    clickMemo?;
    deleteMemo?;
    editMemo?;
    // 打开编辑对话框
    openEditDialog?;
    // 修改笔记的方法
    saveMemo?;
    addContent?: string;
    // 关闭弹窗的方法
    closeDialog?;
    // 添加笔记的方法
    addMemo?;
}
import { EditDialog } from "@bundle:com.example.pageanddata/entry/ets/view/EditDialog";
import { AddDialog } from "@bundle:com.example.pageanddata/entry/ets/view/AddDialog";
import DeviceSearch from "@bundle:com.example.pageanddata/entry/ets/view/DeviceSearch";
import DeviceDate from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceData";
import DeviceItem from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceItem";
import router from "@ohos:router";
import MemoTable from "@bundle:com.example.pageanddata/entry/ets/common/database/MemoTable";
import Logger from "@bundle:com.example.pageanddata/entry/ets/utils/Logger";
export default class Home extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__NameEdit = new ObservedPropertySimplePU('', this, "NameEdit");
        this.__DescribeEdit = new ObservedPropertySimplePU('', this, "DescribeEdit");
        this.__showEditDialog = new ObservedPropertySimplePU(false, this, "showEditDialog");
        this.__isAddDialogShow = new ObservedPropertySimplePU(false, this, "isAddDialogShow");
        this.__memoList = new ObservedPropertyObjectPU([], this, "memoList");
        this.originDevice = [];
        this.__order = new ObservedPropertySimplePU(true, this, "order");
        this.__keywords = new ObservedPropertySimplePU('', this, "keywords");
        this.editingMemoIndex = -1;
        this.__currentId = new ObservedPropertySimplePU(-1, this, "currentId");
        this.cleanKeywords = () => {
            this.keywords = '';
        };
        this.MemoTable = new MemoTable(() => {
        });
        this.createMemo = () => {
            const newMemo: DeviceDate = new DeviceDate(0, this.NameEdit, this.DescribeEdit);
            this.MemoTable.insertData(newMemo, (id: number) => {
                newMemo.id = id;
                this.originDevice.push(newMemo);
                this.memoList = this.originDevice;
            });
            this.closeDialog();
        };
        this.clickMemo = (memo: DeviceDate) => {
            router.pushUrl({
                url: 'view/Page',
                params: { id: memo.id }
            });
        };
        this.deleteMemo = (index: number) => {
            if (index !== -1) {
                this.MemoTable.deleteData(this.originDevice[index], () => {
                    this.originDevice.splice(index, 1);
                    this.memoList = this.originDevice;
                    this.closeDialog();
                });
            }
        };
        this.editMemo = () => {
            if (this.editingMemoIndex >= 0 && this.editingMemoIndex < this.memoList.length) {
                // 获取当前正在编辑的设备
                const currentDevice = this.memoList[this.editingMemoIndex];
                // 创建一个新的设备对象，保留所有原始属性，只更新名称和描述
                const updatedDevice = new DeviceDate(currentDevice.id, this.NameEdit, this.DescribeEdit, currentDevice.status, currentDevice.Color, currentDevice.intervalTime, currentDevice.positionX, currentDevice.positionY);
                // 更新设备数据
                this.MemoTable.updateData(updatedDevice, (result: boolean) => {
                    if (result) {
                        // 重新加载数据
                        this.loadData();
                    }
                    this.closeDialog();
                });
            }
        };
        this.openEditDialog = (index: number) => {
            this.editingMemoIndex = index;
            if (index >= 0 && index < this.memoList.length) {
                const device = this.memoList[index];
                this.NameEdit = device.name;
                this.DescribeEdit = device.description;
                // 记录当前编辑的设备的完整信息
                Logger.info('Home', `Opening edit dialog for device: ${JSON.stringify(device)}`);
            }
            this.showEditDialog = true;
        };
        this.saveMemo = () => {
            if (this.editingMemoIndex !== -1) {
                const memo = this.originDevice[this.editingMemoIndex];
                // 创建一个新的设备对象，保留所有原始属性，只更新名称和描述
                const updatedMemo = new DeviceDate(memo.id, this.NameEdit, this.DescribeEdit, memo.status, memo.Color, memo.intervalTime, memo.positionX, memo.positionY);
                this.MemoTable.updateData(updatedMemo, (result: boolean) => {
                    if (result) {
                        // 重新加载数据
                        this.loadData();
                    }
                    this.closeDialog();
                });
            }
        };
        this.__addContent = new ObservedPropertySimplePU(''
        // 关闭弹窗的方法
        , this, "addContent");
        this.closeDialog = () => {
            this.showEditDialog = false;
            this.addContent = '';
            this.isAddDialogShow = false;
            this.NameEdit = '';
            this.DescribeEdit = '';
            this.editingMemoIndex = -1;
        };
        this.addMemo = () => {
            if (this.NameEdit.length > 0) {
                let maxId = 0;
                // 找出当前最大ID
                if (this.originDevice.length > 0) {
                    this.originDevice.forEach(device => {
                        if (device.id > maxId) {
                            maxId = device.id;
                        }
                    });
                }
                // 创建新设备，确保ID唯一
                const newMemo = new DeviceDate(maxId + 1, this.NameEdit, this.DescribeEdit);
                this.MemoTable.insertData(newMemo, (result: number | boolean) => {
                    if (result) {
                        // 重新加载数据
                        this.loadData();
                    }
                    this.closeDialog();
                });
            }
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("order", this.onOrderChange);
        this.declareWatch("keywords", this.onKeywordsChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Home_Params) {
        if (params.NameEdit !== undefined) {
            this.NameEdit = params.NameEdit;
        }
        if (params.DescribeEdit !== undefined) {
            this.DescribeEdit = params.DescribeEdit;
        }
        if (params.showEditDialog !== undefined) {
            this.showEditDialog = params.showEditDialog;
        }
        if (params.isAddDialogShow !== undefined) {
            this.isAddDialogShow = params.isAddDialogShow;
        }
        if (params.memoList !== undefined) {
            this.memoList = params.memoList;
        }
        if (params.originDevice !== undefined) {
            this.originDevice = params.originDevice;
        }
        if (params.order !== undefined) {
            this.order = params.order;
        }
        if (params.keywords !== undefined) {
            this.keywords = params.keywords;
        }
        if (params.editingMemoIndex !== undefined) {
            this.editingMemoIndex = params.editingMemoIndex;
        }
        if (params.currentId !== undefined) {
            this.currentId = params.currentId;
        }
        if (params.cleanKeywords !== undefined) {
            this.cleanKeywords = params.cleanKeywords;
        }
        if (params.MemoTable !== undefined) {
            this.MemoTable = params.MemoTable;
        }
        if (params.createMemo !== undefined) {
            this.createMemo = params.createMemo;
        }
        if (params.clickMemo !== undefined) {
            this.clickMemo = params.clickMemo;
        }
        if (params.deleteMemo !== undefined) {
            this.deleteMemo = params.deleteMemo;
        }
        if (params.editMemo !== undefined) {
            this.editMemo = params.editMemo;
        }
        if (params.openEditDialog !== undefined) {
            this.openEditDialog = params.openEditDialog;
        }
        if (params.saveMemo !== undefined) {
            this.saveMemo = params.saveMemo;
        }
        if (params.addContent !== undefined) {
            this.addContent = params.addContent;
        }
        if (params.closeDialog !== undefined) {
            this.closeDialog = params.closeDialog;
        }
        if (params.addMemo !== undefined) {
            this.addMemo = params.addMemo;
        }
    }
    updateStateVars(params: Home_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__NameEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__DescribeEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__showEditDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__isAddDialogShow.purgeDependencyOnElmtId(rmElmtId);
        this.__memoList.purgeDependencyOnElmtId(rmElmtId);
        this.__order.purgeDependencyOnElmtId(rmElmtId);
        this.__keywords.purgeDependencyOnElmtId(rmElmtId);
        this.__currentId.purgeDependencyOnElmtId(rmElmtId);
        this.__addContent.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__NameEdit.aboutToBeDeleted();
        this.__DescribeEdit.aboutToBeDeleted();
        this.__showEditDialog.aboutToBeDeleted();
        this.__isAddDialogShow.aboutToBeDeleted();
        this.__memoList.aboutToBeDeleted();
        this.__order.aboutToBeDeleted();
        this.__keywords.aboutToBeDeleted();
        this.__currentId.aboutToBeDeleted();
        this.__addContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    private __showEditDialog: ObservedPropertySimplePU<boolean>; // 新增状态变量控制弹窗显示
    get showEditDialog() {
        return this.__showEditDialog.get();
    }
    set showEditDialog(newValue: boolean) {
        this.__showEditDialog.set(newValue);
    }
    private __isAddDialogShow: ObservedPropertySimplePU<boolean>;
    get isAddDialogShow() {
        return this.__isAddDialogShow.get();
    }
    set isAddDialogShow(newValue: boolean) {
        this.__isAddDialogShow.set(newValue);
    }
    private __memoList: ObservedPropertyObjectPU<DeviceDate[]>;
    get memoList() {
        return this.__memoList.get();
    }
    set memoList(newValue: DeviceDate[]) {
        this.__memoList.set(newValue);
    }
    private originDevice: DeviceDate[];
    private __order: ObservedPropertySimplePU<boolean>;
    get order() {
        return this.__order.get();
    }
    set order(newValue: boolean) {
        this.__order.set(newValue);
    }
    private __keywords: ObservedPropertySimplePU<string>;
    get keywords() {
        return this.__keywords.get();
    }
    set keywords(newValue: string) {
        this.__keywords.set(newValue);
    }
    private editingMemoIndex: number;
    private __currentId: ObservedPropertySimplePU<number>;
    get currentId() {
        return this.__currentId.get();
    }
    set currentId(newValue: number) {
        this.__currentId.set(newValue);
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
    private MemoTable;
    private createMemo;
    private clickMemo;
    private deleteMemo;
    private editMemo;
    // 打开编辑对话框
    private openEditDialog;
    // 修改笔记的方法
    private saveMemo;
    private __addContent: ObservedPropertySimplePU<string>;
    get addContent() {
        return this.__addContent.get();
    }
    set addContent(newValue: string) {
        this.__addContent.set(newValue);
    }
    // 关闭弹窗的方法
    private closeDialog;
    // 页面初始化前向页面加载数据
    aboutToAppear() {
        this.originDevice = [];
        this.memoList = [];
        this.order = false;
        this.keywords = '';
        this.showEditDialog = false;
        this.isAddDialogShow = false;
        this.addContent = '';
        this.editingMemoIndex = -1;
        this.NameEdit = '';
        this.DescribeEdit = '';
        // 确保数据库连接正确初始化
        this.MemoTable.getRdbStore(() => {
            Logger.info('Home', 'Database connection established');
            this.loadData();
        });
    }
    // 加载数据的方法
    loadData() {
        this.MemoTable.query((result: DeviceDate[]) => {
            Logger.info('Home', `Loaded ${result.length} devices from database`);
            this.originDevice = result;
            this.memoList = this.originDevice;
        });
    }
    // 添加笔记的方法
    private addMemo;
    // 在组件销毁时确保正确关闭数据库连接
    aboutToDisappear() {
        // 确保所有挂起的操作都已完成
        setTimeout(() => {
            if (this.MemoTable) {
                this.MemoTable.deviceDateTable.closeRdbStore();
                Logger.info('Home', 'Database connection closed');
            }
        }, 500);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.margin({ top: '48vp', bottom: '12vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('驱鸟装置');
            Text.fontWeight(700);
            Text.fontSize('26fp');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777426, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.width('30vp');
            Image.height('30vp');
            Image.onClick(() => {
                this.isAddDialogShow = true; // 点击时显示弹窗
                this.NameEdit = ''; // 重置设备名称输入框
                this.DescribeEdit = '';
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 根据状态变量决定是否显示EditDialog
            if (this.showEditDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new EditDialog(this, {
                                    NameEdit: this.__NameEdit,
                                    DescribeEdit: this.__DescribeEdit,
                                    onClose: this.closeDialog,
                                    onSave: this.saveMemo
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 251, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        NameEdit: this.NameEdit,
                                        DescribeEdit: this.DescribeEdit,
                                        onClose: this.closeDialog,
                                        onSave: this.saveMemo
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
            If.create();
            if (this.isAddDialogShow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new AddDialog(this, {
                                    NameEdit: this.__NameEdit,
                                    DescribeEdit: this.__DescribeEdit,
                                    onClose: this.closeDialog,
                                    onCreate: this.createMemo
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 259, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        NameEdit: this.NameEdit,
                                        DescribeEdit: this.DescribeEdit,
                                        onClose: this.closeDialog,
                                        onCreate: this.createMemo
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "AddDialog" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DeviceSearch(this, { keywords: this.__keywords, cleanKeywords: this.cleanKeywords }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 266, col: 7 });
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
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
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
                                index: index,
                                onDelete: (idx): void => this.deleteMemo(idx),
                                editCallback: (idx): void => this.openEditDialog(idx)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 273, col: 15 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    memo: memo,
                                    index: index,
                                    onDelete: (idx): void => this.deleteMemo(idx),
                                    editCallback: (idx): void => this.openEditDialog(idx)
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
            this.forEachUpdateFunction(elmtId, this.memoList, forEachItemGenFunction, (memo: DeviceDate) => {
                return memo.name;
            }, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Home";
    }
}
registerNamedRoute(() => new Home(undefined, {}), "", { bundleName: "com.example.pageanddata", moduleName: "entry", pagePath: "view/Home", pageFullPath: "entry/src/main/ets/view/Home", integratedHsp: "false", moduleType: "followWithHap" });
