import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, Filter, Users, TrendingDown, Award, Target } from "lucide-react";

export default function ErrorBank() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("三年级1班");
  const [selectedSubject, setSelectedSubject] = useState("全部学科");
  const [selectedKnowledge, setSelectedKnowledge] = useState("全部知识点");

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];
  const subjects = ["全部学科", "语文", "数学", "英语"];
  const knowledgePoints = ["全部知识点", "计算", "应用题", "几何", "代数"];

  const errorQuestions = [
    {
      id: 1,
      subject: "数学",
      content: "计算: 8 × 7 = ?",
      type: "选择题",
      knowledge: "乘法运算",
      difficulty: 2,
      errorRate: 45,
      errorCount: 12,
      students: ["张小明", "李华", "王芳"],
    },
    {
      id: 2,
      subject: "数学",
      content: "小明有15个苹果,吃掉3个,还剩多少个?",
      type: "应用题",
      knowledge: "减法应用",
      difficulty: 3,
      errorRate: 35,
      errorCount: 9,
      students: ["刘强", "陈静", "赵丽"],
    },
    {
      id: 3,
      subject: "语文",
      content: "找出下列词语中的错别字: 风和日丽",
      type: "判断题",
      knowledge: "字词辨析",
      difficulty: 4,
      errorRate: 25,
      errorCount: 6,
      students: ["孙伟", "周敏"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-6">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <ArrowLeft className="w-5 h-5 text-blue-700" />
              </div>
            </Link>
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">错题库</h1>
          </div>
          <button
            onClick={() => navigate("/add-error")}
            className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-200/50 active:scale-90 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Class Selection */}
        <div className="mb-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-blue-100/50 mb-3 border border-blue-50/50">
          <div className="flex items-center gap-1.5 mb-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-900">筛选条件</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1.5 bg-blue-50/50 border border-blue-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              value={selectedKnowledge}
              onChange={(e) => setSelectedKnowledge(e.target.value)}
              className="px-2.5 py-1.5 bg-blue-50/50 border border-blue-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {knowledgePoints.map((kp) => (
                <option key={kp} value={kp}>
                  {kp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-blue-100/50 mb-3 border border-blue-50/50">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
              <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <div className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-0.5">156</div>
              <div className="text-xs text-gray-600">总错题数</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 border border-orange-100">
              <TrendingDown className="w-4 h-4 text-orange-600 mx-auto mb-1" />
              <div className="text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-0.5">45</div>
              <div className="text-xs text-gray-600">高频错题</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">
              <Award className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <div className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-0.5">28</div>
              <div className="text-xs text-gray-600">已组卷</div>
            </div>
          </div>
        </div>

        {/* Error Questions List */}
        <div className="space-y-2.5 mb-4">
          {errorQuestions.map((question) => (
            <div key={question.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg shadow-sm">
                      {question.subject}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-lg">
                      {question.type}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < question.difficulty ? "bg-gradient-to-r from-orange-400 to-red-400" : "bg-gray-200"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-900 mb-1">{question.content}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <Target className="w-3 h-3 text-blue-600" />
                    {question.knowledge}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-50">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {question.errorRate}%
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-3.5 h-3.5" />
                    {question.errorCount}人
                  </div>
                </div>
                <button className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg shadow-sm active:scale-95 transition-transform">
                  详情
                </button>
              </div>

              {/* Student List Preview */}
              <div className="mt-1.5 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="text-[10px] text-blue-700 truncate">
                  出错学生: {question.students.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Generate Paper Button */}
        <button
          onClick={() => navigate("/paper-config")}
          className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl transition-all shadow-lg shadow-blue-200/50 active:scale-95"
        >
          智能组卷
        </button>
      </main>
    </div>
  );
}
