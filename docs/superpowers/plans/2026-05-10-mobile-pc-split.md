# 移动端/PC端 架构拆分 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将项目拆分为移动端（手机框375px）和PC端（全屏）两个区域，移动端仅保留作业批改+掌上看班，PC端承载错题库/智能组卷/学情分析等管理功能。

**Architecture:** App.tsx 根据路由前缀判断渲染模式：`/console/*` 走全屏PC布局，其他路由走 MobileContainer 手机框。路由表分两组，PC端新增独立主页 ConsoleHome。

**Tech Stack:** React + Vite + Tailwind CSS v4 + shadcn/ui + react-router

---

### Task 1: App.tsx — 条件性 MobileContainer

**Files:**
- Modify: `src/app/App.tsx`
- Modify: `src/app/components/MobileContainer.tsx` (minor)

- [ ] **Step 1: 修改 App.tsx 实现路由感知**

App.tsx 需要判断当前路由是否以 `/console` 开头，如果是则跳过 MobileContainer。

```tsx
import { RouterProvider } from "react-router";
import { router } from "./routes";
import MobileContainer from "./components/MobileContainer";

function isConsoleRoute() {
  // 在 RouterProvider 外部无法直接读取当前路由，
  // 改用布局组件的方式：在 routes.ts 中为 console 路由添加独立 layout
  // 因此 App.tsx 保持简单，MobileContainer 改为只在非 console 路由下包裹
}

export default function App() {
  return (
    <MobileContainer>
      <RouterProvider router={router} />
    </MobileContainer>
  );
}
```

实际上更好的方式是在 routes.ts 中使用布局组件（layout route），而不是在 App.tsx 里判断路由。

```tsx
// App.tsx - 简化，不再包裹 MobileContainer
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

```tsx
// 新建 src/app/layouts/MobileLayout.tsx
import { ReactNode } from "react";

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
        <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </div>
      </div>
    </div>
  );
}
```

```tsx
// 新建 src/app/layouts/ConsoleLayout.tsx
import { ReactNode } from "react";

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: 更新路由表使用布局**

routes.ts 使用 react-router 的 layout route 功能，将移动端路由包裹在 MobileLayout 下，PC 端路由包裹在 ConsoleLayout 下。

- [ ] **Step 3: 验证路由正常工作**

Run: `npm run dev` 或 `pnpm dev`
Expected: 首页仍然在手机框中显示，确保基础路由无报错

- [ ] **Step 4: Commit**

```bash
git add src/app/App.tsx src/app/layouts/MobileLayout.tsx src/app/layouts/ConsoleLayout.tsx src/app/routes.ts
git commit -m "refactor: 拆分移动端/PC端路由架构，引入布局组件"
```

---

### Task 2: 移动端 Home 精简化

**Files:**
- Modify: `src/app/pages/Home.tsx`

- [ ] **Step 1: 精简 Home.tsx**

保留 作业批改 和 掌上看班 两个模块，去掉错题库、学情分析、个性化作业。

```tsx
import { Link } from "react-router";
import { Camera, Video, User, TrendingUp } from "lucide-react";

export default function Home() {
  const getGreeting = () => { /* 保持原有逻辑 */ };

  const modules = [
    {
      title: "作业批改",
      description: "AI智能批改",
      icon: Camera,
      gradient: "from-blue-500 to-indigo-600",
      link: "/homework-upload",
      badge: null,
    },
    {
      title: "掌上看班",
      description: "实时监控",
      icon: Video,
      gradient: "from-blue-600 to-violet-600",
      link: "/monitor-list",
      badge: null,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm pt-8">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg text-gray-900">K12教师助手</h1>
            </div>
            <Link to="/profile">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-700" />
              </div>
            </Link>
          </div>
          {/* 问候语，保持原有 */}
        </div>
      </header>

      <div className="px-4 pt-3">
        <div className="grid grid-cols-2 gap-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                to={module.link}
                className="group bg-white rounded-xl p-4 shadow-lg shadow-blue-100/50 active:scale-95 transition-all border border-blue-50/50 flex flex-col items-center"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center mb-2 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{module.title}</h3>
                <p className="text-xs text-gray-500">{module.description}</p>
              </Link>
            );
          })}
        </div>
        {/* 可以加一个提示，引导去PC端 */}
        <div className="mt-6 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-800">
            💡 错题库、智能组卷、学情分析等功能请在电脑端访问
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证移动端首页**

Expected: 首页只显示 作业批改 和 掌上看班 两个大卡片，底部有引导提示

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/Home.tsx
git commit -m "refactor: 移动端Home精简为仅保留作业批改和掌上看班"
```

---

### Task 3: PC 端主页 ConsoleHome

**Files:**
- Create: `src/app/pages/ConsoleHome.tsx`
- Modify: `src/app/routes.ts` (添加 `/console` 路由)

- [ ] **Step 1: 创建 ConsoleHome.tsx**

PC端全屏入口主页，卡片式菜单布局。每张卡片显示功能名称、描述、图标、以及数据摘要（如果有）。

```tsx
import { useNavigate } from "react-router";
import { BookOpen, BrainCircuit, BarChart3, FileText, Archive, Share2 } from "lucide-react";

interface ConsoleCard {
  title: string;
  description: string;
  icon: typeof BookOpen;
  gradient: string;
  link: string;
  badge?: string;
}

const menuCards: ConsoleCard[] = [
  {
    title: "错题库",
    description: "知识点掌握情况分析，薄弱环节定位",
    icon: BookOpen,
    gradient: "from-cyan-500 to-blue-600",
    link: "/console/error-bank",
    badge: "8个薄弱点",
  },
  {
    title: "智能组卷",
    description: "基于错题数据，AI自动生成针对性试卷",
    icon: BrainCircuit,
    gradient: "from-blue-500 to-indigo-600",
    link: "/console/paper-config",
  },
  {
    title: "学情分析",
    description: "班级学情报告，成绩趋势分析",
    icon: BarChart3,
    gradient: "from-indigo-500 to-purple-600",
    link: "/console/report-list",
    badge: "3份报告",
  },
  {
    title: "个性化作业",
    description: "为不同学生布置差异化作业",
    icon: FileText,
    gradient: "from-sky-500 to-blue-600",
    link: "/console/personalized-homework",
  },
  {
    title: "家长档案",
    description: "家长沟通记录，作业反馈管理",
    icon: Archive,
    gradient: "from-purple-500 to-pink-600",
    link: "/console/parent-archive",
  },
  {
    title: "分享管理",
    description: "资源共享，作业模板管理",
    icon: Share2,
    gradient: "from-emerald-500 to-teal-600",
    link: "/console/share-manage",
  },
];

export default function ConsoleHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900">K12教师助手</h1>
          <p className="text-sm text-gray-500 mt-1">教学管理 · 数据分析 · 智能组卷</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                onClick={() => navigate(card.link)}
                className="group bg-white rounded-2xl p-6 shadow-lg shadow-blue-100/50 border border-blue-50/50 hover:shadow-xl hover:border-blue-100 transition-all text-left active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {card.badge && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.description}</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: 在 routes.ts 中添加 ConsoleLayout 和 `/console` 路由**

```tsx
// 在 routes.ts 中：
import ConsoleLayout from "./layouts/ConsoleLayout";
import MobileLayout from "./layouts/MobileLayout";
import ConsoleHome from "./pages/ConsoleHome";

// 原有路由用 MobileLayout 包裹
// Console 路由用 ConsoleLayout 包裹
```

路由结构：
```tsx
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { index: true, Component: Home },
      // ... 其他移动端路由
    ],
  },
  {
    path: "/console",
    Component: ConsoleLayout,
    children: [
      { index: true, Component: ConsoleHome },
      // ... 其他 PC 端路由
    ],
  },
]);
```

- [ ] **Step 3: 验证 PC 端主页**

Run: dev server，访问 `/console`
Expected: 全屏PC页面，6个功能卡片展示

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/ConsoleHome.tsx src/app/routes.ts src/app/layouts/
git commit -m "feat: 新增PC端主页ConsoleHome，路由组改为layout结构"
```

---

### Task 4: PC 端错题库 - ErrorBank 宽屏适配

**Files:**
- Modify: `src/app/pages/ErrorBank.tsx`
- Modify: `src/app/routes.ts` (添加 `/console/error-bank` 路由)

- [ ] **Step 1: 将 ErrorBank.tsx 调整为同时支持宽屏和窄屏**

改动要点：
- 移除 `px-4` 等 375px 强约束的 padding，改为 `px-4 lg:px-8 xl:px-12`
- 统计卡片从 3 列改为自适应，PC 上更宽更舒适
- 知识点卡片列表改为网格布局（PC上2列或3列），而不是单列
- Header 区域 PC 上显示更多信息
- 底部按钮在 PC 上改为更标准的固定条

具体改动：

1. 布局容器：`max-w-6xl mx-auto` 替代原先的无宽度限制
2. 知识点卡片列表：`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4` 替代 `space-y-2.5`
3. 底层详情：同样网格布局展示班级卡片
4. Header 增加错题库全局统计（薄弱数/高频/总数）

- [ ] **Step 2: 在 routes.ts 中添加 `/console/error-bank`**

```tsx
// 在 ConsoleLayout 的 children 中：
{ path: "error-bank", Component: ErrorBank },
```

- [ ] **Step 3: 验证 PC 端错题库**

访问 `/console/error-bank`
Expected: 宽屏展示，知识点以网格排列，卡片更宽，视觉更舒适

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/ErrorBank.tsx src/app/routes.ts
git commit -m "feat: ErrorBank适配PC宽屏布局，路由迁移至/console/error-bank"
```

---

### Task 5: 移动端其余页面路由迁移确认

**Files:**
- Modify: `src/app/routes.ts`

- [ ] **Step 1: 确认路由分组完整性**

移动端（MobileLayout children）：
- `/` → Home
- `/homework-upload` → HomeworkUpload
- `/student-selection` → StudentSelection
- `/camera` → Camera
- `/grading-result/:studentId` → GradingResult
- `/error-bank` → 此路由需删除或重定向到 `/console/error-bank`
- `/add-error` → AddError
- `/monitor-list` → MonitorList
- `/monitor-player/:classId` → MonitorPlayer
- `/profile` → Profile

PC端（ConsoleLayout children）：
- `/console` → ConsoleHome
- `/console/error-bank` → ErrorBank
- `/console/paper-config` → PaperConfig
- `/console/paper-preview` → PaperPreview
- `/console/personalized-homework` → PersonalizedHomework
- `/console/report-list` → ReportList
- `/console/report-detail/:reportId` → ReportDetail
- `/console/analysis-config` → AnalysisConfig
- `/console/parent-archive` → ParentArchive
- `/console/parent-homework-detail` → ParentHomeworkDetail
- `/console/share-manage` → ShareManage

注意：移动端的 `/error-bank` 路由要移除，由 `/` 页面底部的引导提示引导用户去PC端。

- [ ] **Step 2: 验证所有路由不冲突**

Run: dev server，遍历主要路由
Expected: 所有页面正常渲染，手机端页面在手机框中，PC端页面全屏

- [ ] **Step 3: Commit**

```bash
git add src/app/routes.ts
git commit -m "refactor: 完成路由分组确认，移动端移除错题库入口"
```

---

### 自检清单

- [ ] 所有任务覆盖了 spec 中的每个需求
- [ ] 没有 "TBD", "TODO" 等占位符
- [ ] 类型/方法签名前后一致
- [ ] PC 端主页 `/console` 可访问
- [ ] 移动端首页 `/` 只显示作业批改和掌上看班
- [ ] 错题库在 `/console/error-bank` 下宽屏适配
- [ ] 手机端所有页面仍在 MobileContainer 中
