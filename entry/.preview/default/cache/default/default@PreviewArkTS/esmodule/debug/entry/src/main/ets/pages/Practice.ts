if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Practice_Params {
    currentQuestionIndex?: number;
    userAnswer?: string;
    showResult?: boolean;
    isCorrect?: boolean;
    questions?: Question[];
    topic?: string;
    score?: number;
    totalQuestions?: number;
    showFinalScore?: boolean;
}
import router from "@ohos:router";
interface Question {
    id: string;
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    type: 'multiple_choice' | 'calculation' | 'text_input';
}
class Practice extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentQuestionIndex = new ObservedPropertySimplePU(0, this, "currentQuestionIndex");
        this.__userAnswer = new ObservedPropertySimplePU('', this, "userAnswer");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__isCorrect = new ObservedPropertySimplePU(false, this, "isCorrect");
        this.__questions = new ObservedPropertyObjectPU([], this, "questions");
        this.__topic = new ObservedPropertySimplePU('综合练习', this, "topic");
        this.__score = new ObservedPropertySimplePU(0, this, "score");
        this.__totalQuestions = new ObservedPropertySimplePU(0, this, "totalQuestions");
        this.__showFinalScore = new ObservedPropertySimplePU(false, this, "showFinalScore");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Practice_Params) {
        if (params.currentQuestionIndex !== undefined) {
            this.currentQuestionIndex = params.currentQuestionIndex;
        }
        if (params.userAnswer !== undefined) {
            this.userAnswer = params.userAnswer;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.isCorrect !== undefined) {
            this.isCorrect = params.isCorrect;
        }
        if (params.questions !== undefined) {
            this.questions = params.questions;
        }
        if (params.topic !== undefined) {
            this.topic = params.topic;
        }
        if (params.score !== undefined) {
            this.score = params.score;
        }
        if (params.totalQuestions !== undefined) {
            this.totalQuestions = params.totalQuestions;
        }
        if (params.showFinalScore !== undefined) {
            this.showFinalScore = params.showFinalScore;
        }
    }
    updateStateVars(params: Practice_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentQuestionIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__userAnswer.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__isCorrect.purgeDependencyOnElmtId(rmElmtId);
        this.__questions.purgeDependencyOnElmtId(rmElmtId);
        this.__topic.purgeDependencyOnElmtId(rmElmtId);
        this.__score.purgeDependencyOnElmtId(rmElmtId);
        this.__totalQuestions.purgeDependencyOnElmtId(rmElmtId);
        this.__showFinalScore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentQuestionIndex.aboutToBeDeleted();
        this.__userAnswer.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__isCorrect.aboutToBeDeleted();
        this.__questions.aboutToBeDeleted();
        this.__topic.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
        this.__totalQuestions.aboutToBeDeleted();
        this.__showFinalScore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentQuestionIndex: ObservedPropertySimplePU<number>;
    get currentQuestionIndex() {
        return this.__currentQuestionIndex.get();
    }
    set currentQuestionIndex(newValue: number) {
        this.__currentQuestionIndex.set(newValue);
    }
    private __userAnswer: ObservedPropertySimplePU<string>;
    get userAnswer() {
        return this.__userAnswer.get();
    }
    set userAnswer(newValue: string) {
        this.__userAnswer.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __isCorrect: ObservedPropertySimplePU<boolean>;
    get isCorrect() {
        return this.__isCorrect.get();
    }
    set isCorrect(newValue: boolean) {
        this.__isCorrect.set(newValue);
    }
    private __questions: ObservedPropertyObjectPU<Question[]>;
    get questions() {
        return this.__questions.get();
    }
    set questions(newValue: Question[]) {
        this.__questions.set(newValue);
    }
    private __topic: ObservedPropertySimplePU<string>;
    get topic() {
        return this.__topic.get();
    }
    set topic(newValue: string) {
        this.__topic.set(newValue);
    }
    private __score: ObservedPropertySimplePU<number>;
    get score() {
        return this.__score.get();
    }
    set score(newValue: number) {
        this.__score.set(newValue);
    }
    private __totalQuestions: ObservedPropertySimplePU<number>;
    get totalQuestions() {
        return this.__totalQuestions.get();
    }
    set totalQuestions(newValue: number) {
        this.__totalQuestions.set(newValue);
    }
    private __showFinalScore: ObservedPropertySimplePU<boolean>;
    get showFinalScore() {
        return this.__showFinalScore.get();
    }
    set showFinalScore(newValue: boolean) {
        this.__showFinalScore.set(newValue);
    }
    aboutToAppear() {
        const params = router.getParams() as Record<string, Object>;
        if (params?.topic) {
            this.topic = params.topic as string;
        }
        this.loadQuestions();
    }
    loadQuestions() {
        // 根据主题生成练习题
        if (this.topic === '光的折射') {
            this.questions = [
                {
                    id: '1',
                    question: '光从空气射入水中时会发生什么？',
                    options: ['折射角大于入射角', '折射角小于入射角', '折射角等于入射角', '不发生折射'],
                    correctAnswer: '折射角小于入射角',
                    explanation: '光从光疏介质射入光密介质时，折射角小于入射角',
                    type: 'multiple_choice'
                },
                {
                    id: '2',
                    question: '彩虹是怎么形成的？',
                    correctAnswer: '光的色散',
                    explanation: '太阳光经过水滴时发生折射和反射，白光被分解成七色光形成彩虹',
                    type: 'text_input'
                }
            ];
        }
        else if (this.topic === '分数运算') {
            this.questions = [
                {
                    id: '1',
                    question: '2/3 + 1/6 = ?',
                    correctAnswer: '5/6',
                    explanation: '通分后：4/6 + 1/6 = 5/6',
                    type: 'calculation'
                },
                {
                    id: '2',
                    question: '下面哪个分数最大？',
                    options: ['2/3', '3/4', '5/6', '1/2'],
                    correctAnswer: '5/6',
                    explanation: '通分比较：8/12, 9/12, 10/12, 6/12，所以5/6最大',
                    type: 'multiple_choice'
                }
            ];
        }
        else {
            // 默认综合练习题
            this.questions = [
                {
                    id: '1',
                    question: '三角形内角和是多少度？',
                    options: ['180°', '360°', '90°', '270°'],
                    correctAnswer: '180°',
                    explanation: '任意三角形的内角和都是180度',
                    type: 'multiple_choice'
                },
                {
                    id: '2',
                    question: '水的化学式是什么？',
                    correctAnswer: 'H2O',
                    explanation: '水由两个氢原子和一个氧原子组成',
                    type: 'text_input'
                }
            ];
        }
        this.totalQuestions = this.questions.length;
    }
    getCurrentQuestion(): Question {
        return this.questions[this.currentQuestionIndex] || this.questions[0];
    }
    submitAnswer() {
        const question = this.getCurrentQuestion();
        this.isCorrect = this.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
        if (this.isCorrect) {
            this.score++;
        }
        this.showResult = true;
    }
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.userAnswer = '';
            this.showResult = false;
            this.isCorrect = false;
        }
        else {
            this.showFinalScore = true;
        }
    }
    restartPractice() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswer = '';
        this.showResult = false;
        this.showFinalScore = false;
        this.isCorrect = false;
    }
    selectOption(option: string) {
        this.userAnswer = option;
    }
    getAccuracy(): number {
        return Math.round((this.score / this.totalQuestions) * 100);
    }
    QuestionDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Practice.ets(139:5)", "entry");
            Column.width('100%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度指示器
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Practice.ets(141:7)", "entry");
            // 进度指示器
            Row.width('100%');
            // 进度指示器
            Row.margin({ bottom: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.currentQuestionIndex + 1}/${this.totalQuestions}`);
            Text.debugLine("entry/src/main/ets/pages/Practice.ets(142:9)", "entry");
            Text.fontSize(14);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Practice.ets(146:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({
                value: this.currentQuestionIndex + 1,
                total: this.totalQuestions,
                type: ProgressType.Linear
            });
            Progress.debugLine("entry/src/main/ets/pages/Practice.ets(148:9)", "entry");
            Progress.width(200);
            Progress.height(8);
            Progress.color('#667eea');
            Progress.backgroundColor('#E0E0E0');
        }, Progress);
        // 进度指示器
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 题目
            Text.create(this.getCurrentQuestion().question);
            Text.debugLine("entry/src/main/ets/pages/Practice.ets(162:7)", "entry");
            // 题目
            Text.fontSize(20);
            // 题目
            Text.fontWeight(FontWeight.Bold);
            // 题目
            Text.fontColor('#2C3E50');
            // 题目
            Text.textAlign(TextAlign.Center);
            // 题目
            Text.lineHeight(28);
            // 题目
            Text.margin({ bottom: 30 });
        }, Text);
        // 题目
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 答题区域
            if (this.getCurrentQuestion().type === 'multiple_choice' && this.getCurrentQuestion().options) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 选择题
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Practice.ets(173:9)", "entry");
                        // 选择题
                        Column.width('100%');
                        // 选择题
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const option = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel(option, { type: ButtonType.Capsule });
                                Button.debugLine("entry/src/main/ets/pages/Practice.ets(175:13)", "entry");
                                Button.width('85%');
                                Button.height(48);
                                Button.fontSize(16);
                                Button.backgroundColor(this.userAnswer === option ? '#667eea' : '#F5F5F5');
                                Button.fontColor(this.userAnswer === option ? '#FFFFFF' : '#2C3E50');
                                Button.onClick(() => {
                                    this.selectOption(option);
                                });
                                Button.margin({ bottom: 12 });
                            }, Button);
                            Button.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.getCurrentQuestion().options!, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    // 选择题
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 文本输入或计算题
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Practice.ets(191:9)", "entry");
                        // 文本输入或计算题
                        Column.width('100%');
                        // 文本输入或计算题
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: '请输入答案' });
                        TextInput.debugLine("entry/src/main/ets/pages/Practice.ets(192:11)", "entry");
                        TextInput.width('85%');
                        TextInput.height(48);
                        TextInput.fontSize(16);
                        TextInput.backgroundColor('#F5F5F5');
                        TextInput.onChange((value: string) => {
                            this.userAnswer = value;
                        });
                    }, TextInput);
                    // 文本输入或计算题
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 提交按钮
            if (this.userAnswer && !this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('提交答案', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/Practice.ets(207:9)", "entry");
                        Button.width('60%');
                        Button.height(48);
                        Button.fontSize(16);
                        Button.backgroundColor('#667eea');
                        Button.onClick(() => {
                            this.submitAnswer();
                        });
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
    }
    ResultDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Practice.ets(223:7)", "entry");
                        Column.width('100%');
                        Column.padding(20);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 结果图标
                        Stack.create();
                        Stack.debugLine("entry/src/main/ets/pages/Practice.ets(225:9)", "entry");
                        // 结果图标
                        Stack.margin({ bottom: 24 });
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 80, height: 80 });
                        Circle.debugLine("entry/src/main/ets/pages/Practice.ets(226:11)", "entry");
                        Circle.fill(this.isCorrect ? '#4CAF50' : '#F44336');
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.isCorrect ? '✓' : '✗');
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(228:11)", "entry");
                        Text.fontSize(40);
                        Text.fontColor('#FFFFFF');
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    // 结果图标
                    Stack.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.isCorrect ? '回答正确！' : '答案错误');
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(235:9)", "entry");
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(this.isCorrect ? '#4CAF50' : '#F44336');
                        Text.margin({ bottom: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (!this.isCorrect) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('正确答案：' + this.getCurrentQuestion().correctAnswer);
                                    Text.debugLine("entry/src/main/ets/pages/Practice.ets(242:11)", "entry");
                                    Text.fontSize(16);
                                    Text.fontColor('#2C3E50');
                                    Text.margin({ bottom: 12 });
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
                        Text.create(this.getCurrentQuestion().explanation);
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(248:9)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#666');
                        Text.lineHeight(20);
                        Text.textAlign(TextAlign.Center);
                        Text.padding(16);
                        Text.backgroundColor('#F8F9FA');
                        Text.borderRadius(12);
                        Text.margin({ bottom: 30 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.currentQuestionIndex < this.questions.length - 1 ? '下一题' : '查看成绩', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/Practice.ets(258:9)", "entry");
                        Button.width('60%');
                        Button.height(48);
                        Button.fontSize(16);
                        Button.backgroundColor('#667eea');
                        Button.onClick(() => {
                            this.nextQuestion();
                        });
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    FinalScoreDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showFinalScore) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Practice.ets(276:7)", "entry");
                        Column.width('100%');
                        Column.padding(20);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("entry/src/main/ets/pages/Practice.ets(277:9)", "entry");
                        Stack.margin({ bottom: 24 });
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 120, height: 120 });
                        Circle.debugLine("entry/src/main/ets/pages/Practice.ets(278:11)", "entry");
                        Circle.fill('#667eea');
                    }, Circle);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Practice.ets(280:11)", "entry");
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.score.toString());
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(281:13)", "entry");
                        Text.fontSize(36);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#FFFFFF');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`/${this.totalQuestions}`);
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(285:13)", "entry");
                        Text.fontSize(18);
                        Text.fontColor('#FFFFFF');
                        Text.margin({ top: -8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    Stack.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('练习完成！');
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(293:9)", "entry");
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#2C3E50');
                        Text.margin({ bottom: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`正确率：${this.getAccuracy()}%`);
                        Text.debugLine("entry/src/main/ets/pages/Practice.ets(299:9)", "entry");
                        Text.fontSize(18);
                        Text.fontColor('#4CAF50');
                        Text.margin({ bottom: 30 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/Practice.ets(304:9)", "entry");
                        Row.width('85%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('再练一次', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/Practice.ets(305:11)", "entry");
                        Button.width('45%');
                        Button.height(44);
                        Button.fontSize(14);
                        Button.backgroundColor('#667eea');
                        Button.onClick(() => {
                            this.restartPractice();
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/pages/Practice.ets(314:11)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('返回', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/Practice.ets(316:11)", "entry");
                        Button.width('45%');
                        Button.height(44);
                        Button.fontSize(14);
                        Button.backgroundColor('#4CAF50');
                        Button.onClick(() => {
                            router.back();
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Practice.ets(334:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Practice.ets(336:7)", "entry");
            // 导航栏
            Row.width('100%');
            // 导航栏
            Row.padding({ left: 20, right: 20, top: 10, bottom: 10 });
            // 导航栏
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/Practice.ets(337:9)", "entry");
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
            Blank.debugLine("entry/src/main/ets/pages/Practice.ets(347:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Practice.ets(349:9)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.topic);
            Text.debugLine("entry/src/main/ets/pages/Practice.ets(350:11)", "entry");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2C3E50');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('练习');
            Text.debugLine("entry/src/main/ets/pages/Practice.ets(354:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/Practice.ets(360:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Practice.ets(362:9)", "entry");
            Column.width(60);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('得分');
            Text.debugLine("entry/src/main/ets/pages/Practice.ets(363:11)", "entry");
            Text.fontSize(10);
            Text.fontColor('#888');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.score.toString());
            Text.debugLine("entry/src/main/ets/pages/Practice.ets(366:11)", "entry");
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#667eea');
        }, Text);
        Text.pop();
        Column.pop();
        // 导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/Practice.ets(378:7)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F8F8F8');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Practice.ets(379:9)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showFinalScore) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.FinalScoreDisplay.bind(this)();
                });
            }
            else if (this.showResult) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ResultDisplay.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.QuestionDisplay.bind(this)();
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
        return "Practice";
    }
}
registerNamedRoute(() => new Practice(undefined, {}), "", { bundleName: "com.xj.photolearn", moduleName: "entry", pagePath: "pages/Practice", pageFullPath: "entry/src/main/ets/pages/Practice", integratedHsp: "false", moduleType: "followWithHap" });
