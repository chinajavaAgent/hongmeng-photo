import router from '@ohos.router'

@Component
export struct PracticeTab {
  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Text('🎤 练习')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
      }
      .width('90%')
      .padding({ top: 20, bottom: 20 })

      // 练习模式选择
      Column() {
        Text('选择练习模式')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .alignSelf(ItemAlign.Start)
          .margin({ bottom: 20 })

        // 薄弱点练习
        Row() {
          Stack() {
            Circle({ width: 60, height: 60 })
              .fill('#FF6B6B')
            Text('🎯')
              .fontSize(24)
              .fontColor('#FFFFFF')
          }
          .margin({ right: 16 })

          Column() {
            Text('薄弱点练习')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .fontColor('#2C3E50')
              .alignSelf(ItemAlign.Start)
            Text('针对薄弱知识点专项练习')
              .fontSize(13)
              .fontColor('#888')
              .margin({ top: 4 })
              .alignSelf(ItemAlign.Start)
          }
          .layoutWeight(1)

          Text('→')
            .fontSize(20)
            .fontColor('#CCC')
        }
        .width('100%')
        .height(80)
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
        .onClick(() => {
          router.pushUrl({ url: 'pages/Practice' })
        })

        // 随机练习
        Row() {
          Stack() {
            Circle({ width: 60, height: 60 })
              .fill('#4CAF50')
            Text('🎲')
              .fontSize(24)
              .fontColor('#FFFFFF')
          }
          .margin({ right: 16 })

          Column() {
            Text('随机练习')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .fontColor('#2C3E50')
              .alignSelf(ItemAlign.Start)
            Text('随机抽取题目练习')
              .fontSize(13)
              .fontColor('#888')
              .margin({ top: 4 })
              .alignSelf(ItemAlign.Start)
          }
          .layoutWeight(1)

          Text('→')
            .fontSize(20)
            .fontColor('#CCC')
        }
        .width('100%')
        .height(80)
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
        .onClick(() => {
          router.pushUrl({ url: 'pages/Practice' })
        })
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