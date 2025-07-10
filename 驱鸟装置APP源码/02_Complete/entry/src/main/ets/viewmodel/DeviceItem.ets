import DeviceDate from './DeviceData';
import '../view/EditDialog';
import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import Logger from 'ets/utils/Logger';
import axios ,{ AxiosResponse }from "@ohos/axios"
const instance=axios.create({
  baseURL:'http://10.33.86.16:8080',
  timeout:5000
})

@Component
export default struct DeviceItem {
  index: number= 0;
  @ObjectLink memo: DeviceDate;
  onDelete: (index: number) => void= () => {}
  editCallback: (index: number) => void= () => {}
  onMemoClick :(memo:DeviceDate)=>void= () => {}
  deleteCallback:() => void = () => {};

  aboutToAppear() {
    instance.get('/device/getRadarStatus', {
      params: {
        productKey: 'a18YHu3ff1d',
        deviceName: this.memo.name
      }
    }).then((response: AxiosResponse) => {
      this.memo.status = response.data.data;
      // 根据状态设置颜色
      this.memo.Color = this.memo.status === 'OFFLINE' ? '#808080' : '#00FF00';  // 灰色 : 绿色

    });
  }

  build() {
    Column() {
      Row() {
        Stack() {
          Column() {
            Row() {
              Row() {
                // 使用插值表达式获取正确数据
                Text(`${this.memo.name}`)
                  .fontWeight(600)
                  .fontSize('18fp');
                Image($r("app.media.battery1"))
                  .width('20vp')
                  .height('20vp')
                  .margin({ left: '8vp' })
                  .fillColor(this.memo.Color)  // 使用状态对应的颜色
                // 使用插值表达式获取正确数据
                Text(`${this.memo.status}`)
                  .fontSize('15fp')
                  .margin({ left: '4vp' });
              }
              .justifyContent(FlexAlign.Start)
              .alignItems(VerticalAlign.Center)
              .width('100%');

              Image($r("app.media.DeviceEdit"))
                .width('20vp')
                .height('20vp')
                .margin({ left: '-80vp' })
                .onClick(() => {
                this.editCallback(this.index)
                });
            }
            .justifyContent(FlexAlign.SpaceBetween)
            .width('100%')
            .margin({ top: '20vp', bottom: '12vp' });

            // 使用插值表达式获取正确数据
            Text(`${this.memo.description}`)
              .textAlign(TextAlign.Start)
              .width('100%');
            Row() {
              Image($r('app.media.setting'))
                .width('22vp')
                .height('22vp')
                .margin({right:10})
                .onClick(() => {
                  Logger.info('DeviceItem', `Clicking settings for device ID: ${this.memo.id}`);
                  // 跳转到第二页
                  router.pushUrl({ 
                    url: 'view/Page',
                    params: { id: this.memo.id }
                  }).then(() => {
                    Logger.info('DeviceItem', `Successfully navigated to Page with device ID: ${this.memo.id}`)
                  }).catch((err: BusinessError) => {
                    Logger.error('DeviceItem', `Failed to navigate to Page. Code: ${err.code}, message: ${err.message}`)
                  })
                });
              Image($r('app.media.delete1'))
                .width('18vp')
                .height('18vp')
                .onClick(() => {

                  this.onDelete(this.index)
                });
            }
            .justifyContent(FlexAlign.End)
            .alignItems(VerticalAlign.Center)
            .width('100%')
            .margin({ top: '20vp', bottom: '20vp' });
          }
          .width('90%')

        }
        .padding({left:'16vp',right:'16vp'}) // 添加内边距
        .backgroundColor(Color.White)
        .borderRadius('20vp')
        .onClick(()=>{
          // this.onMemoClick(this.memo)
        })
              }
      .margin({top:'30vp'}) // 为外层Row添加水平内边距

    }
  }
}

@Preview
@Component
struct DeviceItemPreview {
  @State memo: DeviceDate = new DeviceDate(1, '名字', '描述', 'color','#00FF00');

  build() {
    Column() {
      DeviceItem({ memo: this.memo })
        .margin({ bottom: 20 }); // 添加底部间距，实现上下间隔效果
      DeviceItem({ memo: this.memo })
        .margin({ bottom: 20 });
    }
  }
}

function fillColor(Blue: Color) {
  throw new Error('Function not implemented.');
}
