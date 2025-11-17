import { PhotoManager } from '../common/PhotoManager'
import { WeakPointManager } from '../common/WeakPointManager'
import { UserProfileManager } from '../common/UserProfileManager'
import { StudyCameraTab } from './tabs/StudyCameraTab'
import { WeakPointsTab } from './tabs/WeakPointsTab'
import { PracticeTab } from './tabs/PracticeTab'
import { MyProfileTab } from './tabs/MyProfileTab'

@Entry
@Component
struct Index {
  @State selectedTabIndex: number = 0
  private photoManager: PhotoManager = PhotoManager.getInstance()
  private weakPointManager: WeakPointManager = WeakPointManager.getInstance()
  private userProfileManager: UserProfileManager = UserProfileManager.getInstance()

  aboutToAppear() {
    // 初始化逻辑
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

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End }) {
        TabContent() {
          StudyCameraTab()
        }
        .tabBar(this.TabBuilder('拍照学习', 0, $r('app.media.home_phone'), $r('app.media.home_phone')))

        TabContent() {
          WeakPointsTab()
        }
        .tabBar(this.TabBuilder('错题记录', 1, $r('app.media.record'), $r('app.media.record')))

        TabContent() {
          PracticeTab()
        }
        .tabBar(this.TabBuilder('练习', 2, $r('app.media.write'), $r('app.media.write')))

        TabContent() {
          MyProfileTab()
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