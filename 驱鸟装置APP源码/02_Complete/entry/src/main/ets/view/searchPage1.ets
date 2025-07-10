import {EditDialog} from './EditDialog'
import DeviceSearch from './DeviceSearch'
import DeviceDate from '../viewmodel/DeviceData'
import DeviceItem from '../viewmodel/DeviceItem'
@Preview
@Entry
@Component
export default struct  SearchPage {
  @State @Watch('onOrderChange') order:boolean=true
  onOrderChange() {
    let orderList:DeviceDate[]=[]
    orderList=this.memoList.sort((a,b)=>{
      if(this.order){
        return a.id-b.id
      }else{
        return b.id-a.id
      }
    })
    this.memoList=orderList
  }
  @State @Watch('onKeywordsChange') keywords:string=''
  onKeywordsChange(){
    if(this.keywords.length==0){
      this.memoList=this.originDevice
      this.onOrderChange()
    }else{
      let resultList:DeviceDate[]=[]
      for(const DeviceItem of this.originDevice){
        if(DeviceItem.name.includes(this.keywords)){
          resultList.push(DeviceItem)
        }
      }
      this.memoList=resultList
    }
  }

  cleanKeywords=()=>{
    this.keywords=''
  }

  @State memoList:DeviceDate[]=[]
  originDevice:DeviceDate[]=[]

  build() {
    Tabs() {
      TabContent() {
        Column(){
          DeviceSearch({keywords:$keywords,cleanKeywords:this.cleanKeywords})
        }
        .width('100%')
        .height('100%')
      }
      .tabBar('摄像头')

      TabContent() {

      }
      .tabBar('雷达')


    }
    .height('100%')
  }
}