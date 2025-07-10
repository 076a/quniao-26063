import { LengthMetrics, PromptAction } from '@kit.ArkUI'
import { BusinessError } from '@kit.BasicServicesKit'
@Component
  // 自动模式自定义弹窗组件
@CustomDialog
@Entry
struct AutoSettingDialog {
  @Link intervalTime: string;
  @Link positionX: number;
  @Link positionY: number;
  controller?: CustomDialogController;

  build() {


    Column() {
      Text("时间间隔")
        .fontSize('16fp')
        .margin({
          bottom: '8vp',
          top: '20vp'
        })

      TextInput({ placeholder: "输入时间", text: this.intervalTime })
        .width('80%')
        .onChange((value: string) => {
          this.intervalTime = value;
        })

      Text("X 位置")
        .fontSize('16fp')
        .margin({ top: '16vp', bottom: '8vp' })

      TextInput({ placeholder: "输入X坐标", text: this.positionX.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionX = parseInt(value) || 0;
        })

      Text("Y 位置")
        .fontSize('16fp')
        .margin({ top: '16vp', bottom: '8vp' })

      TextInput({ placeholder: "输入Y坐标", text: this.positionY.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionY = parseInt(value) || 0;
        })

      Row() {
        Button("取消")
          .onClick(() => {
            if (this.controller) {
              this.controller.close();
            }
          })
          .margin({ right: '8vp' })

        Button("保存")
          .onClick(() => {
            if (this.controller) {
              this.controller.close();
            }
          })
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({
        top: '20vp',
        bottom: '20vp'
      })
    }.padding('10vp')
  }
}

// 手动模式自定义弹窗组件
@CustomDialog
struct ManualSettingDialog {
  @Link positionX: number;
  @Link positionY: number;
  controller?: CustomDialogController;
  private uiContext: UIContext = this.getUIContext()
  private promptAction: PromptAction = this.uiContext.getPromptAction()
  build() {
    Column() {
      Text("X 位置")
        .fontSize('16fp')
        .margin({ top: '20vp', bottom: '8vp' })

      TextInput({ placeholder: "输入X坐标", text: this.positionX.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionX = parseInt(value) || 0;
        })

      Text("Y 位置")
        .fontSize('16fp')
        .margin({ top: '16vp', bottom: '8vp' })

      TextInput({ placeholder: "输入Y坐标", text: this.positionY.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionY = parseInt(value) || 0;
        })

      Button("发射")
        .onClick(() => {
          try {
            // 使用 PromptAction 显示发射成功的提示
            this.promptAction.showToast({
              message: '发射成功',
              duration: 2000 // 设置提示持续时间为2秒
            });
          } catch (error) {
            let message = (error as BusinessError).message;
            let code = (error as BusinessError).code;
            console.error(`showToast args error code is ${code}, message is ${message}`);
          }

        })
        .margin({ top: '20vp', bottom: '20vp' })
    }.padding('10vp')
  }
}
@Component
export  struct launchPage {
  @State intervalTime: string = "1小时"; // 时间间隔
  @State positionX: string = ' '// X 坐标
  @State positionY: string = ' '; // Y 坐标
  autoDialogController: CustomDialogController | null = new CustomDialogController({
    builder: AutoSettingDialog({
      intervalTime: $intervalTime,
      positionX: $positionX,
      positionY: $positionY
    }),
    autoCancel: true,
    onWillDismiss: (dismissDialogAction) => {
      if (dismissDialogAction.reason === DismissReason.PRESS_BACK || dismissDialogAction.reason === DismissReason.TOUCH_OUTSIDE) {
        dismissDialogAction.dismiss();
      }
    },
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    gridCount: 4,
    customStyle: false,
    cornerRadius: 10
  });
  manualDialogController: CustomDialogController | null = new CustomDialogController({
    builder: ManualSettingDialog({
      positionX: $positionX,
      positionY: $positionY
    }),
    autoCancel: true,
    onWillDismiss: (dismissDialogAction) => {
      if (dismissDialogAction.reason === DismissReason.PRESS_BACK || dismissDialogAction.reason === DismissReason.TOUCH_OUTSIDE) {
        dismissDialogAction.dismiss();
      }
    },
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    gridCount: 4,
    customStyle: false,
    cornerRadius: 10
  });

  // 在自定义组件即将析构销毁时将dialogController置空
  aboutToDisappear() {
    this.autoDialogController = null;
    this.manualDialogController = null;
  }

  build() {
    Column() {
      Column() {
        Row() {
          Text('自动')
            .fontSize('18fp')
            .fontWeight(600)

          Toggle({ type: ToggleType.Switch })
            .width('40vp')
            .height('24vp')
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .width('100%')
        .alignItems(VerticalAlign.Center)
        .margin({ bottom: '12vp' })

        Text(`发射间隔：${this.intervalTime}`)
          .fontSize('16fp')
          .textAlign(TextAlign.Start)
          .width('100%')
          .margin({ bottom: '12vp' })
        Text(`位置： X:${this.positionX} Y:${this.positionY}`)
          .fontSize('16fp')
          .textAlign(TextAlign.Start)
          .width('100%')
          .margin({ bottom: '12vp' })

        // 设置图标，点击后打开自动模式弹窗
        Row() {
          Image($r('app.media.setting'))
            .width('28vp')
            .height('28vp')
            .onClick(() => {
              if (this.autoDialogController) {
                this.autoDialogController.open();
              }
            })
        }
        .justifyContent(FlexAlign.End)
        .alignItems(VerticalAlign.Center)
        .width('100%')
      }
      .width('90%')
      .padding('16vp')
      .border({ width: '2vp', color: "#1A8DFF" })
      .borderRadius('12vp')
      .backgroundColor(Color.White)
      .margin({ top: '100vp' })

      Column() {
        Row() {
          Text('手动')
            .fontSize('18fp')
            .fontWeight(600)

          Image($r('app.media.fly'))
            .width('28vp')
            .height('28vp')
            .onClick(() => {
              if (this.manualDialogController) {
                this.manualDialogController.open();
              }
            })
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .width('100%')
        .alignItems(VerticalAlign.Center)
        .margin({ bottom: '12vp' })

        Text(`位置： X:${this.positionX} Y:${this.positionY}`)
          .fontSize('16fp')
          .textAlign(TextAlign.Start)
          .width('100%')
          .margin({ bottom: '12vp' })



      }
      .width('90%')
      .padding('16vp')
      .border({ width: '2vp', color: Color.Blue })
      .borderRadius('12vp')
      .backgroundColor(Color.White)
      .margin({ top: '50vp' })
    }
    .backgroundImage($r('app.media.backgroundImage'))
    .backgroundImageSize({ width: '100%', height: '100%' })
    .width('100%')
    .height('84%')
    .margin({ top: '20vp' })
    .borderRadius('40vp')
  }}