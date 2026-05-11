# APP端批改记录与新建批改入口合并设计

## 概述

将 APP 端 HomeworkUpload 底部分离的"批改记录"和"新建批改"入口合并为统一入口，班级卡片作为操作起点，FAB 提供快速新建批改路径。

## 改动范围

| 文件 | 改动类型 | 说明 |
|------|----------|------|
| `src/app/pages/HomeworkUpload.tsx` | 修改 | 移除底部双按钮，添加 FAB |
| `src/app/pages/StudentSelection.tsx` | 修改 | 移除 records/upload 模式区分，统一按状态分组展示 |
| `src/app/pages/Camera.tsx` | 微调 | 返回路径适配 |
| `src/app/routes.ts` | 不改 | 路由不变，仅调整导航参数 |

## 详细设计

### 1. HomeworkUpload.tsx — 入口页

**移除：**
- 底部"批改记录"和"新建批改"双按钮栏（第167-181行）

**添加：**
- 右下角 FAB（浮动操作按钮），样式沿用现有 gradient 主题
- FAB 点击触发底部弹窗（复用现有 `showModal` + `AnimatePresence` 逻辑）
- 弹窗内容：现有新建批改表单（选作业主题 + 选班级 + 开始批改按钮）

**保持：**
- 顶部作业主题选择器
- 今日作业完成概况统计卡片
- 班级横向对比列表（点击行为调整为统一进入班级学生页）

**班级卡片点击行为调整：**
- 之前：点击班级卡片 → `navigate("/app/student-selection", { state: { mode: "records" } })`
- 之后：点击班级卡片 → `navigate("/app/student-selection", { state: { selectedClass: "三年级1班", selectedTopic: "第三单元练习题" } })`

### 2. StudentSelection.tsx — 统一学生页

**移除：**
- `isRecordsMode` 模式区分（删除 `const isRecordsMode = state?.mode === "records"` 及相关分支）
- 批改记录模式下的筛选器区块（主题选择 + 班级选择）
- upload 模式的"开始批改"按钮和底部状态

**改造为统一布局：**

```
Header: ← 三年级1班
        第三单元练习题 · 42/45 人已提交

已批改 (3人)  [✓ 张小明] [✓ 李华] [✓ 王芳]
批改中 (1人)  [◉ 刘强]
待上传 (5人)  [📸 赵丽] [📸 陈静] ...

[ 📸 拍照批改（5人待拍）]
```

- 学生按状态分组：已批改 / 批改中 / 待上传
- 顶部显示班级名称、当前主题、提交进度摘要
- 不再需要主题选择器和班级选择器（数据从 location.state 传入）

**点击行为：**
- 已批改学生 → `navigate("/app/grading-result/${student.id}")`
- 批改中学生 → 不可点击，显示动画
- 待上传学生 → `navigate("/app/camera?mode=homework&studentId=${id}")`
- 底部"拍照批改"按钮 → 进入 Camera 进行批量拍摄

**待上传学生视觉：**
- 卡片使用虚线边框（`border-2 border-dashed border-blue-300`）
- 头像区域显示 📸 图标
- 文字提示"去拍照"

**批量拍照交互：**
- 底部"拍照批改"按钮显示待拍人数（如"拍照批改（5人待拍）"）
- 点击后直接进入 Camera，为该班级第一个待上传学生拍照
- Camera 拍摄完成返回 StudentSelection → `uploadedStudentId` 更新该学生状态为"批改中"
- 用户可继续点击下一个待上传学生或再次使用底部按钮
- 当待上传学生数为 0 时，按钮变为"全部已批改"禁用态
- 注：Camera 每次只处理一个学生，不做批量连续拍摄（保持现有交互模式）

### 3. Camera.tsx — 适配

- 返回路径不变（仍回 `/app/student-selection`）
- 保持通过 `uploadedStudentId` 通知 StudentSelection 更新状态

### 4. 路由

- 无需修改 `routes.ts`
- `student-selection` 路由不再接收 `mode` 参数，改为接收 `selectedClass` + `selectedTopic`

## 状态管理

StudentSelection 状态调整：
- 移除 `isRecordsMode` 和基于 `mode` 的条件渲染
- 从 `location.state` 直接读取 `selectedClass` 和 `selectedTopic`
- 保持 `students` 状态数组和 `useEffect` 监听 `uploadedStudentId` 更新逻辑

## UI 规范

- FAB 定位：右下角，距底部 80px，距右侧 20px
- FAB 样式：`w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-indigo-300/60`
- 学生卡片网格：`grid grid-cols-4 gap-3`（手机 375px 宽度一屏约显 8 人）
- 待上传卡片：`border-2 border-dashed border-blue-300 opacity-70`
- 进度条、状态标签样式保持现有规范

## 不涉及的范围

- 不改动任何 Console 端页面
- 不改动 GradingResult 页面
- 不改动 routes.ts 路由结构
