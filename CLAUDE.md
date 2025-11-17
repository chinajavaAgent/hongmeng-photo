# photoLearn - HarmonyOS 错题学习助手

## 项目概述
这是一个基于 HarmonyOS ArkTS/ArkUI 开发的智能错题学习应用，采用简洁的 Tab 导航设计，主要提供拍照学习、薄弱记录管理和个性化练习三大核心功能。

## 核心功能

### 📷 拍照学习
- **智能拍照**：支持拍摄学习内容，自动优化图像质量
- **实时识别**：智能识别拍摄的学习内容和物体
- **薄弱点匹配**：自动匹配已知薄弱知识点，实时提醒
- **学习记录**：拍照内容自动保存到学习历史

### 📊 薄弱记录
- **记录管理**：查看和管理所有薄弱知识点
- **分类统计**：按学科分类显示薄弱点统计
- **正确率追踪**：记录每个薄弱点的答题历史和正确率
- **学习进度**：可视化展示薄弱点改善情况

### 🎤 个性化练习
- **智能出题**：基于薄弱点自动生成练习题目
- **多题型支持**：支持选择题、填空题、计算题
- **即时反馈**：答题后立即显示答案和解析
- **进度跟踪**：实时显示练习进度和得分情况

### 👤 我的
- **个人信息**：记录用户的学习阶段、年级、性别等基础信息
- **学习档案**：展示个人学习统计和进步轨迹
- **阶段设置**：根据年级和学习阶段调整练习难度
- **成就记录**：记录学习里程碑和达成的成就

## 项目架构

### 📁 目录结构
```
entry/src/main/ets/
├── pages/                 # 页面组件
│   ├── Index.ets         # 主页面（Tab导航容器）
│   ├── StudyCamera.ets   # 拍照学习页面
│   ├── WeakPoints.ets    # 薄弱记录页面
│   ├── Practice.ets      # 练习页面
│   ├── MyProfile.ets     # 我的个人信息页面
│   └── CameraCapture.ets # 相机拍照页面
├── common/               # 公共工具类
│   ├── PhotoManager.ets    # 照片管理器
│   ├── RecognitionService.ets # 识别服务
│   ├── WeakPointManager.ets   # 薄弱点数据管理
│   ├── UserProfileManager.ets # 用户档案管理
│   └── CameraController.ets   # 相机控制器
└── entryability/         # 应用入口
    └── EntryAbility.ets  # 主入口能力
```

### 🗃️ 数据模型
- **WeakPointRecord**：薄弱点记录（主题、学科、正确率、练习次数等）
- **StudySession**：学习会话（练习时长、得分、题目数量等）
- **Question**：练习题目（题型、选项、正确答案、解析等）
- **PhotoRecord**：拍照记录（照片路径、识别结果、关联薄弱点等）
- **UserProfile**：用户档案（年级、性别、学习阶段、学习目标等）

## 技术栈

### 🛠️ 开发框架
- **HarmonyOS ArkTS/ArkUI**：华为鸿蒙原生开发框架
- **TypeScript**：强类型JavaScript超集
- **声明式UI**：ArkUI声明式开发范式

### 🧪 测试框架
- **Hypium**：HarmonyOS官方测试框架
- **Hamock**：Mock框架，用于单元测试

### 📦 构建工具
- **hvigor**：HarmonyOS构建系统
- **DevEco Studio**：官方IDE开发环境

## 开发指南

### 🚀 构建命令
```bash
# 通过 DevEco Studio 构建项目
# 或使用命令行构建
hvigor assembleHap --mode module -p product=default
```

### 🧪 测试运行
```bash
# 运行单元测试
hvigor test
```

### 📱 调试运行
- 通过 DevEco Studio 连接设备或模拟器
- 点击运行按钮启动应用调试

## 权限配置

### 📋 必需权限
- `ohos.permission.CAMERA`：相机拍照功能
- `ohos.permission.READ_MEDIA`：读取媒体文件
- `ohos.permission.WRITE_MEDIA`：保存照片文件

## 应用入口

### 🏠 主要入口点
- **应用主页**：`entry/src/main/ets/pages/Index.ets`
- **应用能力**：`entry/src/main/ets/entryability/EntryAbility.ets`
- **页面路由**：`entry/src/main/resources/base/profile/main_pages.json`

### 🗺️ 页面路由配置
```json
{
  "src": [
    "pages/Index",           // 主页面（Tab容器）
    "pages/StudyCamera",     // 拍照学习
    "pages/WeakPoints",      // 薄弱记录  
    "pages/Practice",        // 个性化练习
    "pages/MyProfile",       // 我的个人信息
    "pages/CameraCapture"    // 相机拍照
  ]
}
```

## Tab 导航设计

### 📱 界面布局
- **底部Tab栏**：包含四个主要功能入口
  - 拍照学习 📷
  - 薄弱记录 📊  
  - 练习 🎤
  - 我的 👤
- **统一导航**：所有功能通过底部Tab切换，操作简洁直观
- **状态保持**：各Tab页面状态独立保持，切换不丢失数据

## 特色功能

### 🎯 简洁高效
1. **一键拍照**：快速拍摄学习内容，即时识别分析
2. **薄弱管理**：集中管理所有薄弱知识点，一目了然
3. **智能练习**：基于薄弱点自动生成针对性练习
4. **学习闭环**：拍照-识别-练习-巩固的完整学习流程

### 💡 智能辅助
- **图像识别**：自动识别学习内容和相关知识点
- **薄弱匹配**：智能匹配已记录的薄弱知识点
- **个性推荐**：根据学习情况推荐合适的练习内容
- **数据追踪**：持续跟踪学习进度和效果改善

### 🔄 数据管理
- **本地存储**：离线数据存储，保护用户隐私
- **实时更新**：薄弱点和练习数据实时更新
- **历史记录**：完整记录学习历史和进步轨迹

这个应用通过简洁的Tab设计，将错题学习简化为三个核心步骤：拍照发现薄弱点、管理薄弱记录、针对性练习巩固，为学生提供高效的学习工具。