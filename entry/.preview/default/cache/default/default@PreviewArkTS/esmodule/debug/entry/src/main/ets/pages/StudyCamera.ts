if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StudyCamera_Params {
    currentPhoto?: string;
    isPhotoCaptured?: boolean;
    isTakingPhoto?: boolean;
    isAnalyzing?: boolean;
    recognizedText?: string;
    showResult?: boolean;
    photoManager?: PhotoManager;
    recognitionService?: RecognitionService;
}
import { PhotoManager } from "@bundle:com.xj.photolearn/entry/ets/common/PhotoManager";
import { MockRecognitionService } from "@bundle:com.xj.photolearn/entry/ets/common/RecognitionService";
import type { RecognitionService } from "@bundle:com.xj.photolearn/entry/ets/common/RecognitionService";
import router from "@ohos:router";
class StudyCamera extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPhoto = new ObservedPropertySimplePU('', this, "currentPhoto");
        this.__isPhotoCaptured = new ObservedPropertySimplePU(false, this, "isPhotoCaptured");
        this.__isTakingPhoto = new ObservedPropertySimplePU(false, this, "isTakingPhoto");
        this.__isAnalyzing = new ObservedPropertySimplePU(false, this, "isAnalyzing");
        this.__recognizedText = new ObservedPropertySimplePU('', this, "recognizedText");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.photoManager = PhotoManager.getInstance();
        this.recognitionService = new MockRecognitionService();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StudyCamera_Params) {
        if (params.currentPhoto !== undefined) {
            this.currentPhoto = params.currentPhoto;
        }
        if (params.isPhotoCaptured !== undefined) {
            this.isPhotoCaptured = params.isPhotoCaptured;
        }
        if (params.isTakingPhoto !== undefined) {
            this.isTakingPhoto = params.isTakingPhoto;
        }
        if (params.isAnalyzing !== undefined) {
            this.isAnalyzing = params.isAnalyzing;
        }
        if (params.recognizedText !== undefined) {
            this.recognizedText = params.recognizedText;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.photoManager !== undefined) {
            this.photoManager = params.photoManager;
        }
        if (params.recognitionService !== undefined) {
            this.recognitionService = params.recognitionService;
        }
    }
    updateStateVars(params: StudyCamera_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPhoto.purgeDependencyOnElmtId(rmElmtId);
        this.__isPhotoCaptured.purgeDependencyOnElmtId(rmElmtId);
        this.__isTakingPhoto.purgeDependencyOnElmtId(rmElmtId);
        this.__isAnalyzing.purgeDependencyOnElmtId(rmElmtId);
        this.__recognizedText.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPhoto.aboutToBeDeleted();
        this.__isPhotoCaptured.aboutToBeDeleted();
        this.__isTakingPhoto.aboutToBeDeleted();
        this.__isAnalyzing.aboutToBeDeleted();
        this.__recognizedText.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentPhoto: ObservedPropertySimplePU<string>;
    get currentPhoto() {
        return this.__currentPhoto.get();
    }
    set currentPhoto(newValue: string) {
        this.__currentPhoto.set(newValue);
    }
    private __isPhotoCaptured: ObservedPropertySimplePU<boolean>;
    get isPhotoCaptured() {
        return this.__isPhotoCaptured.get();
    }
    set isPhotoCaptured(newValue: boolean) {
        this.__isPhotoCaptured.set(newValue);
    }
    private __isTakingPhoto: ObservedPropertySimplePU<boolean>;
    get isTakingPhoto() {
        return this.__isTakingPhoto.get();
    }
    set isTakingPhoto(newValue: boolean) {
        this.__isTakingPhoto.set(newValue);
    }
    private __isAnalyzing: ObservedPropertySimplePU<boolean>;
    get isAnalyzing() {
        return this.__isAnalyzing.get();
    }
    set isAnalyzing(newValue: boolean) {
        this.__isAnalyzing.set(newValue);
    }
    private __recognizedText: ObservedPropertySimplePU<string>;
    get recognizedText() {
        return this.__recognizedText.get();
    }
    set recognizedText(newValue: string) {
        this.__recognizedText.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private photoManager: PhotoManager;
    private recognitionService: RecognitionService;
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
        }
        catch (error) {
            console.error('Photo capture error:', error);
        }
        finally {
            this.isTakingPhoto = false;
        }
    }
    async onRecognize() {
        this.isAnalyzing = true;
        try {
            // 模拟识别过程
            await new Promise<void>(resolve => setTimeout(resolve, 2000));
            // 模拟识别结果
            const studyTopics = ['光的折射', '分数运算', '化学方程式', '三角形性质', '重力加速度'];
            this.recognizedText = studyTopics[Math.floor(Math.random() * studyTopics.length)];
            this.showResult = true;
        }
        catch (error) {
            console.error('Recognition error:', error);
        }
        finally {
            this.isAnalyzing = false;
        }
    }
    onRetake() {
        this.currentPhoto = '';
        this.isPhotoCaptured = false;
        this.showResult = false;
        this.recognizedText = '';
    }
    onStartPractice() {
        if (this.recognizedText) {
            router.pushUrl({
                url: 'pages/Practice',
                params: {
                    topic: this.recognizedText,
                    fromCamera: true
                }
            });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StudyCamera.ets(80:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/StudyCamera.ets(82:7)", "entry");
            // 导航栏
            Row.width('100%');
            // 导航栏
            Row.padding({ left: 20, right: 20, top: 10, bottom: 10 });
            // 导航栏
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.debugLine("entry/src/main/ets/pages/StudyCamera.ets(83:9)", "entry");
            Button.width(60);
            Button.height(32);
            Button.fontSize(12);
            Button.backgroundColor('#F5F5F5');
            Button.fontColor('#666');
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/StudyCamera.ets(93:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('拍照学习');
            Text.debugLine("entry/src/main/ets/pages/StudyCamera.ets(95:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/StudyCamera.ets(100:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StudyCamera.ets(102:9)", "entry");
            Column.width(60);
            Column.height(32);
        }, Column);
        Column.pop();
        // 导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/StudyCamera.ets(110:7)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/StudyCamera.ets(111:9)", "entry");
            Column.width('100%');
            Column.padding({ bottom: 40 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 拍照预览区域
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/StudyCamera.ets(113:11)", "entry");
            // 拍照预览区域
            Stack.width('100%');
            // 拍照预览区域
            Stack.margin({ top: 30 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isPhotoCaptured && this.currentPhoto) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.currentPhoto);
                        Image.debugLine("entry/src/main/ets/pages/StudyCamera.ets(115:15)", "entry");
                        Image.width('85%');
                        Image.aspectRatio(4 / 3);
                        Image.objectFit(ImageFit.Cover);
                        Image.borderRadius(16);
                        Image.shadow({
                            radius: 16,
                            color: '#20000000',
                            offsetX: 0,
                            offsetY: 8
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/StudyCamera.ets(127:15)", "entry");
                        Column.width('85%');
                        Column.aspectRatio(4 / 3);
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor('#F8F8F8');
                        Column.borderRadius(16);
                        Column.border({
                            width: 2,
                            color: '#E0E0E0',
                            style: BorderStyle.Dashed
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 125830242, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/StudyCamera.ets(128:17)", "entry");
                        Image.width(80);
                        Image.height(80);
                        Image.fillColor('#C0C0C0');
                        Image.opacity(0.6);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('拍摄学习内容');
                        Text.debugLine("entry/src/main/ets/pages/StudyCamera.ets(133:17)", "entry");
                        Text.fontSize(16);
                        Text.fontColor('#888');
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('自动识别知识点');
                        Text.debugLine("entry/src/main/ets/pages/StudyCamera.ets(137:17)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#BBB');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        // 拍照预览区域
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 识别结果显示
            if (this.showResult && this.recognizedText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/StudyCamera.ets(159:13)", "entry");
                        Column.width('100%');
                        Column.margin({ top: 20 });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🎯 识别结果');
                        Text.debugLine("entry/src/main/ets/pages/StudyCamera.ets(160:15)", "entry");
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#2C3E50');
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('识别到：' + this.recognizedText);
                        Text.debugLine("entry/src/main/ets/pages/StudyCamera.ets(166:15)", "entry");
                        Text.fontSize(16);
                        Text.fontColor('#4CAF50');
                        Text.textAlign(TextAlign.Center);
                        Text.backgroundColor('#F1F8E9');
                        Text.padding(16);
                        Text.borderRadius(8);
                        Text.width('85%');
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 开始练习按钮
                        Button.createWithLabel('开始练习', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/StudyCamera.ets(177:15)", "entry");
                        // 开始练习按钮
                        Button.width('75%');
                        // 开始练习按钮
                        Button.height(48);
                        // 开始练习按钮
                        Button.fontSize(16);
                        // 开始练习按钮
                        Button.backgroundColor('#4CAF50');
                        // 开始练习按钮
                        Button.onClick(() => {
                            this.onStartPractice();
                        });
                    }, Button);
                    // 开始练习按钮
                    Button.pop();
                    Column.pop();
                });
            }
            // 分析中状态
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 分析中状态
            if (this.isAnalyzing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/StudyCamera.ets(193:13)", "entry");
                        Column.margin({ top: 30 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/pages/StudyCamera.ets(194:15)", "entry");
                        LoadingProgress.width(40);
                        LoadingProgress.height(40);
                        LoadingProgress.color('#667eea');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('正在识别内容...');
                        Text.debugLine("entry/src/main/ets/pages/StudyCamera.ets(198:15)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#667eea');
                        Text.margin({ top: 12 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            // 拍照控制按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 拍照控制按钮
            if (!this.isPhotoCaptured) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.isTakingPhoto ? '启动中...' : '📸 拍摄', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/StudyCamera.ets(208:13)", "entry");
                        Button.width('75%');
                        Button.height(56);
                        Button.fontSize(18);
                        Button.fontWeight(FontWeight.Medium);
                        Button.backgroundColor('#1698CE');
                        Button.enabled(!this.isTakingPhoto);
                        Button.onClick(() => {
                            this.onTakePhoto();
                        });
                        Button.shadow({
                            radius: 15,
                            color: '#30667eea',
                            offsetX: 0,
                            offsetY: 6
                        });
                        Button.margin({ top: 40 });
                    }, Button);
                    Button.pop();
                });
            }
            // 重拍按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 重拍按钮
            if (this.isPhotoCaptured && !this.isAnalyzing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('🔄 重新拍摄', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/StudyCamera.ets(229:13)", "entry");
                        Button.width('60%');
                        Button.height(44);
                        Button.fontSize(14);
                        Button.backgroundColor('#FF6B6B');
                        Button.onClick(() => {
                            this.onRetake();
                        });
                        Button.margin({ top: 20 });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "StudyCamera";
    }
}
registerNamedRoute(() => new StudyCamera(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/StudyCamera", pageFullPath: "entry/src/main/ets/pages/StudyCamera", integratedHsp: "false", moduleType: "followWithHap" });
