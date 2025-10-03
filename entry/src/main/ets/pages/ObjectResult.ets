import { StudyRecord, RecognizedObject } from '../common/RecognitionService'
import router from '@ohos.router'

@Component
export default struct ObjectResult {
  @State record: StudyRecord = {
    id: '',
    mode: 'object',
    imageUri: '',
    timestamp: 0,
    objects: []
  };

  aboutToAppear() {
    // Pull typed params from router
    interface ResultParams {
      record?: StudyRecord;
    }
    const params = router.getParams() as ResultParams;
    if (params && params.record) {
      this.record = params.record;
    }
  }

  @Builder ObjectCard(obj: RecognizedObject) {
    Column() {
      Row() {
        Text(obj.labelEn)
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
        if (obj.labelZh) {
          Text(' · ' + obj.labelZh)
            .fontSize(16)
            .fontColor('#607D8B')
            .margin({ left: 6 })
        }
        if (obj.confidence) {
          Blank()
          Text(Math.round(obj.confidence * 100) + '%')
            .fontSize(12)
            .fontColor('#9E9E9E')
        }
      }
      .width('100%')

      if (obj.examples && obj.examples.length > 0) {
        Column() {
          ForEach(obj.examples, (ex: string, index: number) => {
            Text('• ' + ex)
              .fontSize(14)
              .fontColor('#455A64')
              .margin({ top: index === 0 ? 6 : 2 })
          })
        }
        .margin({ top: 4 })
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(16)
    .shadow({ radius: 8, color: '#10000000', offsetX: 0, offsetY: 2 })
  }

  build() {
    Column() {
      // Header
      Row() {
        Text('实物识别结果')
          .fontSize(22)
          .fontWeight(FontWeight.Medium)
      }
      .width('100%')
      .padding({ top: 12, left: 20, right: 20 })

      // Image
      if (this.record.imageUri) {
        Image(this.record.imageUri)
          .width('90%')
          .aspectRatio(4/3)
          .objectFit(ImageFit.Cover)
          .borderRadius(16)
          .margin({ top: 12 })
      }

      // Objects
      Column() {
        if (this.record.objects && this.record.objects.length > 0) {
          ForEach(this.record.objects, (obj: RecognizedObject) => {
            Column() {
              this.ObjectCard(obj)
            }
            .margin({ top: 12 })
          })
        } else {
          Text('未识别到可学习的对象')
            .fontSize(14)
            .fontColor('#9E9E9E')
            .margin({ top: 20 })
        }
      }
      .width('90%')
      .margin({ bottom: 24 })

      // Back button
      Button('返回', { type: ButtonType.Capsule })
        .width('60%')
        .height(44)
        .onClick(() => { router.back(); })
        .margin({ top: 12, bottom: 24 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
    .backgroundColor('#F8F8F8')
  }
}
