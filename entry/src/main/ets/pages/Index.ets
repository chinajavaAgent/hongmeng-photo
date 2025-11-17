import { PhotoManager } from '../common/PhotoManager'
import { WeakPointManager } from '../common/WeakPointManager'
import { UserProfileManager } from '../common/UserProfileManager'
import router from '@ohos.router'

interface WeakPointItem {
  topic: string;
  subject: string;
  accuracy: string;
  color: string;
}

@Entry
@Component
struct Index {
  @State selectedTabIndex: number = 0
  @State weakPointsCount: number = 0
  @State practiceCount: number = 0
  @State studyStreak: number = 0
  private photoManager: PhotoManager = PhotoManager.getInstance()
  private weakPointManager: WeakPointManager = WeakPointManager.getInstance()
  private userProfileManager: UserProfileManager = UserProfileManager.getInstance()

  aboutToAppear() {
    this.loadStatistics()
  }

  loadStatistics() {
    this.weakPointsCount = this.weakPointManager.getWeakPointsCount()
    this.practiceCount = this.weakPointManager.getTotalPracticeCount()
    this.studyStreak = this.weakPointManager.getStudyStreak()
  }

  @Builder
  TabBuilder(title: string, targetIndex: number, normalIcon: Resource, selectedIcon: Resource) {
    Column() {
      Stack() {
        // 背景光晕效果（选中状态）
        if (this.selectedTabIndex === targetIndex) {
          Column() {
            Circle({ width: 48, height: 48 })
              .fill('#667eea')
              .opacity(0.15)
          }
          .width(52)
          .height(52)
          .position({ x: -4, y: -4 })
          .animation({
            duration: 300,
            curve: Curve.EaseInOut
          })

          // 外圈光晕
          Circle({ width: 56, height: 56 })
            .fill('#667eea')
            .opacity(0.05)
            .position({ x: -8, y: -8 })
            .animation({
              duration: 400,
              curve: Curve.EaseInOut
            })
        }

        // 图标背景圆
        Circle({ width: 44, height: 44 })
          .fill(this.selectedTabIndex === targetIndex ? '#F0F4FF' : '#F8F8F8')
          .stroke(this.selectedTabIndex === targetIndex ? '#667eea' : '#E0E0E0')
          .strokeWidth(this.selectedTabIndex === targetIndex ? 2 : 1)
          .strokeDashArray(this.selectedTabIndex === targetIndex ? [] : [2, 4])
          .animation({
            duration: 250,
            curve: Curve.EaseInOut
          })

        // 图标
        Image(this.selectedTabIndex === targetIndex ? selectedIcon : normalIcon)
          .width(30)
          .height(30)
          .objectFit(ImageFit.Contain)
          .animation({
            duration: 250,
            curve: Curve.EaseInOut
          })
      }
      .width(44)
      .height(44)
      .margin({ bottom: 6 })

      // 标题文字
      Text(title)
        .fontSize(this.selectedTabIndex === targetIndex ? 12 : 11)
        .fontWeight(this.selectedTabIndex === targetIndex ? FontWeight.Bold : FontWeight.Medium)
        .fontColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E')
        .letterSpacing(this.selectedTabIndex === targetIndex ? 0.5 : 0)
        .animation({
          duration: 250,
          curve: Curve.EaseInOut
        })
    }
    .width('100%')
    .height(70)
    .justifyContent(FlexAlign.Center)
    .borderRadius(16)
    .margin({
      left: 3,
      right: 3,
      top: 6,
      bottom: 6
    })
    .scale({ x: this.selectedTabIndex === targetIndex ? 1.05 : 1, y: this.selectedTabIndex === targetIndex ? 1.05 : 1 })
    .onClick(() => {
      this.selectedTabIndex = targetIndex
    })
    .animation({
      duration: 250,
      curve: Curve.EaseInOut
    })
  }

  @Builder
  StudyCameraTab() {
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
            this.selectedTabIndex = 1
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

  @Builder
  WeakPointsTab() {
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

  @Builder
  MyProfileTab() {
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

  @Builder
  PracticeTab() {
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

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End }) {
        TabContent() {
          this.StudyCameraTab()
        }
        .tabBar(this.TabBuilder('拍照学习', 0, $r('app.media.home_phone'), $r('app.media.home_phone')))

        TabContent() {
          this.WeakPointsTab()
        }
        .tabBar(this.TabBuilder('错题记录', 1, $r('app.media.record'), $r('app.media.record')))

        TabContent() {
          this.PracticeTab()
        }
        .tabBar(this.TabBuilder('练习', 2, $r('app.media.write'), $r('app.media.write')))

        TabContent() {
          this.MyProfileTab()
        }
        .tabBar(this.TabBuilder('我的', 3, $r('app.media.person'), $r('app.media.person')))
      }
      .animationDuration(300)
      .backgroundColor('#F8F9FA')
      .barHeight(80)
      .barBackgroundColor('#FFFFFF')
      .barBackgroundBlurStyle(BlurStyle.NONE)
      .onChange((index: number) => {
        // Tabs组件的onChange回调中不能直接使用this
        // 通过TabBuilder中的onClick已经处理了tab切换
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}