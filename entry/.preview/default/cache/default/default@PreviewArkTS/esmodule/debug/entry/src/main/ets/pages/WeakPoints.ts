if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WeakPoints_Params {
    weakPointRecords?: Array<{
        topic: string;
        subject: string;
        accuracy: string;
        color: string;
    }>;
    selectedFilter?: string;
    totalWeakPoints?: number;
    averageAccuracy?: string;
    weakPointManager?: WeakPointManager;
}
import { WeakPointManager } from "@bundle:com.xj.photolearn/entry/ets/common/WeakPointManager";
import router from "@ohos:router";
class WeakPoints extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__weakPointRecords = new ObservedPropertyObjectPU([
            { topic: '光的折射', subject: '物理', accuracy: '60%', color: '#FF6B6B' },
            { topic: '分数运算', subject: '数学', accuracy: '75%', color: '#FFA726' },
            { topic: '化学方程式', subject: '化学', accuracy: '45%', color: '#FF6B6B' },
            { topic: '三角形性质', subject: '数学', accuracy: '82%', color: '#4CAF50' },
            { topic: '重力加速度', subject: '物理', accuracy: '70%', color: '#FFA726' }
        ], this, "weakPointRecords");
        this.__selectedFilter = new ObservedPropertySimplePU('全部', this, "selectedFilter");
        this.__totalWeakPoints = new ObservedPropertySimplePU(0, this, "totalWeakPoints");
        this.__averageAccuracy = new ObservedPropertySimplePU('0%', this, "averageAccuracy");
        this.weakPointManager = WeakPointManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WeakPoints_Params) {
        if (params.weakPointRecords !== undefined) {
            this.weakPointRecords = params.weakPointRecords;
        }
        if (params.selectedFilter !== undefined) {
            this.selectedFilter = params.selectedFilter;
        }
        if (params.totalWeakPoints !== undefined) {
            this.totalWeakPoints = params.totalWeakPoints;
        }
        if (params.averageAccuracy !== undefined) {
            this.averageAccuracy = params.averageAccuracy;
        }
        if (params.weakPointManager !== undefined) {
            this.weakPointManager = params.weakPointManager;
        }
    }
    updateStateVars(params: WeakPoints_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__weakPointRecords.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFilter.purgeDependencyOnElmtId(rmElmtId);
        this.__totalWeakPoints.purgeDependencyOnElmtId(rmElmtId);
        this.__averageAccuracy.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__weakPointRecords.aboutToBeDeleted();
        this.__selectedFilter.aboutToBeDeleted();
        this.__totalWeakPoints.aboutToBeDeleted();
        this.__averageAccuracy.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __weakPointRecords: ObservedPropertyObjectPU<Array<{
        topic: string;
        subject: string;
        accuracy: string;
        color: string;
    }>>;
    get weakPointRecords() {
        return this.__weakPointRecords.get();
    }
    set weakPointRecords(newValue: Array<{
        topic: string;
        subject: string;
        accuracy: string;
        color: string;
    }>) {
        this.__weakPointRecords.set(newValue);
    }
    private __selectedFilter: ObservedPropertySimplePU<string>;
    get selectedFilter() {
        return this.__selectedFilter.get();
    }
    set selectedFilter(newValue: string) {
        this.__selectedFilter.set(newValue);
    }
    private __totalWeakPoints: ObservedPropertySimplePU<number>;
    get totalWeakPoints() {
        return this.__totalWeakPoints.get();
    }
    set totalWeakPoints(newValue: number) {
        this.__totalWeakPoints.set(newValue);
    }
    private __averageAccuracy: ObservedPropertySimplePU<string>;
    get averageAccuracy() {
        return this.__averageAccuracy.get();
    }
    set averageAccuracy(newValue: string) {
        this.__averageAccuracy.set(newValue);
    }
    private weakPointManager: WeakPointManager;
    aboutToAppear() {
        this.loadWeakPoints();
    }
    loadWeakPoints() {
        this.totalWeakPoints = this.weakPointManager.getWeakPointsCount();
        this.averageAccuracy = this.weakPointManager.getAverageAccuracy();
        // 这里可以从 WeakPointManager 获取真实数据
        // this.weakPointRecords = this.weakPointManager.getAllWeakPoints()
    }
    getFilteredRecords() {
        if (this.selectedFilter === '全部') {
            return this.weakPointRecords;
        }
        return this.weakPointRecords.filter(record => record.subject === this.selectedFilter);
    }
    onPractice(topic: string) {
        router.pushUrl({
            url: 'pages/Practice',
            params: {
                topic: topic,
                fromWeakPoints: true
            }
        });
    }
    FilterTabs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/WeakPoints.ets(48:5)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filter = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(filter, { type: ButtonType.Capsule });
                    Button.debugLine("entry/src/main/ets/pages/WeakPoints.ets(50:9)", "entry");
                    Button.height(36);
                    Button.fontSize(14);
                    Button.backgroundColor(this.selectedFilter === filter ? '#667eea' : '#F5F5F5');
                    Button.fontColor(this.selectedFilter === filter ? '#FFFFFF' : '#666666');
                    Button.onClick(() => {
                        this.selectedFilter = filter;
                    });
                    Button.margin({ right: 12 });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ['全部', '数学', '物理', '化学'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    StatisticsCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(66:5)", "entry");
            Column.width('90%');
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.shadow({
                radius: 12,
                color: '#20000000',
                offsetX: 0,
                offsetY: 6
            });
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/WeakPoints.ets(67:7)", "entry");
            Row.width('100%');
            Row.padding(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(68:9)", "entry");
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalWeakPoints.toString());
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(69:11)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('薄弱知识点');
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(73:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(80:9)", "entry");
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.averageAccuracy);
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(81:11)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#667eea');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('平均正确率');
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(85:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    WeakPointItem(record: {
        topic: string;
        subject: string;
        accuracy: string;
        color: string;
    }, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/WeakPoints.ets(108:5)", "entry");
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.shadow({
                radius: 8,
                color: '#15000000',
                offsetX: 0,
                offsetY: 4
            });
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/WeakPoints.ets(109:7)", "entry");
            Stack.margin({ right: 16 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 50, height: 50 });
            Circle.debugLine("entry/src/main/ets/pages/WeakPoints.ets(110:9)", "entry");
            Circle.fill(record.subject === '数学' ? '#E8F5E8' :
                record.subject === '物理' ? '#E3F2FD' :
                    record.subject === '化学' ? '#FFF3E0' : '#F3E5F5');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.subject === '数学' ? '📐' :
                record.subject === '物理' ? '⚗️' :
                    record.subject === '化学' ? '🧪' : '📚');
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(115:9)", "entry");
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(122:7)", "entry");
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/WeakPoints.ets(123:9)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.topic);
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(124:11)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/WeakPoints.ets(129:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.subject);
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(131:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#667eea');
            Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
            Text.backgroundColor('#EEF2FF');
            Text.borderRadius(10);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/WeakPoints.ets(141:9)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('正确率：');
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(142:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.accuracy);
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(145:11)", "entry");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(record.color);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('练习');
            Button.debugLine("entry/src/main/ets/pages/WeakPoints.ets(154:7)", "entry");
            Button.width(60);
            Button.height(32);
            Button.fontSize(12);
            Button.backgroundColor('#667eea');
            Button.onClick(() => {
                this.onPractice(record.topic);
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(177:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/WeakPoints.ets(179:7)", "entry");
            // 导航栏
            Row.width('100%');
            // 导航栏
            Row.padding({ left: 20, right: 20, top: 10, bottom: 10 });
            // 导航栏
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.debugLine("entry/src/main/ets/pages/WeakPoints.ets(180:9)", "entry");
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
            Blank.debugLine("entry/src/main/ets/pages/WeakPoints.ets(190:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('薄弱记录');
            Text.debugLine("entry/src/main/ets/pages/WeakPoints.ets(192:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/WeakPoints.ets(197:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(199:9)", "entry");
            Column.width(60);
            Column.height(32);
        }, Column);
        Column.pop();
        // 导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/WeakPoints.ets(207:7)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F8F8F8');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(208:9)", "entry");
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
            Column.padding({ bottom: 20 });
        }, Column);
        // 统计卡片
        this.StatisticsCard.bind(this)();
        // 筛选标签
        this.FilterTabs.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 薄弱点列表
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/WeakPoints.ets(216:11)", "entry");
            // 薄弱点列表
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const record = _item;
                this.WeakPointItem.bind(this)(record);
            };
            this.forEachUpdateFunction(elmtId, this.getFilteredRecords(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 薄弱点列表
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WeakPoints";
    }
}
registerNamedRoute(() => new WeakPoints(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/WeakPoints", pageFullPath: "entry/src/main/ets/pages/WeakPoints", integratedHsp: "false", moduleType: "followWithHap" });
