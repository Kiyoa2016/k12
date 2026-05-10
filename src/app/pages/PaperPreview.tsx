import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, Save, Send, FileText, Clock } from "lucide-react";

export default function PaperPreview() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      content: "计算: 8 × 7 = ?",
      type: "选择题",
      knowledge: "乘法运算",
      difficulty: 2,
    },
    {
      id: 2,
      content: "小明有15个苹果,吃掉3个,还剩多少个?",
      type: "应用题",
      knowledge: "减法应用",
      difficulty: 3,
    },
    {
      id: 3,
      content: "计算: 125 + 378 = ?",
      type: "填空题",
      knowledge: "加法运算",
      difficulty: 2,
    },
  ]);

  const paperInfo = {
    classes: ["三年级1班", "三年级2班"],
    questionCount: questions.length,
    estimatedTime: 45,
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    [newQuestions[index - 1], newQuestions[index]] = [
      newQuestions[index],
      newQuestions[index - 1],
    ];
    setQuestions(newQuestions);
  };

  const moveDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [
      newQuestions[index + 1],
      newQuestions[index],
    ];
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    alert("试卷已保存为模板!");
  };

  const handleSend = () => {
    navigate("/console/personalized-homework");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/console/paper-config">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">试卷预览</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Paper Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm text-gray-900">试卷信息</h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">适用班级:</span>
              <span className="text-gray-900">{paperInfo.classes.join(", ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">题目数量:</span>
              <span className="text-blue-700">{paperInfo.questionCount} 道</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">预计完成时间:</span>
              <div className="flex items-center gap-1 text-blue-700">
                <Clock className="w-3 h-3" />
                <span>{paperInfo.estimatedTime} 分钟</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3 mb-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-900">第 {index + 1} 题</span>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg">
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
                <div className="text-sm text-gray-900 mb-1.5">{question.content}</div>
                <div className="text-xs text-gray-600">
                  知识点: {question.knowledge}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-blue-50">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 text-gray-600 active:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === questions.length - 1}
                  className="p-1.5 text-gray-600 active:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteQuestion(index)}
                  className="p-1.5 text-red-600 active:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <button className="w-full py-3 bg-white border-2 border-dashed border-blue-200 text-blue-700 rounded-xl active:border-blue-500 active:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          添加题目
        </button>

        {/* Bottom Actions */}
        <div className="mt-4 bg-white/90 backdrop-blur-lg rounded-2xl border border-blue-100 p-4 shadow-lg shadow-blue-100/50">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSave}
              className="py-2.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-xl active:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              保存模板
            </button>
            <button
              onClick={handleSend}
              className="py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-200/50 active:scale-95"
            >
              <Send className="w-4 h-4" />
              发送作业
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
