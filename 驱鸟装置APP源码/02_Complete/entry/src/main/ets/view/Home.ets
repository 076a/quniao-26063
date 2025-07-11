import {EditDialog} from './EditDialog'
import {AddDialog} from './AddDialog'
import DeviceSearch from './DeviceSearch'
import DeviceDate from '../viewmodel/DeviceData'
import DeviceItem from '../viewmodel/DeviceItem'
import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import MemoTable from 'ets/common/database/MemoTable'
import Logger from 'ets/utils/Logger';


@Entry
@Component
export default struct Home {


  @State NameEdit: string = '';
  @State DescribeEdit: string = '';
  @State showEditDialog: boolean = false; // 新增状态变量控制弹窗显示
  @State isAddDialogShow: boolean = false
  @State memoList:DeviceDate[]=[

  ]
  originDevice:DeviceDate[]=[]
  @State @Watch('onOrderChange') order:boolean=true
  @State @Watch('onKeywordsChange') keywords:string=''
  editingMemoIndex: number = -1
  @State currentId: number = -1;





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

  private MemoTable = new MemoTable(() => {
  })

  createMemo=()=>{

    const newMemo: DeviceDate = new DeviceDate(0, this.NameEdit, this.DescribeEdit);
    this.MemoTable.insertData(newMemo, (id: number) => {
      newMemo.id = id
      this.originDevice.push(newMemo)
      this.memoList=this.originDevice
    })
    this.closeDialog()


  }
  clickMemo = (memo: DeviceDate) => {
    router.pushUrl({
      url: 'view/Page',
      params: { id: memo.id }
    });
  }

  deleteMemo = (index: number) => {
    if (index!== -1) {
      this.MemoTable.deleteData(this.originDevice[index], () => {
        this.originDevice.splice(index, 1);
        this.memoList = this.originDevice;
        this.closeDialog();
      });
    }
  }
  editMemo = () => {
    if (this.editingMemoIndex >= 0 && this.editingMemoIndex < this.memoList.length) {
      // 获取当前正在编辑的设备
      const currentDevice = this.memoList[this.editingMemoIndex];
      
      // 创建一个新的设备对象，保留所有原始属性，只更新名称和描述
      const updatedDevice = new DeviceDate(
        currentDevice.id,
        this.NameEdit,
        this.DescribeEdit,
        currentDevice.status,
        currentDevice.Color,
        currentDevice.intervalTime,
        currentDevice.positionX,
        currentDevice.positionY
      );
      
      // 更新设备数据
      this.MemoTable.updateData(updatedDevice, (result: boolean) => {
        if (result) {
          // 重新加载数据
          this.loadData();
        }
        this.closeDialog();
      });
    }
  }
  // 打开编辑对话框
  openEditDialog = (index: number) => {
    this.editingMemoIndex = index;
    if (index >= 0 && index < this.memoList.length) {
      const device = this.memoList[index];
      this.NameEdit = device.name;
      this.DescribeEdit = device.description;
      
      // 记录当前编辑的设备的完整信息
      Logger.info('Home', `Opening edit dialog for device: ${JSON.stringify(device)}`);
    }
    this.showEditDialog = true;
  }
  // 修改笔记的方法
  saveMemo = () => {
    if (this.editingMemoIndex!== -1) {
      const memo = this.originDevice[this.editingMemoIndex];
      
      // 创建一个新的设备对象，保留所有原始属性，只更新名称和描述
      const updatedMemo = new DeviceDate(
        memo.id,
        this.NameEdit,
        this.DescribeEdit,
        memo.status,
        memo.Color,
        memo.intervalTime,
        memo.positionX,
        memo.positionY
      );
      
      this.MemoTable.updateData(updatedMemo, (result: boolean) => {
        if (result) {
          // 重新加载数据
          this.loadData();
        }
        this.closeDialog();
      });
    }
  }
  @State addContent: string = ''
  // 关闭弹窗的方法
  closeDialog = () => {
    this.showEditDialog = false
    this.addContent = ''
    this.isAddDialogShow = false
    this.NameEdit = ''
    this.DescribeEdit = ''
    this.editingMemoIndex = -1
  }

  // 页面初始化前向页面加载数据
  aboutToAppear() {
    this.originDevice = []
    this.memoList = []
    this.order = false
    this.keywords = ''
    this.showEditDialog = false
    this.isAddDialogShow = false
    this.addContent = ''
    this.editingMemoIndex = -1
    this.NameEdit = ''
    this.DescribeEdit = ''

    // 确保数据库连接正确初始化
    this.MemoTable.getRdbStore(() => {
      Logger.info('Home', 'Database connection established');
      this.loadData();
    })
  }

  // 加载数据的方法
  loadData() {
    this.MemoTable.query((result: DeviceDate[]) => {
      Logger.info('Home', `Loaded ${result.length} devices from database`);
      
      this.originDevice = result;
      this.memoList = this.originDevice;
    })
  }

  // 添加笔记的方法
  addMemo = () => {
    if (this.NameEdit.length > 0) {
      let maxId = 0;
      // 找出当前最大ID
      if (this.originDevice.length > 0) {
        this.originDevice.forEach(device => {
          if (device.id > maxId) {
            maxId = device.id;
          }
        });
      }
      
      // 创建新设备，确保ID唯一
      const newMemo = new DeviceDate(maxId + 1, this.NameEdit, this.DescribeEdit);
      
      this.MemoTable.insertData(newMemo, (result: number | boolean) => {
        if (result) {
          // 重新加载数据
          this.loadData();
        }
        this.closeDialog();
      });
    }
  }

  // 在组件销毁时确保正确关闭数据库连接
  aboutToDisappear() {
    // 确保所有挂起的操作都已完成
    setTimeout(() => {
      if (this.MemoTable) {
        this.MemoTable.deviceDateTable.closeRdbStore();
        Logger.info('Home', 'Database connection closed');
      }
    }, 500);
  }

  build() {
    Column() {
      Row() {

        Text('驱鸟装置')
          .fontWeight(700)
          .fontSize('26fp');


        Image($r("app.media.add"))
          .width('30vp')
          .height('30vp')
          .onClick(() => {
            this.isAddDialogShow = true; // 点击时显示弹窗
            this.NameEdit = ''; // 重置设备名称输入框
            this.DescribeEdit = '';
          });
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .width('100%')
      .margin({ top: '48vp', bottom: '12vp' });
      // 根据状态变量决定是否显示EditDialog
      if (this.showEditDialog) {
        EditDialog({
          NameEdit: this.NameEdit,
          DescribeEdit: this.DescribeEdit,
          onClose: this.closeDialog,
          onSave: this.saveMemo
        });
      }
      if (this.isAddDialogShow) {
        AddDialog({
          NameEdit: this.NameEdit,
          DescribeEdit: this.DescribeEdit,
          onClose: this.closeDialog,
          onCreate: this.createMemo
        });
      }
      DeviceSearch({keywords:$keywords,cleanKeywords:this.cleanKeywords})

      Scroll(){
        Column(){
          ForEach(
            this.memoList,
            (memo: DeviceDate, index: number) => {
              DeviceItem({
                memo: memo,
                index: index, // 传递index
                onDelete: (idx): void => this.deleteMemo(idx),
                editCallback: (idx): void => this.openEditDialog(idx)
              });
            },
            (memo: DeviceDate) => {
              return memo.name;
            }
          )
        }
      }


    }
    .width('100%')
    .height('100%');
  }


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
}