import { prompt, promptAction, PromptAction } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import DeviceDate from '../viewmodel/DeviceData'
import DeviceItem from '../viewmodel/DeviceItem'
import MemoTable from 'ets/common/database/MemoTable'
import { router } from '@kit.ArkUI';
import Logger from 'ets/utils/Logger';
import preferences from '@ohos.data.preferences';
import axios, { AxiosResponse } from '@ohos/axios'
import  LogUtils  from 'ets/utils/Logger';
import { ToastOptions } from '../common/interfaces/HttpInterfaces';

import CommonConstants from '../common/constants/CommonConstants';


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
// 自动模式弹窗组件
@CustomDialog
struct AutoSettingDialog {
  @State intervalTime: string = " ";
  @State positionX: string = " ";
  @State positionY: string = " ";
  @State autoMode: boolean = false;
  controller?: CustomDialogController;
  private onSave: (time: string, x: string, y: string,autoMode:boolean) => void= () => {};

  build() {
    Column() {
      Text("时间间隔")
        .fontSize(16)
        .margin({ bottom: 8, top: 20 });

      TextInput({ placeholder: "输入时间", text: this.intervalTime })
        .width('80%')
        .onChange((value: string) => {
          this.intervalTime = value;
        });

      Text("X 位置")
        .fontSize(16)
        .margin({ top: 16, bottom: 8 });

      TextInput({ placeholder: "输入X坐标", text: this.positionX.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionX = value;
        });

      Text("Y 位置")
        .fontSize(16)
        .margin({ top: 16, bottom: 8 });

      TextInput({ placeholder: "输入Y坐标", text: this.positionY.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionY = value;
        });

      Row() {
        Button("取消")
          .onClick(() => this.controller?.close())
          .margin({ right: 8 });

        Button("保存")
          .onClick(() => {
            this.onSave(this.intervalTime, this.positionX, this.positionY, this.autoMode);
            this.controller?.close();
          });
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ top: 20, bottom: 20 });
    }
    .padding(10)
  }
}


@CustomDialog
struct ManualSettingDialog {
  @State positionX: string = " ";
  @State positionY: string = " ";
  controller?: CustomDialogController;
  private onLaunch: (x: string, y: string) => void = () => {};
  private uiContext: UIContext = this.getUIContext();
  
  private readonly TAG: string = 'ManualSettingDialog';  // 添加TAG用于日志
  

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


  build() {
    Column() {
      Text("X 位置")
        .fontSize(16)
        .margin({ top: 20, bottom: 8 });

      TextInput({ placeholder: "输入X坐标", text: this.positionX.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionX = value;
          LogUtils.debug(this.TAG, `X coordinate changed to: ${value}`);
        });

      Text("Y 位置")
        .fontSize(16)
        .margin({ top: 16, bottom: 8 });

      TextInput({ placeholder: "输入Y坐标", text: this.positionY.toString() })
        .width('80%')
        .onChange((value: string) => {
          this.positionY = value;
          LogUtils.debug(this.TAG, `Y coordinate changed to: ${value}`);
        });

      Button("发射")
        .onClick(() => {
          instance.post<PostData>('/device/pub', {
            target_device:"motor1",
            horizon_angle:this.positionX,
            vertical_angle:this.positionY
          }).then((response:AxiosResponse)=>{
              if(response.data.msg=='success'){
                //成功了之后
                promptAction.showToast({
                  message: '发送成功',
                  duration: 2000,
                  bottom: 50
                });
              }else if(response.data.code==0){
                promptAction.showToast({
                  message: response.data.msg,
                  duration: 2000,
                  bottom: 50
                });
              }
          })
        })
        .margin({ top: 20, bottom: 20 });
    }
    .padding(10)
  }
}

@Entry
@Component
struct Page {
  @State intervalTime: string = "";
  @State positionX: string = "";
  @State positionY: string = "";
  @State positionX1: string = "";
  @State positionY1: string = "";
  @State autoMode: boolean = false;
  
  private deviceId: number = -1;
  private MemoTable = new MemoTable(() => {});
  private currentDevice: DeviceDate | null = null;
  private autoModePreference: preferences.Preferences | null = null;
  
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
        } catch (err) {
          Logger.error('Page', `Failed to save auto mode state: ${err}`);
        }
      }

      // 保存其他设备数据到数据库
      const updatedDevice = new DeviceDate(
        this.currentDevice.id,
        this.currentDevice.name,
        this.currentDevice.description,
        this.currentDevice.status,
        this.currentDevice.Color,
        this.intervalTime,
        this.autoMode ? this.positionX : this.positionX1,
        this.autoMode ? this.positionY : this.positionY1
      );
      

    }
  }

  private autoDialogController: CustomDialogController = new CustomDialogController({
    builder: AutoSettingDialog({
      intervalTime: this.intervalTime,
      positionX: this.positionX,
      positionY: this.positionY,
      onSave: (time: string, x: string, y: string) => {
        this.intervalTime = time;
        this.positionX = x;
        this.positionY = y;
        this.saveDeviceSettings();
      }
    })
  });

  private manualDialogController: CustomDialogController = new CustomDialogController({
    builder: ManualSettingDialog({
      positionX: this.positionX1,
      positionY: this.positionY1,
      onLaunch: (x: string, y: string) => {
        this.positionX1 = x;
        this.positionY1 = y;
        this.saveDeviceSettings();
      }
    })
  });

  build() {
    Column() {
      Row() {
        Text('发射设置')
          .fontWeight(700)
          .fontSize('26fp');
      }
      .width('100%')
      .margin({ top: '48vp', bottom: '12vp' });
      
      Column() {
        // 自动模式区块
        Column() {
          Row() {
            Text('自动')
              .fontSize(18)
              .fontWeight(600);

            Toggle({ type: ToggleType.Switch, isOn: this.autoMode })
              .width(40)
              .height(24)
              .onChange((isOn: boolean) => {
                this.autoMode = isOn;
                this.saveDeviceSettings();
              });
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

          Text(`位置：X:${this.positionX} Y:${this.positionY}`)
            .fontSize('16fp')
            .textAlign(TextAlign.Start)
            .width('100%')
            .margin({ bottom: '12vp' })

          Row() {
            Image($r('app.media.setting'))
              .width(28)
              .height(28)
              .onClick(() => this.autoDialogController.open());
          }
          .justifyContent(FlexAlign.End)
          .alignItems(VerticalAlign.Center)
          .width('100%')
        }
        .width('90%')
        .padding(16)
        .border({ width: 2, color: "#1A8DFF" })
        .borderRadius(12)
        .backgroundColor(Color.White)
        .margin({ top: 100 });

        // 手动模式区块
        Column() {
          Row() {
            Text('手动')
              .fontSize(18)
              .fontWeight(600);

            Image($r('app.media.fly'))
              .width(28)
              .height(28)
              .onClick(() => this.manualDialogController.open());
          }
          .justifyContent(FlexAlign.SpaceBetween)
          .width('100%')
          .alignItems(VerticalAlign.Center)
          .margin({ bottom: '12vp' })

          Text(`位置：X:${this.positionX1} Y:${this.positionY1}`)
            .fontSize('16fp')
            .textAlign(TextAlign.Start)
            .width('100%')
            .margin({ bottom: '12vp' })
        }
        .width('90%')
        .padding(16)
        .border({ width: 2, color: Color.Blue })
        .borderRadius(12)
        .backgroundColor(Color.White)
        .margin({ top: 50 });
      }
      .backgroundImage($r('app.media.backgroundImage'))
      .backgroundImageSize({ width: '100%', height: '100%' })
      .width('100%')
      .height('84%')
      .margin({ top: '20vp' })
      .borderRadius('40vp')
    }
    .width('100%')
    .height('100%')
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
}