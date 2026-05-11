# APP端批改入口合并 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 合并 HomeworkUpload 底部的"批改记录"和"新建批改"入口，班级卡片作为操作起点，FAB 提供快速新建批改路径。

**架构:** 只改 3 个 APP 端文件，不改路由。HomeworkUpload 移除底部按钮栏、添加 FAB；StudentSelection 移除 records/upload 模式区分，统一按状态分组展示；Camera 微调适配。

**技术栈:** React + TypeScript + Vite + Tailwind CSS + motion/react

---

### Task 1: HomeworkUpload 入口页 — 添加 FAB + 移除底部按钮栏

**文件:** `src/app/pages/HomeworkUpload.tsx`

- [ ] **Step 1: 修改班级卡片点击行为**

当前 class card 的 onClick（第108行）跳转到 StudentSelection 时传 `mode: "records"`，改为传班级名和选中的主题：

```typescript
// 修改第108行附近
onClick={() => navigate("/app/student-selection", { state: { selectedClass: cls.name, selectedTopic } })}
```

- [ ] **Step 2: 移除底部双按钮栏**

删除第167-181行的整个 bottom buttons div 块，即：

```tsx
{/* Bottom Buttons */}
<div className="shrink-0 px-4 pb-[30px] pt-3 bg-gradient-to-t from-white via-white to-transparent flex gap-3">
  <button
    onClick={() => navigate("/app/student-selection", { state: { mode: "records" } })}
    className="flex-1 py-3.5 text-sm text-indigo-600 bg-white border border-indigo-200 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm font-medium"
  >
    <History className="w-5 h-5" />
    批改记录
  </button>
  <button
    onClick={() => setShowModal(true)}
    className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl py-3.5 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all shadow-xl shadow-indigo-300/60 text-white text-sm font-medium"
  >
    <FileText className="w-5 h-5" />
    新建批改
  </button>
</div>
```

- [ ] **Step 3: 添加 FAB 浮动按钮**

在 `<main>` 后面、第183行的 topic picker 底部弹窗前添加 FAB。FAB 固定在右下角，点击触发现有 `showModal`：

```tsx
      </main>

      {/* FAB — 快速新建批改 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-[100px] right-5 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-300/60 active:scale-90 transition-transform z-40"
      >
        <FileText className="w-6 h-6 text-white" />
      </button>
```

注意定位：`fixed bottom-[100px] right-5`，避开手机底部安全区。

- [ ] **Step 4: 清理未使用的引用**

删除第4行中不再使用的 `History` 导入（如果 `History` 只被移除的按钮使用）。

当前 import:
```typescript
import { ArrowLeft, FileText, History, CheckCircle2, Clock, Users, TrendingUp, ChevronDown } from "lucide-react";
```

确认 `History` 是否在其他地方被引用。如果没有，删除它：
```typescript
import { ArrowLeft, FileText, CheckCircle2, Clock, Users, TrendingUp, ChevronDown } from "lucide-react";
```

- [ ] **Step 5: 验证构建**

```bash
npx vite build
```
预期：编译通过，无错误。

---

### Task 2: StudentSelection 统一学生页 — 移除模式区分

**文件:** `src/app/pages/StudentSelection.tsx`

- [ ] **Step 1: 修改 state 解析和变量定义**

将第12-15行改为直接从 `location.state` 读取 `selectedClass` / `selectedTopic`，移除 `isRecordsMode` 和 `homeworkTitle` 逻辑：

```typescript
const state = location.state as { selectedClass?: string; selectedTopic?: string; uploadedStudentId?: number } | null;
const selectedClass = state?.selectedClass || classes[0];
const selectedTopic = state?.selectedTopic || homeworkTopics[0];
```

删除以下不再需要的导入和变量（保留 `ChevronDown` 如果它仍被用于 topic picker）：
- 删除 `BookOpen`, `Play` 的导入（如果未使用）
- 保留现有 `useState` `useEffect` 等

- [ ] **Step 2: 改写 render — Header**

将第66-75行的 header 改为显示班级名称和主题：

```tsx
      <header className="bg-white/80 backdrop-blur-lg shadow-sm shrink-0 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/app/homework-upload">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{selectedClass}</h1>
            <p className="text-xs text-gray-400">
              {selectedTopic} · {students.filter(s => s.uploaded).length}/{students.length} 人已提交
            </p>
          </div>
        </div>
      </header>
```

- [ ] **Step 3: 删除 records 模式筛选器区块**

删除第92-129行的 records mode filter 区块（主题选择 + 班级选择按钮），只保留 student grid 区域。

删除：
```tsx
        {/* Records mode: filters */}
        {isRecordsMode && (
          <div className="mb-4 space-y-3">
            ...
          </div>
        )}
```

- [ ] **Step 4: 简化主内容区域**

当前的 render 有两大分支（第132-321行）：
- `isRecordsMode` 分支（第132-219行）— 按状态分组的学生网格 ✓ 保留此模式
- upload 模式分支（第221-320行）— upload 选择模式 ✗ 删除此分支

保留 `isRecordsMode` 分支的按状态分组学生网格（第132-219行），使其成为**唯一渲染内容**，去掉 `isRecordsMode` 条件包裹：

```tsx
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {/* 按状态分组的学生列表 */}
        {(["已批改", "批改中", "待上传"] as const).map((status) => {
          const group = students.filter((s) => s.status === status);
          if (group.length === 0) return null;
          const statusMeta = {
            "已批改": { icon: "✓", color: "text-green-600", bg: "bg-green-100", label: "已批改" },
            "批改中": { icon: "◉", color: "text-indigo-600", bg: "bg-indigo-100", label: "批改中" },
            "待上传": { icon: "○", color: "text-gray-400", bg: "bg-gray-100", label: "待上传" },
          }[status];
          return (
            <div key={status}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-5 h-5 rounded-full ${statusMeta.bg} flex items-center justify-center text-xs ${statusMeta.color}`}>
                  {statusMeta.icon}
                </span>
                <span className={`text-xs font-medium ${statusMeta.color}`}>{statusMeta.label}</span>
                <span className={`text-xs ${statusMeta.color} opacity-60`}>{group.length}人</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {group.map((student) => {
                  // ... 保留现有卡片渲染逻辑，但调整待上传学生的样式
                })}
              </div>
            </div>
          );
        })}
      </main>
```

- [ ] **Step 5: 调整待上传学生卡片样式**

在当前 records 模式的已批改/批改中判断逻辑后，为"待上传"添加虚线边框和拍照图标。在 `else` 分支（待上传，第184-189行附近），将样式改为：

```typescript
                      } else {
                        // 待上传 — 虚线边框 + 拍照提示
                        cardStyle = "border-2 border-dashed border-blue-300 bg-white cursor-pointer active:scale-[0.97] shadow-sm";
                        avatarStyle = "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200";
                        nameStyle = "text-blue-700";
                        noStyle = "text-blue-400";
                        badgeContent = (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        );
```

并且学生卡片内头像下方的文本从"学号 xxx"改为"去拍照"的提示。

- [ ] **Step 6: 添加拍照批改底部按钮**

删除现有的 upload mode 底部按钮块（第325-353行），改用统一的"拍照批改"按钮：

```tsx
      </main>

      {/* 拍照批改按钮 */}
      <div className="shrink-0 px-4 pb-[30px] pt-3 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={() => {
            const firstPending = students.find(s => s.status === "待上传");
            if (firstPending) {
              navigate(`/app/camera?mode=homework&studentId=${firstPending.id}`);
            }
          }}
          disabled={students.filter(s => s.status === "待上传").length === 0}
          className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-300/60 disabled:opacity-40 disabled:shadow-none"
        >
          <Camera className="w-5 h-5" />
          拍照批改（{students.filter(s => s.status === "待上传").length}人待拍）
        </button>
      </div>
```

在文件顶部导入 `Camera` from `lucide-react`。

- [ ] **Step 7: 删除 upload 模式特有代码**

删除第221-321行的 upload mode 学生网格（`isRecordsMode ? ... : ...` 的 else 分支），以及第324-353行的 upload 模式底部按钮。删除后最终 main 内只保留按状态分组的学生网格。

- [ ] **Step 8: 删除 topic picker 底部弹窗（第356-390行）**

删除 topic picker bottom sheet（`{showTopicPicker && (...}`），因为新的统一页不再需要选择 topic。

- [ ] **Step 9: 清理未使用的导入**

最终检查 import 行，删除未使用的导入：
- 删除 `Play`, `BookOpen`（这两个只被 upload/records 模式使用）

清理后 import 应为：
```typescript
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft, ChevronDown, Camera } from "lucide-react";
```

注意：如果 `ChevronDown` 不再被使用（topic picker 已删），也一并移除。

- [ ] **Step 10: 验证构建**

```bash
npx vite build
```
预期：编译通过，无错误。

---

### Task 3: Camera 微调适配

**文件:** `src/app/pages/Camera.tsx`

- [ ] **Step 1: 确认 backPath 逻辑正确**

当前第14行：
```typescript
const backPath = mode === "homework" ? "/app/student-selection" : "/app/homework-upload";
```

在新设计下，Camera 一定是从 StudentSelection 进入的，所以 `backPath` 应为 `/app/student-selection`。确认逻辑正确，无需改动。

- [ ] **Step 2: 验证构建**

```bash
npx vite build
```
预期：编译通过，无错误。

---

### Task 4: 功能验证

**文件:** 无文件改动，手动验证

- [ ] **Step 1: 验证入口页（HomeworkUpload）**

1. 底部无"批改记录"和"新建批改"按钮
2. 右下角有 FAB 浮动按钮
3. 点击 FAB → 弹出新建批改底部弹窗（选主题+选班级+开始批改）
4. 点击班级卡片 → 跳转至 StudentSelection

- [ ] **Step 2: 验证统一学生页（StudentSelection）**

1. 顶部显示班级名称 + 主题 + 提交进度
2. 学生按状态分组显示
3. 已批改学生 → 绿色样式，点击进入 GradingResult
4. 批改中学生 → 不可点击，显示旋转动画
5. 待上传学生 → 虚线边框，点击进入 Camera
6. 底部"拍照批改"按钮显示正确待拍人数
7. 待上传人数为 0 时按钮禁用

- [ ] **Step 3: 验证完整流程**

1. 快捷新建：FAB → 选主题/班级 → Camera → 返回 StudentSelection 状态更新
2. 班级进入：班级卡片 → 已批改学生 → GradingResult
3. 班级进入：班级卡片 → 待上传学生 → Camera → 返回状态更新
4. 批量拍照：班级卡片 → "拍照批改"按钮 → Camera → 返回

- [ ] **Step 4: 最终构建验证**

```bash
npx vite build
```
预期：编译通过，无错误。

---

## 文件改动汇总

| 文件 | 改动 |
|------|------|
| `src/app/pages/HomeworkUpload.tsx` | 移除底部按钮栏（~15行）、添加 FAB button、修改 class card onClick 传参、清理未用 import |
| `src/app/pages/StudentSelection.tsx` | 移除 mode 模式区分（~200行删除）、简化 header、统一为状态分组展示、添加拍照批改按钮 |
| `src/app/pages/Camera.tsx` | 无实质改动（确认 backPath 逻辑正确） |
| `src/app/routes.ts` | 不改 |
