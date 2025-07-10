if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlertDialogExample_Params {
}
class AlertDialogExample extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AlertDialogExample_Params) {
    }
    updateStateVars(params: AlertDialogExample_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 5 });
            Column.width('100%');
            Column.margin({ top: 5 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('one button dialog');
            Button.onClick(() => {
                // 建议使用this.getUIContext().showAlertDialog()
                AlertDialog.show({
                    title: 'title',
                    message: 'text',
                    autoCancel: true,
                    alignment: DialogAlignment.Bottom,
                    offset: { dx: 0, dy: -20 },
                    gridCount: 3,
                    confirm: {
                        value: 'button',
                        action: () => {
                            console.info('Button-clicking callback');
                        }
                    },
                    cancel: () => {
                        console.info('Closed callbacks');
                    },
                    onWillDismiss: (dismissDialogAction: DismissDialogAction) => {
                        console.info("reason=" + JSON.stringify(dismissDialogAction.reason));
                        console.log("dialog onWillDismiss");
                        if (dismissDialogAction.reason == DismissReason.PRESS_BACK) {
                            dismissDialogAction.dismiss();
                        }
                        if (dismissDialogAction.reason == DismissReason.TOUCH_OUTSIDE) {
                            dismissDialogAction.dismiss();
                        }
                    }
                });
            });
            Button.backgroundColor(0x317aff);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('two button dialog');
            Button.onClick(() => {
                // 建议使用this.getUIContext().showAlertDialog()
                AlertDialog.show({
                    title: '删除设备',
                    message: '您确认删除此设备吗',
                    autoCancel: true,
                    alignment: DialogAlignment.Bottom,
                    gridCount: 4,
                    offset: { dx: 0, dy: -20 },
                    primaryButton: {
                        value: '取消',
                        action: () => {
                            console.info('Callback when the first button is clicked');
                        }
                    },
                    secondaryButton: {
                        enabled: true,
                        defaultFocus: true,
                        style: DialogButtonStyle.HIGHLIGHT,
                        value: '确认',
                        action: () => {
                            console.info('Callback when the second button is clicked');
                        }
                    },
                    cancel: () => {
                        console.info('Closed callbacks');
                    },
                    onWillDismiss: (dismissDialogAction: DismissDialogAction) => {
                        console.info("reason=" + JSON.stringify(dismissDialogAction.reason));
                        console.log("dialog onWillDismiss");
                        if (dismissDialogAction.reason == DismissReason.PRESS_BACK) {
                            dismissDialogAction.dismiss();
                        }
                        if (dismissDialogAction.reason == DismissReason.TOUCH_OUTSIDE) {
                            dismissDialogAction.dismiss();
                        }
                    }
                });
            });
            Button.backgroundColor(0x317aff);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('three button dialog');
            Button.onClick(() => {
                // 建议使用this.getUIContext().showAlertDialog()
                AlertDialog.show({
                    title: 'title',
                    subtitle: 'subtitle',
                    message: 'text',
                    autoCancel: true,
                    alignment: DialogAlignment.Bottom,
                    gridCount: 4,
                    offset: { dx: 0, dy: -20 },
                    buttonDirection: DialogButtonDirection.HORIZONTAL,
                    buttons: [
                        {
                            value: '按钮',
                            action: () => {
                                console.info('Callback when button1 is clicked');
                            }
                        },
                        {
                            value: '按钮',
                            action: () => {
                                console.info('Callback when button2 is clicked');
                            }
                        },
                        {
                            value: '按钮',
                            enabled: true,
                            defaultFocus: true,
                            style: DialogButtonStyle.HIGHLIGHT,
                            action: () => {
                                console.info('Callback when button3 is clicked');
                            }
                        },
                    ],
                    cancel: () => {
                        console.info('Closed callbacks');
                    },
                    onWillDismiss: (dismissDialogAction: DismissDialogAction) => {
                        console.info("reason=" + JSON.stringify(dismissDialogAction.reason));
                        console.log("dialog onWillDismiss");
                        if (dismissDialogAction.reason == DismissReason.PRESS_BACK) {
                            dismissDialogAction.dismiss();
                        }
                        if (dismissDialogAction.reason == DismissReason.TOUCH_OUTSIDE) {
                            dismissDialogAction.dismiss();
                        }
                    }
                });
            });
            Button.backgroundColor(0x317aff);
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AlertDialogExample";
    }
}
registerNamedRoute(() => new AlertDialogExample(undefined, {}), "", { bundleName: "com.example.pageanddata", moduleName: "entry", pagePath: "view/delectDialog", pageFullPath: "entry/src/main/ets/view/delectDialog", integratedHsp: "false", moduleType: "followWithHap" });
