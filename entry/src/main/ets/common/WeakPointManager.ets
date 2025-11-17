export interface WeakPointRecord {
  id: string;
  subject: string;
  topic: string;
  photoPath: string;
  correctRate: number;
  totalAttempts: number;
  correctAttempts: number;
  timestamp: number;
  lastPracticeTime?: number;
}

export interface StudySession {
  id: string;
  topic: string;
  subject: string;
  score: number;
  totalQuestions: number;
  duration: number; // in seconds
  timestamp: number;
}

export interface StudyStatistics {
  totalWeakPoints: number;
  totalSessions: number;
  totalPracticeTime: number;
  averageAccuracy: number;
}

export class WeakPointManager {
  private static instance: WeakPointManager;
  private weakPoints: WeakPointRecord[] = [];
  private studySessions: StudySession[] = [];

  private constructor() {
    this.loadData();
  }

  public static getInstance(): WeakPointManager {
    if (!WeakPointManager.instance) {
      WeakPointManager.instance = new WeakPointManager();
    }
    return WeakPointManager.instance;
  }

  private loadData() {
    // 模拟从本地存储加载数据
    this.weakPoints = [
      {
        id: '1',
        subject: '数学',
        topic: '分数运算',
        photoPath: '',
        correctRate: 60,
        totalAttempts: 10,
        correctAttempts: 6,
        timestamp: Date.now() - 86400000,
        lastPracticeTime: Date.now() - 3600000
      },
      {
        id: '2',
        subject: '物理',
        topic: '光的折射',
        photoPath: '',
        correctRate: 45,
        totalAttempts: 8,
        correctAttempts: 3,
        timestamp: Date.now() - 172800000,
        lastPracticeTime: Date.now() - 7200000
      },
      {
        id: '3',
        subject: '数学',
        topic: '方程解法',
        photoPath: '',
        correctRate: 80,
        totalAttempts: 15,
        correctAttempts: 12,
        timestamp: Date.now() - 259200000
      }
    ];

    this.studySessions = [
      {
        id: '1',
        topic: '分数运算',
        subject: '数学',
        score: 2,
        totalQuestions: 3,
        duration: 180,
        timestamp: Date.now() - 3600000
      },
      {
        id: '2',
        topic: '光的折射',
        subject: '物理',
        score: 1,
        totalQuestions: 2,
        duration: 120,
        timestamp: Date.now() - 7200000
      }
    ];
  }

  private saveData() {
    // 在实际应用中，这里应该保存到本地存储
    console.log('Saving weak points data...');
  }

  // 添加新的薄弱点
  addWeakPoint(subject: string, topic: string, photoPath: string): string {
    const id = Date.now().toString();
    const newWeakPoint: WeakPointRecord = {
      id,
      subject,
      topic,
      photoPath,
      correctRate: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      timestamp: Date.now()
    };

    this.weakPoints.unshift(newWeakPoint);
    this.saveData();
    return id;
  }

  // 获取所有薄弱点
  getWeakPoints(): WeakPointRecord[] {
    return this.weakPoints;
  }

  // 根据学科筛选薄弱点
  getWeakPointsBySubject(subject: string): WeakPointRecord[] {
    return this.weakPoints.filter(point => point.subject === subject);
  }

  // 删除薄弱点
  deleteWeakPoint(id: string): boolean {
    const index = this.weakPoints.findIndex(point => point.id === id);
    if (index !== -1) {
      this.weakPoints.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // 更新薄弱点练习记录
  updatePracticeRecord(id: string, score: number, totalQuestions: number): boolean {
    const weakPoint = this.weakPoints.find(point => point.id === id);
    if (weakPoint) {
      weakPoint.totalAttempts += totalQuestions;
      weakPoint.correctAttempts += score;
      weakPoint.correctRate = Math.round((weakPoint.correctAttempts / weakPoint.totalAttempts) * 100);
      weakPoint.lastPracticeTime = Date.now();
      this.saveData();
      return true;
    }
    return false;
  }

  // 根据主题更新练习记录（当没有具体记录ID时）
  updatePracticeByTopic(topic: string, subject: string, score: number, totalQuestions: number): boolean {
    const weakPoint = this.weakPoints.find(point =>
    point.topic === topic && point.subject === subject
    );

    if (weakPoint) {
      return this.updatePracticeRecord(weakPoint.id, score, totalQuestions);
    } else {
      // 如果没有找到对应的薄弱点，创建一个新的
      const id = this.addWeakPoint(subject, topic, '');
      return this.updatePracticeRecord(id, score, totalQuestions);
    }
  }

  // 添加学习会话记录
  addStudySession(topic: string, subject: string, score: number, totalQuestions: number, duration: number): string {
    const id = Date.now().toString();
    const newSession: StudySession = {
      id,
      topic,
      subject,
      score,
      totalQuestions,
      duration,
      timestamp: Date.now()
    };

    this.studySessions.unshift(newSession);
    this.saveData();

    // 同时更新薄弱点记录
    this.updatePracticeByTopic(topic, subject, score, totalQuestions);

    return id;
  }

  // 获取学习会话记录
  getStudySessions(): StudySession[] {
    return this.studySessions;
  }

  // 获取学习统计
  getStudyStatistics(): StudyStatistics {
    const totalWeakPoints = this.weakPoints.length;
    const totalSessions = this.studySessions.length;
    const totalPracticeTime = this.studySessions.reduce((sum, session) => sum + session.duration, 0);
    const averageAccuracy = this.weakPoints.length > 0
      ? Math.round(this.weakPoints.reduce((sum, point) => sum + point.correctRate, 0) / this.weakPoints.length)
      : 0;

    return {
      totalWeakPoints,
      totalSessions,
      totalPracticeTime,
      averageAccuracy
    };
  }

  // 获取连续学习天数
  getStudyStreak(): number {
    if (this.studySessions.length === 0) {
      return 0;
    }

    const today = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    let streak = 0;

    // 按日期分组会话
    const sessionsByDate = new Map<string, StudySession[]>();
    this.studySessions.forEach(session => {
      const sessionDate = new Date(session.timestamp);
      const dateKey = sessionDate.toDateString();

      if (!sessionsByDate.has(dateKey)) {
        sessionsByDate.set(dateKey, []);
      }
      sessionsByDate.get(dateKey)!.push(session);
    });

    // 计算连续天数
    let checkDate = new Date(today);
    while (true) {
      const dateKey = checkDate.toDateString();
      if (sessionsByDate.has(dateKey)) {
        streak++;
        checkDate.setTime(checkDate.getTime() - msPerDay);
      } else {
        break;
      }
    }

    return streak;
  }

  // 格式化时间戳
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return Math.floor(diffInHours) + '小时前';
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays + '天前';
    }
  }

  // 获取薄弱点数量（用于Tab显示）
  getWeakPointsCount(): number {
    return this.weakPoints.length;
  }

  // 获取总练习次数（用于Tab显示）
  getTotalPracticeCount(): number {
    return this.weakPoints.reduce((sum, point) => sum + point.totalAttempts, 0);
  }

  // 获取平均正确率（用于Tab显示）
  getAverageAccuracy(): string {
    if (this.weakPoints.length === 0) {
      return '0%';
    }
    const avgRate = Math.round(
      this.weakPoints.reduce((sum, point) => sum + point.correctRate, 0) / this.weakPoints.length
    );
    return avgRate + '%';
  }
}