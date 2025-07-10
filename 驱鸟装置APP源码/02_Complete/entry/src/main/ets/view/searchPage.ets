@Preview
@Entry
@Component
export default struct  SearchPage {
  build() {
    Tabs() {
      TabContent() {
        Text('首页的内容').fontSize(30)
      }
      .tabBar('首页')

      TabContent() {
        Text('推荐的内容').fontSize(30)
      }
      .tabBar('推荐')

      TabContent() {
        Text('发现的内容').fontSize(30)
      }
      .tabBar('发现')

      TabContent() {
        Text('我的内容').fontSize(30)
      }
      .tabBar("我的")
    }
    .height('100%')
  }
}