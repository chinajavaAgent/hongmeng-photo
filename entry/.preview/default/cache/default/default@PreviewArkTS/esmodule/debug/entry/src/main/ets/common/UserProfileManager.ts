export interface UserProfile {
    id: string;
    nickname: string;
    grade: string;
    gender: string;
    avatar: string;
    learningStage: string;
    learningGoals: string[];
    totalStudyDays: number;
    totalPracticeTime: number;
    achievements: Achievement[];
    createdAt: number;
    updatedAt: number;
}
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: number;
    isUnlocked: boolean;
}
export class UserProfileManager {
    private static instance: UserProfileManager;
    private userProfile: UserProfile | null = null;
    private readonly STORAGE_KEY = 'user_profile_data';
    private constructor() {
        this.loadUserProfile();
    }
    public static getInstance(): UserProfileManager {
        if (!UserProfileManager.instance) {
            UserProfileManager.instance = new UserProfileManager();
        }
        return UserProfileManager.instance;
    }
    private loadUserProfile() {
        try {
            // 模拟从本地存储加载数据
            // 实际应用中应该从 preferences 或数据库加载
            const defaultProfile: UserProfile = {
                id: '1',
                nickname: '小学霸',
                grade: '二年级',
                gender: '女孩',
                avatar: '',
                learningStage: '基础巩固阶段',
                learningGoals: ['数学提分', '科学探索', '习惯养成'],
                totalStudyDays: 15,
                totalPracticeTime: 3600,
                achievements: [
                    {
                        id: '1',
                        title: '学习新星',
                        description: '连续学习7天',
                        icon: '⭐',
                        unlockedAt: Date.now() - 86400000,
                        isUnlocked: true
                    },
                    {
                        id: '2',
                        title: '知识探索者',
                        description: '识别了10个新知识点',
                        icon: '🔍',
                        unlockedAt: Date.now() - 172800000,
                        isUnlocked: true
                    },
                    {
                        id: '3',
                        title: '练习达人',
                        description: '完成50道练习题',
                        icon: '📝',
                        unlockedAt: 0,
                        isUnlocked: false
                    }
                ],
                createdAt: Date.now() - 2592000000,
                updatedAt: Date.now()
            };
            this.userProfile = defaultProfile;
        }
        catch (error) {
            console.error('Failed to load user profile:', error);
            this.createDefaultProfile();
        }
    }
    private createDefaultProfile() {
        const defaultProfile: UserProfile = {
            id: Date.now().toString(),
            nickname: '小朋友',
            grade: '一年级',
            gender: '男孩',
            avatar: '',
            learningStage: '初学阶段',
            learningGoals: [],
            totalStudyDays: 0,
            totalPracticeTime: 0,
            achievements: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        this.userProfile = defaultProfile;
        this.saveUserProfile();
    }
    private saveUserProfile() {
        if (this.userProfile) {
            this.userProfile.updatedAt = Date.now();
            // 实际应用中应该保存到本地存储
            console.log('User profile saved:', this.userProfile);
        }
    }
    // 获取用户档案
    getUserProfile(): UserProfile | null {
        return this.userProfile;
    }
    // 更新用户基本信息
    updateBasicInfo(nickname: string, grade: string, gender: string): boolean {
        if (this.userProfile) {
            this.userProfile.nickname = nickname;
            this.userProfile.grade = grade;
            this.userProfile.gender = gender;
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    // 更新学习阶段
    updateLearningStage(learningStage: string): boolean {
        if (this.userProfile) {
            this.userProfile.learningStage = learningStage;
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    // 更新学习目标
    updateLearningGoals(goals: string[]): boolean {
        if (this.userProfile) {
            this.userProfile.learningGoals = goals;
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    // 更新头像
    updateAvatar(avatar: string): boolean {
        if (this.userProfile) {
            this.userProfile.avatar = avatar;
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    // 增加学习天数
    incrementStudyDays(): boolean {
        if (this.userProfile) {
            this.userProfile.totalStudyDays++;
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    // 增加练习时间（秒）
    addPracticeTime(seconds: number): boolean {
        if (this.userProfile) {
            this.userProfile.totalPracticeTime += seconds;
            this.saveUserProfile();
            return true;
        }
        return false;
    }
    // 解锁成就
    unlockAchievement(title: string, description: string, icon: string): boolean {
        if (this.userProfile) {
            const existingAchievement = this.userProfile.achievements.find(a => a.title === title);
            if (existingAchievement && !existingAchievement.isUnlocked) {
                existingAchievement.isUnlocked = true;
                existingAchievement.unlockedAt = Date.now();
                this.saveUserProfile();
                return true;
            }
            else if (!existingAchievement) {
                const newAchievement: Achievement = {
                    id: Date.now().toString(),
                    title,
                    description,
                    icon,
                    unlockedAt: Date.now(),
                    isUnlocked: true
                };
                this.userProfile.achievements.push(newAchievement);
                this.saveUserProfile();
                return true;
            }
        }
        return false;
    }
    // 获取已解锁的成就
    getUnlockedAchievements(): Achievement[] {
        if (this.userProfile) {
            return this.userProfile.achievements.filter(a => a.isUnlocked);
        }
        return [];
    }
    // 获取所有成就
    getAllAchievements(): Achievement[] {
        if (this.userProfile) {
            return this.userProfile.achievements;
        }
        return [];
    }
    // 获取学习统计
    getLearningStats() {
        if (this.userProfile) {
            const totalHours = Math.floor(this.userProfile.totalPracticeTime / 3600);
            const totalMinutes = Math.floor((this.userProfile.totalPracticeTime % 3600) / 60);
            return {
                studyDays: this.userProfile.totalStudyDays,
                totalHours,
                totalMinutes,
                totalPracticeTime: this.userProfile.totalPracticeTime,
                learningStage: this.userProfile.learningStage,
                learningGoalsCount: this.userProfile.learningGoals.length,
                unlockedAchievementsCount: this.getUnlockedAchievements().length,
                totalAchievementsCount: this.getAllAchievements().length
            };
        }
        return {
            studyDays: 0,
            totalHours: 0,
            totalMinutes: 0,
            totalPracticeTime: 0,
            learningStage: '初学阶段',
            learningGoalsCount: 0,
            unlockedAchievementsCount: 0,
            totalAchievementsCount: 0
        };
    }
    // 检查是否应该解锁成就
    checkAchievements(weakPointsCount: number, practiceCount: number, studyDays: number) {
        if (studyDays >= 7) {
            this.unlockAchievement('学习新星', '连续学习7天', '⭐');
        }
        if (weakPointsCount >= 10) {
            this.unlockAchievement('知识探索者', '识别了10个新知识点', '🔍');
        }
        if (practiceCount >= 50) {
            this.unlockAchievement('练习达人', '完成50道练习题', '📝');
        }
    }
    // 获取年级列表
    getGradeOptions(): string[] {
        return ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'];
    }
    // 获取性别选项
    getGenderOptions(): string[] {
        return ['男孩', '女孩'];
    }
    // 获取学习阶段选项
    getLearningStageOptions(): string[] {
        return ['初学阶段', '基础巩固阶段', '能力提升阶段', '冲刺阶段'];
    }
    // 获取学习目标选项
    getLearningGoalOptions(): string[] {
        return ['数学提分', '语文提升', '英语练习', '科学探索', '习惯养成', '考试准备', '兴趣培养', '基础巩固'];
    }
    // 格式化时间显示
    formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}小时${minutes}分钟`;
        }
        else {
            return `${minutes}分钟`;
        }
    }
}
