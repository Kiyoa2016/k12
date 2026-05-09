import { Link } from "react-router";
import { Camera, BookOpen, FileText, Video, User, TrendingUp, BarChart3 } from "lucide-react";

export default function Home() {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) {
      return "新的一天开始，元气满满";
    } else if (hour >= 11 && hour < 14) {
      return "午间时光，稍作休息";
    } else if (hour >= 14 && hour < 18) {
      return "下午好，继续加油";
    } else if (hour >= 18 && hour < 22) {
      return "辛苦一天了，您还在坚持，您最棒！";
    } else {
      return "夜深了，注意休息哦";
    }
  };

  const errorCount = 156;

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
      title: "错题库",
      description: "智能组卷",
      icon: BookOpen,
      gradient: "from-cyan-500 to-blue-600",
      link: "/error-bank",
      badge: errorCount,
    },
    {
      title: "学情分析",
      description: "数据报告",
      icon: BarChart3,
      gradient: "from-indigo-500 to-purple-600",
      link: "/report-list",
      badge: null,
    },
    {
      title: "个性化作业",
      description: "因材施教",
      icon: FileText,
      gradient: "from-sky-500 to-blue-600",
      link: "/personalized-homework",
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

          <div>
            <h2 className="text-xl text-gray-900 mb-0.5">欢迎回来，张老师 👋</h2>
            <p className="text-sm bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-1">
              {getGreeting()}
            </p>
            <p className="text-xs text-gray-500">2026年4月21日 星期二</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-3">
        <div className="grid grid-cols-3 gap-2">
          {modules.slice(0, 3).map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                to={module.link}
                className="group bg-white rounded-xl p-2.5 shadow-lg shadow-blue-100/50 active:scale-95 transition-all duration-200 border border-blue-50/50 flex flex-col items-center"
              >
                <div className="relative w-11 h-11 mb-1.5">
                  <div className={`w-11 h-11 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center group-active:scale-90 transition-transform shadow-lg shadow-blue-200/50`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {module.badge !== null && module.badge > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200/50">
                      <span className="text-[9px] text-white leading-none font-medium">
                        {module.badge > 99 ? "99+" : module.badge}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xs text-gray-900 mb-0.5 text-center leading-tight">{module.title}</h3>
                <p className="text-[10px] text-gray-500 text-center leading-tight">{module.description}</p>
              </Link>
            );
          })}
        </div>
        {modules.length > 3 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {modules.slice(3).map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.title}
                  to={module.link}
                  className="group bg-white rounded-xl p-2.5 shadow-lg shadow-blue-100/50 active:scale-95 transition-all duration-200 border border-blue-50/50 flex flex-col items-center"
                >
                  <div className="relative w-11 h-11 mb-1.5">
                    <div className={`w-11 h-11 bg-gradient-to-br ${module.gradient} rounded-xl flex items-center justify-center group-active:scale-90 transition-transform shadow-lg shadow-blue-200/50`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {module.badge !== null && module.badge > 0 && (
                      <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200/50">
                        <span className="text-[9px] text-white leading-none font-medium">
                          {module.badge > 99 ? "99+" : module.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xs text-gray-900 mb-0.5 text-center leading-tight">{module.title}</h3>
                  <p className="text-[10px] text-gray-500 text-center leading-tight">{module.description}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
