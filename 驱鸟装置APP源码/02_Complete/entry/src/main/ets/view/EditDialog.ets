
@Component
export struct  EditDialog {
  @Link NameEdit: string;
  @Link DescribeEdit: string;
  onClose: () => void = () => {};
  onCreate: () => void = () => {};
  onSave: () => void= () => {};
  build() {

      Stack() {
        Rect()
          .height('100%')
          .width('100%')
          .fill('rgba(0,0,0,0.4)')
          .onClick(() => {
            this.onClose()
          })
        Column() {
          Column() {
            TextArea({
              placeholder: '请输入设备名称',
              text: this.NameEdit
            })
              .onChange((value: string) => {
                this.NameEdit = value;
              })
              .height('20%')
              .margin({ bottom: '20vp' });
            TextArea({
              placeholder: '请输入设备描述',
              text: this.DescribeEdit
            })
              .onChange((value: string) => {
                this.DescribeEdit = value;
              })
              .height('40%');
          }
          .height('80%')
          .padding(20);

          Row() {
            Button("取消")
              .onClick(() => {
                this.onClose();
              });
            Button("确定")
              .onClick(() => {
                this.onSave()
              });
          }
          .margin({ top: '-80vp' })
          .justifyContent(FlexAlign.SpaceAround)
          .width('100%');
        }
        .height('50%')
        .width('100%')
        .backgroundColor(Color.White)
        .borderRadius({ topLeft: 16, topRight: 16 });
      }
      .height('100%')
      .width('100%')
      .alignContent(Alignment.Bottom)

    }


}