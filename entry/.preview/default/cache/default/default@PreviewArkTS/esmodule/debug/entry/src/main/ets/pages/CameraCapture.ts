if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CameraCapture_Params {
    photoManager?: PhotoManager;
    recognitionService?: RecognitionService;
    cam?: CameraController;
    xController?: XComponentController;
    isReady?: boolean;
    isCapturing?: boolean;
    zoomRatio?: number;
    torchOn?: boolean;
    usingBack?: boolean;
}
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import { PhotoManager } from "@bundle:com.xj.photolearn/entry/ets/common/PhotoManager";
import { CameraController } from "@bundle:com.xj.photolearn/entry/ets/common/CameraController";
import { MockRecognitionService } from "@bundle:com.xj.photolearn/entry/ets/common/RecognitionService";
import type { RecognitionService, StudyRecord } from "@bundle:com.xj.photolearn/entry/ets/common/RecognitionService";
export default class CameraCapture extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.photoManager = PhotoManager.getInstance();
        this.recognitionService = new MockRecognitionService();
        this.cam = undefined;
        this.xController = new XComponentController();
        this.__isReady = new ObservedPropertySimplePU(false, this, "isReady");
        this.__isCapturing = new ObservedPropertySimplePU(false, this, "isCapturing");
        this.__zoomRatio = new ObservedPropertySimplePU(1.0, this, "zoomRatio");
        this.__torchOn = new ObservedPropertySimplePU(false, this, "torchOn");
        this.__usingBack = new ObservedPropertySimplePU(true, this, "usingBack");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CameraCapture_Params) {
        if (params.photoManager !== undefined) {
            this.photoManager = params.photoManager;
        }
        if (params.recognitionService !== undefined) {
            this.recognitionService = params.recognitionService;
        }
        if (params.cam !== undefined) {
            this.cam = params.cam;
        }
        if (params.xController !== undefined) {
            this.xController = params.xController;
        }
        if (params.isReady !== undefined) {
            this.isReady = params.isReady;
        }
        if (params.isCapturing !== undefined) {
            this.isCapturing = params.isCapturing;
        }
        if (params.zoomRatio !== undefined) {
            this.zoomRatio = params.zoomRatio;
        }
        if (params.torchOn !== undefined) {
            this.torchOn = params.torchOn;
        }
        if (params.usingBack !== undefined) {
            this.usingBack = params.usingBack;
        }
    }
    updateStateVars(params: CameraCapture_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isReady.purgeDependencyOnElmtId(rmElmtId);
        this.__isCapturing.purgeDependencyOnElmtId(rmElmtId);
        this.__zoomRatio.purgeDependencyOnElmtId(rmElmtId);
        this.__torchOn.purgeDependencyOnElmtId(rmElmtId);
        this.__usingBack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isReady.aboutToBeDeleted();
        this.__isCapturing.aboutToBeDeleted();
        this.__zoomRatio.aboutToBeDeleted();
        this.__torchOn.aboutToBeDeleted();
        this.__usingBack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private photoManager: PhotoManager;
    private recognitionService: RecognitionService;
    private cam?: CameraController;
    private xController: XComponentController;
    private __isReady: ObservedPropertySimplePU<boolean>;
    get isReady() {
        return this.__isReady.get();
    }
    set isReady(newValue: boolean) {
        this.__isReady.set(newValue);
    }
    private __isCapturing: ObservedPropertySimplePU<boolean>;
    get isCapturing() {
        return this.__isCapturing.get();
    }
    set isCapturing(newValue: boolean) {
        this.__isCapturing.set(newValue);
    }
    private __zoomRatio: ObservedPropertySimplePU<number>;
    get zoomRatio() {
        return this.__zoomRatio.get();
    }
    set zoomRatio(newValue: number) {
        this.__zoomRatio.set(newValue);
    }
    private __torchOn: ObservedPropertySimplePU<boolean>;
    get torchOn() {
        return this.__torchOn.get();
    }
    set torchOn(newValue: boolean) {
        this.__torchOn.set(newValue);
    }
    private __usingBack: ObservedPropertySimplePU<boolean>;
    get usingBack() {
        return this.__usingBack.get();
    }
    set usingBack(newValue: boolean) {
        this.__usingBack.set(newValue);
    }
    aboutToAppear() {
        const ctx = this.photoManager.getContext();
        if (ctx) {
            this.cam = new CameraController(ctx as common.UIAbilityContext);
        }
    }
    private async onXLoad(): Promise<void> {
        if (!this.cam) {
            return;
        }
        const surfaceId = this.xController.getXComponentSurfaceId();
        try {
            await this.cam.prepare(surfaceId);
            this.isReady = true;
        }
        catch (e) {
            console.error('Camera prepare failed:', e);
        }
    }
    private async onCapture(): Promise<void> {
        if (!this.cam) {
            return;
        }
        try {
            this.isCapturing = true;
            const filePath = await this.cam.capture();
            // Add record using helper and run recognition
            this.photoManager.addRecord(filePath);
            const record: StudyRecord = await this.recognitionService.recognizeObject(filePath);
            await router.pushUrl({ url: 'pages/ObjectResult', params: { record } });
        }
        catch (e) {
            console.error('Capture failed:', e);
        }
        finally {
            this.isCapturing = false;
        }
    }
    aboutToDisappear(): void {
        if (this.cam) {
            this.cam.release();
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(61:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Center);
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(63:7)", "entry");
            // Header
            Row.width('100%');
            // Header
            Row.padding({ top: 12, left: 20, right: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('直拍学习');
            Text.debugLine("entry/src/main/ets/pages/CameraCapture.ets(64:9)", "entry");
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        // Header
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Luxury frame for preview
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/CameraCapture.ets(72:7)", "entry");
            // Luxury frame for preview
            Stack.width('100%');
            // Luxury frame for preview
            Stack.margin({ top: 12 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(73:9)", "entry");
            Column.width('85%');
            Column.aspectRatio(4 / 3);
            Column.backgroundColor('#0D000000');
            Column.borderRadius(20);
            Column.shadow({ radius: 30, color: '#1A000000', offsetX: 0, offsetY: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            XComponent.create({ id: 'cameraPreview', type: XComponentType.SURFACE, controller: this.xController }, "com.xj.photolearn/entry");
            XComponent.debugLine("entry/src/main/ets/pages/CameraCapture.ets(74:11)", "entry");
            XComponent.onLoad((): void => { this.onXLoad(); });
            XComponent.width('100%');
            XComponent.height('100%');
        }, XComponent);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Golden corner decorations
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(86:9)", "entry");
            // Golden corner decorations
            Column.position({ x: 15, y: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(87:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(87:19)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(87:79)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3 });
        }, Column);
        Column.pop();
        Row.pop();
        // Golden corner decorations
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(90:9)", "entry");
            Column.position({ x: '85%', y: 15 });
            Column.translate({ x: -20, y: 0 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(91:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(91:19)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(91:79)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3 });
        }, Column);
        Column.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(94:9)", "entry");
            Column.position({ x: 15 });
            Column.translate({ x: 0, y: '85%' });
            Column.margin({ top: -35 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(95:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(95:19)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(95:79)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3, top: 17 });
        }, Column);
        Column.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(98:9)", "entry");
            Column.position({ x: '85%' });
            Column.translate({ x: -20, y: '85%' });
            Column.margin({ top: -18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(99:11)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(99:19)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(99:79)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3, top: -3 });
        }, Column);
        Column.pop();
        Row.pop();
        Column.pop();
        // Luxury frame for preview
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Controls row: zoom slider, torch toggle, capture, switch camera
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CameraCapture.ets(106:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(107:9)", "entry");
            Row.width('85%');
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Zoom label
            Text.create('Zoom');
            Text.debugLine("entry/src/main/ets/pages/CameraCapture.ets(109:11)", "entry");
            // Zoom label
            Text.fontSize(12);
            // Zoom label
            Text.fontColor('#78909C');
        }, Text);
        // Zoom label
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({ min: 1, max: 4, value: this.zoomRatio, step: 0.1 });
            Slider.debugLine("entry/src/main/ets/pages/CameraCapture.ets(112:11)", "entry");
            Slider.width('60%');
            Slider.onChange((v: number) => { this.zoomRatio = v; /* TODO: bind to camera */ });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.torchOn ? '闪光:开' : '闪光:关');
            Button.debugLine("entry/src/main/ets/pages/CameraCapture.ets(115:11)", "entry");
            Button.type(ButtonType.Normal);
            Button.onClick(() => { this.torchOn = !this.torchOn; /* TODO: bind to camera */ });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CameraCapture.ets(122:9)", "entry");
            Row.width('75%');
            Row.margin({ top: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isCapturing ? '拍摄中...' : '✓ 拍摄并识别', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/CameraCapture.ets(123:11)", "entry");
            Button.width('60%');
            Button.height(56);
            Button.fontSize(18);
            Button.backgroundColor('#1698CE');
            Button.enabled(this.isReady && !this.isCapturing);
            Button.onClick(() => this.onCapture());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CameraCapture.ets(131:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.usingBack ? '后摄' : '前摄');
            Button.debugLine("entry/src/main/ets/pages/CameraCapture.ets(133:11)", "entry");
            Button.type(ButtonType.Capsule);
            Button.width(70);
            Button.onClick(() => { /* TODO: switch camera pipeline */ this.usingBack = !this.usingBack; });
        }, Button);
        Button.pop();
        Row.pop();
        // Controls row: zoom slider, torch toggle, capture, switch camera
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/CameraCapture.ets(142:7)", "entry");
            Button.width('60%');
            Button.height(44);
            Button.onClick(() => router.back());
            Button.margin({ top: 12, bottom: 24 });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CameraCapture";
    }
}
registerNamedRoute(() => new CameraCapture(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/CameraCapture", pageFullPath: "entry/src/main/ets/pages/CameraCapture", integratedHsp: "false", moduleType: "followWithHap" });
