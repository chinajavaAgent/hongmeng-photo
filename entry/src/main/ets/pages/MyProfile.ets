import { UserProfileManager } from '../common/UserProfileManager'
import router from '@ohos.router'

@Entry
@Component
struct MyProfile {
  @State nickname: string = '小学霸'
  @State grade: string = '二年级'
  @State gender: string = '女孩'
  @State learningStage: string = '基础巩固阶段'
  @State studyDays: number = 15
  @State achievements: number = 2
  @State isEditing: boolean = false
  private userProfileManager: UserProfileManager = UserProfileManager.getInstance()

  aboutToAppear() {
    this.loadUserData()
  }

  loadUserData() {
    const profile = this.userProfileManager.getUserProfile()
    if (profile) {
      this.nickname = profile.nickname
      this.grade = profile.grade
      this.gender = profile.gender
      this.learningStage = profile.learningStage
      this.studyDays = profile.totalStudyDays
      this.achievements = this.userProfileManager.getUnlockedAchievements().length
    }
  }

  onEditProfile() {
    this.isEditing = true
  }

  onSaveProfile() {
    this.userProfileManager.updateBasicInfo(this.nickname, this.grade, this.gender)
    this.userProfileManager.updateLearningStage(this.learningStage)
    this.isEditing = false
  }

  onCancelEdit() {
    this.isEditing = false
    this.loadUserData()
  }

  @Builder ProfileHeader() {
    Column() {
      Stack() {
        Circle({ width: 80, height: 80 })
          .fill('#E3F2FD')
        Text(this.gender === '男孩' ? '👦' : '👧')
          .fontSize(40)
      }
      .margin({ bottom: 12 })

      if (this.isEditing) {
        TextInput({ text: this.nickname, placeholder: '输入昵称' })
          .width(200)
          .height(40)
          .fontSize(18)
          .textAlign(TextAlign.Center)
          .backgroundColor('#F5F5F5')
          .borderRadius(8)
          .onChange((value: string) => {
            this.nickname = value
          })
      } else {
        Text(this.nickname)
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
      }

      Text(`${this.grade} · ${this.gender}`)
        .fontSize(14)
        .fontColor('#888')
        .margin({ top: 4 })

      Text(this.learningStage)
        .fontSize(12)
        .fontColor('#667eea')
        .padding({ left: 12, right: 12, top: 4, bottom: 4 })
        .backgroundColor('#EEF2FF')
        .borderRadius(12)
        .margin({ top: 8 })
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

  @Builder LearningStats() {
    Column() {
      Text('📈 学习统计')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#2C3E50')
        .alignSelf(ItemAlign.Start)
        .margin({ bottom: 16 })

      Row() {
        Column() {
          Text(this.studyDays.toString())
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#4CAF50')
          Text('学习天数')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('50%')

        Column() {
          Text(this.achievements.toString())
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#667eea')
          Text('获得成就')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 4 })
        }
        .width('50%')
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
    .margin({ bottom: 20 })
  }

  @Builder BasicInfoSection() {
    Column() {
      Text('📋 基本信息')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#2C3E50')
        .alignSelf(ItemAlign.Start)
        .margin({ bottom: 16 })

      Row() {
        Text('年级：')
          .fontSize(14)
          .fontColor('#666')
          .width(80)
        
        if (this.isEditing) {
          Button(this.grade)
            .width(160)
            .height(36)
            .fontSize(14)
            .onClick(() => {
              // 简单的年级切换
              const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
              const currentIndex = grades.indexOf(this.grade)
              const nextIndex = (currentIndex + 1) % grades.length
              this.grade = grades[nextIndex]
            })
        } else {
          Text(this.grade)
            .fontSize(14)
            .fontColor('#2C3E50')
            .layoutWeight(1)
        }
      }
      .width('100%')
      .margin({ bottom: 12 })

      Row() {
        Text('性别：')
          .fontSize(14)
          .fontColor('#666')
          .width(80)
        
        if (this.isEditing) {
          Button(this.gender)
            .width(160)
            .height(36)
            .fontSize(14)
            .onClick(() => {
              this.gender = this.gender === '男孩' ? '女孩' : '男孩'
            })
        } else {
          Text(this.gender)
            .fontSize(14)
            .fontColor('#2C3E50')
            .layoutWeight(1)
        }
      }
      .width('100%')
      .margin({ bottom: 12 })

      Row() {
        Text('学习阶段：')
          .fontSize(14)
          .fontColor('#666')
          .width(80)
        
        if (this.isEditing) {
          Button(this.learningStage)
            .width(160)
            .height(36)
            .fontSize(14)
            .onClick(() => {
              const stages = ['初学阶段', '基础巩固阶段', '能力提升阶段', '冲刺阶段']
              const currentIndex = stages.indexOf(this.learningStage)
              const nextIndex = (currentIndex + 1) % stages.length
              this.learningStage = stages[nextIndex]
            })
        } else {
          Text(this.learningStage)
            .fontSize(14)
            .fontColor('#2C3E50')
            .layoutWeight(1)
        }
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
    .margin({ bottom: 20 })
  }

  @Builder EditButtons() {
    Row() {
      if (this.isEditing) {
        Button('取消')
          .width('45%')
          .height(44)
          .fontSize(16)
          .backgroundColor('#F5F5F5')
          .fontColor('#666')
          .onClick(() => {
            this.onCancelEdit()
          })
        
        Blank()
        
        Button('保存')
          .width('45%')
          .height(44)
          .fontSize(16)
          .backgroundColor('#4CAF50')
          .onClick(() => {
            this.onSaveProfile()
          })
      } else {
        Button('编辑资料')
          .width('60%')
          .height(44)
          .fontSize(16)
          .backgroundColor('#667eea')
          .onClick(() => {
            this.onEditProfile()
          })
      }
    }
    .width('90%')
    .margin({ bottom: 20 })
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
        
        Text('我的')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
        
        Blank()
        
        Column()
          .width(60)
          .height(32)
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 10, bottom: 10 })
      .backgroundColor('#FFFFFF')

      Scroll() {
        Column() {
          this.ProfileHeader()
          this.LearningStats()
          this.BasicInfoSection()
        }
        .width('100%')
        .padding({ top: 20, bottom: 20 })
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F8F8F8')

      this.EditButtons()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}