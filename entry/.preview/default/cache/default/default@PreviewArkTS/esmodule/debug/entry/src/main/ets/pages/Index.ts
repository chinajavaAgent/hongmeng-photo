if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    selectedTabIndex?: number;
    weakPointsCount?: number;
    practiceCount?: number;
    studyStreak?: number;
    photoManager?: PhotoManager;
    weakPointManager?: WeakPointManager;
    userProfileManager?: UserProfileManager;
}
import { PhotoManager } from "@bundle:com.xj.photolearn/entry/ets/common/PhotoManager";
import { WeakPointManager } from "@bundle:com.xj.photolearn/entry/ets/common/WeakPointManager";
import { UserProfileManager } from "@bundle:com.xj.photolearn/entry/ets/common/UserProfileManager";
import router from "@ohos:router";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedTabIndex = new ObservedPropertySimplePU(0, this, "selectedTabIndex");
        this.__weakPointsCount = new ObservedPropertySimplePU(0, this, "weakPointsCount");
        this.__practiceCount = new ObservedPropertySimplePU(0, this, "practiceCount");
        this.__studyStreak = new ObservedPropertySimplePU(0, this, "studyStreak");
        this.photoManager = PhotoManager.getInstance();
        this.weakPointManager = WeakPointManager.getInstance();
        this.userProfileManager = UserProfileManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.selectedTabIndex !== undefined) {
            this.selectedTabIndex = params.selectedTabIndex;
        }
        if (params.weakPointsCount !== undefined) {
            this.weakPointsCount = params.weakPointsCount;
        }
        if (params.practiceCount !== undefined) {
            this.practiceCount = params.practiceCount;
        }
        if (params.studyStreak !== undefined) {
            this.studyStreak = params.studyStreak;
        }
        if (params.photoManager !== undefined) {
            this.photoManager = params.photoManager;
        }
        if (params.weakPointManager !== undefined) {
            this.weakPointManager = params.weakPointManager;
        }
        if (params.userProfileManager !== undefined) {
            this.userProfileManager = params.userProfileManager;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__weakPointsCount.purgeDependencyOnElmtId(rmElmtId);
        this.__practiceCount.purgeDependencyOnElmtId(rmElmtId);
        this.__studyStreak.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedTabIndex.aboutToBeDeleted();
        this.__weakPointsCount.aboutToBeDeleted();
        this.__practiceCount.aboutToBeDeleted();
        this.__studyStreak.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedTabIndex: ObservedPropertySimplePU<number>;
    get selectedTabIndex() {
        return this.__selectedTabIndex.get();
    }
    set selectedTabIndex(newValue: number) {
        this.__selectedTabIndex.set(newValue);
    }
    private __weakPointsCount: ObservedPropertySimplePU<number>;
    get weakPointsCount() {
        return this.__weakPointsCount.get();
    }
    set weakPointsCount(newValue: number) {
        this.__weakPointsCount.set(newValue);
    }
    private __practiceCount: ObservedPropertySimplePU<number>;
    get practiceCount() {
        return this.__practiceCount.get();
    }
    set practiceCount(newValue: number) {
        this.__practiceCount.set(newValue);
    }
    private __studyStreak: ObservedPropertySimplePU<number>;
    get studyStreak() {
        return this.__studyStreak.get();
    }
    set studyStreak(newValue: number) {
        this.__studyStreak.set(newValue);
    }
    private photoManager: PhotoManager;
    private weakPointManager: WeakPointManager;
    private userProfileManager: UserProfileManager;
    aboutToAppear() {
        this.loadStatistics();
    }
    loadStatistics() {
        this.weakPointsCount = this.weakPointManager.getWeakPointsCount();
        this.practiceCount = this.weakPointManager.getTotalPracticeCount();
        this.studyStreak = this.weakPointManager.getStudyStreak();
    }
    TabBuilder(title: string, targetIndex: number, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(28:5)", "entry");
            Column.width('100%');
            Column.height(60);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.selectedTabIndex = targetIndex;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(29:7)", "entry");
            Text.fontSize(24);
            Text.fontColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(32:7)", "entry");
            Text.fontSize(12);
            Text.fontWeight(this.selectedTabIndex === targetIndex ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.selectedTabIndex === targetIndex ? '#667eea' : '#8E8E8E');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    StudyCameraTab(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(47:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(49:7)", "entry");
            // 顶部标题栏
            Row.width('90%');
            // 顶部标题栏
            Row.padding({ top: 20, bottom: 20 });
            // 顶部标题栏
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📷 拍照学习');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(50:9)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Index.ets(54:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild('相机');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(55:9)", "entry");
            Button.type(ButtonType.Circle);
            Button.width(48);
            Button.height(48);
            Button.backgroundColor('#667eea');
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/CameraCapture' });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 125830242, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/Index.ets(56:11)", "entry");
            Image.width(20);
            Image.height(20);
            Image.fillColor('#FFFFFF');
        }, Image);
        Button.pop();
        // 顶部标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 快速操作区域
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(74:7)", "entry");
            // 快速操作区域
            Column.width('90%');
            // 快速操作区域
            Column.padding(20);
            // 快速操作区域
            Column.backgroundColor('#FFFFFF');
            // 快速操作区域
            Column.borderRadius(16);
            // 快速操作区域
            Column.shadow({
                radius: 12,
                color: '#20000000',
                offsetX: 0,
                offsetY: 6
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('快速开始');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(75:9)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(82:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 拍照学习按钮
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(84:11)", "entry");
            // 拍照学习按钮
            Column.width('50%');
            // 拍照学习按钮
            Column.onClick(() => {
                router.pushUrl({ url: 'pages/CameraCapture' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Index.ets(85:13)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 80, height: 80 });
            Circle.debugLine("entry/src/main/ets/pages/Index.ets(86:15)", "entry");
            Circle.fill('#1698CE');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📸');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(88:15)", "entry");
            Text.fontSize(32);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('拍照识别');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(92:13)", "entry");
            Text.fontSize(14);
            Text.fontColor('#2C3E50');
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        // 拍照学习按钮
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 历史记录按钮
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(103:11)", "entry");
            // 历史记录按钮
            Column.width('50%');
            // 历史记录按钮
            Column.onClick(() => {
                // 切换到学习历史Tab
                this.selectedTabIndex = 1;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/Index.ets(104:13)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 80, height: 80 });
            Circle.debugLine("entry/src/main/ets/pages/Index.ets(105:15)", "entry");
            Circle.fill('#4CAF50');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📚');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(107:15)", "entry");
            Text.fontSize(32);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学习历史');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(111:13)", "entry");
            Text.fontSize(14);
            Text.fontColor('#2C3E50');
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        // 历史记录按钮
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 今日学习统计
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(126:9)", "entry");
            // 今日学习统计
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日学习');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(127:11)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(134:11)", "entry");
            Row.padding(20);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.shadow({
                radius: 8,
                color: '#15000000',
                offsetX: 0,
                offsetY: 4
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(135:13)", "entry");
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('0');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(136:15)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#667eea');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('拍照次数');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(140:15)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(147:13)", "entry");
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('0');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(148:15)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4CAF50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('识别成功');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(152:15)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 今日学习统计
        Column.pop();
        // 快速操作区域
        Column.pop();
        Column.pop();
    }
    WeakPointsTab(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(189:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(191:7)", "entry");
            // 顶部标题栏
            Row.width('90%');
            // 顶部标题栏
            Row.padding({ top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📊 薄弱记录');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(192:9)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        // 顶部标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统计卡片
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(201:7)", "entry");
            // 统计卡片
            Row.width('90%');
            // 统计卡片
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(202:9)", "entry");
            Column.width('48%');
            Column.height(100);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({
                radius: 8,
                color: '#15000000',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.weakPointsCount.toString());
            Text.debugLine("entry/src/main/ets/pages/Index.ets(203:11)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('薄弱知识点');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(207:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Index.ets(224:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(226:9)", "entry");
            Column.width('48%');
            Column.height(100);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({
                radius: 8,
                color: '#15000000',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.practiceCount.toString());
            Text.debugLine("entry/src/main/ets/pages/Index.ets(227:11)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4CAF50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('练习次数');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(231:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        // 统计卡片
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 薄弱点列表
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(252:7)", "entry");
            // 薄弱点列表
            Column.width('90%');
            // 薄弱点列表
            Column.padding(20);
            // 薄弱点列表
            Column.backgroundColor('#FFFFFF');
            // 薄弱点列表
            Column.borderRadius(16);
            // 薄弱点列表
            Column.shadow({
                radius: 12,
                color: '#20000000',
                offsetX: 0,
                offsetY: 6
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('薄弱知识点');
            Text.debugLine("entry/src/main/ets/pages/Index.ets(253:9)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 模拟薄弱点数据
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(261:9)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Index.ets(267:13)", "entry");
                    Row.width('100%');
                    Row.padding(16);
                    Row.backgroundColor('#FFFFFF');
                    Row.borderRadius(12);
                    Row.margin({ bottom: 12 });
                    Row.shadow({
                        radius: 8,
                        color: '#15000000',
                        offsetX: 0,
                        offsetY: 4
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Index.ets(268:15)", "entry");
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.topic);
                    Text.debugLine("entry/src/main/ets/pages/Index.ets(269:17)", "entry");
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#2C3E50');
                    Text.alignSelf(ItemAlign.Start);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.subject);
                    Text.debugLine("entry/src/main/ets/pages/Index.ets(274:17)", "entry");
                    Text.fontSize(12);
                    Text.fontColor('#888');
                    Text.margin({ top: 4 });
                    Text.alignSelf(ItemAlign.Start);
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Index.ets(282:15)", "entry");
                    Column.alignItems(HorizontalAlign.End);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.accuracy);
                    Text.debugLine("entry/src/main/ets/pages/Index.ets(283:17)", "entry");
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(item.color);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('正确率');
                    Text.debugLine("entry/src/main/ets/pages/Index.ets(287:17)", "entry");
                    Text.fontSize(10);
                    Text.fontColor('#888');
                    Text.margin({ top: 2 });
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, [
                { topic: '光的折射', subject: '物理', accuracy: '60%', color: '#FF6B6B' },
                { topic: '分数运算', subject: '数学', accuracy: '75%', color: '#FFA726' },
                { topic: '化学方程式', subject: '化学', accuracy: '45%', color: '#FF6B6B' }
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 模拟薄弱点数据
        Column.pop();
        // 薄弱点列表
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
MyProfileTab();
{
    Column();
    {
        // 顶部标题栏
        Row();
        {
            Text('👤 我的')
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50');
            Blank();
            Button('管理');
            {
                Image($r('sys.media.ohos_ic_public_settings'))
                    .width(20)
                    .height(20)
                    .fillColor('#FFFFFF');
            }
            type(ButtonType.Circle)
                .width(48)
                .height(48)
                .backgroundColor('#667eea')
                .onClick(() => {
                router.pushUrl({ url: 'pages/MyProfile' });
            });
        }
        width('90%')
            .padding({ top: 20, bottom: 20 })
            .alignItems(VerticalAlign.Center);
        // 快速操作区域
        Column();
        {
            Text('个人信息')
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50')
                .alignSelf(ItemAlign.Start)
                .margin({ bottom: 20 });
            Row();
            {
                // 基本信息按钮
                Column();
                {
                    Stack();
                    {
                        Circle({ width: 80, height: 80 })
                            .fill('#1698CE');
                        Text('👤')
                            .fontSize(32)
                            .fontColor('#FFFFFF');
                    }
                    Text('基本信息')
                        .fontSize(14)
                        .fontColor('#2C3E50')
                        .margin({ top: 12 });
                }
                width('50%')
                    .onClick(() => {
                    router.pushUrl({ url: 'pages/MyProfile' });
                });
                // 学习统计按钮
                Column();
                {
                    Stack();
                    {
                        Circle({ width: 80, height: 80 })
                            .fill('#4CAF50');
                        Text('📊')
                            .fontSize(32)
                            .fontColor('#FFFFFF');
                    }
                    Text('学习统计')
                        .fontSize(14)
                        .fontColor('#2C3E50')
                        .margin({ top: 12 });
                }
                width('50%')
                    .onClick(() => {
                    router.pushUrl({ url: 'pages/MyProfile' });
                });
            }
            width('100%')
                .margin({ bottom: 30 });
            // 今日学习统计
            Column();
            {
                Text('学习概览')
                    .fontSize(16)
                    .fontWeight(FontWeight.Bold)
                    .fontColor('#2C3E50')
                    .alignSelf(ItemAlign.Start)
                    .margin({ bottom: 16 });
                Row();
                {
                    Column();
                    {
                        Text('15')
                            .fontSize(24)
                            .fontWeight(FontWeight.Bold)
                            .fontColor('#667eea');
                        Text('学习天数')
                            .fontSize(12)
                            .fontColor('#888')
                            .margin({ top: 4 });
                    }
                    width('50%');
                    Column();
                    {
                        Text('2')
                            .fontSize(24)
                            .fontWeight(FontWeight.Bold)
                            .fontColor('#4CAF50');
                        Text('获得成就')
                            .fontSize(12)
                            .fontColor('#888')
                            .margin({ top: 4 });
                    }
                    width('50%');
                }
                padding(20)
                    .backgroundColor('#FFFFFF')
                    .borderRadius(12)
                    .shadow({
                    radius: 8,
                    color: '#15000000',
                    offsetX: 0,
                    offsetY: 4
                });
            }
            width('100%');
        }
        width('90%')
            .padding(20)
            .backgroundColor('#FFFFFF')
            .borderRadius(16)
            .shadow({
            radius: 12,
            color: '#20000000',
            offsetX: 0,
            offsetY: 6
        });
    }
    width('100%')
        .height('100%')
        .backgroundColor('#F8F8F8')
        .alignItems(HorizontalAlign.Center);
}
PracticeTab();
{
    Column();
    {
        // 顶部标题栏
        Row();
        {
            Text('🎤 练习')
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50');
        }
        width('90%')
            .padding({ top: 20, bottom: 20 });
        // 练习模式选择
        Column();
        {
            Text('选择练习模式')
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor('#2C3E50')
                .alignSelf(ItemAlign.Start)
                .margin({ bottom: 20 });
            // 薄弱点练习
            Row();
            {
                Stack();
                {
                    Circle({ width: 60, height: 60 })
                        .fill('#FF6B6B');
                    Text('🎯')
                        .fontSize(24)
                        .fontColor('#FFFFFF');
                }
                margin({ right: 16 });
                Column();
                {
                    Text('薄弱点练习')
                        .fontSize(18)
                        .fontWeight(FontWeight.Medium)
                        .fontColor('#2C3E50')
                        .alignSelf(ItemAlign.Start);
                    Text('针对薄弱知识点专项练习')
                        .fontSize(13)
                        .fontColor('#888')
                        .margin({ top: 4 })
                        .alignSelf(ItemAlign.Start);
                }
                layoutWeight(1);
                Image({ "id": 125830088, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" })
                    .width(20)
                    .height(20)
                    .fillColor('#CCC');
            }
            width('100%')
                .height(80)
                .padding(16)
                .backgroundColor('#FFFFFF')
                .borderRadius(12)
                .margin({ bottom: 12 })
                .shadow({
                radius: 8,
                color: '#15000000',
                offsetX: 0,
                offsetY: 4
            })
                .onClick(() => {
                router.pushUrl({ url: 'pages/Practice' });
            });
            // 随机练习
            Row();
            {
                Stack();
                {
                    Circle({ width: 60, height: 60 })
                        .fill('#4CAF50');
                    Text('🎲')
                        .fontSize(24)
                        .fontColor('#FFFFFF');
                }
                margin({ right: 16 });
                Column();
                {
                    Text('随机练习')
                        .fontSize(18)
                        .fontWeight(FontWeight.Medium)
                        .fontColor('#2C3E50')
                        .alignSelf(ItemAlign.Start);
                    Text('随机抽取题目练习')
                        .fontSize(13)
                        .fontColor('#888')
                        .margin({ top: 4 })
                        .alignSelf(ItemAlign.Start);
                }
                layoutWeight(1);
                Image({ "id": 125830088, "type": 20000, params: [], "bundleName": "com.xj.photolearn", "moduleName": "entry" })
                    .width(20)
                    .height(20)
                    .fillColor('#CCC');
            }
            width('100%')
                .height(80)
                .padding(16)
                .backgroundColor('#FFFFFF')
                .borderRadius(12)
                .shadow({
                radius: 8,
                color: '#15000000',
                offsetX: 0,
                offsetY: 4
            })
                .onClick(() => {
                router.pushUrl({ url: 'pages/Practice' });
            });
        }
        width('90%')
            .padding(20)
            .backgroundColor('#FFFFFF')
            .borderRadius(16)
            .shadow({
            radius: 12,
            color: '#20000000',
            offsetX: 0,
            offsetY: 6
        });
    }
    width('100%')
        .height('100%')
        .backgroundColor('#F8F8F8')
        .alignItems(HorizontalAlign.Center);
}
build();
{
    Column();
    {
        Tabs({ barPosition: BarPosition.End });
        {
            TabContent();
            {
                this.StudyCameraTab();
            }
            tabBar(this.TabBuilder('拍照学习', 0, '📷'));
            TabContent();
            {
                this.WeakPointsTab();
            }
            tabBar(this.TabBuilder('薄弱记录', 1, '📊'));
            TabContent();
            {
                this.PracticeTab();
            }
            tabBar(this.TabBuilder('练习', 2, '🎤'));
            TabContent();
            {
                this.MyProfileTab();
            }
            tabBar(this.TabBuilder('我的', 3, '👤'));
        }
        animationDuration(300)
            .backgroundColor('#FFFFFF')
            .onChange((index: number) => {
            this.selectedTabIndex = index;
            if (index === 1) {
                this.loadStatistics(); // 刷新薄弱点数据
            }
        });
    }
    width('100%')
        .height('100%')
        .backgroundColor('#F8F8F8');
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
