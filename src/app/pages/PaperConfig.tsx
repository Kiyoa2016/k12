import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CheckSquare, Square } from "lucide-react";

export default function PaperConfig() {
  const navigate = useNavigate();
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["三年级1班"]);
  const [subject, setSubject] = useState("数学");
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [difficultyRange, setDifficultyRange] = useState([2, 4]);
  const [questionCount, setQuestionCount] = useState(20);
  const [availableCount, setAvailableCount] = useState(156);

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];
  const subjects = ["语文", "数学", "英语", "物理", "化学"];
  const knowledgeTree = {
    计算: ["加法", "减法", "乘法", "除法"],
    应用题: ["和差问题", "倍数问题", "行程问题"],
    几何: ["周长", "面积", "体积"],
  };

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const toggleKnowledge = (knowledge: string) => {
    setSelectedKnowledge((prev) =>
      prev.includes(knowledge)
        ? prev.filter((k) => k !== knowledge)
        : [...prev, knowledge]
    );
  };

  const handleGenerate = () => {
    navigate("/paper-preview");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/error-bank">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl text-gray-900">智能组卷</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Class Selection */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-gray-900 mb-3">选择班级</h3>
          <div className="space-y-2">
            {classes.map((cls) => {
              const isSelected = selectedClasses.includes(cls);
              return (
                <div
                  key={cls}
                  onClick={() => toggleClass(cls)}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="text-gray-900">{cls}</span>
                </div>
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

        {/* Subject Selection */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-gray-900 mb-3">选择学科</h3>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Knowledge Points */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-gray-900 mb-3">选择知识点</h3>
          <div className="space-y-4">
            {Object.entries(knowledgeTree).map(([category, items]) => (
              <div key={category}>
                <div className="text-sm text-gray-700 mb-2">{category}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleKnowledge(item)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedKnowledge.includes(item)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Range */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-gray-900 mb-3">
            难度范围: {difficultyRange[0]}星 - {difficultyRange[1]}星
          </h3>
          <div className="px-2">
            <input
              type="range"
              min="1"
              max="5"
              value={difficultyRange[0]}
              onChange={(e) =>
                setDifficultyRange([Number(e.target.value), difficultyRange[1]])
              }
              className="w-full mb-2"
            />
            <input
              type="range"
              min="1"
              max="5"
              value={difficultyRange[1]}
              onChange={(e) =>
                setDifficultyRange([difficultyRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Question Count */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="text-gray-900 mb-3">题目数量</h3>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            min="1"
            max="100"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-600 mt-2">
            符合条件的错题: {availableCount} 道
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
        >
          生成试卷
        </button>
      </main>
    </div>
  );
}
