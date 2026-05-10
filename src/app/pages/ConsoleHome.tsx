import { useNavigate } from "react-router";
import { BookOpen, BarChart3, FileText, ClipboardList, Camera } from "lucide-react";

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
    title: "作业批改",
    description: "AI智能批改，拍照上传自动识别",
    icon: Camera,
    gradient: "from-blue-500 to-indigo-600",
    link: "/console/homework-grading",
  },
  {
    title: "错题库",
    description: "知识点掌握情况分析，薄弱环节定位",
    icon: BookOpen,
    gradient: "from-cyan-500 to-blue-600",
    link: "/console/error-bank",
    badge: "8个薄弱点",
  },
  {
    title: "作业本",
    description: "作业记录与完成情况追踪",
    icon: ClipboardList,
    gradient: "from-teal-500 to-emerald-600",
    link: "/console/homework-book",
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
];

export default function ConsoleHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">K12教师助手</h1>
              <p className="text-sm text-gray-500 mt-1">教学管理 · 数据分析</p>
            </div>
          </div>
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
