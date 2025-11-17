import { camera } from '@kit.CameraKit'
import { image } from '@kit.ImageKit'
import { PhotoManager } from '../common/PhotoManager'
import router from '@ohos.router'

interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: string;
  relatedTopic: string;
  icon: string;
}

@Entry
@Component
struct StudyCamera {
  @State currentPhoto: string = '';
  @State isPhotoCaptured: boolean = false;
  @State isTakingPhoto: boolean = false;
  @State isAnalyzing: boolean = false;
  @State showRecommendation: boolean = false;
  @State recommendationCard: RecommendationCard | null = null;
  @State recognizedObject: string = '';
  private photoManager: PhotoManager = PhotoManager.getInstance();

  // 模拟推荐数据
  private recommendations: RecommendationCard[] = [
    {
      id: '1',
      title: '光的折射',
      description: '学习光线在不同介质中的传播规律，理解彩虹形成原理',
      subject: '物理',
      difficulty: '中等',
      relatedTopic: '光学',
      icon: '🌈'
    },
    {
      id: '2',
      title: '分数的加减运算',
      description: '掌握分数通分与化简，提升计算准确性',
      subject: '数学',
      difficulty: '基础',
      relatedTopic: '分数运算',
      icon: '➕'
    },
    {
      id: '3',
      title: '化学反应',
      description: '了解酸碱中和反应，观察实验现象',
      subject: '化学',
      difficulty: '中等',
      relatedTopic: '化学实验',
      icon: '⚗️'
    }
  ];

  aboutToAppear() {
    this.requestCameraPermission();
  }

  async requestCameraPermission() {
    await this.photoManager.requestPermissions();
  }

  async onTakePhoto() {
    try {
      this.isTakingPhoto = true;
      const photoPath = await this.photoManager.takePhoto();
      if (photoPath) {
        this.currentPhoto = photoPath;
        this.isPhotoCaptured = true;
        // 自动开始识别
        this.onRecognize();
      }
    } catch (error) {
      console.error('Photo capture error:', error);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  async onRecognize() {
    this.isAnalyzing = true;
    try {
      // 模拟识别过程
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      
      // 模拟识别结果
      const recognizedObjects = ['彩虹', '三角形', '化学实验器材'];
      this.recognizedObject = recognizedObjects[Math.floor(Math.random() * recognizedObjects.length)];
      
      // 根据识别结果匹配推荐
      this.matchRecommendation();
    } catch (error) {
      console.error('Recognition error:', error);
    } finally {
      this.isAnalyzing = false;
    }
  }

  matchRecommendation() {
    // 根据识别的物体匹配相应的学习内容
    let matchedCard: RecommendationCard | null = null;
    
    if (this.recognizedObject === '彩虹') {
      matchedCard = this.recommendations[0]; // 光的折射
    } else if (this.recognizedObject === '三角形') {
      matchedCard = this.recommendations[1]; // 分数运算（示例）
    } else if (this.recognizedObject === '化学实验器材') {
      matchedCard = this.recommendations[2]; // 化学反应
    }
    
    if (matchedCard) {
      this.recommendationCard = matchedCard;
      this.showRecommendation = true;
    }
  }

  onRetake() {
    this.currentPhoto = '';
    this.isPhotoCaptured = false;
    this.showRecommendation = false;
    this.recommendationCard = null;
    this.recognizedObject = '';
  }

  onStartPractice() {
    if (this.recommendationCard) {
      router.pushUrl({
        url: 'pages/Practice',
        params: { 
          topic: this.recommendationCard.relatedTopic,
          subject: this.recommendationCard.subject,
          fromRecommendation: true
        }
      });
    }
  }

  onDismissRecommendation() {
    this.showRecommendation = false;
    this.recommendationCard = null;
  }

  @Builder RecommendationAlert() {
    if (this.showRecommendation && this.recommendationCard) {
      Stack() {
        Column() {}
          .width('100%')
          .height('100%')
          .backgroundColor('#80000000')
          .onClick(() => {
            this.onDismissRecommendation();
          })

        Column() {
          // 警告图标
          Stack() {
            Circle({ width: 60, height: 60 })
              .fill('#FF6B6B')
            Text('⚠️')
              .fontSize(30)
          }
          .margin({ bottom: 20 })

          Text('发现薄弱点匹配!')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#2C3E50')
            .margin({ bottom: 16 })

          // 推荐卡片
          Column() {
            Row() {
              Text(this.recommendationCard.icon)
                .fontSize(24)
                .margin({ right: 12 })
              
              Column() {
                Text(this.recommendationCard.title)
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#2C3E50')
                  .alignSelf(ItemAlign.Start)
                
                Text(this.recommendationCard.subject + ' · ' + this.recommendationCard.difficulty)
                  .fontSize(12)
                  .fontColor('#667eea')
                  .margin({ top: 4 })
                  .alignSelf(ItemAlign.Start)
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
            }
            .width('100%')
            .alignItems(VerticalAlign.Top)
            .margin({ bottom: 12 })

            Text(this.recommendationCard.description)
              .fontSize(14)
              .fontColor('#666')
              .lineHeight(20)
              .textAlign(TextAlign.Start)
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#F8F9FA')
          .borderRadius(12)
          .margin({ bottom: 24 })

          Row() {
            Button('稍后再说', { type: ButtonType.Capsule })
              .width('45%')
              .height(44)
              .fontSize(14)
              .backgroundColor('#E0E0E0')
              .fontColor('#666')
              .onClick(() => {
                this.onDismissRecommendation();
              })
            
            Blank()
            
            Button('立即练习', { type: ButtonType.Capsule })
              .width('45%')
              .height(44)
              .fontSize(14)
              .backgroundColor('#4CAF50')
              .onClick(() => {
                this.onStartPractice();
              })
          }
          .width('100%')
        }
        .width('85%')
        .padding(24)
        .backgroundColor('#FFFFFF')
        .borderRadius(20)
        .shadow({
          radius: 24,
          color: '#40000000',
          offsetX: 0,
          offsetY: 12
        })
      }
      .width('100%')
      .height('100%')
      .position({ x: 0, y: 0 })
      .zIndex(999)
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
        
        Text('拍照学习')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
        
        Blank()
        
        Column() {}
          .width(60)
          .height(32)
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 10, bottom: 10 })
      .backgroundColor('#FFFFFF')

      Scroll() {
        Column() {
          // 拍照预览区域
          Stack() {
            if (this.isPhotoCaptured && this.currentPhoto) {
              Image(this.currentPhoto)
                .width('85%')
                .aspectRatio(4/3)
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
                Image($r('sys.media.ohos_ic_public_camera'))
                  .width(80)
                  .height(80)
                  .fillColor('#C0C0C0')
                  .opacity(0.6)
                Text('拍摄学习内容')
                  .fontSize(16)
                  .fontColor('#888')
                  .margin({ top: 20 })
                Text('智能识别并推荐相关练习')
                  .fontSize(12)
                  .fontColor('#BBB')
                  .margin({ top: 8 })
              }
              .width('85%')
              .aspectRatio(4/3)
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
          if (this.recognizedObject) {
            Column() {
              Text('🎯 识别结果')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50')
                .margin({ bottom: 12 })

              Text('识别到：' + this.recognizedObject)
                .fontSize(14)
                .fontColor('#4CAF50')
                .textAlign(TextAlign.Center)
                .backgroundColor('#F1F8E9')
                .padding(12)
                .borderRadius(8)
                .width('85%')
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
              Text('正在智能识别内容...')
                .fontSize(14)
                .fontColor('#667eea')
                .margin({ top: 12 })
            }
            .margin({ top: 30 })
          }

          // 拍照控制按钮
          if (!this.isPhotoCaptured) {
            Button(this.isTakingPhoto ? '启动中...' : '📸 拍摄学习', { type: ButtonType.Capsule })
              .width('75%')
              .height(56)
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .backgroundColor('#1698CE')
              .enabled(!this.isTakingPhoto)
              .onClick(() => {
                this.onTakePhoto();
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
                this.onRetake();
              })
              .margin({ top: 20 })
          }

          // 学习建议区域
          if (!this.showRecommendation && this.recognizedObject && !this.isAnalyzing) {
            Column() {
              Text('💡 学习建议')
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50')
                .margin({ bottom: 16 })

              Text('基于您拍摄的内容，我们会为您推荐相关的学习资料和练习题目。继续学习以提高您的知识水平！')
                .fontSize(14)
                .fontColor('#666')
                .lineHeight(22)
                .textAlign(TextAlign.Center)
                .padding(16)
                .backgroundColor('#FFFFFF')
                .borderRadius(12)
                .shadow({
                  radius: 8,
                  color: '#15000000',
                  offsetX: 0,
                  offsetY: 4
                })
            }
            .width('85%')
            .margin({ top: 30 })
            .alignItems(HorizontalAlign.Center)
          }
        }
        .width('100%')
        .padding({ bottom: 40 })
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .layoutWeight(1)

      // 推荐弹窗
      this.RecommendationAlert()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}