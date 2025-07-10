@CustomDialog
export struct AutoSettingDialog {
  // 现有属性
  intervalTime?: string;
  positionX?: string;
  positionY?: string;
  controller?: CustomDialogController;
  onSave?: (time: string, x: string, y: string) => void;
  
  // 添加 autoMode 属性
  autoMode?: boolean;
  
  // 组件的其余部分
  ...
} 