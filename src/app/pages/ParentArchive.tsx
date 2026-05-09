import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Download, User, TrendingUp, Target, AlertCircle, BookOpen } from "lucide-react";

export default function ParentArchive() {
  const [activeSemester, setActiveSemester] = useState("2026春季");
  const [activeTab, setActiveTab] = useState("trend");

  const semesters = ["2026春季", "2025秋季", "2025春季"];
  const tabs = [
    { id: "trend", name: "学习趋势" },
    { id: "knowledge", name: "知识点掌握" },
    { id: "errors", name: "错题汇总" },
    { id: "reports", name: "报告记录" },
  ];

  const studentInfo = {
    name: "张小明",
    class: "三年级1班",
    avatar: "",
  };

  const stats = [
    { label: "平均分", value: "87.5", color: "from-blue-500 to-indigo-600" },
    { label: "班级排名", value: "3", color: "from-indigo-500 to-purple-600" },
    { label: "总掌握率", value: "85%", color: "from-cyan-500 to-blue-600" },
    { label: "错题总数", value: "15", color: "from-orange-500 to-red-600" },
  ];

  const scoreData = [
    { week: "第1周", score: 85 },
    { week: "第2周", score: 88 },
    { week: "第3周", score: 86 },
    { week: "第4周", score: 90 },
    { week: "第5周", score: 87 },
  ];

  const knowledgePoints = [
    { name: "计算", rate: 92, isStrength: true },
    { name: "应用题", rate: 85, isStrength: true },
    { name: "几何", rate: 55, isStrength: false },
    { name: "统计", rate: 78, isStrength: false },
  ];

  const errorSummary = [
    { knowledge: "几何图形", count: 8, rate: 55 },
    { knowledge: "乘法运算", count: 4, rate: 75 },
    { knowledge: "应用题", count: 3, rate: 85 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <ArrowLeft className="w-5 h-5 text-blue-700" />
              </div>
            </Link>
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">成长档案</h1>
          </div>
          <select
            value={activeSemester}
            onChange={(e) => setActiveSemester(e.target.value)}
            className="px-3 py-1.5 text-xs bg-blue-50 border border-blue-100 rounded-xl text-blue-700"
          >
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Student Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-base text-gray-900 mb-0.5">{studentInfo.name}</h2>
              <p className="text-xs text-gray-600">{studentInfo.class}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-2.5 border border-gray-100">
                <div className={`text-base bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-0.5`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50 overflow-hidden">
          <div className="grid grid-cols-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 text-xs transition-all ${
                  activeTab === tab.id
                    ? "text-blue-700 bg-gradient-to-b from-blue-50 to-transparent border-b-2 border-blue-500"
                    : "text-gray-500"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trend Tab */}
        {activeTab === "trend" && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm text-gray-900">得分趋势</h3>
              </div>
              <div className="h-40 flex items-end justify-between gap-2">
                {scoreData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all relative"
                      style={{ height: `${(data.score / 100) * 100}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-700">
                        {data.score}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-600 mt-2">{data.week}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <h3 className="text-sm text-gray-900 mb-3">班级排名变化</h3>
              <div className="text-center py-8 text-gray-500 text-xs">
                <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                排名保持稳定，近期波动小
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Tab */}
        {activeTab === "knowledge" && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <h3 className="text-sm text-gray-900 mb-3">知识点掌握率</h3>
              <div className="space-y-3">
                {knowledgePoints.map((kp) => (
                  <div key={kp.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">{kp.name}</span>
                      <span className={`text-xs ${kp.rate >= 80 ? 'text-blue-700' : kp.rate >= 60 ? 'text-orange-700' : 'text-red-700'}`}>
                        {kp.rate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          kp.rate >= 80
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                            : kp.rate >= 60
                            ? "bg-gradient-to-r from-orange-400 to-amber-500"
                            : "bg-gradient-to-r from-red-400 to-red-500"
                        }`}
                        style={{ width: `${kp.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <h3 className="text-sm text-gray-900 mb-3">强弱项分析</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-600">强项:</span>
                  {knowledgePoints
                    .filter((kp) => kp.isStrength)
                    .map((kp) => (
                      <span key={kp.name} className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                        {kp.name}
                      </span>
                    ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-600">弱项:</span>
                  {knowledgePoints
                    .filter((kp) => !kp.isStrength)
                    .map((kp) => (
                      <span key={kp.name} className="px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                        {kp.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Errors Tab */}
        {activeTab === "errors" && (
          <div className="space-y-3">
            {errorSummary.map((item) => (
              <div
                key={item.knowledge}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-900">{item.knowledge}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                    {item.count}道错题
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>当前掌握率</span>
                  <span className="text-blue-700">{item.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-3">
            {[
              { title: "2026年春季上半学期学情分析", time: "2026-04-23" },
              { title: "本月数学学科综合分析", time: "2026-04-01" },
            ].map((report, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 mb-0.5">{report.title}</div>
                      <div className="text-xs text-gray-500">{report.time}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg shadow-sm active:scale-95 transition-transform">
                    查看
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

        {/* Bottom Action */}
        <div className="mt-4 bg-white/90 backdrop-blur-lg rounded-2xl border border-blue-100 p-4 shadow-lg shadow-blue-100/50">
          <button className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl shadow-lg shadow-blue-200/50 active:scale-95 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            导出PDF
          </button>
        </div>
    </div>
  );
}
