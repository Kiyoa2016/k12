import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Users, CheckCircle2, Circle, BookOpen, ChevronRight } from "lucide-react";

export default function AnalysisConfig() {
  const navigate = useNavigate();
  const [analysisType, setAnalysisType] = useState<"time" | "knowledge">("time");
  const [timeRange, setTimeRange] = useState("本月");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const timeRanges = ["本周", "本月", "上半学期", "全学期", "自定义"];

  const students = [
    { id: 1, name: "张小明" },
    { id: 2, name: "李华" },
    { id: 3, name: "王芳" },
    { id: 4, name: "刘强" },
    { id: 5, name: "陈静" },
    { id: 6, name: "赵丽" },
  ];

  const knowledgeTree = [
    {
      id: 1,
      name: "第一单元：数的认识",
      children: [
        { id: 11, name: "万以内数的读写" },
        { id: 12, name: "万以内数的大小比较" },
      ],
    },
    {
      id: 2,
      name: "第二单元：加减法",
      children: [
        { id: 21, name: "两位数加减法" },
        { id: 22, name: "三位数加减法" },
      ],
    },
  ];

  const toggleStudent = (id: number) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedStudents(students.map((s) => s.id));
  };

  const handleGenerate = () => {
    alert("报告生成中，完成后将通知您");
    navigate("/report-list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/report-list">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">新建学情分析</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Type Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50 overflow-hidden">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setAnalysisType("time")}
              className={`py-3 text-sm transition-all ${
                analysisType === "time"
                  ? "text-blue-700 bg-gradient-to-b from-blue-50 to-transparent border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              按时间分析
            </button>
            <button
              onClick={() => setAnalysisType("knowledge")}
              className={`py-3 text-sm transition-all ${
                analysisType === "knowledge"
                  ? "text-blue-700 bg-gradient-to-b from-blue-50 to-transparent border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              按知识点分析
            </button>
          </div>
        </div>

        {/* Time Analysis Config */}
        {analysisType === "time" && (
          <div className="space-y-4">
            {/* Time Range Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm text-gray-900">选择时间范围</h3>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl text-xs flex-shrink-0 transition-all ${
                      timeRange === range
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200/50"
                        : "bg-white border border-blue-200 text-blue-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm text-gray-900">选择分析的学生</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg active:bg-blue-100"
                  >
                    全选
                  </button>
                  <button
                    onClick={() => setSelectedStudents([])}
                    className="px-3 py-1 text-xs bg-gray-50 text-gray-700 rounded-lg active:bg-gray-100"
                  >
                    反选
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {students.map((student) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <div
                      key={student.id}
                      onClick={() => toggleStudent(student.id)}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer active:bg-blue-50 transition-colors"
                    >
                      <div className={`${isSelected ? 'scale-110' : ''} transition-transform`}>
                        {isSelected ? (
                          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <span className="text-sm text-gray-900">{student.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Analysis Config */}
        {analysisType === "knowledge" && (
          <div className="space-y-4">
            {/* Textbook Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm text-gray-900">选择教材</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <select className="px-3 py-2 text-xs bg-blue-50/50 border border-blue-100 rounded-xl">
                  <option>人教版</option>
                  <option>苏教版</option>
                </select>
                <select className="px-3 py-2 text-xs bg-blue-50/50 border border-blue-100 rounded-xl">
                  <option>三年级</option>
                  <option>四年级</option>
                </select>
                <select className="px-3 py-2 text-xs bg-blue-50/50 border border-blue-100 rounded-xl">
                  <option>数学</option>
                  <option>语文</option>
                </select>
              </div>
            </div>

            {/* Knowledge Tree */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm text-gray-900">选择知识点</h3>
                <button className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg active:bg-blue-100">
                  按单元选择
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {knowledgeTree.map((unit) => (
                  <div key={unit.id} className="border border-blue-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-900">{unit.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="pl-6 space-y-2">
                      {unit.children.map((child) => (
                        <div key={child.id} className="flex items-center gap-2">
                          <Circle className="w-3.5 h-3.5 text-gray-300" />
                          <span className="text-xs text-gray-600">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

        {/* Bottom Action */}
        <div className="mt-4 bg-white/90 backdrop-blur-lg rounded-2xl border border-blue-100 p-4 shadow-lg shadow-blue-100/50">
          <button
            onClick={handleGenerate}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl shadow-lg shadow-blue-200/50 active:scale-95 transition-all"
          >
            生成报告
          </button>
        </div>
    </div>
  );
}
