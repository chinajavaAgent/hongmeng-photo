if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ObjectResult_Params {
    record?: StudyRecord;
}
import type { StudyRecord, RecognizedObject } from '../common/RecognitionService';
import router from "@ohos:router";
export default class ObjectResult extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__record = new ObservedPropertyObjectPU({
            id: '',
            mode: 'object',
            imageUri: '',
            timestamp: 0,
            objects: []
        }, this, "record");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ObjectResult_Params) {
        if (params.record !== undefined) {
            this.record = params.record;
        }
    }
    updateStateVars(params: ObjectResult_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__record.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__record.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __record: ObservedPropertyObjectPU<StudyRecord>;
    get record() {
        return this.__record.get();
    }
    set record(newValue: StudyRecord) {
        this.__record.set(newValue);
    }
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
    ObjectCard(obj: RecognizedObject, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ObjectResult.ets(27:5)", "entry");
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.shadow({ radius: 8, color: '#10000000', offsetX: 0, offsetY: 2 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ObjectResult.ets(28:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(obj.labelEn);
            Text.debugLine("entry/src/main/ets/pages/ObjectResult.ets(29:9)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (obj.labelZh) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(' · ' + obj.labelZh);
                        Text.debugLine("entry/src/main/ets/pages/ObjectResult.ets(34:11)", "entry");
                        Text.fontSize(16);
                        Text.fontColor('#607D8B');
                        Text.margin({ left: 6 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (obj.confidence) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/pages/ObjectResult.ets(40:11)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(Math.round(obj.confidence * 100) + '%');
                        Text.debugLine("entry/src/main/ets/pages/ObjectResult.ets(41:11)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#9E9E9E');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (obj.examples && obj.examples.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/ObjectResult.ets(49:9)", "entry");
                        Column.margin({ top: 4 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const ex = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('• ' + ex);
                                Text.debugLine("entry/src/main/ets/pages/ObjectResult.ets(51:13)", "entry");
                                Text.fontSize(14);
                                Text.fontColor('#455A64');
                                Text.margin({ top: index === 0 ? 6 : 2 });
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, obj.examples, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ObjectResult.ets(68:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Center);
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/ObjectResult.ets(70:7)", "entry");
            // Header
            Row.width('100%');
            // Header
            Row.padding({ top: 12, left: 20, right: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('实物识别结果');
            Text.debugLine("entry/src/main/ets/pages/ObjectResult.ets(71:9)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        // Header
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Image
            if (this.record.imageUri) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.record.imageUri);
                        Image.debugLine("entry/src/main/ets/pages/ObjectResult.ets(80:9)", "entry");
                        Image.width('90%');
                        Image.aspectRatio(4 / 3);
                        Image.objectFit(ImageFit.Cover);
                        Image.borderRadius(16);
                        Image.margin({ top: 12 });
                    }, Image);
                });
            }
            // Objects
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Objects
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/ObjectResult.ets(89:7)", "entry");
            // Objects
            Column.width('90%');
            // Objects
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.record.objects && this.record.objects.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const obj = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.debugLine("entry/src/main/ets/pages/ObjectResult.ets(92:13)", "entry");
                                Column.margin({ top: 12 });
                            }, Column);
                            this.ObjectCard.bind(this)(obj);
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.record.objects, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('未识别到可学习的对象');
                        Text.debugLine("entry/src/main/ets/pages/ObjectResult.ets(98:11)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#9E9E9E');
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // Objects
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Back button
            Button.createWithLabel('返回', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/ObjectResult.ets(108:7)", "entry");
            // Back button
            Button.width('60%');
            // Back button
            Button.height(44);
            // Back button
            Button.onClick(() => { router.back(); });
            // Back button
            Button.margin({ top: 12, bottom: 24 });
        }, Button);
        // Back button
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ObjectResult";
    }
}
registerNamedRoute(() => new ObjectResult(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/ObjectResult", pageFullPath: "entry/src/main/ets/pages/ObjectResult", integratedHsp: "false", moduleType: "followWithHap" });
