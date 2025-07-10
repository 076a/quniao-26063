@Component
export default struct DeviceSearch{
  @Link keywords:string
  cleanKeywords:()=>void = () => {

    this.keywords = '';
  }
  build() {
Row(){
  Row(){
    Image($r("app.media.search"))
      .width(16)
      .margin({left:10})
    TextInput({
      placeholder:'请输入需要查找的设备名称',
      text:this.keywords
    })
      .onChange((value:string)=>{
      this.keywords=value
    })
      .backgroundColor('#FFFFFF')
    if(this.keywords){
      Image($r("app.media.delete2"))
        .width(16)
        .margin({right:10})
        .onClick(()=>{
          this.cleanKeywords()
        })
    }
  }
  .padding({right:52})
  .backgroundColor('#FFFFFF')
  .borderRadius(16)
}
.padding({left:20,right:20})
    .margin({top:12})


  }
}

@Preview
@Component
struct DeviceSearchPreview{
  @State keywords:string='1'
  build() {
    DeviceSearch({keywords:$keywords})
  }
}