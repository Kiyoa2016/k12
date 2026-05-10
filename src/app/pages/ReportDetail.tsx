import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Share2, Download, TrendingUp, Award, Users, Target, ChevronRight, Star } from "lucide-react";

export default function ReportDetail() {
  const { reportId } = useParams();
  const [activeTab, setActiveTab] = useState("overall");

  const tabs = [
    { id: "overall", name: "班级整体" },
    { id: "individual", name: "学生个体" },
    { id: "comparison", name: "横向对比" },
    { id: "suggestion", name: "教学建议" },
  ];

  const reportInfo = {
    name: "2026年春季上半学期学情分析报告",
    time: "2026-04-23 14:30",
    range: "2026-02-15 至 2026-04-23",
    homeworkCount: 45,
  };

  const overviewData = [
    { label: "班级平均分", value: "87.5", unit: "分", color: "from-blue-500 to-indigo-600" },
    { label: "及格率", value: "96.8", unit: "%", color: "from-indigo-500 to-purple-600" },
    { label: "优秀率", value: "78.3", unit: "%", color: "from-cyan-500 to-blue-600" },
    { label: "知识点掌握率", value: "85.2", unit: "%", color: "from-blue-500 to-indigo-600" },
  ];

  const knowledgePoints = [
    { name: "乘法运算", rate: 92, color: "blue" },
    { name: "除法运算", rate: 85, color: "indigo" },
    { name: "应用题", rate: 78, color: "purple" },
    { name: "几何图形", rate: 88, color: "cyan" },
  ];

  const students = [
    { id: 1, rank: 1, name: "张小明", score: 95, rate: 93, strengths: ["计算", "应用题"], weaknesses: ["几何"] },
    { id: 2, rank: 2, name: "李华", score: 92, rate: 90, strengths: ["计算"], weaknesses: ["应用题", "几何"] },
    { id: 3, rank: 3, name: "王芳", score: 88, rate: 86, strengths: ["几何"], weaknesses: ["计算"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/console/report-list">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <ArrowLeft className="w-5 h-5 text-blue-700" />
              </div>
            </Link>
            <h1 className="text-base bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">报告详情</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <Share2 className="w-4 h-4 text-blue-700" />
            </button>
            <button className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <Download className="w-4 h-4 text-blue-700" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Report Overview */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-5 shadow-xl shadow-blue-200/50 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="relative">
            <h2 className="text-base text-white mb-3">{reportInfo.name}</h2>
            <div className="space-y-1 text-xs text-white/90 mb-4">
              <div>分析时间: {reportInfo.range}</div>
              <div>作业数量: {reportInfo.homeworkCount}份</div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {overviewData.map((item, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-center">
                  <div className="text-xl text-white mb-0.5">{item.value}</div>
                  <div className="text-[10px] text-white/80">{item.label}</div>
                </div>
              ))}
            </div>
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

        {/* Content Area - Overall Tab */}
        {activeTab === "overall" && (
          <div className="space-y-4">
            {/* Knowledge Points Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm text-gray-900">知识点掌握率</h3>
              </div>
              <div className="space-y-3">
                {knowledgePoints.map((kp) => (
                  <div key={kp.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">{kp.name}</span>
                      <span className="text-xs text-blue-700">{kp.rate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${kp.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <h3 className="text-sm text-gray-900 mb-3">分数段分布</h3>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { range: "90+", count: 15, color: "from-blue-500 to-indigo-500" },
                  { range: "80-89", count: 8, color: "from-indigo-500 to-purple-500" },
                  { range: "70-79", count: 4, color: "from-cyan-500 to-blue-500" },
                  { range: "60-69", count: 2, color: "from-blue-500 to-indigo-500" },
                  { range: "<60", count: 1, color: "from-gray-400 to-gray-500" },
                ].map((item) => (
                  <div key={item.range} className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-center text-white`}>
                    <div className="text-lg mb-0.5">{item.count}</div>
                    <div className="text-[10px] opacity-90">{item.range}分</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Area - Individual Tab */}
        {activeTab === "individual" && (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm">
                      {student.rank}
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500">掌握率: {student.rate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-900">{student.score}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600">强项:</span>
                    {student.strengths.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600">弱项:</span>
                    {student.weaknesses.map((w) => (
                      <span key={w} className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-lg">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Area - Comparison Tab */}
        {activeTab === "comparison" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
            <h3 className="text-sm text-gray-900 mb-3">平行班平均分对比</h3>
            <div className="space-y-3">
              {[
                { class: "三年级1班", score: 87.5, isCurrentClass: true },
                { class: "三年级2班", score: 84.2, isCurrentClass: false },
                { class: "三年级3班", score: 89.1, isCurrentClass: false },
              ].map((item) => (
                <div key={item.class}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${item.isCurrentClass ? 'text-blue-700' : 'text-gray-700'}`}>
                      {item.class} {item.isCurrentClass && "(当前)"}
                    </span>
                    <span className="text-xs text-blue-700">{item.score}分</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.isCurrentClass
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                          : "bg-gray-400"
                      }`}
                      style={{ width: `${(item.score / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Area - Suggestion Tab */}
        {activeTab === "suggestion" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
            <h3 className="text-sm text-gray-900 mb-3">AI教学建议</h3>
            <div className="space-y-3">
              {[
                "建议加强乘法口诀的练习，特别是7、8、9的乘法运算",
                "应用题部分需要增加练习量，重点提升学生的理解能力",
                "几何图形认知较弱的学生建议增加实物教学",
              ].map((suggestion, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-gray-700 flex-1">{suggestion}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2.5 bg-white border border-blue-200 text-blue-700 text-sm rounded-xl active:bg-blue-50">
              编辑建议
            </button>
          </div>
        )}
      </main>

        {/* Bottom Actions */}
        <div className="mt-4 bg-white/90 backdrop-blur-lg rounded-2xl border border-blue-100 p-4 shadow-lg shadow-blue-100/50">
          <div className="grid grid-cols-3 gap-2">
            <button className="py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-xl shadow-lg shadow-blue-200/50 active:scale-95 transition-all">
              发送家长
            </button>
            <button className="py-2.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-xl active:bg-blue-50">
              加入组卷
            </button>
            <button className="py-2.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-xl active:bg-blue-50">
              布置作业
            </button>
          </div>
        </div>
    </div>
  );
}
