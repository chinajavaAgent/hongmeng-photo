import { PhotoManager } from '../common/PhotoManager'
import { RecognitionService, MockRecognitionService } from '../common/RecognitionService'
import router from '@ohos.router'

@Entry
@Component
struct StudyCamera {
  @State currentPhoto: string = ''
  @State isPhotoCaptured: boolean = false
  @State isTakingPhoto: boolean = false
  @State isAnalyzing: boolean = false
  @State recognizedText: string = ''
  @State showResult: boolean = false
  private photoManager: PhotoManager = PhotoManager.getInstance()
  private recognitionService: RecognitionService = new MockRecognitionService()

  aboutToAppear() {
    this.requestCameraPermission()
  }

  async requestCameraPermission() {
    await this.photoManager.requestPermissions()
  }

  async onTakePhoto() {
    try {
      this.isTakingPhoto = true
      const photoPath = await this.photoManager.takePhoto()
      if (photoPath) {
        this.currentPhoto = photoPath
        this.isPhotoCaptured = true
        // 自动开始识别
        this.onRecognize()
      }
    } catch (error) {
      console.error('Photo capture error:', error)
    } finally {
      this.isTakingPhoto = false
    }
  }

  async onRecognize() {
    this.isAnalyzing = true
    try {
      // 模拟识别过程
      await new Promise<void>(resolve => setTimeout(resolve, 2000))

      // 模拟识别结果
      const studyTopics = ['光的折射', '分数运算', '化学方程式', '三角形性质', '重力加速度']
      this.recognizedText = studyTopics[Math.floor(Math.random() * studyTopics.length)]

      this.showResult = true
    } catch (error) {
      console.error('Recognition error:', error)
    } finally {
      this.isAnalyzing = false
    }
  }

  onRetake() {
    this.currentPhoto = ''
    this.isPhotoCaptured = false
    this.showResult = false
    this.recognizedText = ''
  }

  onStartPractice() {
    if (this.recognizedText) {
      router.pushUrl({
        url: 'pages/Practice',
        params: {
          topic: this.recognizedText,
          fromCamera: true
        }
      })
    }
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

        Text('拍照学习')
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
          // 拍照预览区域
          Stack() {
            if (this.isPhotoCaptured && this.currentPhoto) {
              Image(this.currentPhoto)
                .width('85%')
                .aspectRatio(4 / 3)
                .objectFit(ImageFit.Cover)
                .borderRadius(16)
                .shadow({
                  radius: 16,
                  color: '#20000000',
                  offsetX: 0,
                  offsetY: 8
                })
            } else {
              Column() {
                Text('📷')
                  .fontSize(60)
                  .fontColor('#C0C0C0')
                  .opacity(0.6)
                Text('拍摄学习内容')
                  .fontSize(16)
                  .fontColor('#888')
                  .margin({ top: 20 })
                Text('自动识别知识点')
                  .fontSize(12)
                  .fontColor('#BBB')
                  .margin({ top: 8 })
              }
              .width('85%')
              .aspectRatio(4 / 3)
              .justifyContent(FlexAlign.Center)
              .backgroundColor('#F8F8F8')
              .borderRadius(16)
              .border({
                width: 2,
                color: '#E0E0E0',
                style: BorderStyle.Dashed
              })
            }
          }
          .width('100%')
          .margin({ top: 30 })

          // 识别结果显示
          if (this.showResult && this.recognizedText) {
            Column() {
              Text('🎯 识别结果')
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50')
                .margin({ bottom: 12 })

              Text('识别到：' + this.recognizedText)
                .fontSize(16)
                .fontColor('#4CAF50')
                .textAlign(TextAlign.Center)
                .backgroundColor('#F1F8E9')
                .padding(16)
                .borderRadius(8)
                .width('85%')
                .margin({ bottom: 20 })

              // 开始练习按钮
              Button('开始练习', { type: ButtonType.Capsule })
                .width('75%')
                .height(48)
                .fontSize(16)
                .backgroundColor('#4CAF50')
                .onClick(() => {
                  this.onStartPractice()
                })
            }
            .width('100%')
            .margin({ top: 20 })
            .alignItems(HorizontalAlign.Center)
          }

          // 分析中状态
          if (this.isAnalyzing) {
            Column() {
              LoadingProgress()
                .width(40)
                .height(40)
                .color('#667eea')
              Text('正在识别内容...')
                .fontSize(14)
                .fontColor('#667eea')
                .margin({ top: 12 })
            }
            .margin({ top: 30 })
          }

          // 拍照控制按钮
          if (!this.isPhotoCaptured) {
            Button(this.isTakingPhoto ? '启动中...' : '📸 拍摄', { type: ButtonType.Capsule })
              .width('75%')
              .height(56)
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .backgroundColor('#1698CE')
              .enabled(!this.isTakingPhoto)
              .onClick(() => {
                this.onTakePhoto()
              })
              .shadow({
                radius: 15,
                color: '#30667eea',
                offsetX: 0,
                offsetY: 6
              })
              .margin({ top: 40 })
          }

          // 重拍按钮
          if (this.isPhotoCaptured && !this.isAnalyzing) {
            Button('🔄 重新拍摄', { type: ButtonType.Capsule })
              .width('60%')
              .height(44)
              .fontSize(14)
              .backgroundColor('#FF6B6B')
              .onClick(() => {
                this.onRetake()
              })
              .margin({ top: 20 })
          }
        }
        .width('100%')
        .padding({ bottom: 40 })
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}