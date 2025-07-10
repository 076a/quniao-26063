import { EditDialog } from './EditDialog';
import DeviceSearch from './DeviceSearch';
import DeviceDate from '../viewmodel/DeviceData';
import DeviceItem from '../viewmodel/DeviceItem';

@Preview
@Component
export default struct Setting {
  @State @Watch('onOrderChange') order: boolean = true;
  onOrderChange() {
    let orderList: DeviceDate[] = [];
    orderList = this.cameraMemoList.sort((a, b) => {
      if (this.order) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    this.cameraMemoList = orderList;

    orderList = this.radarMemoList.sort((a, b) => {
      if (this.order) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    this.radarMemoList = orderList;
  }
  @State @Watch('onKeywordsChange') keywords: string = '';
  onKeywordsChange() {
    if (this.keywords.length === 0) {
      this.cameraMemoList = this.cameraOriginDevice;
      this.radarMemoList = this.radarOriginDevice;
      this.onOrderChange();
    } else {
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

  cleanKeywords = () => {
    this.keywords = '';
  }

  // 新增摄像头相关列表
  @State cameraMemoList: DeviceDate[] = [];
  @State cameraOriginDevice: DeviceDate[] = [];
  // 新增雷达相关列表
  @State radarMemoList: DeviceDate[] = [];
  @State radarOriginDevice: DeviceDate[] = [];

  @State showEditDialog: boolean = false;
  @State NameEdit: string = '';
  @State DescribeEdit: string = '';
  @State currentId: number = -1;
  @State currentTab: string = '摄像头'; // 新增变量记录当前页签

  createMemo = () => {
    const newMemo: DeviceDate = new DeviceDate(this.currentId, this.NameEdit, this.DescribeEdit);
    if (this.currentTab === '摄像头') {
      this.cameraOriginDevice.push(newMemo);
      this.cameraMemoList = this.cameraOriginDevice;
    } else {
      this.radarOriginDevice.push(newMemo);
      this.radarMemoList = this.radarOriginDevice;
    }
  }

  build() {
    Column() {
      Row() {
        Text('探测装置')
          .fontWeight(700)
          .fontSize('26fp');
        Image($r("app.media.add"))
          .width('30vp')
          .height('30vp')
          .onClick(() => {
            this.showEditDialog = true;
            this.NameEdit = ''; // 重置设备名称输入框
            this.DescribeEdit = '';
          });
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .width('100%')
      .margin({ top: '48vp', bottom: '12vp' });

      if (this.showEditDialog) {
        EditDialog({
          NameEdit: this.NameEdit,
          DescribeEdit: this.DescribeEdit,
          onClose: () => {
            this.showEditDialog = false;
          },
          onCreate: () => {
            let targetList: DeviceDate[];
            if (this.currentTab === '摄像头') {
              targetList = this.cameraOriginDevice;
            } else {
              targetList = this.radarOriginDevice;
            }
            const index = targetList.findIndex((device) => device.id === this.currentId);
            if (index!== -1) {
              targetList.splice(index, 1); // 先删除旧的item
            }
            this.currentId++; // 确保id唯一，可根据实际情况调整
            const updatedMemo: DeviceDate = new DeviceDate(this.currentId, this.NameEdit, this.DescribeEdit);
            if (this.currentTab === '摄像头') {
              this.cameraOriginDevice.push(updatedMemo);
              this.cameraMemoList = this.cameraOriginDevice;
            } else {
              this.radarOriginDevice.push(updatedMemo);
              this.radarMemoList = this.radarOriginDevice;
            }
            console.log('创建设备信息，名称：', this.NameEdit, '描述：', this.DescribeEdit);
            this.showEditDialog = false;
          }
        });
      }

      Column() {
        Tabs() {
          TabContent() {
            Column() {
              DeviceSearch({ keywords: $keywords, cleanKeywords: this.cleanKeywords });
              Scroll() {
                Column() {
                  ForEach(
                    this.cameraMemoList,
                    (memo: DeviceDate, index: number) => {
                      DeviceItem({
                        memo: memo,
                        editCallback: () => {
                          this.currentId = memo.id;
                          this.showEditDialog = true;
                          this.NameEdit = memo.name;
                          this.DescribeEdit = memo.description;
                        },
                        deleteCallback: () => {
                          let targetList:DeviceDate[];
                          if (this.currentTab === '摄像头') {
                            targetList = this.cameraOriginDevice;
                          } else {
                            targetList = this.radarOriginDevice;
                          }
                          if (this.currentId!== -1) {
                            const index = targetList.findIndex((device) => device.id === this.currentId);
                            if (index!== -1) {
                              targetList.splice(index, 1);
                              if (this.currentTab === '摄像头') {
                                this.cameraMemoList = this.cameraOriginDevice;
                              } else {
                                this.radarMemoList = this.radarOriginDevice;
                              }
                            }
                          }
                        }
                      });
                    },
                    (memo: DeviceDate) => {
                      return memo.name;
                    }
                  );
                }
              }
            }
            .width('100%')
            .height('100%')
          }
          .tabBar('摄像头');

          TabContent() {
            Column() {
              DeviceSearch({ keywords: $keywords, cleanKeywords: this.cleanKeywords });
              Scroll() {
                Column() {
                  ForEach(
                    this.radarMemoList,
                    (memo: DeviceDate, index: number) => {
                      DeviceItem({
                        memo: memo,
                        editCallback: () => {
                          this.currentId = memo.id;
                          this.showEditDialog = true;
                          this.NameEdit = memo.name;
                          this.DescribeEdit = memo.description;
                        },
                        deleteCallback: () => {
                          let targetList:DeviceDate[];
                          if (this.currentTab === '摄像头') {
                            targetList = this.cameraOriginDevice;
                          } else {
                            targetList = this.radarOriginDevice;
                          }
                          if (this.currentId!== -1) {
                            const index = targetList.findIndex((device) => device.id === this.currentId);
                            if (index!== -1) {
                              targetList.splice(index, 1);
                              if (this.currentTab === '摄像头') {
                                this.cameraMemoList = this.cameraOriginDevice;
                              } else {
                                this.radarMemoList = this.radarOriginDevice;
                              }
                            }
                          }
                        }
                      });
                    },
                    (memo: DeviceDate) => {
                      return memo.name;
                    }
                  );
                }
              }
            }
            .width('100%')
            .height('100%')
          }
          .tabBar('雷达');
        }
        .onChange((index: number) => {
          this.currentTab = index === 0? '摄像头' : '雷达'; // 更新当前页签
        })
        .height('100%');

      }
      .width('100%')
      .height('100%');
    }
  }
}