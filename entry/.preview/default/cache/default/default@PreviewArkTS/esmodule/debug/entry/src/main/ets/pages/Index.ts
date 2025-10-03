if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentPhoto?: string;
    isPhotoCaptured?: boolean;
    selectedTabIndex?: number;
    photoRecords?: PhotoRecord[];
    isTakingPhoto?: boolean;
    photoManager?: PhotoManager;
    recognitionService?: RecognitionService;
}
import { PhotoManager } from "@bundle:com.xj.photolearn/entry/ets/common/PhotoManager";
import type { PhotoRecord } from "@bundle:com.xj.photolearn/entry/ets/common/PhotoManager";
import router from "@ohos:router";
import { MockRecognitionService } from "@bundle:com.xj.photolearn/entry/ets/common/RecognitionService";
import type { RecognitionService, StudyRecord } from "@bundle:com.xj.photolearn/entry/ets/common/RecognitionService";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPhoto = new ObservedPropertySimplePU('', this, "currentPhoto");
        this.__isPhotoCaptured = new ObservedPropertySimplePU(false, this, "isPhotoCaptured");
        this.__selectedTabIndex = new ObservedPropertySimplePU(0, this, "selectedTabIndex");
        this.__photoRecords = new ObservedPropertyObjectPU([], this, "photoRecords");
        this.__isTakingPhoto = new ObservedPropertySimplePU(false, this, "isTakingPhoto");
        this.photoManager = PhotoManager.getInstance();
        this.recognitionService = new MockRecognitionService();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.currentPhoto !== undefined) {
            this.currentPhoto = params.currentPhoto;
        }
        if (params.isPhotoCaptured !== undefined) {
            this.isPhotoCaptured = params.isPhotoCaptured;
        }
        if (params.selectedTabIndex !== undefined) {
            this.selectedTabIndex = params.selectedTabIndex;
        }
        if (params.photoRecords !== undefined) {
            this.photoRecords = params.photoRecords;
        }
        if (params.isTakingPhoto !== undefined) {
            this.isTakingPhoto = params.isTakingPhoto;
        }
        if (params.photoManager !== undefined) {
            this.photoManager = params.photoManager;
        }
        if (params.recognitionService !== undefined) {
            this.recognitionService = params.recognitionService;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPhoto.purgeDependencyOnElmtId(rmElmtId);
        this.__isPhotoCaptured.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__photoRecords.purgeDependencyOnElmtId(rmElmtId);
        this.__isTakingPhoto.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPhoto.aboutToBeDeleted();
        this.__isPhotoCaptured.aboutToBeDeleted();
        this.__selectedTabIndex.aboutToBeDeleted();
        this.__photoRecords.aboutToBeDeleted();
        this.__isTakingPhoto.aboutToBeDeleted();
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
    private __selectedTabIndex: ObservedPropertySimplePU<number>;
    get selectedTabIndex() {
        return this.__selectedTabIndex.get();
    }
    set selectedTabIndex(newValue: number) {
        this.__selectedTabIndex.set(newValue);
    }
    private __photoRecords: ObservedPropertyObjectPU<PhotoRecord[]>;
    get photoRecords() {
        return this.__photoRecords.get();
    }
    set photoRecords(newValue: PhotoRecord[]) {
        this.__photoRecords.set(newValue);
    }
    private __isTakingPhoto: ObservedPropertySimplePU<boolean>;
    get isTakingPhoto() {
        return this.__isTakingPhoto.get();
    }
    set isTakingPhoto(newValue: boolean) {
        this.__isTakingPhoto.set(newValue);
    }
    private photoManager: PhotoManager;
    private recognitionService: RecognitionService;
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
            }
            else {
                console.log('Photo capture was cancelled or failed');
            }
        }
        catch (error) {
            console.error('Photo capture error:', error);
        }
        finally {
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
        }
        catch (e) {
            console.error('Object recognition failed:', e);
        }
        finally {
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
    TabBuilder(title: string, targetIndex: number, selectedImg: Resource, normalImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(89:5)", "entry");
            Column.width('100%');
            Column.height(65);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.selectedTabIndex = targetIndex;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Index.ets(90:7)", "entry");
            Stack.width(40);
            Stack.height(40);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.selectedTabIndex === targetIndex ? selectedImg : normalImg);
            Image.debugLine("entry/src/main/ets/pages/Index.ets(91:9)", "entry");
            Image.size({ width: 28, height: 28 });
            Image.fillColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedTabIndex === targetIndex) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 40, height: 40 });
                        Circle.debugLine("entry/src/main/ets/pages/Index.ets(96:11)", "entry");
                        Circle.fill('transparent');
                        Circle.stroke('#667eea');
                        Circle.strokeWidth(2);
                        Circle.opacity(0.3);
                    }, Circle);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(106:7)", "entry");
            Text.fontSize(12);
            Text.fontWeight(this.selectedTabIndex === targetIndex ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E');
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedTabIndex === targetIndex) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 4, height: 4 });
                        Circle.debugLine("entry/src/main/ets/pages/Index.ets(113:9)", "entry");
                        Circle.fill('#667eea');
                        Circle.margin({ top: 4 });
                    }, Circle);
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
    PhotoCaptureArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(127:5)", "entry");
            Column.padding({ left: 20, right: 20, top: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 高端相框设计
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Index.ets(129:7)", "entry");
            // 高端相框设计
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 相框外层装饰
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(131:9)", "entry");
            // 相框外层装饰
            Column.width('85%');
            // 相框外层装饰
            Column.aspectRatio(4 / 3);
            // 相框外层装饰
            Column.backgroundColor('#F8F8F8');
            // 相框外层装饰
            Column.borderRadius(20);
            // 相框外层装饰
            Column.padding(6);
            // 相框外层装饰
            Column.shadow({
                radius: 30,
                color: '#0D000000',
                offsetX: 0,
                offsetY: 12
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(132:11)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.padding(8);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.shadow({
                radius: 20,
                color: '#1A000000',
                offsetX: 0,
                offsetY: 8
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isPhotoCaptured && this.currentPhoto) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 显示拍摄的照片
                        Image.create(this.currentPhoto);
                        Image.debugLine("entry/src/main/ets/pages/Index.ets(135:15)", "entry");
                        // 显示拍摄的照片
                        Image.width('100%');
                        // 显示拍摄的照片
                        Image.height('100%');
                        // 显示拍摄的照片
                        Image.objectFit(ImageFit.Cover);
                        // 显示拍摄的照片
                        Image.borderRadius(12);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 默认状态：相机图标
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Index.ets(142:15)", "entry");
                        // 默认状态：相机图标
                        Column.width('100%');
                        // 默认状态：相机图标
                        Column.height('100%');
                        // 默认状态：相机图标
                        Column.justifyContent(FlexAlign.Center);
                        // 默认状态：相机图标
                        Column.backgroundColor('#FAFAFA');
                        // 默认状态：相机图标
                        Column.borderRadius(12);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 125830242, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/Index.ets(143:17)", "entry");
                        Image.width(60);
                        Image.height(60);
                        Image.fillColor('#C0C0C0');
                        Image.opacity(0.6);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('轻触下方按钮开始拍照');
                        Text.debugLine("entry/src/main/ets/pages/Index.ets(148:17)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#888');
                        Text.margin({ top: 16 });
                        Text.opacity(0.8);
                    }, Text);
                    Text.pop();
                    // 默认状态：相机图标
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        // 相框外层装饰
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 相框装饰角
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(186:9)", "entry");
            // 相框装饰角
            Column.width('85%');
            // 相框装饰角
            Column.aspectRatio(4 / 3);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左上角装饰
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(188:11)", "entry");
            // 左上角装饰
            Column.position({ x: 15, y: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(189:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(190:15)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(194:15)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3 });
        }, Column);
        Column.pop();
        Row.pop();
        // 左上角装饰
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右上角装饰
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(204:11)", "entry");
            // 右上角装饰
            Column.position({ x: '85%', y: 15 });
            // 右上角装饰
            Column.translate({ x: -20, y: 0 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(205:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(206:15)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(210:15)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3 });
        }, Column);
        Column.pop();
        Row.pop();
        // 右上角装饰
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左下角装饰
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(221:11)", "entry");
            // 左下角装饰
            Column.position({ x: 15 });
            // 左下角装饰
            Column.translate({ x: 0, y: '85%' });
            // 左下角装饰
            Column.margin({ top: -35 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(222:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(223:15)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(227:15)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3, top: 17 });
        }, Column);
        Column.pop();
        Row.pop();
        // 左下角装饰
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右下角装饰
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(239:11)", "entry");
            // 右下角装饰
            Column.position({ x: '85%' });
            // 右下角装饰
            Column.translate({ x: -20, y: '85%' });
            // 右下角装饰
            Column.margin({ top: -18 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(240:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(241:15)", "entry");
            Column.width(20);
            Column.height(3);
            Column.backgroundColor('#D4AF37');
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(245:15)", "entry");
            Column.width(3);
            Column.height(20);
            Column.backgroundColor('#D4AF37');
            Column.margin({ left: -3, top: -3 });
        }, Column);
        Column.pop();
        Row.pop();
        // 右下角装饰
        Column.pop();
        // 相框装饰角
        Column.pop();
        // 高端相框设计
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 状态指示器
            if (this.isPhotoCaptured) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/Index.ets(263:9)", "entry");
                        Row.margin({ top: 16 });
                        Row.opacity(0.8);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 8, height: 8 });
                        Circle.debugLine("entry/src/main/ets/pages/Index.ets(264:11)", "entry");
                        Circle.fill('#4CAF50');
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('照片已捕获');
                        Text.debugLine("entry/src/main/ets/pages/Index.ets(266:11)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#4CAF50');
                        Text.margin({ left: 6 });
                    }, Text);
                    Text.pop();
                    Row.pop();
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
    CameraGuideSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(279:5)", "entry");
            Column.padding({ left: 20, right: 20, bottom: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主拍照按钮
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Index.ets(281:7)", "entry");
            // 主拍照按钮
            Stack.margin({ top: 30 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isTakingPhoto ? '启动中...' : '📸 拍照学习', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/Index.ets(282:9)", "entry");
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
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isTakingPhoto) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/pages/Index.ets(300:11)", "entry");
                        LoadingProgress.width(24);
                        LoadingProgress.height(24);
                        LoadingProgress.color('#FFFFFF');
                        LoadingProgress.margin({ right: 120 });
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 主拍照按钮
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 实物识别按钮（最小闭环）
            Button.createWithLabel(this.isTakingPhoto ? '请稍候...' : '🔍 实物识别', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/Index.ets(310:7)", "entry");
            // 实物识别按钮（最小闭环）
            Button.width('75%');
            // 实物识别按钮（最小闭环）
            Button.height(48);
            // 实物识别按钮（最小闭环）
            Button.fontSize(16);
            // 实物识别按钮（最小闭环）
            Button.backgroundColor('#667eea');
            // 实物识别按钮（最小闭环）
            Button.enabled(!this.isTakingPhoto);
            // 实物识别按钮（最小闭环）
            Button.onClick(() => { this.onRecognizeObject(); });
            // 实物识别按钮（最小闭环）
            Button.margin({ top: 12 });
        }, Button);
        // 实物识别按钮（最小闭环）
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isPhotoCaptured) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/Index.ets(320:9)", "entry");
                        Row.width('75%');
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.margin({ top: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 重新拍照按钮
                        Button.createWithLabel('🔄 重拍', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/Index.ets(322:11)", "entry");
                        // 重新拍照按钮
                        Button.width('32%');
                        // 重新拍照按钮
                        Button.height(44);
                        // 重新拍照按钮
                        Button.fontSize(14);
                        // 重新拍照按钮
                        Button.fontWeight(FontWeight.Medium);
                        // 重新拍照按钮
                        Button.backgroundColor('#FF6B6B');
                        // 重新拍照按钮
                        Button.onClick(() => {
                            this.currentPhoto = '';
                            this.isPhotoCaptured = false;
                        });
                        // 重新拍照按钮
                        Button.shadow({
                            radius: 8,
                            color: '#40ff6b6b',
                            offsetX: 0,
                            offsetY: 4
                        });
                    }, Button);
                    // 重新拍照按钮
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/pages/Index.ets(339:11)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 确认保存按钮
                        Button.createWithLabel('✓ 保存', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/Index.ets(342:11)", "entry");
                        // 确认保存按钮
                        Button.width('32%');
                        // 确认保存按钮
                        Button.height(44);
                        // 确认保存按钮
                        Button.fontSize(14);
                        // 确认保存按钮
                        Button.fontWeight(FontWeight.Medium);
                        // 确认保存按钮
                        Button.backgroundColor('#4CAF50');
                        // 确认保存按钮
                        Button.onClick(() => {
                            this.onSavePhoto();
                        });
                        // 确认保存按钮
                        Button.shadow({
                            radius: 8,
                            color: '#404CAF50',
                            offsetX: 0,
                            offsetY: 4
                        });
                    }, Button);
                    // 确认保存按钮
                    Button.pop();
                    Row.pop();
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
    HomeContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(367:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.PhotoCaptureArea.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Index.ets(369:7)", "entry");
        }, Blank);
        Blank.pop();
        this.CameraGuideSection.bind(this)();
        Column.pop();
    }
    MyContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(377:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.padding({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(379:7)", "entry");
            // 标题区域
            Row.margin({ top: 30, bottom: 30 });
            // 标题区域
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📸');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(380:9)", "entry");
            Text.fontSize(28);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的拍照记录');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(382:9)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        // 标题区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.photoRecords.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Index.ets(392:9)", "entry");
                        Column.width('100%');
                        Column.height(250);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("entry/src/main/ets/pages/Index.ets(393:11)", "entry");
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 100, height: 100 });
                        Circle.debugLine("entry/src/main/ets/pages/Index.ets(394:13)", "entry");
                        Circle.fill('#f1f3f4');
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 130023509, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/Index.ets(396:13)", "entry");
                        Image.width(50);
                        Image.height(50);
                        Image.fillColor('#9E9E9E');
                        Image.opacity(0.6);
                    }, Image);
                    Stack.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无拍照记录');
                        Text.debugLine("entry/src/main/ets/pages/Index.ets(402:11)", "entry");
                        Text.fontSize(16);
                        Text.fontColor('#757575');
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('开始您的第一次拍照学习吧');
                        Text.debugLine("entry/src/main/ets/pages/Index.ets(406:11)", "entry");
                        Text.fontSize(12);
                        Text.fontColor('#BDBDBD');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 12 });
                        List.debugLine("entry/src/main/ets/pages/Index.ets(415:9)", "entry");
                        List.width('100%');
                        List.layoutWeight(1);
                        List.padding({ left: 20, right: 20 });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const record = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    itemCreation2(elmtId, isInitialRender);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.debugLine("entry/src/main/ets/pages/Index.ets(417:13)", "entry");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("entry/src/main/ets/pages/Index.ets(418:15)", "entry");
                                        Row.width('100%');
                                        Row.padding(16);
                                        Row.backgroundColor('#FFFFFF');
                                        Row.borderRadius(16);
                                        Row.shadow({
                                            radius: 8,
                                            color: '#10000000',
                                            offsetX: 0,
                                            offsetY: 2
                                        });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Stack.create();
                                        Stack.debugLine("entry/src/main/ets/pages/Index.ets(419:17)", "entry");
                                    }, Stack);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(record.filePath || { "id": 130023508, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                                        Image.debugLine("entry/src/main/ets/pages/Index.ets(420:19)", "entry");
                                        Image.width(70);
                                        Image.height(70);
                                        Image.borderRadius(12);
                                        Image.objectFit(ImageFit.Cover);
                                        Image.backgroundColor('#F5F5F5');
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 照片装饰边框
                                        Column.create();
                                        Column.debugLine("entry/src/main/ets/pages/Index.ets(428:19)", "entry");
                                        // 照片装饰边框
                                        Column.width(70);
                                        // 照片装饰边框
                                        Column.height(70);
                                        // 照片装饰边框
                                        Column.borderRadius(12);
                                        // 照片装饰边框
                                        Column.border({
                                            width: 2,
                                            color: '#E0E0E0'
                                        });
                                    }, Column);
                                    // 照片装饰边框
                                    Column.pop();
                                    Stack.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.debugLine("entry/src/main/ets/pages/Index.ets(438:17)", "entry");
                                        Column.alignItems(HorizontalAlign.Start);
                                        Column.margin({ left: 16 });
                                        Column.layoutWeight(1);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('📸 学习照片');
                                        Text.debugLine("entry/src/main/ets/pages/Index.ets(439:19)", "entry");
                                        Text.fontSize(16);
                                        Text.fontWeight(FontWeight.Medium);
                                        Text.fontColor('#2C3E50');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.photoManager.formatTimestamp(record.timestamp));
                                        Text.debugLine("entry/src/main/ets/pages/Index.ets(443:19)", "entry");
                                        Text.fontSize(12);
                                        Text.fontColor('#78909C');
                                        Text.margin({ top: 6 });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("entry/src/main/ets/pages/Index.ets(448:19)", "entry");
                                        Row.margin({ top: 8 });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Circle.create({ width: 6, height: 6 });
                                        Circle.debugLine("entry/src/main/ets/pages/Index.ets(449:21)", "entry");
                                        Circle.fill('#4CAF50');
                                    }, Circle);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('已保存');
                                        Text.debugLine("entry/src/main/ets/pages/Index.ets(451:21)", "entry");
                                        Text.fontSize(10);
                                        Text.fontColor('#4CAF50');
                                        Text.margin({ left: 4 });
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.debugLine("entry/src/main/ets/pages/Index.ets(462:17)", "entry");
                                        Column.alignItems(HorizontalAlign.End);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Button.createWithLabel('删除', { type: ButtonType.Capsule });
                                        Button.debugLine("entry/src/main/ets/pages/Index.ets(463:19)", "entry");
                                        Button.width(55);
                                        Button.height(32);
                                        Button.fontSize(11);
                                        Button.backgroundColor('#FFEBEE');
                                        Button.fontColor('#F44336');
                                        Button.onClick(() => {
                                            this.onDeletePhoto(record.id);
                                        });
                                    }, Button);
                                    Button.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create({ "id": 125830088, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                                        Image.debugLine("entry/src/main/ets/pages/Index.ets(473:19)", "entry");
                                        Image.width(16);
                                        Image.height(16);
                                        Image.fillColor('#BDBDBD');
                                        Image.margin({ top: 8 });
                                    }, Image);
                                    Column.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.photoRecords, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(505:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End, controller: new TabsController() });
            Tabs.debugLine("entry/src/main/ets/pages/Index.ets(506:7)", "entry");
            Tabs.animationDuration(300);
            Tabs.backgroundColor('#FFFFFF');
            Tabs.onChange((index: number) => {
                this.selectedTabIndex = index;
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.HomeContent.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '首页', 0, { "id": 130023516, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" }, { "id": 125833494, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                } });
            TabContent.backgroundColor('#f8f9fa');
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(507:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.MyContent.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, '我的', 1, { "id": 130023514, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" }, { "id": 125834229, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
                } });
            TabContent.backgroundColor('#f8f9fa');
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(513:9)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
