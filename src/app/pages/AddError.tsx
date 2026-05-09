import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Upload, X } from "lucide-react";

export default function AddError() {
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState("选择题");
  const [subject, setSubject] = useState("数学");
  const [difficulty, setDifficulty] = useState(3);
  const [questionContent, setQuestionContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const questionTypes = ["选择题", "判断题", "填空题", "简答题", "作文"];
  const subjects = ["语文", "数学", "英语", "物理", "化学"];
  const knowledgeOptions = ["计算", "应用题", "几何", "代数", "方程"];

  const toggleKnowledge = (knowledge: string) => {
    setSelectedKnowledge((prev) =>
      prev.includes(knowledge)
        ? prev.filter((k) => k !== knowledge)
        : [...prev, knowledge]
    );
  };

  const handleImageUpload = () => {
    setUploadedImage("mock-image-url");
  };

  const handleSave = () => {
    navigate("/error-bank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/error-bank">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl text-gray-900">添加错题</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Subject Selection */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">学科</label>
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

          {/* Question Type */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">题型</label>
            <div className="grid grid-cols-3 gap-2">
              {questionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setQuestionType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    questionType === type
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Question Content */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">题目内容</label>
            <textarea
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
              placeholder="请输入题目内容..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">上传图片(可选)</label>
            {uploadedImage ? (
              <div className="relative w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-gray-500">图片预览</div>
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleImageUpload}
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">点击上传图片</span>
              </button>
            )}
          </div>

          {/* Knowledge Points */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">知识点标签</label>
            <div className="flex flex-wrap gap-2">
              {knowledgeOptions.map((knowledge) => (
                <button
                  key={knowledge}
                  onClick={() => toggleKnowledge(knowledge)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedKnowledge.includes(knowledge)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {knowledge}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">
              难度等级: {difficulty}星
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>简单</span>
              <span>困难</span>
            </div>
          </div>

          {/* Answer */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">正确答案</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="请输入正确答案..."
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Explanation */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">答案解析</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="请输入答案解析..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            保存错题
          </button>
        </div>
      </main>
    </div>
  );
}
