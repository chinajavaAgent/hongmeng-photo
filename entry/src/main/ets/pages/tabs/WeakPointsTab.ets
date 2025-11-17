interface WeakPointItem {
  topic: string;
  subject: string;
  accuracy: string;
  color: string;
}

@Component
export struct WeakPointsTab {
  @State weakPointsCount: number = 0
  @State practiceCount: number = 0
  @State studyStreak: number = 0

  aboutToAppear() {
    this.loadStatistics()
  }

  loadStatistics() {
    // 从WeakPointManager获取数据
    this.weakPointsCount = 3 // 模拟数据
    this.practiceCount = 15 // 模拟数据
    this.studyStreak = 7 // 模拟数据
  }

  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Text('📊 薄弱记录')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
      }
      .width('90%')
      .padding({ top: 20, bottom: 20 })

      // 统计卡片
      Row() {
        Column() {
          Text(this.weakPointsCount.toString())
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF6B6B')
          Text('薄弱知识点')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('48%')
        .height(100)
        .justifyContent(FlexAlign.Center)
        .backgroundColor('#FFFFFF')
        .borderRadius(12)
        .shadow({
          radius: 8,
          color: '#15000000',
          offsetX: 0,
          offsetY: 4
        })

        Blank()

        Column() {
          Text(this.practiceCount.toString())
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#4CAF50')
          Text('练习次数')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('48%')
        .height(100)
        .justifyContent(FlexAlign.Center)
        .backgroundColor('#FFFFFF')
        .borderRadius(12)
        .shadow({
          radius: 8,
          color: '#15000000',
          offsetX: 0,
          offsetY: 4
        })
      }
      .width('90%')
      .margin({ bottom: 20 })

      // 薄弱点列表
      Column() {
        Text('薄弱知识点')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .alignSelf(ItemAlign.Start)
          .margin({ bottom: 16 })

        // 模拟薄弱点数据
        Column() {
          ForEach([
            {
              topic: '光的折射',
              subject: '物理',
              accuracy: '60%',
              color: '#FF6B6B'
            },
            {
              topic: '分数运算',
              subject: '数学',
              accuracy: '75%',
              color: '#FFA726'
            },
            {
              topic: '化学方程式',
              subject: '化学',
              accuracy: '45%',
              color: '#FF6B6B'
            }
          ], (item: WeakPointItem) => {
            Row() {
              Column() {
                Text(item.topic)
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .fontColor('#2C3E50')
                  .alignSelf(ItemAlign.Start)
                Text(item.subject)
                  .fontSize(12)
                  .fontColor('#888')
                  .margin({ top: 4 })
                  .alignSelf(ItemAlign.Start)
              }
              .layoutWeight(1)

              Column() {
                Text(item.accuracy)
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(item.color)
                Text('正确率')
                  .fontSize(10)
                  .fontColor('#888')
                  .margin({ top: 2 })
              }
              .alignItems(HorizontalAlign.End)
            }
            .width('100%')
            .padding(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .margin({ bottom: 12 })
            .shadow({
              radius: 8,
              color: '#15000000',
              offsetX: 0,
              offsetY: 4
            })
          })
        }
      }
      .width('90%')
      .padding(20)
      .backgroundColor('#FFFFFF')
      .borderRadius(16)
      .shadow({
        radius: 12,
        color: '#20000000',
        offsetX: 0,
        offsetY: 6
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
    .alignItems(HorizontalAlign.Center)
  }
}