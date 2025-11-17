if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MyProfile_Params {
    nickname?: string;
    grade?: string;
    gender?: string;
    learningStage?: string;
    studyDays?: number;
    achievements?: number;
    isEditing?: boolean;
    userProfileManager?: UserProfileManager;
}
import { UserProfileManager } from "@bundle:com.xj.photolearn/entry/ets/common/UserProfileManager";
import router from "@ohos:router";
class MyProfile extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new ObservedPropertySimplePU('小学霸', this, "nickname");
        this.__grade = new ObservedPropertySimplePU('二年级', this, "grade");
        this.__gender = new ObservedPropertySimplePU('女孩', this, "gender");
        this.__learningStage = new ObservedPropertySimplePU('基础巩固阶段', this, "learningStage");
        this.__studyDays = new ObservedPropertySimplePU(15, this, "studyDays");
        this.__achievements = new ObservedPropertySimplePU(2, this, "achievements");
        this.__isEditing = new ObservedPropertySimplePU(false, this, "isEditing");
        this.userProfileManager = UserProfileManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MyProfile_Params) {
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.grade !== undefined) {
            this.grade = params.grade;
        }
        if (params.gender !== undefined) {
            this.gender = params.gender;
        }
        if (params.learningStage !== undefined) {
            this.learningStage = params.learningStage;
        }
        if (params.studyDays !== undefined) {
            this.studyDays = params.studyDays;
        }
        if (params.achievements !== undefined) {
            this.achievements = params.achievements;
        }
        if (params.isEditing !== undefined) {
            this.isEditing = params.isEditing;
        }
        if (params.userProfileManager !== undefined) {
            this.userProfileManager = params.userProfileManager;
        }
    }
    updateStateVars(params: MyProfile_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__grade.purgeDependencyOnElmtId(rmElmtId);
        this.__gender.purgeDependencyOnElmtId(rmElmtId);
        this.__learningStage.purgeDependencyOnElmtId(rmElmtId);
        this.__studyDays.purgeDependencyOnElmtId(rmElmtId);
        this.__achievements.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditing.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__grade.aboutToBeDeleted();
        this.__gender.aboutToBeDeleted();
        this.__learningStage.aboutToBeDeleted();
        this.__studyDays.aboutToBeDeleted();
        this.__achievements.aboutToBeDeleted();
        this.__isEditing.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __grade: ObservedPropertySimplePU<string>;
    get grade() {
        return this.__grade.get();
    }
    set grade(newValue: string) {
        this.__grade.set(newValue);
    }
    private __gender: ObservedPropertySimplePU<string>;
    get gender() {
        return this.__gender.get();
    }
    set gender(newValue: string) {
        this.__gender.set(newValue);
    }
    private __learningStage: ObservedPropertySimplePU<string>;
    get learningStage() {
        return this.__learningStage.get();
    }
    set learningStage(newValue: string) {
        this.__learningStage.set(newValue);
    }
    private __studyDays: ObservedPropertySimplePU<number>;
    get studyDays() {
        return this.__studyDays.get();
    }
    set studyDays(newValue: number) {
        this.__studyDays.set(newValue);
    }
    private __achievements: ObservedPropertySimplePU<number>;
    get achievements() {
        return this.__achievements.get();
    }
    set achievements(newValue: number) {
        this.__achievements.set(newValue);
    }
    private __isEditing: ObservedPropertySimplePU<boolean>;
    get isEditing() {
        return this.__isEditing.get();
    }
    set isEditing(newValue: boolean) {
        this.__isEditing.set(newValue);
    }
    private userProfileManager: UserProfileManager;
    aboutToAppear() {
        this.loadUserData();
    }
    loadUserData() {
        const profile = this.userProfileManager.getUserProfile();
        if (profile) {
            this.nickname = profile.nickname;
            this.grade = profile.grade;
            this.gender = profile.gender;
            this.learningStage = profile.learningStage;
            this.studyDays = profile.totalStudyDays;
            this.achievements = this.userProfileManager.getUnlockedAchievements().length;
        }
    }
    onEditProfile() {
        this.isEditing = true;
    }
    onSaveProfile() {
        this.userProfileManager.updateBasicInfo(this.nickname, this.grade, this.gender);
        this.userProfileManager.updateLearningStage(this.learningStage);
        this.isEditing = false;
    }
    onCancelEdit() {
        this.isEditing = false;
        this.loadUserData();
    }
    ProfileHeader(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(48:5)", "entry");
            Column.width('90%');
            Column.padding(20);
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
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/MyProfile.ets(49:7)", "entry");
            Stack.margin({ bottom: 12 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 80, height: 80 });
            Circle.debugLine("entry/src/main/ets/pages/MyProfile.ets(50:9)", "entry");
            Circle.fill('#E3F2FD');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.gender === '男孩' ? '👦' : '👧');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(52:9)", "entry");
            Text.fontSize(40);
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.nickname, placeholder: '输入昵称' });
                        TextInput.debugLine("entry/src/main/ets/pages/MyProfile.ets(58:9)", "entry");
                        TextInput.width(200);
                        TextInput.height(40);
                        TextInput.fontSize(18);
                        TextInput.textAlign(TextAlign.Center);
                        TextInput.backgroundColor('#F5F5F5');
                        TextInput.borderRadius(8);
                        TextInput.onChange((value: string) => {
                            this.nickname = value;
                        });
                    }, TextInput);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.nickname);
                        Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(69:9)", "entry");
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#2C3E50');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.grade} · ${this.gender}`);
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(75:7)", "entry");
            Text.fontSize(14);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.learningStage);
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(80:7)", "entry");
            Text.fontSize(12);
            Text.fontColor('#667eea');
            Text.padding({ left: 12, right: 12, top: 4, bottom: 4 });
            Text.backgroundColor('#EEF2FF');
            Text.borderRadius(12);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    LearningStats(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(102:5)", "entry");
            Column.width('90%');
            Column.padding(20);
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
            Text.create('📈 学习统计');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(103:7)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MyProfile.ets(110:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(111:9)", "entry");
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.studyDays.toString());
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(112:11)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4CAF50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学习天数');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(116:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(123:9)", "entry");
            Column.width('50%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.achievements.toString());
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(124:11)", "entry");
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#667eea');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('获得成就');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(128:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    BasicInfoSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(151:5)", "entry");
            Column.width('90%');
            Column.padding(20);
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
            Text.create('📋 基本信息');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(152:7)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MyProfile.ets(159:7)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('年级：');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(160:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.grade);
                        Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(166:11)", "entry");
                        Button.width(160);
                        Button.height(36);
                        Button.fontSize(14);
                        Button.onClick(() => {
                            // 简单的年级切换
                            const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];
                            const currentIndex = grades.indexOf(this.grade);
                            const nextIndex = (currentIndex + 1) % grades.length;
                            this.grade = grades[nextIndex];
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.grade);
                        Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(178:11)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#2C3E50');
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MyProfile.ets(187:7)", "entry");
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('性别：');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(188:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.gender);
                        Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(194:11)", "entry");
                        Button.width(160);
                        Button.height(36);
                        Button.fontSize(14);
                        Button.onClick(() => {
                            this.gender = this.gender === '男孩' ? '女孩' : '男孩';
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.gender);
                        Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(202:11)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#2C3E50');
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MyProfile.ets(211:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学习阶段：');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(212:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.learningStage);
                        Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(218:11)", "entry");
                        Button.width(160);
                        Button.height(36);
                        Button.fontSize(14);
                        Button.onClick(() => {
                            const stages = ['初学阶段', '基础巩固阶段', '能力提升阶段', '冲刺阶段'];
                            const currentIndex = stages.indexOf(this.learningStage);
                            const nextIndex = (currentIndex + 1) % stages.length;
                            this.learningStage = stages[nextIndex];
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.learningStage);
                        Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(229:11)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#2C3E50');
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Column.pop();
    }
    EditButtons(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MyProfile.ets(251:5)", "entry");
            Row.width('90%');
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditing) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(253:9)", "entry");
                        Button.width('45%');
                        Button.height(44);
                        Button.fontSize(16);
                        Button.backgroundColor('#F5F5F5');
                        Button.fontColor('#666');
                        Button.onClick(() => {
                            this.onCancelEdit();
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/pages/MyProfile.ets(263:9)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('保存');
                        Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(265:9)", "entry");
                        Button.width('45%');
                        Button.height(44);
                        Button.fontSize(16);
                        Button.backgroundColor('#4CAF50');
                        Button.onClick(() => {
                            this.onSaveProfile();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('编辑资料');
                        Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(274:9)", "entry");
                        Button.width('60%');
                        Button.height(44);
                        Button.fontSize(16);
                        Button.backgroundColor('#667eea');
                        Button.onClick(() => {
                            this.onEditProfile();
                        });
                    }, Button);
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(289:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/MyProfile.ets(291:7)", "entry");
            // 导航栏
            Row.width('100%');
            // 导航栏
            Row.padding({ left: 20, right: 20, top: 10, bottom: 10 });
            // 导航栏
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.debugLine("entry/src/main/ets/pages/MyProfile.ets(292:9)", "entry");
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
            Blank.debugLine("entry/src/main/ets/pages/MyProfile.ets(302:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的');
            Text.debugLine("entry/src/main/ets/pages/MyProfile.ets(304:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/MyProfile.ets(309:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(311:9)", "entry");
            Column.width(60);
            Column.height(32);
        }, Column);
        Column.pop();
        // 导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/MyProfile.ets(319:7)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F8F8F8');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MyProfile.ets(320:9)", "entry");
            Column.width('100%');
            Column.padding({ top: 20, bottom: 20 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.ProfileHeader.bind(this)();
        this.LearningStats.bind(this)();
        this.BasicInfoSection.bind(this)();
        Column.pop();
        Scroll.pop();
        this.EditButtons.bind(this)();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MyProfile";
    }
}
registerNamedRoute(() => new MyProfile(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/MyProfile", pageFullPath: "entry/src/main/ets/pages/MyProfile", integratedHsp: "false", moduleType: "followWithHap" });
