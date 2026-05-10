# 移动端/PC端 架构拆分设计

## 背景
原先所有页面共用 375px 手机框（MobileContainer），但错题库、智能组卷、学情分析等功能在手机上操作效率低。老师实际工作流中，拍照批改和掌上看班需要在手机端完成，而数据分析/配置类功能更适合PC端。

## 架构调整

### 路由拆分
```
/ (Mobile Container - 375px 手机框)
├─ / → 移动端Home（仅保留 作业批改 + 掌上看班）
├─ /homework-upload → 拍照批改
├─ /camera → 拍照
├─ /grading-result/:studentId → 批改结果
├─ /student-selection → 学生选择
├─ /monitor-list → 掌上看班列表
├─ /monitor-player/:classId → 班级监控
├─ /profile → 个人中心
└─ /add-error → 手动加错题

/console (全屏，无手机框)
├─ /console → PC端主页（功能菜单入口）
├─ /console/error-bank → 错题库（PC布局）
├─ /console/paper-config → 智能组卷
├─ /console/paper-preview → 试卷预览
├─ /console/report-list → 学情分析列表
├─ /console/report-detail/:reportId → 学情详情
├─ /console/personalized-homework → 个性化作业
├─ /console/parent-archive → 家长档案
├─ /console/parent-homework-detail → 家长作业详情
├─ /console/share-manage → 分享管理
└─ /console/analysis-config → 分析配置
```

### App.tsx 逻辑
根据当前路由路径判断：
- 以 `/console` 开头 → 全屏渲染，不包裹 MobileContainer
- 其他路由 → 包裹 MobileContainer（375px 手机框）

### 移动端 Home 精简
原 5 个模块砍为 2 个：
- 作业批改（跳转 /homework-upload）
- 掌上看班（跳转 /monitor-list）

### PC 端主页
全屏页面，卡片式功能菜单，包含：
- 错题库（带错误统计摘要）
- 智能组卷
- 学情分析（带报告数摘要）
- 个性化作业
- 其他管理功能

## 后续
- 错题库将重新设计为 PC 宽屏布局
- 智能组卷配置页适配 PC
