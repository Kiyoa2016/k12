import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  TrendingUp,
  Zap,
  Share2,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const userInfo = {
    name: "张老师",
    role: "班主任 / 数学老师",
    school: "XX市第一小学",
    classes: ["三年级1班", "三年级2班", "四年级1班"],
  };

  const menuItems = [
    {
      icon: User,
      label: "个人信息",
      description: "修改姓名、头像等",
      color: "from-blue-500 to-indigo-600",
      link: "",
    },
    {
      icon: Share2,
      label: "我的分享",
      description: "管理分享的报告",
      color: "from-sky-500 to-blue-600",
      link: "/share-manage",
    },
    {
      icon: Bell,
      label: "通知设置",
      description: "管理消息提醒",
      color: "from-indigo-500 to-purple-600",
      link: "",
    },
    {
      icon: Shield,
      label: "隐私与安全",
      description: "密码、权限管理",
      color: "from-blue-600 to-violet-600",
      link: "",
    },
    {
      icon: HelpCircle,
      label: "帮助与反馈",
      description: "使用指南、意见反馈",
      color: "from-indigo-400 to-purple-500",
      link: "",
    },
  ];

  const handleLogout = () => {
    if (confirm("确认退出登录吗?")) {
      alert("已退出登录");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-6">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/app">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">个人中心</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* User Info Card */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-5 shadow-xl shadow-blue-200/50 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg text-white mb-0.5 flex items-center gap-2">
                  {userInfo.name}
                  <Award className="w-4 h-4 text-yellow-300" />
                </h2>
                <p className="text-xs text-white/90 mb-1">{userInfo.role}</p>
                <p className="text-xs text-white/80">{userInfo.school}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/20">
              <div className="text-xs text-white/90 mb-2">任教班级</div>
              <div className="flex flex-wrap gap-1.5">
                {userInfo.classes.map((cls) => (
                  <span
                    key={cls}
                    className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm text-gray-900">本周数据</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
              <div className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-0.5">89</div>
              <div className="text-xs text-gray-600">已批改</div>
            </div>
            <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">
              <div className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-0.5">12</div>
              <div className="text-xs text-gray-600">组卷数</div>
            </div>
            <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-3 border border-cyan-100">
              <div className="text-xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-0.5">156</div>
              <div className="text-xs text-gray-600">作业发送</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100/50 overflow-hidden mb-4 border border-blue-50/50">
          <div className="divide-y divide-blue-50">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => item.link && navigate(item.link)}
                  className="w-full px-4 py-3 flex items-center gap-3 active:bg-blue-50/50 transition-colors"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-100/50`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm text-gray-900 mb-0.5">{item.label}</div>
                    <div className="text-xs text-gray-500 truncate">{item.description}</div>
                  </div>
                  <ChevronRight className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 mb-4 border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-amber-900 mb-0.5">教学达人</div>
              <div className="text-xs text-amber-700">本月批改作业数排名第一!</div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 mb-4 text-center border border-blue-50/50">
          <div className="text-gray-600 text-xs mb-0.5">K12教师助手</div>
          <div className="text-gray-400 text-xs">版本 v1.0.0</div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-white border-2 border-red-200 text-red-600 text-sm rounded-2xl active:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          退出登录
        </button>
      </main>
    </div>
  );
}
