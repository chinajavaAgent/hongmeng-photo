import router from '@ohos.router'

interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  type: 'multiple_choice' | 'calculation' | 'text_input';
}

@Entry
@Component
struct Practice {
  @State currentQuestionIndex: number = 0;
  @State userAnswer: string = '';
  @State showResult: boolean = false;
  @State isCorrect: boolean = false;
  @State questions: Question[] = [];
  @State topic: string = '综合练习';
  @State score: number = 0;
  @State totalQuestions: number = 0;
  @State showFinalScore: boolean = false;

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
    } else if (this.topic === '分数运算') {
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
    } else {
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
    } else {
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

  @Builder QuestionDisplay() {
    Column() {
      // 进度指示器
      Row() {
        Text(`${this.currentQuestionIndex + 1}/${this.totalQuestions}`)
          .fontSize(14)
          .fontColor('#888')
        
        Blank()
        
        Progress({
          value: this.currentQuestionIndex + 1,
          total: this.totalQuestions,
          type: ProgressType.Linear
        })
          .width(200)
          .height(8)
          .color('#667eea')
          .backgroundColor('#E0E0E0')
      }
      .width('100%')
      .margin({ bottom: 30 })

      // 题目
      Text(this.getCurrentQuestion().question)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#2C3E50')
        .textAlign(TextAlign.Center)
        .lineHeight(28)
        .margin({ bottom: 30 })

      // 答题区域
      if (this.getCurrentQuestion().type === 'multiple_choice' && this.getCurrentQuestion().options) {
        // 选择题
        Column() {
          ForEach(this.getCurrentQuestion().options!, (option: string, index: number) => {
            Button(option, { type: ButtonType.Capsule })
              .width('85%')
              .height(48)
              .fontSize(16)
              .backgroundColor(this.userAnswer === option ? '#667eea' : '#F5F5F5')
              .fontColor(this.userAnswer === option ? '#FFFFFF' : '#2C3E50')
              .onClick(() => {
                this.selectOption(option);
              })
              .margin({ bottom: 12 })
          })
        }
        .width('100%')
        .margin({ bottom: 20 })
      } else {
        // 文本输入或计算题
        Column() {
          TextInput({ placeholder: '请输入答案' })
            .width('85%')
            .height(48)
            .fontSize(16)
            .backgroundColor('#F5F5F5')
            .onChange((value: string) => {
              this.userAnswer = value;
            })
        }
        .width('100%')
        .margin({ bottom: 20 })
      }

      // 提交按钮
      if (this.userAnswer && !this.showResult) {
        Button('提交答案', { type: ButtonType.Capsule })
          .width('60%')
          .height(48)
          .fontSize(16)
          .backgroundColor('#667eea')
          .onClick(() => {
            this.submitAnswer();
          })
      }
    }
    .width('100%')
    .padding(20)
  }

  @Builder ResultDisplay() {
    if (this.showResult) {
      Column() {
        // 结果图标
        Stack() {
          Circle({ width: 80, height: 80 })
            .fill(this.isCorrect ? '#4CAF50' : '#F44336')
          Text(this.isCorrect ? '✓' : '✗')
            .fontSize(40)
            .fontColor('#FFFFFF')
            .fontWeight(FontWeight.Bold)
        }
        .margin({ bottom: 24 })

        Text(this.isCorrect ? '回答正确！' : '答案错误')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.isCorrect ? '#4CAF50' : '#F44336')
          .margin({ bottom: 16 })

        if (!this.isCorrect) {
          Text('正确答案：' + this.getCurrentQuestion().correctAnswer)
            .fontSize(16)
            .fontColor('#2C3E50')
            .margin({ bottom: 12 })
        }

        Text(this.getCurrentQuestion().explanation)
          .fontSize(14)
          .fontColor('#666')
          .lineHeight(20)
          .textAlign(TextAlign.Center)
          .padding(16)
          .backgroundColor('#F8F9FA')
          .borderRadius(12)
          .margin({ bottom: 30 })

        Button(this.currentQuestionIndex < this.questions.length - 1 ? '下一题' : '查看成绩', 
               { type: ButtonType.Capsule })
          .width('60%')
          .height(48)
          .fontSize(16)
          .backgroundColor('#667eea')
          .onClick(() => {
            this.nextQuestion();
          })
      }
      .width('100%')
      .padding(20)
      .alignItems(HorizontalAlign.Center)
    }
  }

  @Builder FinalScoreDisplay() {
    if (this.showFinalScore) {
      Column() {
        Stack() {
          Circle({ width: 120, height: 120 })
            .fill('#667eea')
          Column() {
            Text(this.score.toString())
              .fontSize(36)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            Text(`/${this.totalQuestions}`)
              .fontSize(18)
              .fontColor('#FFFFFF')
              .margin({ top: -8 })
          }
        }
        .margin({ bottom: 24 })

        Text('练习完成！')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#2C3E50')
          .margin({ bottom: 16 })

        Text(`正确率：${this.getAccuracy()}%`)
          .fontSize(18)
          .fontColor('#4CAF50')
          .margin({ bottom: 30 })

        Row() {
          Button('再练一次', { type: ButtonType.Capsule })
            .width('45%')
            .height(44)
            .fontSize(14)
            .backgroundColor('#667eea')
            .onClick(() => {
              this.restartPractice();
            })
          
          Blank()
          
          Button('返回', { type: ButtonType.Capsule })
            .width('45%')
            .height(44)
            .fontSize(14)
            .backgroundColor('#4CAF50')
            .onClick(() => {
              router.back();
            })
        }
        .width('85%')
      }
      .width('100%')
      .padding(20)
      .alignItems(HorizontalAlign.Center)
    }
  }

  build() {
    Column() {
      // 导航栏
      Row() {
        Button('返回', { type: ButtonType.Capsule })
          .width(60)
          .height(32)
          .fontSize(12)
          .backgroundColor('#F5F5F5')
          .fontColor('#666')
          .onClick(() => {
            router.back();
          })
        
        Blank()
        
        Column() {
          Text(this.topic)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#2C3E50')
          Text('练习')
            .fontSize(12)
            .fontColor('#888')
            .margin({ top: 2 })
        }
        
        Blank()
        
        Column() {
          Text('得分')
            .fontSize(10)
            .fontColor('#888')
          Text(this.score.toString())
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#667eea')
        }
        .width(60)
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 10, bottom: 10 })
      .backgroundColor('#FFFFFF')

      Scroll() {
        Column() {
          if (this.showFinalScore) {
            this.FinalScoreDisplay()
          } else if (this.showResult) {
            this.ResultDisplay()
          } else {
            this.QuestionDisplay()
          }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
      }
      .width('100%')
      .layoutWeight(1)
      .backgroundColor('#F8F8F8')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8F8F8')
  }
}