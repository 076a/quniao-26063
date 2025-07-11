if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    account?: string;
    password?: string;
    isShowProgress?: boolean;
    timeOutId?: number;
    pathStack?: NavPathStack;
}
import promptAction from "@ohos:promptAction";
function __TextInput__inputStyle(): void {
    TextInput.placeholderColor('#99182431');
    TextInput.height('45vp');
    TextInput.fontSize('18fp');
    TextInput.backgroundColor('#F1F3F5');
    TextInput.width('328vp');
    TextInput.margin({ top: 12 });
}
function __Line__lineStyle(): void {
    Line.width('328vp');
    Line.height('1vp');
    Line.backgroundColor('#33182431');
}
function __Text__blueTextStyle(): void {
    Text.fontColor('#007DFF');
    Text.fontSize('14fp');
    Text.fontWeight(FontWeight.Medium);
}
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__account = new ObservedPropertySimplePU('', this, "account");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__isShowProgress = new ObservedPropertySimplePU(false, this, "isShowProgress");
        this.timeOutId = -1;
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isShowProgress !== undefined) {
            this.isShowProgress = params.isShowProgress;
        }
        if (params.timeOutId !== undefined) {
            this.timeOutId = params.timeOutId;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowProgress.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isShowProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __account: ObservedPropertySimplePU<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isShowProgress: ObservedPropertySimplePU<boolean>;
    get isShowProgress() {
        return this.__isShowProgress.get();
    }
    set isShowProgress(newValue: boolean) {
        this.__isShowProgress.set(newValue);
    }
    private timeOutId: number;
    private pathStack: NavPathStack;
    imageButton(src: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.debugLine("entry/src/main/ets/pages/LoginPage.ets(58:5)", "entry");
            Button.height('48vp');
            Button.width('48vp');
            Button.backgroundColor('#F1F3F5');
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(src);
            Image.debugLine("entry/src/main/ets/pages/LoginPage.ets(59:7)", "entry");
        }, Image);
        Button.pop();
    }
    login(result: boolean): void {
        if (this.account === '' || this.password === '') {
            promptAction.showToast({
                message: { "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }
            });
        }
        else {
            this.isShowProgress = true;
            if (this.timeOutId === -1) {
                this.timeOutId = setTimeout(() => {
                    this.isShowProgress = false;
                    this.timeOutId = -1;
                    this.pathStack.pushPathByName('MainPage', null);
                }, 2000);
            }
        }
    }
    aboutToDisappear() {
        clearTimeout(this.timeOutId);
        this.timeOutId = -1;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pathStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/LoginPage", isUserCreateStack: true });
            Navigation.debugLine("entry/src/main/ets/pages/LoginPage.ets(89:5)", "entry");
            Navigation.backgroundColor('#F1F3F5');
            Navigation.width('100%');
            Navigation.height('100%');
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/LoginPage.ets(90:7)", "entry");
            Column.height('100%');
            Column.width('100%');
            Column.padding({
                left: '12vp',
                right: '12vp',
                bottom: '24vp'
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777433, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/LoginPage.ets(91:9)", "entry");
            Image.width('78vp');
            Image.height('78vp');
            Image.margin({
                top: '150vp',
                bottom: '8vp'
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("注册");
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(98:9)", "entry");
            Text.fontSize('24fp');
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#182431');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("一键注册，开启安全飞行护航之旅");
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(102:9)", "entry");
            Text.fontSize('16fp');
            Text.fontColor('#99182431');
            Text.margin({
                bottom: '30vp',
                top: '8vp'
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/pages/LoginPage.ets(110:9)", "entry");
            TextInput.maxLength(11);
            TextInput.type(InputType.Number);
            __TextInput__inputStyle();
            TextInput.onChange((value: string) => {
                this.account = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/LoginPage.ets(117:9)", "entry");
            __Line__lineStyle();
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777277, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/pages/LoginPage.ets(120:9)", "entry");
            TextInput.maxLength(8);
            TextInput.type(InputType.Password);
            __TextInput__inputStyle();
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/LoginPage.ets(127:9)", "entry");
            __Line__lineStyle();
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '邀请码' });
            TextInput.debugLine("entry/src/main/ets/pages/LoginPage.ets(129:9)", "entry");
            TextInput.maxLength(8);
            TextInput.type(InputType.Number);
            __TextInput__inputStyle();
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create();
            Line.debugLine("entry/src/main/ets/pages/LoginPage.ets(136:9)", "entry");
            __Line__lineStyle();
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/LoginPage.ets(138:9)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('328vp');
            Row.margin({ top: '8vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("邮箱注册");
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(139:11)", "entry");
            __Text__blueTextStyle();
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('注册', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/LoginPage.ets(146:9)", "entry");
            Button.width('328vp');
            Button.height('40vp');
            Button.fontSize('16fp');
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor('#007DFF');
            Button.margin({
                top: '48vp',
                bottom: '12vp'
            });
            Button.onClick(() => {
                this.login(true);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("登录账号");
            Text.debugLine("entry/src/main/ets/pages/LoginPage.ets(159:9)", "entry");
            Text.fontColor('#007DFF');
            Text.fontSize('16fp');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isShowProgress) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/pages/LoginPage.ets(165:11)", "entry");
                        LoadingProgress.color('#182431');
                        LoadingProgress.width('30vp');
                        LoadingProgress.height('30vp');
                        LoadingProgress.margin({ top: '20vp' });
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/LoginPage.ets(172:9)", "entry");
        }, Blank);
        Blank.pop();
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "LoginPage", new LoginPage(undefined, {}));
    previewComponent();
}
else {
    registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.pageanddata", moduleName: "entry", pagePath: "pages/LoginPage", pageFullPath: "entry/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
}
