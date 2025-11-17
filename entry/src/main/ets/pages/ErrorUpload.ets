import { camera } from '@kit.CameraKit'
import { image } from '@kit.ImageKit'
import { PhotoManager } from '../common/PhotoManager'
import router from '@ohos.router'

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Entry
@Component
struct ErrorUpload {
  @State currentPhoto: string = '';
  @State isPhotoCaptured: boolean = false;
  @State isTakingPhoto: boolean = false;
  @State isAnalyzing: boolean = false;
  @State analysisResult: string = '';
  @State cropArea: CropArea = { x: 0, y: 0, width: 0, height: 0 };
  @State showCropControls: boolean = false;
  private photoManager: PhotoManager = PhotoManager.getInstance();

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
        this.showCropControls = true;
      }
    } catch (error) {
      console.error('Photo capture error:', error);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  async onAnalyzeError() {
    if (!this.currentPhoto) return;
    
    this.isAnalyzing = true;
    try {
      // 模拟错题分析
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      this.analysisResult = '识别为"分数运算"题型';
    } catch (error) {
      console.error('Analysis error:', error);
      this.analysisResult = '分析失败，请重新拍照';
    } finally {
      this.isAnalyzing = false;
    }
  }

  async onConfirmSave() {
    if (this.analysisResult && this.currentPhoto) {
      // 保存为薄弱点
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        router.back();
      } catch (error) {
        console.error('Save error:', error);
      }
    }
  }

  onRetake() {
    this.currentPhoto = '';
    this.isPhotoCaptured = false;
    this.showCropControls = false;
    this.analysisResult = '';
  }

  @Builder CropControls() {
    if (this.showCropControls && this.isPhotoCaptured) {
      Column() {
        Text('调整裁剪区域')
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .fontColor('#2C3E50')
          .margin({ bottom: 16 })

        Row() {
          Button('取消裁剪', { type: ButtonType.Capsule })
            .width('45%')
            .height(40)
            .fontSize(14)
            .backgroundColor('#E0E0E0')
            .fontColor('#666')
            .onClick(() => {
              this.showCropControls = false;
            })
          
          Blank()
          
          Button('确认裁剪', { type: ButtonType.Capsule })
            .width('45%')
            .height(40)
            .fontSize(14)
            .backgroundColor('#667eea')
            .onClick(() => {
              this.showCropControls = false;
              this.onAnalyzeError();
            })
        }
        .width('100%')
        .margin({ top: 12 })
      }
      .width('85%')
      .padding(16)
      .backgroundColor('#FFFFFF')
      .borderRadius(12)
      .shadow({
        radius: 8,
        color: '#20000000',
        offsetX: 0,
        offsetY: 4
      })
      .margin({ top: 20 })
    }
  }

  @Builder AnalysisResult() {
    if (this.analysisResult) {
      Column() {
        Row() {
          Text('📝')
            .fontSize(20)
          Text('分析结果')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#2C3E50')
            .margin({ left: 8 })
        }
        .margin({ bottom: 16 })

        Column() {
          Text(this.analysisResult)
            .fontSize(16)
            .fontColor('#4CAF50')
            .textAlign(TextAlign.Center)
            .backgroundColor('#F1F8E9')
            .padding(16)
            .borderRadius(8)
            .width('100%')
        }
        .width('100%')
        .margin({ bottom: 20 })

        Row() {
          Button('重新分析', { type: ButtonType.Capsule })
            .width('45%')
            .height(44)
            .fontSize(14)
            .backgroundColor('#FF9800')
            .onClick(() => {
              this.analysisResult = '';
              this.onAnalyzeError();
            })
          
          Blank()
          
          Button('确认保存', { type: ButtonType.Capsule })
            .width('45%')
            .height(44)
            .fontSize(14)
            .backgroundColor('#4CAF50')
            .onClick(() => {
              this.onConfirmSave();
            })
        }
        .width('100%')
      }
      .width('85%')
      .padding(20)
      .backgroundColor('#FFFFFF')
      .borderRadius(16)
      .shadow({
        radius: 12,
        color: '#20000000',
        offsetX: 0,
        offsetY: 6
      })
      .margin({ top: 20 })
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
        
        Text('错题上传')
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
                Text('拍摄错题照片')
                  .fontSize(16)
                  .fontColor('#888')
                  .margin({ top: 20 })
                Text('支持预览和裁剪调整')
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

          // 裁剪控制
          this.CropControls()

          // 拍照控制按钮
          if (!this.isPhotoCaptured) {
            Button(this.isTakingPhoto ? '启动中...' : '📸 拍摄错题', { type: ButtonType.Capsule })
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
          if (this.isPhotoCaptured && !this.analysisResult) {
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

          // 分析按钮
          if (this.isPhotoCaptured && !this.showCropControls && !this.analysisResult && !this.isAnalyzing) {
            Button('🔍 分析错题', { type: ButtonType.Capsule })
              .width('75%')
              .height(50)
              .fontSize(16)
              .backgroundColor('#667eea')
              .onClick(() => {
                this.onAnalyzeError();
              })
              .margin({ top: 20 })
          }

          // 分析中状态
          if (this.isAnalyzing) {
            Column() {
              LoadingProgress()
                .width(40)
                .height(40)
                .color('#667eea')
              Text('正在分析错题类型...')
                .fontSize(14)
                .fontColor('#667eea')
                .margin({ top: 12 })
            }
            .margin({ top: 30 })
          }

          // 分析结果
          this.AnalysisResult()
        }
        .width('100%')
        .padding({ bottom: 40 })
      }
      .width('100%')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}