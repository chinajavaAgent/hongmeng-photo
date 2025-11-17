import { WeakPointManager } from '../common/WeakPointManager'
import router from '@ohos.router'

interface WeakPointDisplayRecord {
  topic: string;
  subject: string;
  accuracy: string;
  color: string;
}

@Entry
@Component
struct WeakPoints {
  @State weakPointRecords: WeakPointDisplayRecord[] = [
    {
      topic: '光的折射',
      subject: '物理',
      accuracy: '60%',
      color: '#FF6B6B'
    } as WeakPointDisplayRecord,
    {
      topic: '分数运算',
      subject: '数学',
      accuracy: '75%',
      color: '#FFA726'
    } as WeakPointDisplayRecord,
    {
      topic: '化学方程式',
      subject: '化学',
      accuracy: '45%',
      color: '#FF6B6B'
    } as WeakPointDisplayRecord,
    {
      topic: '三角形性质',
      subject: '数学',
      accuracy: '82%',
      color: '#4CAF50'
    } as WeakPointDisplayRecord,
    {
      topic: '重力加速度',
      subject: '物理',
      accuracy: '70%',
      color: '#FFA726'
    } as WeakPointDisplayRecord
  ]
  @State selectedFilter: string = '全部'
  @State totalWeakPoints: number = 0
  @State averageAccuracy: string = '0%'
  private weakPointManager: WeakPointManager = WeakPointManager.getInstance()

  aboutToAppear() {
    this.loadWeakPoints()
  }

  loadWeakPoints() {
    this.totalWeakPoints = this.weakPointManager.getWeakPointsCount()
    this.averageAccuracy = this.weakPointManager.getAverageAccuracy()
    // 这里可以从 WeakPointManager 获取真实数据
    // this.weakPointRecords = this.weakPointManager.getAllWeakPoints()
  }

  getFilteredRecords() {
    if (this.selectedFilter === '全部') {
      return this.weakPointRecords
    }
    return this.weakPointRecords.filter(record => record.subject === this.selectedFilter)
  }

  onPractice(topic: string) {
    router.pushUrl({
      url: 'pages/Practice',
      params: {
        topic: topic,
        fromWeakPoints: true
      }
    })
  }

  @Builder
  FilterTabs() {
    Row() {
      ForEach(['全部', '数学', '物理', '化学'], (filter: string) => {
        Button(filter, { type: ButtonType.Capsule })
          .height(36)
          .fontSize(14)
          .backgroundColor(this.selectedFilter === filter ? '#667eea' : '#F5F5F5')
          .fontColor(this.selectedFilter === filter ? '#FFFFFF' : '#666666')
          .onClick(() => {
            this.selectedFilter = filter
          })
          .margin({ right: 12 })
      })
    }
    .width('100%')
    .margin({ bottom: 20 })
  }

  @Builder
  StatisticsCard() {
    Column() {
      Row() {
        Column() {
          Text(this.totalWeakPoints.toString())
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF6B6B')
          Text('薄弱知识点')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('50%')

        Column() {
          Text(this.averageAccuracy)
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#667eea')
          Text('平均正确率')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('50%')
      }
      .width('100%')
      .padding(20)
    }
    .width('90%')
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
    .shadow({
      radius: 12,
      color: '#20000000',
      offsetX: 0,
      offsetY: 6
    })
    .margin({ bottom: 20 })
  }
  @Builder
  WeakPointItem(record: WeakPointDisplayRecord) {
    Row() {
      Stack() {
        Circle({ width: 50, height: 50 })
          .fill(record.subject === '数学' ? '#E8F5E8' :
            record.subject === '物理' ? '#E3F2FD' :
              record.subject === '化学' ? '#FFF3E0' : '#F3E5F5')

        Text(record.subject === '数学' ? '📐' :
          record.subject === '物理' ? '⚗️' :
            record.subject === '化学' ? '🧪' : '📚')
          .fontSize(20)
      }
      .margin({ right: 16 })

      Column() {
        Row() {
          Text(record.topic)
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .fontColor('#2C3E50')

          Blank()

          Text(record.subject)
            .fontSize(12)
            .fontColor('#667eea')
            .padding({
              left: 8,
              right: 8,
              top: 2,
              bottom: 2
            })
            .backgroundColor('#EEF2FF')
            .borderRadius(10)
        }
        .width('100%')
        .margin({ bottom: 8 })

        Row() {
          Text('正确率：')
            .fontSize(12)
            .fontColor('#888')
          Text(record.accuracy)
            .fontSize(14)
            .fontWeight(FontWeight.Medium)
            .fontColor(record.color)
        }
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)

      Button('练习')
        .width(60)
        .height(32)
        .fontSize(12)
        .backgroundColor('#667eea')
        .onClick(() => {
          this.onPractice(record.topic)
        })
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .shadow({
      radius: 8,
      color: '#15000000',
      offsetX: 0,
      offsetY: 4
    })
    .margin({ bottom: 12 })
  }

  build() {
    Column() {
      // 导航栏
      Row() {
        Button('返回')
          .width(60)
          .height(32)
          .fontSize(12)
          .backgroundColor('#F5F5F5')
          .fontColor('#666')
          .onClick(() => {
            router.back()
          })

        Blank()

        Text('薄弱记录')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')

        Blank()

        Column()
          .width(60)
          .height(32)
      }
      .width('100%')
      .padding({
        left: 20,
        right: 20,
        top: 10,
        bottom: 10
      })
      .backgroundColor('#FFFFFF')

      Scroll() {
        Column() {
          // 统计卡片
          this.StatisticsCard()

          // 筛选标签
          this.FilterTabs()

          // 薄弱点列表
          Column() {
            ForEach(this.getFilteredRecords(), (record: WeakPointDisplayRecord) => {
              this.WeakPointItem(record)
            })
          }
          .width('90%')
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
        .padding({ bottom: 20 })
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F8F8F8')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}