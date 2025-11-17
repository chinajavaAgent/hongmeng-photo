import router from '@ohos.router'

@Component
export struct MyProfileTab {
  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Text('我的')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
        Blank()
        Button() {
          Image($r('app.media.person'))
            .width(20)
            .height(20)
            .fillColor('#FFFFFF')
        }
        .type(ButtonType.Circle)
        .width(48)
        .height(48)
        .backgroundColor('#667eea')
        .onClick(() => {
          router.pushUrl({ url: 'pages/MyProfile' })
        })
      }
      .width('90%')
      .padding({ top: 20, bottom: 20 })
      .alignItems(VerticalAlign.Center)

      // 快速操作区域
      Column() {
        Text('个人信息')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .alignSelf(ItemAlign.Start)
          .margin({ bottom: 20 })

        Row() {
          // 基本信息按钮
          Column() {
            Stack() {
              Circle({ width: 80, height: 80 })
                .fill('#1698CE')
              Text('👤')
                .fontSize(32)
                .fontColor('#FFFFFF')
            }

            Text('基本信息')
              .fontSize(14)
              .fontColor('#2C3E50')
              .margin({ top: 12 })
          }
          .width('50%')
          .onClick(() => {
            router.pushUrl({ url: 'pages/MyProfile' })
          })

          // 学习统计按钮
          Column() {
            Stack() {
              Circle({ width: 80, height: 80 })
                .fill('#4CAF50')
              Text('📊')
                .fontSize(32)
                .fontColor('#FFFFFF')
            }

            Text('学习统计')
              .fontSize(14)
              .fontColor('#2C3E50')
              .margin({ top: 12 })
          }
          .width('50%')
          .onClick(() => {
            router.pushUrl({ url: 'pages/MyProfile' })
          })
        }
        .width('100%')
        .margin({ bottom: 30 })

        // 今日学习统计
        Column() {
          Text('学习概览')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#2C3E50')
            .alignSelf(ItemAlign.Start)
            .margin({ bottom: 16 })

          Row() {
            Column() {
              Text('15')
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#667eea')
              Text('学习天数')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .width('50%')

            Column() {
              Text('2')
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#4CAF50')
              Text('获得成就')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .width('50%')
          }
          .padding(20)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .shadow({
            radius: 8,
            color: '#15000000',
            offsetX: 0,
            offsetY: 4
          })
        }
        .width('100%')
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