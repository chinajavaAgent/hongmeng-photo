import router from '@ohos.router'
import { common } from '@kit.AbilityKit'
import { PhotoManager } from '../common/PhotoManager'
import { CameraController } from '../common/CameraController'
import { MockRecognitionService, RecognitionService, StudyRecord } from '../common/RecognitionService'

@Entry
@Component
export default struct CameraCapture {
  private photoManager: PhotoManager = PhotoManager.getInstance();
  private recognitionService: RecognitionService = new MockRecognitionService();
  private cam?: CameraController;
  private xController: XComponentController = new XComponentController();
  @State isReady: boolean = false;
  @State isCapturing: boolean = false;
  @State zoomRatio: number = 1.0;
  @State torchOn: boolean = false;
  @State usingBack: boolean = true;

  aboutToAppear() {
    const ctx = (this.photoManager as any).context as common.UIAbilityContext; // context is set in EntryAbility
    this.cam = new CameraController(ctx);
  }

  private async onXLoad() {
    if (!this.cam) { return; }
    const surfaceId = this.xController.getXComponentSurfaceId();
    try {
      await this.cam.prepare(surfaceId);
      this.isReady = true;
    } catch (e) {
      console.error('Camera prepare failed:', e);
    }
  }

  private async onCapture() {
    if (!this.cam) { return; }
    try {
      this.isCapturing = true;
      const filePath = await this.cam.capture();
      // Add record using helper and run recognition
      this.photoManager.addRecord(filePath);
      const record: StudyRecord = await this.recognitionService.recognizeObject(filePath);
      await router.pushUrl({ url: 'pages/ObjectResult', params: { record } });
    } catch (e) {
      console.error('Capture failed:', e);
    } finally {
      this.isCapturing = false;
    }
  }

  aboutToDisappear() {
    if (this.cam) {
      this.cam.release();
    }
  }

  build() {
    Column() {
      // Header
      Row() {
        Text('直拍学习')
          .fontSize(22)
          .fontWeight(FontWeight.Medium)
      }
      .width('100%')
      .padding({ top: 12, left: 20, right: 20 })

      // Luxury frame for preview
      Stack() {
        Column() {
          XComponent({ id: 'cameraPreview', type: XComponentType.SURFACE })
            .controller(this.xController)
            .onLoad(() => this.onXLoad())
            .width('100%')
            .height('100%')
        }
        .width('85%')
        .aspectRatio(4/3)
        .backgroundColor('#0D000000')
        .borderRadius(20)
        .shadow({ radius: 30, color: '#1A000000', offsetX: 0, offsetY: 12 })

        // Golden corner decorations
        Column() {
          Row() { Column() {}.width(3).height(20).backgroundColor('#D4AF37'); Column() {}.width(20).height(3).backgroundColor('#D4AF37').margin({ left: -3 }) }
        }.position({ x: 15, y: 15 })

        Column() {
          Row() { Column() {}.width(20).height(3).backgroundColor('#D4AF37'); Column() {}.width(3).height(20).backgroundColor('#D4AF37').margin({ left: -3 }) }
        }.position({ x: '85%', y: 15 }).translate({ x: -20, y: 0 })

        Column() {
          Row() { Column() {}.width(3).height(20).backgroundColor('#D4AF37'); Column() {}.width(20).height(3).backgroundColor('#D4AF37').margin({ left: -3, top: 17 }) }
        }.position({ x: 15 }).translate({ x: 0, y: '85%' }).margin({ top: -35 })

        Column() {
          Row() { Column() {}.width(20).height(3).backgroundColor('#D4AF37'); Column() {}.width(3).height(20).backgroundColor('#D4AF37').margin({ left: -3, top: -3 }) }
        }.position({ x: '85%' }).translate({ x: -20, y: '85%' }).margin({ top: -18 })
      }
      .width('100%')
      .margin({ top: 12 })

      // Controls row: zoom slider, torch toggle, capture, switch camera
      Column() {
        Row() {
          // Zoom label
          Text('Zoom')
            .fontSize(12)
            .fontColor('#78909C')
          Slider({ min: 1, max: 4, value: this.zoomRatio, step: 0.1 })
            .width('60%')
            .onChange((v: number) => { this.zoomRatio = v; /* TODO: bind to camera */ })
          Button(this.torchOn ? '闪光:开' : '闪光:关')
            .type(ButtonType.Normal)
            .onClick(() => { this.torchOn = !this.torchOn; /* TODO: bind to camera */ })
        }
        .width('85%')
        .margin({ top: 16 })

        Row() {
          Button(this.isCapturing ? '拍摄中...' : '✓ 拍摄并识别', { type: ButtonType.Capsule })
            .width('60%')
            .height(56)
            .fontSize(18)
            .backgroundColor('#1698CE')
            .enabled(this.isReady && !this.isCapturing)
            .onClick(() => this.onCapture())

          Blank()

          Button(this.usingBack ? '后摄' : '前摄')
            .type(ButtonType.Capsule)
            .width(70)
            .onClick(() => { /* TODO: switch camera pipeline */ this.usingBack = !this.usingBack; })
        }
        .width('75%')
        .margin({ top: 12 })
      }

      Button('返回', { type: ButtonType.Capsule })
        .width('60%')
        .height(44)
        .onClick(() => router.back())
        .margin({ top: 12, bottom: 24 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
    .backgroundColor('#F8F8F8')
  }
}
