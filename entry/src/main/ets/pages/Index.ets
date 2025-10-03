import { camera } from '@kit.CameraKit'
import { image } from '@kit.ImageKit'
import { PhotoManager, PhotoRecord } from '../common/PhotoManager'
import router from '@ohos.router'
import { MockRecognitionService, RecognitionService, StudyRecord } from '../common/RecognitionService'

@Entry
@Component
struct Index {
  @State currentPhoto: string = '';
  @State isPhotoCaptured: boolean = false;
  @State selectedTabIndex: number = 0;
  @State photoRecords: PhotoRecord[] = [];
  @State isTakingPhoto: boolean = false;
  private photoManager: PhotoManager = PhotoManager.getInstance();
  private recognitionService: RecognitionService = new MockRecognitionService();

  aboutToAppear() {
    this.requestCameraPermission();
    this.loadPhotoRecords();
  }

  aboutToDisappear() {
    // 释放相机资源
    this.photoManager.releaseCamera();
  }

  async requestCameraPermission() {
    await this.photoManager.requestPermissions();
  }

  loadPhotoRecords() {
    this.photoRecords = this.photoManager.getPhotoRecords();
  }

  async onTakePhoto() {
    try {
      this.isTakingPhoto = true;
      console.log('Starting photo capture...');
      
      const photoPath = await this.photoManager.takePhoto();
      if (photoPath) {
        this.currentPhoto = photoPath;
        this.isPhotoCaptured = true;
        this.loadPhotoRecords(); // 刷新照片列表
        console.log('Photo capture completed:', photoPath);
      } else {
        console.log('Photo capture was cancelled or failed');
      }
    } catch (error) {
      console.error('Photo capture error:', error);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  async onRecognizeObject() {
    try {
      this.isTakingPhoto = true;
      const photoPath = await this.photoManager.takePhoto();
      if (!photoPath) {
        console.log('No photo selected for recognition');
        return;
      }
      const record: StudyRecord = await this.recognitionService.recognizeObject(photoPath);
      await router.pushUrl({ url: 'pages/ObjectResult', params: { record } });
    } catch (e) {
      console.error('Object recognition failed:', e);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  onSavePhoto() {
    if (this.currentPhoto) {
      // 照片已经保存到PhotoManager中
      this.currentPhoto = '';
      this.isPhotoCaptured = false;
    }
  }

  onDeletePhoto(photoId: string) {
    if (this.photoManager.deletePhoto(photoId)) {
      this.loadPhotoRecords();
    }
  }

  @Builder TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource) {
    Column() {
      Stack() {
        Image(this.selectedTabIndex === targetIndex ? selectedImg : normalImg)
          .size({ width: 28, height: 28 })
          .fillColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E')
        
        if (this.selectedTabIndex === targetIndex) {
          Circle({ width: 40, height: 40 })
            .fill('transparent')
            .stroke('#667eea')
            .strokeWidth(2)
            .opacity(0.3)
        }
      }
      .width(40)
      .height(40)
      
      Text(title)
        .fontSize(12)
        .fontWeight(this.selectedTabIndex === targetIndex ? FontWeight.Medium : FontWeight.Normal)
        .fontColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E')
        .margin({ top: 6 })
      
      if (this.selectedTabIndex === targetIndex) {
        Circle({ width: 4, height: 4 })
          .fill('#667eea')
          .margin({ top: 4 })
      }
    }
    .width('100%')
    .height(65)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.selectedTabIndex = targetIndex;
    })
  }

  @Builder PhotoCaptureArea() {
    Column() {
      // 高端相框设计
      Stack() {
        // 相框外层装饰
        Column() {
          Column() {
            if (this.isPhotoCaptured && this.currentPhoto) {
              // 显示拍摄的照片
              Image(this.currentPhoto)
                .width('100%')
                .height('100%')
                .objectFit(ImageFit.Cover)
                .borderRadius(12)
            } else {
              // 默认状态：相机图标
              Column() {
                Image($r('sys.media.ohos_ic_public_camera'))
                  .width(60)
                  .height(60)
                  .fillColor('#C0C0C0')
                  .opacity(0.6)
                Text('轻触下方按钮开始拍照')
                  .fontSize(14)
                  .fontColor('#888')
                  .margin({ top: 16 })
                  .opacity(0.8)
              }
              .width('100%')
              .height('100%')
              .justifyContent(FlexAlign.Center)
              .backgroundColor('#FAFAFA')
              .borderRadius(12)
            }
          }
          .width('100%')
          .height('100%')
          .padding(8)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .shadow({
            radius: 20,
            color: '#1A000000',
            offsetX: 0,
            offsetY: 8
          })
        }
        .width('85%')
        .aspectRatio(4/3)
        .backgroundColor('#F8F8F8')
        .borderRadius(20)
        .padding(6)
        .shadow({
          radius: 30,
          color: '#0D000000',
          offsetX: 0,
          offsetY: 12
        })
        
        // 相框装饰角
        Column() {
          // 左上角装饰
          Column() {
            Row() {
              Column() {}
                .width(3)
                .height(20)
                .backgroundColor('#D4AF37')
              Column() {}
                .width(20)
                .height(3)
                .backgroundColor('#D4AF37')
                .margin({ left: -3 })
            }
          }
          .position({ x: 15, y: 15 })
          
          // 右上角装饰
          Column() {
            Row() {
              Column() {}
                .width(20)
                .height(3)
                .backgroundColor('#D4AF37')
              Column() {}
                .width(3)
                .height(20)
                .backgroundColor('#D4AF37')
                .margin({ left: -3 })
            }
          }
          .position({ x: '85%', y: 15 })
          .translate({ x: -20, y: 0 })
          
          // 左下角装饰
          Column() {
            Row() {
              Column() {}
                .width(3)
                .height(20)
                .backgroundColor('#D4AF37')
              Column() {}
                .width(20)
                .height(3)
                .backgroundColor('#D4AF37')
                .margin({ left: -3, top: 17 })
            }
          }
          .position({ x: 15 })
          .translate({ x: 0, y: '85%' })
          .margin({ top: -35 })
          
          // 右下角装饰
          Column() {
            Row() {
              Column() {}
                .width(20)
                .height(3)
                .backgroundColor('#D4AF37')
              Column() {}
                .width(3)
                .height(20)
                .backgroundColor('#D4AF37')
                .margin({ left: -3, top: -3 })
            }
          }
          .position({ x: '85%' })
          .translate({ x: -20, y: '85%' })
          .margin({ top: -18 })
        }
        .width('85%')
        .aspectRatio(4/3)
      }
      .width('100%')
      
      // 状态指示器
      if (this.isPhotoCaptured) {
        Row() {
          Circle({ width: 8, height: 8 })
            .fill('#4CAF50')
          Text('照片已捕获')
            .fontSize(12)
            .fontColor('#4CAF50')
            .margin({ left: 6 })
        }
        .margin({ top: 16 })
        .opacity(0.8)
      }
    }
    .padding({ left: 20, right: 20, top: 30 })
  }

  @Builder CameraGuideSection() {
    Column() {
      // 主拍照按钮
      Stack() {
        Button(this.isTakingPhoto ? '启动中...' : '📸 拍照学习', { type: ButtonType.Capsule })
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
        
        if (this.isTakingPhoto) {
          LoadingProgress()
            .width(24)
            .height(24)
            .color('#FFFFFF')
            .margin({ right: 120 })
        }
      }
      .margin({ top: 30 })

      // 实物识别按钮（最小闭环）
      Button(this.isTakingPhoto ? '请稍候...' : '🔍 实物识别', { type: ButtonType.Capsule })
        .width('75%')
        .height(48)
        .fontSize(16)
        .backgroundColor('#667eea')
        .enabled(!this.isTakingPhoto)
        .onClick(() => { this.onRecognizeObject(); })
        .margin({ top: 12 })

      if (this.isPhotoCaptured) {
        Row() {
          // 重新拍照按钮
          Button('🔄 重拍', { type: ButtonType.Capsule })
            .width('32%')
            .height(44)
            .fontSize(14)
            .fontWeight(FontWeight.Medium)
            .backgroundColor('#FF6B6B')
            .onClick(() => {
              this.currentPhoto = '';
              this.isPhotoCaptured = false;
            })
            .shadow({
              radius: 8,
              color: '#40ff6b6b',
              offsetX: 0,
              offsetY: 4
            })
          
          Blank()
          
          // 确认保存按钮
          Button('✓ 保存', { type: ButtonType.Capsule })
            .width('32%')
            .height(44)
            .fontSize(14)
            .fontWeight(FontWeight.Medium)
            .backgroundColor('#4CAF50')
            .onClick(() => {
              this.onSavePhoto();
            })
            .shadow({
              radius: 8,
              color: '#404CAF50',
              offsetX: 0,
              offsetY: 4
            })
        }
        .width('75%')
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: 20 })
      }
    }
    .padding({ left: 20, right: 20, bottom: 30 })
  }

  @Builder HomeContent() {
    Column() {
      this.PhotoCaptureArea()
      Blank()
      this.CameraGuideSection()
    }
    .width('100%')
    .height('100%')
  }

  @Builder MyContent() {
    Column() {
      // 标题区域
      Row() {
        Text('📸')
          .fontSize(28)
        Text('我的拍照记录')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .margin({ left: 12 })
      }
      .margin({ top: 30, bottom: 30 })
      .justifyContent(FlexAlign.Center)
      
      if (this.photoRecords.length === 0) {
        Column() {
          Stack() {
            Circle({ width: 100, height: 100 })
              .fill('#f1f3f4')
            Image($r('sys.media.phone_arrow_down_left_circle_fill'))
              .width(50)
              .height(50)
              .fillColor('#9E9E9E')
              .opacity(0.6)
          }
          Text('暂无拍照记录')
            .fontSize(16)
            .fontColor('#757575')
            .margin({ top: 20 })
          Text('开始您的第一次拍照学习吧')
            .fontSize(12)
            .fontColor('#BDBDBD')
            .margin({ top: 8 })
        }
        .width('100%')
        .height(250)
        .justifyContent(FlexAlign.Center)
      } else {
        List({ space: 12 }) {
          ForEach(this.photoRecords, (record: PhotoRecord) => {
            ListItem() {
              Row() {
                Stack() {
                  Image(record.filePath || $r('sys.media.person_shield'))
                    .width(70)
                    .height(70)
                    .borderRadius(12)
                    .objectFit(ImageFit.Cover)
                    .backgroundColor('#F5F5F5')
                  
                  // 照片装饰边框
                  Column() {}
                    .width(70)
                    .height(70)
                    .borderRadius(12)
                    .border({
                      width: 2,
                      color: '#E0E0E0'
                    })
                }
                
                Column() {
                  Text('📸 学习照片')
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                    .fontColor('#2C3E50')
                  Text(this.photoManager.formatTimestamp(record.timestamp))
                    .fontSize(12)
                    .fontColor('#78909C')
                    .margin({ top: 6 })
                  
                  Row() {
                    Circle({ width: 6, height: 6 })
                      .fill('#4CAF50')
                    Text('已保存')
                      .fontSize(10)
                      .fontColor('#4CAF50')
                      .margin({ left: 4 })
                  }
                  .margin({ top: 8 })
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 16 })
                .layoutWeight(1)
                
                Column() {
                  Button('删除', { type: ButtonType.Capsule })
                    .width(55)
                    .height(32)
                    .fontSize(11)
                    .backgroundColor('#FFEBEE')
                    .fontColor('#F44336')
                    .onClick(() => {
                      this.onDeletePhoto(record.id);
                    })
                  
                  Image($r('sys.media.ohos_ic_public_arrow_right'))
                    .width(16)
                    .height(16)
                    .fillColor('#BDBDBD')
                    .margin({ top: 8 })
                }
                .alignItems(HorizontalAlign.End)
              }
              .width('100%')
              .padding(16)
              .backgroundColor('#FFFFFF')
              .borderRadius(16)
              .shadow({
                radius: 8,
                color: '#10000000',
                offsetX: 0,
                offsetY: 2
              })
            }
          })
        }
        .width('100%')
        .layoutWeight(1)
        .padding({ left: 20, right: 20 })
      }
    }
    .width('100%')
    .height('100%')
    .padding({ bottom: 20 })
  }

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End, controller: new TabsController() }) {
        TabContent() {
          this.HomeContent()
        }
        .tabBar(this.TabBuilder('首页', 0, $r('sys.media.wifi_router_fill'), $r('sys.media.save_button_picture')))
        .backgroundColor('#f8f9fa')

        TabContent() {
          this.MyContent()
        }
        .tabBar(this.TabBuilder('我的', 1, $r('sys.media.thermometer_fill'), $r('sys.media.safe_volume_notification_icon')))
        .backgroundColor('#f8f9fa')
      }
      .animationDuration(300)
      .backgroundColor('#FFFFFF')
      .onChange((index: number) => {
        this.selectedTabIndex = index;
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}
