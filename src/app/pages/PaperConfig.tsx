import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, BrainCircuit } from "lucide-react";

interface KnowledgeItem {
  id: string;
  name: string;
  subject: string;
}

export default function PaperConfig() {
  const navigate = useNavigate();
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["三年级1班"]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [contentMode, setContentMode] = useState<"only-errors" | "errors-and-similar">("only-errors");
  const [questionCount, setQuestionCount] = useState(20);
  const [availableCount, setAvailableCount] = useState(156);

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];

  const knowledgeList: KnowledgeItem[] = [
    { id: "kp1", name: "乘法运算", subject: "数学" },
    { id: "kp2", name: "除法运算", subject: "数学" },
    { id: "kp3", name: "分数加减", subject: "数学" },
    { id: "kp4", name: "周长计算", subject: "数学" },
    { id: "kp5", name: "字词辨析", subject: "语文" },
    { id: "kp6", name: "阅读理解", subject: "语文" },
    { id: "kp7", name: "词汇拼写", subject: "英语" },
    { id: "kp8", name: "语法时态", subject: "英语" },
  ];

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const toggleKnowledge = (id: string) => {
    setSelectedKnowledge((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    navigate("/console/paper-preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-50/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => navigate("/console")}
              className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">智能组卷</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-6 space-y-5">
        {/* Class Selection — pills multi-select */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">选择班级</h3>
          <div className="flex gap-2 flex-wrap">
            {classes.map((cls) => {
              const isSelected = selectedClasses.includes(cls);
              return (
                <button
                  key={cls}
                  onClick={() => toggleClass(cls)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
          {selectedClasses.length > 1 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                当前选择了 {selectedClasses.length} 个班级的错题合并组卷
              </p>
            </div>
          )}
        </div>

        {/* Knowledge Points — card grid matching ErrorBank style */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">选择知识点</h3>
            {selectedKnowledge.length > 0 && (
              <span className="text-xs text-blue-600 font-medium">
                已选 {selectedKnowledge.length} 项
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {knowledgeList.map((kp) => {
              const isSelected = selectedKnowledge.includes(kp.id);
              return (
                <button
                  key={kp.id}
                  onClick={() => toggleKnowledge(kp.id)}
                  className={`w-full text-left bg-white rounded-lg p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-300 bg-blue-50/50 ring-1 ring-blue-200"
                      : "border-gray-100 hover:border-blue-200 hover:bg-blue-50/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium text-white ${
                      kp.subject === "数学" ? "bg-blue-500" :
                      kp.subject === "语文" ? "bg-emerald-500" : "bg-purple-500"
                    }`}>
                      {kp.subject}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{kp.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Mode */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">内容模式</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setContentMode("only-errors")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                contentMode === "only-errors"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              仅错题
            </button>
            <button
              onClick={() => setContentMode("errors-and-similar")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                contentMode === "errors-and-similar"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              错题+同题型
            </button>
          </div>
        </div>

        {/* Question Count */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">题目数量</h3>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            min="1"
            max="100"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-2">
            符合条件的错题: {availableCount} 道
          </p>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex justify-end">
          <button
            onClick={handleGenerate}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <BrainCircuit className="w-4 h-4" />
            立即AI组卷
          </button>
        </div>
      </div>
    </div>
  );
}
