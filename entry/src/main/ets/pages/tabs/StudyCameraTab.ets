import router from '@ohos.router'

@Component
export struct StudyCameraTab {
  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Image($r('app.media.home_phone'))
          .width(32)
        Text('拍照学习')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
        Blank()
      }
      .width('90%')
      .padding({ top: 20, bottom: 20 })
      .alignItems(VerticalAlign.Center)

      // 快速操作区域
      Column() {
        Text('快速开始')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .alignSelf(ItemAlign.Start)
          .margin({ bottom: 20 })

        Row() {
          // 拍照学习按钮
          Column() {
            Stack() {
              Circle({ width: 80, height: 80 })
                .fill('#1698CE')
              Text('📸')
                .fontSize(32)
                .fontColor('#FFFFFF')
            }

            Text('拍照识别')
              .fontSize(14)
              .fontColor('#2C3E50')
              .margin({ top: 12 })
          }
          .width('50%')
          .onClick(() => {
            router.pushUrl({ url: 'pages/CameraCapture' })
          })

          // 历史记录按钮
          Column() {
            Stack() {
              Circle({ width: 80, height: 80 })
                .fill('#4CAF50')
              Text('📚')
                .fontSize(32)
                .fontColor('#FFFFFF')
            }

            Text('学习历史')
              .fontSize(14)
              .fontColor('#2C3E50')
              .margin({ top: 12 })
          }
          .width('50%')
          .onClick(() => {
            // 切换到学习历史Tab
            // 通过父组件传递的回调处理
          })
        }
        .width('100%')
        .margin({ bottom: 30 })

        // 今日学习统计
        Column() {
          Text('今日学习')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#2C3E50')
            .alignSelf(ItemAlign.Start)
            .margin({ bottom: 16 })

          Row() {
            Column() {
              Text('0')
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#667eea')
              Text('拍照次数')
                .fontSize(12)
                .fontColor('#888')
                .margin({ top: 4 })
            }
            .width('50%')

            Column() {
              Text('0')
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#4CAF50')
              Text('识别成功')
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