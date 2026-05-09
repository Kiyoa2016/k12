import { Link } from "react-router";
import { ArrowLeft, Copy, Clock, Eye, MoreVertical, Shield, Calendar } from "lucide-react";

export default function ShareManage() {
  const shares = [
    {
      id: 1,
      title: "2026年春季上半学期学情分析报告",
      shortUrl: "https://edu.app/s/abc123",
      password: "1234",
      expireDate: "2026-05-23",
      visitCount: 15,
      lastVisit: "2026-04-23 14:30",
      status: "active",
    },
    {
      id: 2,
      title: "乘法运算知识点掌握情况分析",
      shortUrl: "https://edu.app/s/def456",
      password: "5678",
      expireDate: "2026-04-30",
      visitCount: 8,
      lastVisit: "2026-04-22 16:20",
      status: "active",
    },
    {
      id: 3,
      title: "本月数学学科综合分析",
      shortUrl: "https://edu.app/s/ghi789",
      password: "9012",
      expireDate: "2026-04-20",
      visitCount: 3,
      lastVisit: "2026-04-19 10:15",
      status: "expired",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return { text: "有效", color: "bg-blue-100 text-blue-700" };
      case "expired":
        return { text: "已过期", color: "bg-gray-100 text-gray-600" };
      case "revoked":
        return { text: "已废止", color: "bg-red-100 text-red-700" };
      default:
        return { text: "未知", color: "bg-gray-100 text-gray-600" };
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("复制成功");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-6">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/profile">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">我的分享</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Share List */}
        <div className="space-y-3">
          {shares.map((share) => {
            const statusConfig = getStatusConfig(share.status);

            return (
              <div
                key={share.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50"
              >
                {/* Title */}
                <h3 className="text-sm text-gray-900 mb-3">{share.title}</h3>

                {/* Short URL */}
                <div className="mb-3">
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-xs text-gray-700 truncate flex-1 mr-2">
                      {share.shortUrl}
                    </span>
                    <button
                      onClick={() => handleCopy(share.shortUrl)}
                      className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg active:bg-blue-600 flex-shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>密码: {share.password}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>有效期: {share.expireDate}</span>
                  </div>
                </div>

                {/* Visit Stats */}
                <div className="p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-3 border border-blue-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>累计访问 {share.visitCount} 次</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{share.lastVisit}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between">
                  <div className={`px-2.5 py-1 rounded-lg text-xs ${statusConfig.color}`}>
                    {statusConfig.text}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-lg active:bg-blue-50">
                      修改密码
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-lg active:bg-blue-50">
                      延长有效期
                    </button>
                    <button className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg active:bg-gray-50">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {shares.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">暂无分享记录</p>
          </div>
        )}
      </main>
    </div>
  );
}
