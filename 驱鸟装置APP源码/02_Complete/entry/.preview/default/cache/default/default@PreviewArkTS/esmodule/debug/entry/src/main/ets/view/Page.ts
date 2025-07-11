if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Page_Params {
    intervalTime?: string;
    positionX?: string;
    positionY?: string;
    positionX1?: string;
    positionY1?: string;
    autoMode?: boolean;
    deviceId?: number;
    MemoTable?;
    currentDevice?: DeviceDate | null;
    autoModePreference?: preferences.Preferences | null;
    autoDialogController?: CustomDialogController;
    manualDialogController?: CustomDialogController;
}
interface ManualSettingDialog_Params {
    positionX?: string;
    positionY?: string;
    controller?: CustomDialogController;
    onLaunch?: (x: string, y: string) => void;
    uiContext?: UIContext;
    TAG?: string;
}
interface AutoSettingDialog_Params {
    intervalTime?: string;
    positionX?: string;
    positionY?: string;
    autoMode?: boolean;
    controller?: CustomDialogController;
    onSave?: (time: string, x: string, y: string, autoMode: boolean) => void;
}
import promptAction from "@ohos:promptAction";
import DeviceDate from "@bundle:com.example.pageanddata/entry/ets/viewmodel/DeviceData";
import MemoTable from "@bundle:com.example.pageanddata/entry/ets/common/database/MemoTable";
import router from "@ohos:router";
import Logger from "@bundle:com.example.pageanddata/entry/ets/utils/Logger";
import preferences from "@ohos:data.preferences";
import axios from "@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/index";
import type { AxiosResponse } from "@package:pkg_modules/.ohpm/@ohos+axios@2.2.6/pkg_modules/@ohos/axios/index";
import LogUtils from "@bundle:com.example.pageanddata/entry/ets/utils/Logger";
import CommonConstants from "@bundle:com.example.pageanddata/entry/ets/common/constants/CommonConstants";
interface PostData {
    target_device: string;
    horizon_angle: number;
    vertical_angle: number;
}
// 创建 axios 实例
const instance = axios.create({
    baseURL: "http://10.33.86.16:8080",
    timeout: 5000,
});
class AutoSettingDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__intervalTime = new ObservedPropertySimplePU(" ", this, "intervalTime");
        this.__positionX = new ObservedPropertySimplePU(" ", this, "positionX");
        this.__positionY = new ObservedPropertySimplePU(" ", this, "positionY");
        this.__autoMode = new ObservedPropertySimplePU(false, this, "autoMode");
        this.controller = undefined;
        this.onSave = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AutoSettingDialog_Params) {
        if (params.intervalTime !== undefined) {
            this.intervalTime = params.intervalTime;
        }
        if (params.positionX !== undefined) {
            this.positionX = params.positionX;
        }
        if (params.positionY !== undefined) {
            this.positionY = params.positionY;
        }
        if (params.autoMode !== undefined) {
            this.autoMode = params.autoMode;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onSave !== undefined) {
            this.onSave = params.onSave;
        }
    }
    updateStateVars(params: AutoSettingDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__intervalTime.purgeDependencyOnElmtId(rmElmtId);
        this.__positionX.purgeDependencyOnElmtId(rmElmtId);
        this.__positionY.purgeDependencyOnElmtId(rmElmtId);
        this.__autoMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__intervalTime.aboutToBeDeleted();
        this.__positionX.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        this.__autoMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __intervalTime: ObservedPropertySimplePU<string>;
    get intervalTime() {
        return this.__intervalTime.get();
    }
    set intervalTime(newValue: string) {
        this.__intervalTime.set(newValue);
    }
    private __positionX: ObservedPropertySimplePU<string>;
    get positionX() {
        return this.__positionX.get();
    }
    set positionX(newValue: string) {
        this.__positionX.set(newValue);
    }
    private __positionY: ObservedPropertySimplePU<string>;
    get positionY() {
        return this.__positionY.get();
    }
    set positionY(newValue: string) {
        this.__positionY.set(newValue);
    }
    private __autoMode: ObservedPropertySimplePU<boolean>;
    get autoMode() {
        return this.__autoMode.get();
    }
    set autoMode(newValue: boolean) {
        this.__autoMode.set(newValue);
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onSave: (time: string, x: string, y: string, autoMode: boolean) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Page.ets(37:5)", "entry");
            Column.padding(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("时间间隔");
            Text.debugLine("entry/src/main/ets/view/Page.ets(38:7)", "entry");
            Text.fontSize(16);
            Text.margin({ bottom: 8, top: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "输入时间", text: this.intervalTime });
            TextInput.debugLine("entry/src/main/ets/view/Page.ets(42:7)", "entry");
            TextInput.width('80%');
            TextInput.onChange((value: string) => {
                this.intervalTime = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("X 位置");
            Text.debugLine("entry/src/main/ets/view/Page.ets(48:7)", "entry");
            Text.fontSize(16);
            Text.margin({ top: 16, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "输入X坐标", text: this.positionX.toString() });
            TextInput.debugLine("entry/src/main/ets/view/Page.ets(52:7)", "entry");
            TextInput.width('80%');
            TextInput.onChange((value: string) => {
                this.positionX = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("Y 位置");
            Text.debugLine("entry/src/main/ets/view/Page.ets(58:7)", "entry");
            Text.fontSize(16);
            Text.margin({ top: 16, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "输入Y坐标", text: this.positionY.toString() });
            TextInput.debugLine("entry/src/main/ets/view/Page.ets(62:7)", "entry");
            TextInput.width('80%');
            TextInput.onChange((value: string) => {
                this.positionY = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Page.ets(68:7)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("取消");
            Button.debugLine("entry/src/main/ets/view/Page.ets(69:9)", "entry");
            Button.onClick(() => this.controller?.close());
            Button.margin({ right: 8 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("保存");
            Button.debugLine("entry/src/main/ets/view/Page.ets(73:9)", "entry");
            Button.onClick(() => {
                this.onSave(this.intervalTime, this.positionX, this.positionY, this.autoMode);
                this.controller?.close();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class ManualSettingDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__positionX = new ObservedPropertySimplePU(" ", this, "positionX");
        this.__positionY = new ObservedPropertySimplePU(" ", this, "positionY");
        this.controller = undefined;
        this.onLaunch = () => { };
        this.uiContext = this.getUIContext();
        this.TAG = 'ManualSettingDialog';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ManualSettingDialog_Params) {
        if (params.positionX !== undefined) {
            this.positionX = params.positionX;
        }
        if (params.positionY !== undefined) {
            this.positionY = params.positionY;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onLaunch !== undefined) {
            this.onLaunch = params.onLaunch;
        }
        if (params.uiContext !== undefined) {
            this.uiContext = params.uiContext;
        }
        if (params.TAG !== undefined) {
            this.TAG = params.TAG;
        }
    }
    updateStateVars(params: ManualSettingDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__positionX.purgeDependencyOnElmtId(rmElmtId);
        this.__positionY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__positionX.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __positionX: ObservedPropertySimplePU<string>;
    get positionX() {
        return this.__positionX.get();
    }
    set positionX(newValue: string) {
        this.__positionX.set(newValue);
    }
    private __positionY: ObservedPropertySimplePU<string>;
    get positionY() {
        return this.__positionY.get();
    }
    set positionY(newValue: string) {
        this.__positionY.set(newValue);
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onLaunch: (x: string, y: string) => void;
    private uiContext: UIContext;
    private readonly TAG: string; // 添加TAG用于日志
    //
    // // 添加响应拦截器
    //
    //
    // // 发送发射请求
    // private async sendLaunchRequest(x: string, y: string) {
    //   LogUtils.info(this.TAG, `Attempting to send launch request with coordinates: x=${x}, y=${y}`);
    //
    //   // 输入验证
    //   if (!x || !y) {
    //     LogUtils.warn(this.TAG, 'Invalid input: coordinates cannot be empty');
    //     const toastOpts: ToastOptions = {
    //       message: '请输入有效的坐标值',
    //       duration: 2000
    //     };
    //     prompt.showToast(toastOpts);
    //     return;
    //   }
    //
    //   const horizonAngle = Number(x);
    //   const verticalAngle = Number(y);
    //
    //   if (isNaN(horizonAngle) || isNaN(verticalAngle)) {
    //     LogUtils.warn(this.TAG, `Invalid number format: x=${x}, y=${y}`);
    //     const toastOpts: ToastOptions = {
    //       message: '请输入有效的数字',
    //       duration: 2000
    //     };
    //     prompt.showToast(toastOpts);
    //     return;
    //   }
    //
    //   try {
    //     const requestData: GeneratedObjectLiteralInterface_1 = {
    //       target_device: "motor1",
    //       horizon_angle: horizonAngle,
    //       vertical_angle: verticalAngle
    //     };
    //
    //     LogUtils.info(this.TAG, `Sending request with data: ${JSON.stringify(requestData)}`);
    //
    //     const loadingToast: ToastOptions = {
    //       message: '发射中...',
    //       duration: 2000
    //     };
    //     prompt.showToast(loadingToast);
    //
    //
    //     LogUtils.info(this.TAG, `Launch request successful: ${JSON.stringify(requestData)}`);
    //
    //     const toastOpts: ToastOptions = {
    //       message: '发射成功',
    //       duration: 2000
    //     };
    //     prompt.showToast(toastOpts);
    //
    //     // 保存位置数据并调用回调
    //     LogUtils.info(this.TAG, `Saving coordinates: x=${x}, y=${y}`);
    //     this.onLaunch(x, y);
    //
    //   } catch (error) {
    //     LogUtils.error(this.TAG, `Launch request failed: ${error.message}`);
    //     LogUtils.error(this.TAG, `Error details: ${JSON.stringify(error)}`);
    //
    //     const toastOpts: ToastOptions = {
    //       message: `发射失败：${error.message || '未知错误'}`,
    //       duration: 2000
    //     };
    //     prompt.showToast(toastOpts);
    //   }
    // }
    //
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Page.ets(173:5)", "entry");
            Column.padding(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("X 位置");
            Text.debugLine("entry/src/main/ets/view/Page.ets(174:7)", "entry");
            Text.fontSize(16);
            Text.margin({ top: 20, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "输入X坐标", text: this.positionX.toString() });
            TextInput.debugLine("entry/src/main/ets/view/Page.ets(178:7)", "entry");
            TextInput.width('80%');
            TextInput.onChange((value: string) => {
                this.positionX = value;
                LogUtils.debug(this.TAG, `X coordinate changed to: ${value}`);
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("Y 位置");
            Text.debugLine("entry/src/main/ets/view/Page.ets(185:7)", "entry");
            Text.fontSize(16);
            Text.margin({ top: 16, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: "输入Y坐标", text: this.positionY.toString() });
            TextInput.debugLine("entry/src/main/ets/view/Page.ets(189:7)", "entry");
            TextInput.width('80%');
            TextInput.onChange((value: string) => {
                this.positionY = value;
                LogUtils.debug(this.TAG, `Y coordinate changed to: ${value}`);
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("发射");
            Button.debugLine("entry/src/main/ets/view/Page.ets(196:7)", "entry");
            Button.onClick(() => {
                instance.post<PostData>('/device/pub', {
                    target_device: "motor1",
                    horizon_angle: this.positionX,
                    vertical_angle: this.positionY
                }).then((response: AxiosResponse) => {
                    if (response.data.msg == 'success') {
                        //成功了之后
                        promptAction.showToast({
                            message: '发送成功',
                            duration: 2000,
                            bottom: 50
                        });
                    }
                    else if (response.data.code == 0) {
                        promptAction.showToast({
                            message: response.data.msg,
                            duration: 2000,
                            bottom: 50
                        });
                    }
                });
            });
            Button.margin({ top: 20, bottom: 20 });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class Page extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__intervalTime = new ObservedPropertySimplePU("", this, "intervalTime");
        this.__positionX = new ObservedPropertySimplePU("", this, "positionX");
        this.__positionY = new ObservedPropertySimplePU("", this, "positionY");
        this.__positionX1 = new ObservedPropertySimplePU("", this, "positionX1");
        this.__positionY1 = new ObservedPropertySimplePU("", this, "positionY1");
        this.__autoMode = new ObservedPropertySimplePU(false, this, "autoMode");
        this.deviceId = -1;
        this.MemoTable = new MemoTable(() => { });
        this.currentDevice = null;
        this.autoModePreference = null;
        this.autoDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new AutoSettingDialog(this, {
                    intervalTime: this.intervalTime,
                    positionX: this.positionX,
                    positionY: this.positionY,
                    onSave: (time: string, x: string, y: string) => {
                        this.intervalTime = time;
                        this.positionX = x;
                        this.positionY = y;
                        this.saveDeviceSettings();
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Page.ets", line: 324, col: 14 });
                jsDialog.setController(this.autoDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        intervalTime: this.intervalTime,
                        positionX: this.positionX,
                        positionY: this.positionY,
                        onSave: (time: string, x: string, y: string) => {
                            this.intervalTime = time;
                            this.positionX = x;
                            this.positionY = y;
                            this.saveDeviceSettings();
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            }
        }, this);
        this.manualDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ManualSettingDialog(this, {
                    positionX: this.positionX1,
                    positionY: this.positionY1,
                    onLaunch: (x: string, y: string) => {
                        this.positionX1 = x;
                        this.positionY1 = y;
                        this.saveDeviceSettings();
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Page.ets", line: 338, col: 14 });
                jsDialog.setController(this.manualDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        positionX: this.positionX1,
                        positionY: this.positionY1,
                        onLaunch: (x: string, y: string) => {
                            this.positionX1 = x;
                            this.positionY1 = y;
                            this.saveDeviceSettings();
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Page_Params) {
        if (params.intervalTime !== undefined) {
            this.intervalTime = params.intervalTime;
        }
        if (params.positionX !== undefined) {
            this.positionX = params.positionX;
        }
        if (params.positionY !== undefined) {
            this.positionY = params.positionY;
        }
        if (params.positionX1 !== undefined) {
            this.positionX1 = params.positionX1;
        }
        if (params.positionY1 !== undefined) {
            this.positionY1 = params.positionY1;
        }
        if (params.autoMode !== undefined) {
            this.autoMode = params.autoMode;
        }
        if (params.deviceId !== undefined) {
            this.deviceId = params.deviceId;
        }
        if (params.MemoTable !== undefined) {
            this.MemoTable = params.MemoTable;
        }
        if (params.currentDevice !== undefined) {
            this.currentDevice = params.currentDevice;
        }
        if (params.autoModePreference !== undefined) {
            this.autoModePreference = params.autoModePreference;
        }
        if (params.autoDialogController !== undefined) {
            this.autoDialogController = params.autoDialogController;
        }
        if (params.manualDialogController !== undefined) {
            this.manualDialogController = params.manualDialogController;
        }
    }
    updateStateVars(params: Page_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__intervalTime.purgeDependencyOnElmtId(rmElmtId);
        this.__positionX.purgeDependencyOnElmtId(rmElmtId);
        this.__positionY.purgeDependencyOnElmtId(rmElmtId);
        this.__positionX1.purgeDependencyOnElmtId(rmElmtId);
        this.__positionY1.purgeDependencyOnElmtId(rmElmtId);
        this.__autoMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__intervalTime.aboutToBeDeleted();
        this.__positionX.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        this.__positionX1.aboutToBeDeleted();
        this.__positionY1.aboutToBeDeleted();
        this.__autoMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __intervalTime: ObservedPropertySimplePU<string>;
    get intervalTime() {
        return this.__intervalTime.get();
    }
    set intervalTime(newValue: string) {
        this.__intervalTime.set(newValue);
    }
    private __positionX: ObservedPropertySimplePU<string>;
    get positionX() {
        return this.__positionX.get();
    }
    set positionX(newValue: string) {
        this.__positionX.set(newValue);
    }
    private __positionY: ObservedPropertySimplePU<string>;
    get positionY() {
        return this.__positionY.get();
    }
    set positionY(newValue: string) {
        this.__positionY.set(newValue);
    }
    private __positionX1: ObservedPropertySimplePU<string>;
    get positionX1() {
        return this.__positionX1.get();
    }
    set positionX1(newValue: string) {
        this.__positionX1.set(newValue);
    }
    private __positionY1: ObservedPropertySimplePU<string>;
    get positionY1() {
        return this.__positionY1.get();
    }
    set positionY1(newValue: string) {
        this.__positionY1.set(newValue);
    }
    private __autoMode: ObservedPropertySimplePU<boolean>;
    get autoMode() {
        return this.__autoMode.get();
    }
    set autoMode(newValue: boolean) {
        this.__autoMode.set(newValue);
    }
    private deviceId: number;
    private MemoTable;
    private currentDevice: DeviceDate | null;
    private autoModePreference: preferences.Preferences | null;
    aboutToAppear() {
        // 初始化本地存储
        let context = getContext(this) as Context;
        preferences.getPreferences(context, 'deviceSettings')
            .then((pref: preferences.Preferences) => {
            this.autoModePreference = pref;
            // 读取保存的自动开关状态
            return this.autoModePreference.get(CommonConstants.AUTO_MODE_KEY, false);
        })
            .then((value: preferences.ValueType) => {
            this.autoMode = Boolean(value);
        })
            .catch((err: Error) => {
            Logger.error('Page', `Failed to get preferences: ${err}`);
        });
        // 获取路由参数中的设备索引
        let params = router.getParams();
        // 定义一个接口来描述参数的结构
        interface RouteParams {
            id?: number;
        }
        // 将params转换为RouteParams类型
        const routeParams = params as RouteParams;
        if (routeParams && routeParams.id !== undefined) {
            this.deviceId = routeParams.id;
            Logger.info('Page', `Loading device with ID: ${this.deviceId}`);
            // 初始化数据库并加载设备数据
            this.MemoTable.getRdbStore(() => {
                this.MemoTable.query((result: DeviceDate[]) => {
                    for (let device of result) {
                        if (device.id === this.deviceId) {
                            this.currentDevice = device;
                            Logger.info('Page', `Found device: ${JSON.stringify(device)}`);
                            // 设置页面状态
                            this.intervalTime = device.intervalTime || "";
                            this.positionX = device.positionX || "";
                            this.positionY = device.positionY || "";
                            this.positionX1 = device.positionX || "";
                            this.positionY1 = device.positionY || "";
                            break;
                        }
                    }
                });
            });
        }
    }
    // 修改保存设备设置的方法
    async saveDeviceSettings() {
        if (this.currentDevice) {
            // 保存自动开关状态到本地存储
            if (this.autoModePreference) {
                try {
                    await this.autoModePreference.put(CommonConstants.AUTO_MODE_KEY, this.autoMode);
                    if (this.autoModePreference) {
                        await this.autoModePreference.flush();
                    }
                }
                catch (err) {
                    Logger.error('Page', `Failed to save auto mode state: ${err}`);
                }
            }
            // 保存其他设备数据到数据库
            const updatedDevice = new DeviceDate(this.currentDevice.id, this.currentDevice.name, this.currentDevice.description, this.currentDevice.status, this.currentDevice.Color, this.intervalTime, this.autoMode ? this.positionX : this.positionX1, this.autoMode ? this.positionY : this.positionY1);
        }
    }
    private autoDialogController: CustomDialogController;
    private manualDialogController: CustomDialogController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Page.ets(350:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Page.ets(351:7)", "entry");
            Row.width('100%');
            Row.margin({ top: '48vp', bottom: '12vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('发射设置');
            Text.debugLine("entry/src/main/ets/view/Page.ets(352:9)", "entry");
            Text.fontWeight(700);
            Text.fontSize('26fp');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Page.ets(359:7)", "entry");
            Column.backgroundImage({ "id": 16777409, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
            Column.width('100%');
            Column.height('84%');
            Column.margin({ top: '20vp' });
            Column.borderRadius('40vp');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 自动模式区块
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Page.ets(361:9)", "entry");
            // 自动模式区块
            Column.width('90%');
            // 自动模式区块
            Column.padding(16);
            // 自动模式区块
            Column.border({ width: 2, color: "#1A8DFF" });
            // 自动模式区块
            Column.borderRadius(12);
            // 自动模式区块
            Column.backgroundColor(Color.White);
            // 自动模式区块
            Column.margin({ top: 100 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Page.ets(362:11)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ bottom: '12vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('自动');
            Text.debugLine("entry/src/main/ets/view/Page.ets(363:13)", "entry");
            Text.fontSize(18);
            Text.fontWeight(600);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.autoMode });
            Toggle.debugLine("entry/src/main/ets/view/Page.ets(367:13)", "entry");
            Toggle.width(40);
            Toggle.height(24);
            Toggle.onChange((isOn: boolean) => {
                this.autoMode = isOn;
                this.saveDeviceSettings();
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`发射间隔：${this.intervalTime}`);
            Text.debugLine("entry/src/main/ets/view/Page.ets(380:11)", "entry");
            Text.fontSize('16fp');
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.margin({ bottom: '12vp' });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`位置：X:${this.positionX} Y:${this.positionY}`);
            Text.debugLine("entry/src/main/ets/view/Page.ets(386:11)", "entry");
            Text.fontSize('16fp');
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.margin({ bottom: '12vp' });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Page.ets(392:11)", "entry");
            Row.justifyContent(FlexAlign.End);
            Row.alignItems(VerticalAlign.Center);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777422, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/Page.ets(393:13)", "entry");
            Image.width(28);
            Image.height(28);
            Image.onClick(() => this.autoDialogController.open());
        }, Image);
        Row.pop();
        // 自动模式区块
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 手动模式区块
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Page.ets(410:9)", "entry");
            // 手动模式区块
            Column.width('90%');
            // 手动模式区块
            Column.padding(16);
            // 手动模式区块
            Column.border({ width: 2, color: Color.Blue });
            // 手动模式区块
            Column.borderRadius(12);
            // 手动模式区块
            Column.backgroundColor(Color.White);
            // 手动模式区块
            Column.margin({ top: 50 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Page.ets(411:11)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ bottom: '12vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('手动');
            Text.debugLine("entry/src/main/ets/view/Page.ets(412:13)", "entry");
            Text.fontSize(18);
            Text.fontWeight(600);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777423, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/Page.ets(416:13)", "entry");
            Image.width(28);
            Image.height(28);
            Image.onClick(() => this.manualDialogController.open());
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`位置：X:${this.positionX1} Y:${this.positionY1}`);
            Text.debugLine("entry/src/main/ets/view/Page.ets(426:11)", "entry");
            Text.fontSize('16fp');
            Text.textAlign(TextAlign.Start);
            Text.width('100%');
            Text.margin({ bottom: '12vp' });
        }, Text);
        Text.pop();
        // 手动模式区块
        Column.pop();
        Column.pop();
        Column.pop();
    }
    aboutToDisappear() {
        // 确保在离开页面前保存最新设置
        this.saveDeviceSettings();
        // 关闭本地存储
        if (this.autoModePreference) {
            this.autoModePreference.flush();
        }
        // 延迟关闭数据库连接
        setTimeout(() => {
            if (this.MemoTable) {
                this.MemoTable.deviceDateTable.closeRdbStore();
                Logger.info('Page', 'Database connection closed');
            }
        }, 500);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Page";
    }
}
registerNamedRoute(() => new Page(undefined, {}), "", { bundleName: "com.example.pageanddata", moduleName: "entry", pagePath: "view/Page", pageFullPath: "entry/src/main/ets/view/Page", integratedHsp: "false", moduleType: "followWithHap" });
