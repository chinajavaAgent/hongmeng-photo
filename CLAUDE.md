# photoLearn - HarmonyOS 错题学习助手

## 项目概述
这是一个基于 HarmonyOS ArkTS/ArkUI 开发的智能错题学习应用，通过拍照识别、薄弱点分析和个性化练习，帮助学生建立完整的学习闭环。

## 核心功能

### 📷 错题上传系统
- **智能拍照**：支持拍摄错题照片，自动优化图像质量
- **裁剪预览**：提供图像裁剪功能，确保题目清晰完整
- **题型识别**：AI分析错题内容，自动识别题型（如"分数运算"、"光的折射"等）
- **薄弱点建档**：确认后自动添加到个人薄弱点数据库

### 📊 薄弱点管理
- **统计面板**：实时显示薄弱知识点数量、总练习次数、平均正确率
- **分类筛选**：支持按学科（数学、物理、化学、语文）筛选查看
- **正确率追踪**：记录每个知识点的答题历史和正确率变化
- **学习建议**：根据正确率提供针对性学习建议

### 📱 拍照学习模式
- **实时识别**：拍摄学习内容，智能识别物体和概念
- **智能匹配**：自动匹配已知薄弱点，弹出警告提醒
- **推荐系统**：基于识别结果推荐相关学习资料和练习
- **知识关联**：建立知识点之间的关联，形成学习网络

### 🎤 个性化练习
- **多题型支持**：选择题、计算题、文本输入题
- **语音答题**：支持语音输入答案，提升答题体验
- **即时反馈**：答题后立即显示正确性、正确答案和详细解析
- **进度跟踪**：实时显示练习进度和得分统计

## 项目架构

### 📁 目录结构
```
entry/src/main/ets/
├── pages/                 # 页面组件
│   ├── Index.ets         # 主页（功能导航）
│   ├── ErrorUpload.ets   # 错题上传页面
│   ├── WeakPoints.ets    # 薄弱点管理页面
│   ├── StudyCamera.ets   # 拍照学习页面
│   ├── Practice.ets      # 练习页面
│   ├── CameraCapture.ets # 相机拍照页面
│   └── ObjectResult.ets  # 识别结果页面
├── common/               # 公共工具类
│   ├── PhotoManager.ets    # 照片管理器
│   ├── RecognitionService.ets # 识别服务
│   ├── WeakPointManager.ets   # 薄弱点数据管理
│   └── CameraController.ets   # 相机控制器
└── entryability/         # 应用入口
    └── EntryAbility.ets  # 主入口能力
```

### 🗃️ 数据模型
- **WeakPointRecord**：薄弱点记录（主题、学科、正确率、练习次数等）
- **StudySession**：学习会话（练习时长、得分、题目数量等）
- **Question**：练习题目（题型、选项、正确答案、解析等）

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
- `ohos.permission.MICROPHONE`：语音输入功能

## 应用入口

### 🏠 主要入口点
- **应用主页**：`entry/src/main/ets/pages/Index.ets`
- **应用能力**：`entry/src/main/ets/entryability/EntryAbility.ets`
- **页面路由**：`entry/src/main/resources/base/profile/main_pages.json`

### 🗺️ 页面路由配置
```json
{
  "src": [
    "pages/Index",           // 主页导航
    "pages/ErrorUpload",     // 错题上传
    "pages/WeakPoints",      // 薄弱点管理  
    "pages/StudyCamera",     // 拍照学习
    "pages/Practice",        // 个性化练习
    "pages/CameraCapture",   // 相机拍照
    "pages/ObjectResult"     // 识别结果
  ]
}
```

## 特色功能

### 🎯 智能学习闭环
1. **错题收集**：拍照上传错题，AI自动分析题型
2. **薄弱点识别**：建立个人知识薄弱点档案
3. **智能推荐**：日常学习中智能匹配薄弱点
4. **针对练习**：生成个性化练习题目
5. **进步跟踪**：持续跟踪学习效果和正确率提升

### 💡 AI 辅助学习
- **图像识别**：自动识别题目内容和类型
- **知识图谱**：建立知识点关联网络
- **学习推荐**：基于薄弱点的智能内容推荐
- **效果预测**：预测学习效果和建议练习强度

### 🔄 数据持久化
- **本地存储**：离线数据存储，保护用户隐私
- **实时同步**：多设备数据同步（可扩展）
- **备份恢复**：支持数据备份和恢复功能

这个项目将传统的错题整理数字化，结合AI技术和个性化学习理论，为学生提供了一个完整的智能学习解决方案。