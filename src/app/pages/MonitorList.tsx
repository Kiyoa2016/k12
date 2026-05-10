import { Link, useNavigate } from "react-router";
import { ArrowLeft, Video, Clock, Circle, Eye, Signal } from "lucide-react";

export default function MonitorList() {
  const navigate = useNavigate();

  const classes = [
    {
      id: 1,
      name: "三年级1班",
      status: "online",
      lastViewed: "5分钟前",
    },
    {
      id: 2,
      name: "三年级2班",
      status: "online",
      lastViewed: "30分钟前",
    },
    {
      id: 3,
      name: "四年级1班",
      status: "offline",
      lastViewed: "昨天 15:20",
    },
    {
      id: 4,
      name: "四年级2班",
      status: "online",
      lastViewed: "2小时前",
    },
  ];

  const recentViews = [
    { id: 1, name: "三年级1班", time: "5分钟前" },
    { id: 2, name: "三年级2班", time: "30分钟前" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-6">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/app">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">掌上看班</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Recent Views */}
        {recentViews.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm text-gray-900">最近查看</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {recentViews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/app/monitor-player/${item.id}`)}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-blue-100/50 cursor-pointer active:scale-95 transition-all border border-blue-50/50"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                    <Video className="w-6 h-6 text-gray-600" />
                    <div className="absolute inset-0 bg-blue-500/10 group-active:bg-blue-500/20 transition-colors"></div>
                    <div className="absolute top-1.5 right-1.5">
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-500 rounded-full shadow-lg">
                        <Circle className="w-1.5 h-1.5 fill-white animate-pulse" />
                        <span className="text-[10px] text-white">在线</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-900 mb-0.5">{item.name}</div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Classes */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Signal className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm text-gray-900">任教班级</h2>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100/50 overflow-hidden border border-blue-50/50">
            <div className="divide-y divide-blue-50">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  onClick={() => {
                    if (classItem.status === "online") {
                      navigate(`/app/monitor-player/${classItem.id}`);
                    }
                  }}
                  className={`px-4 py-3 flex items-center justify-between ${
                    classItem.status === "online"
                      ? "cursor-pointer active:bg-blue-50/50"
                      : "opacity-50 cursor-not-allowed"
                  } transition-colors`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        classItem.status === "online"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-200/50"
                          : "bg-gray-200"
                      }`}
                    >
                      <Video
                        className={`w-5 h-5 ${
                          classItem.status === "online"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-900 mb-0.5">{classItem.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {classItem.lastViewed}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-0.5 px-2.5 py-1 rounded-full flex-shrink-0 shadow-sm ${
                      classItem.status === "online"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Circle className={`w-1.5 h-1.5 fill-current ${classItem.status === "online" ? "animate-pulse" : ""}`} />
                    <span className="text-[10px]">
                      {classItem.status === "online" ? "在线" : "离线"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
          <p className="text-xs text-blue-800">
            💡 提示: 左右滑动可快速切换不同班级监控画面
          </p>
        </div>
      </main>
    </div>
  );
}
