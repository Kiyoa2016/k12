import { Link } from "react-router";
import { Camera, Video, User, TrendingUp } from "lucide-react";

export default function Home() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "新的一天开始，元气满满";
    if (hour >= 11 && hour < 14) return "午间时光，稍作休息";
    if (hour >= 14 && hour < 18) return "下午好，继续加油";
    if (hour >= 18 && hour < 22) return "辛苦一天了，您还在坚持，您最棒！";
    return "夜深了，注意休息哦";
  };

  const modules = [
    {
      title: "作业批改",
      description: "AI智能批改",
      icon: Camera,
      gradient: "from-blue-500 to-indigo-600",
      link: "/homework-upload",
    },
    {
      title: "掌上看班",
      description: "实时监控",
      icon: Video,
      gradient: "from-blue-600 to-violet-600",
      link: "/monitor-list",
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
          <div>
            <h2 className="text-xl text-gray-900 mb-0.5">欢迎回来，张老师 👋</h2>
            <p className="text-sm bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-1">
              {getGreeting()}
            </p>
            <p className="text-xs text-gray-500">2026年4月21日 星期二</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-6">
        <div className="grid grid-cols-2 gap-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                to={module.link}
                className="group bg-white rounded-xl p-5 shadow-lg shadow-blue-100/50 active:scale-95 transition-all duration-200 border border-blue-50/50 flex flex-col items-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-200/50 group-active:scale-90 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{module.title}</h3>
                <p className="text-xs text-gray-500">{module.description}</p>
              </Link>
            );
          })}
        </div>

        {/* PC端引导提示 */}
        <div className="mt-6 px-4 py-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-800 leading-relaxed">
            💡 错题库、智能组卷、学情分析等功能请访问电脑端使用
          </p>
        </div>
      </div>
    </div>
  );
}
