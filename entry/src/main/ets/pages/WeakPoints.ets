import router from '@ohos.router'

interface WeakPointRecord {
  id: string;
  subject: string;
  topic: string;
  photoPath: string;
  correctRate: number;
  totalAttempts: number;
  correctAttempts: number;
  timestamp: number;
  lastPracticeTime?: number;
}

@Entry
@Component
struct WeakPoints {
  @State weakPointRecords: WeakPointRecord[] = [
    {
      id: '1',
      subject: '数学',
      topic: '分数运算',
      photoPath: '',
      correctRate: 60,
      totalAttempts: 10,
      correctAttempts: 6,
      timestamp: Date.now() - 86400000,
      lastPracticeTime: Date.now() - 3600000
    },
    {
      id: '2',
      subject: '物理',
      topic: '光的折射',
      photoPath: '',
      correctRate: 45,
      totalAttempts: 8,
      correctAttempts: 3,
      timestamp: Date.now() - 172800000,
      lastPracticeTime: Date.now() - 7200000
    },
    {
      id: '3',
      subject: '数学',
      topic: '方程解法',
      photoPath: '',
      correctRate: 80,
      totalAttempts: 15,
      correctAttempts: 12,
      timestamp: Date.now() - 259200000
    }
  ];
  @State selectedFilter: string = '全部';
  @State showDeleteDialog: boolean = false;
  @State recordToDelete: string = '';

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return Math.floor(diffInHours) + '小时前';
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays + '天前';
    }
  }

  getCorrectRateColor(rate: number): string {
    if (rate >= 80) return '#4CAF50';
    if (rate >= 60) return '#FF9800';
    return '#F44336';
  }

  onDeleteRecord(id: string) {
    this.recordToDelete = id;
    this.showDeleteDialog = true;
  }

  confirmDelete() {
    this.weakPointRecords = this.weakPointRecords.filter(record => record.id !== this.recordToDelete);
    this.showDeleteDialog = false;
    this.recordToDelete = '';
  }

  onPractice(record: WeakPointRecord) {
    router.pushUrl({
      url: 'pages/Practice',
      params: { 
        topic: record.topic,
        subject: record.subject,
        recordId: record.id
      }
    });
  }

  getFilteredRecords(): WeakPointRecord[] {
    if (this.selectedFilter === '全部') {
      return this.weakPointRecords;
    }
    return this.weakPointRecords.filter(record => record.subject === this.selectedFilter);
  }

  getAverageRate(): string {
    if (this.weakPointRecords.length === 0) return '0';
    const avgRate = Math.round(this.weakPointRecords.reduce((sum, record) => sum + record.correctRate, 0) / this.weakPointRecords.length);
    return avgRate.toString();
  }

  @Builder FilterTabs() {
    Row() {
      ForEach(['全部', '数学', '物理', '化学', '语文'], (filter: string) => {
        Button(filter, { type: ButtonType.Capsule })
          .height(36)
          .fontSize(14)
          .backgroundColor(this.selectedFilter === filter ? '#667eea' : '#F5F5F5')
          .fontColor(this.selectedFilter === filter ? '#FFFFFF' : '#666666')
          .onClick(() => {
            this.selectedFilter = filter;
          })
          .margin({ right: 12 })
      })
    }
    .width('100%')
    .margin({ bottom: 20 })
    .padding({ left: 20, right: 20 })
  }

  @Builder StatisticsCard() {
    Column() {
      Text('📊 学习统计')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#2C3E50')
        .margin({ bottom: 16 })

      Row() {
        Column() {
          Text(this.weakPointRecords.length.toString())
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#667eea')
          Text('薄弱知识点')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('33%')
        .alignItems(HorizontalAlign.Center)

        Column() {
          Text(this.weakPointRecords.reduce((sum, record) => sum + record.totalAttempts, 0).toString())
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#4CAF50')
          Text('总练习次数')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('33%')
        .alignItems(HorizontalAlign.Center)

        Column() {
          Text(this.getAverageRate() + '%')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF9800')
          Text('平均正确率')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('33%')
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
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
    .margin({ bottom: 20 })
  }

  @Builder WeakPointItem(record: WeakPointRecord) {
    Column() {
      Row() {
        Stack() {
          // 默认图标，如果有照片则显示照片
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
              .padding({ left: 8, right: 8, top: 2, bottom: 2 })
              .backgroundColor('#EEF2FF')
              .borderRadius(10)
          }
          .width('100%')
          .margin({ bottom: 8 })

          Row() {
            Text('正确率：')
              .fontSize(12)
              .fontColor('#888')
            Text(record.correctRate + '%')
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
              .fontColor(this.getCorrectRateColor(record.correctRate))
            
            Text(' | ')
              .fontSize(12)
              .fontColor('#DDD')
              .margin({ left: 8, right: 8 })
            
            Text(`${record.correctAttempts}/${record.totalAttempts}次正确`)
              .fontSize(12)
              .fontColor('#888')
          }
          .margin({ bottom: 6 })

          Row() {
            Text('添加时间：' + this.formatTimestamp(record.timestamp))
              .fontSize(11)
              .fontColor('#BBB')
            
            if (record.lastPracticeTime) {
              Text(' | 最近练习：' + this.formatTimestamp(record.lastPracticeTime))
                .fontSize(11)
                .fontColor('#BBB')
            }
          }
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
      }
      .width('100%')
      .alignItems(VerticalAlign.Top)

      Row() {
        Button('🗑️ 删除', { type: ButtonType.Capsule })
          .height(32)
          .fontSize(12)
          .backgroundColor('#FFEBEE')
          .fontColor('#F44336')
          .onClick(() => {
            this.onDeleteRecord(record.id);
          })
        
        Blank()
        
        Button('📝 练习', { type: ButtonType.Capsule })
          .height(32)
          .fontSize(12)
          .backgroundColor('#667eea')
          .onClick(() => {
            this.onPractice(record);
          })
      }
      .width('100%')
      .margin({ top: 12 })
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

  @Builder DeleteDialog() {
    if (this.showDeleteDialog) {
      Column() {
        Text('确认删除')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .margin({ bottom: 16 })

        Text('删除后将无法恢复该薄弱点记录')
          .fontSize(14)
          .fontColor('#666')
          .textAlign(TextAlign.Center)
          .margin({ bottom: 24 })

        Row() {
          Button('取消', { type: ButtonType.Capsule })
            .width('45%')
            .height(40)
            .fontSize(14)
            .backgroundColor('#F5F5F5')
            .fontColor('#666')
            .onClick(() => {
              this.showDeleteDialog = false;
            })

          Blank()

          Button('确认删除', { type: ButtonType.Capsule })
            .width('45%')
            .height(40)
            .fontSize(14)
            .backgroundColor('#F44336')
            .onClick(() => {
              this.confirmDelete();
            })
        }
        .width('100%')
      }
      .width(280)
      .padding(24)
      .backgroundColor('#FFFFFF')
      .borderRadius(16)
      .shadow({
        radius: 20,
        color: '#40000000',
        offsetX: 0,
        offsetY: 10
      })
    }
  }

  build() {
    Column() {
      // 导航栏
      Row() {
        Button('返回', { type: ButtonType.Capsule })
          .width(60)
          .height(32)
          .fontSize(12)
          .backgroundColor('#F5F5F5')
          .fontColor('#666')
          .onClick(() => {
            router.back();
          })
        
        Blank()
        
        Text('薄弱点管理')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
        
        Blank()
        
        Button('上传', { type: ButtonType.Capsule })
          .width(60)
          .height(32)
          .fontSize(12)
          .backgroundColor('#667eea')
          .fontColor('#FFFFFF')
          .onClick(() => {
            router.pushUrl({ url: 'pages/ErrorUpload' });
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 10, bottom: 10 })
      .backgroundColor('#FFFFFF')

      if (this.weakPointRecords.length === 0) {
        // 空状态
        Column() {
          Stack() {
            Circle({ width: 120, height: 120 })
              .fill('#F0F8FF')
            Text('📚')
              .fontSize(50)
          }
          .margin({ bottom: 20 })

          Text('暂无薄弱点记录')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor('#2C3E50')
            .margin({ bottom: 8 })

          Text('上传错题照片来建立您的薄弱点档案')
            .fontSize(14)
            .fontColor('#888')
            .textAlign(TextAlign.Center)
            .margin({ bottom: 30 })

          Button('📸 上传错题', { type: ButtonType.Capsule })
            .width(140)
            .height(44)
            .fontSize(16)
            .backgroundColor('#667eea')
            .onClick(() => {
              router.pushUrl({ url: 'pages/ErrorUpload' });
            })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
        .backgroundColor('#F8F8F8')
      } else {
        Scroll() {
          Column() {
            // 统计卡片
            this.StatisticsCard()

            // 筛选标签
            this.FilterTabs()

            // 薄弱点列表
            Column() {
              ForEach(this.getFilteredRecords(), (record: WeakPointRecord) => {
                this.WeakPointItem(record)
              })
            }
            .width('100%')
            .padding({ left: 20, right: 20, bottom: 20 })
          }
          .width('100%')
          .alignItems(HorizontalAlign.Center)
        }
        .width('100%')
        .layoutWeight(1)
        .backgroundColor('#F8F8F8')
      }

      // 删除确认对话框
      if (this.showDeleteDialog) {
        Stack() {
          Column() {}
            .width('100%')
            .height('100%')
            .backgroundColor('#80000000')
            .onClick(() => {
              this.showDeleteDialog = false;
            })

          this.DeleteDialog()
        }
        .width('100%')
        .height('100%')
        .position({ x: 0, y: 0 })
        .zIndex(999)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}