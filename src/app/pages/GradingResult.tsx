import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Edit, Save, CheckCircle, XCircle } from "lucide-react";

export default function GradingResult() {
  const { studentId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [score, setScore] = useState(92);

  const studentInfo = {
    name: "张小明",
    class: "三年级1班",
    studentNo: "001",
  };

  const questions = [
    {
      id: 1,
      question: "计算: 25 + 37 = ?",
      studentAnswer: "62",
      correctAnswer: "62",
      isCorrect: true,
      score: 5,
      maxScore: 5,
      comment: "",
    },
    {
      id: 2,
      question: "计算: 86 - 29 = ?",
      studentAnswer: "57",
      correctAnswer: "57",
      isCorrect: true,
      score: 5,
      maxScore: 5,
      comment: "",
    },
    {
      id: 3,
      question: "计算: 8 × 7 = ?",
      studentAnswer: "54",
      correctAnswer: "56",
      isCorrect: false,
      score: 0,
      maxScore: 5,
      comment: "乘法口诀需要加强练习",
    },
    {
      id: 4,
      question: "计算: 72 ÷ 9 = ?",
      studentAnswer: "8",
      correctAnswer: "8",
      isCorrect: true,
      score: 5,
      maxScore: 5,
      comment: "",
    },
  ];

  const wrongCount = questions.filter((q) => !q.isCorrect).length;
  const totalCount = questions.length;
  const accuracy = Math.round(((totalCount - wrongCount) / totalCount) * 100);
  const isAccuracyHigh = accuracy >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/homework-upload">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <ArrowLeft className="w-5 h-5 text-blue-700" />
              </div>
            </Link>
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">批改结果</h1>
          </div>
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-200/50 active:scale-95 transition-transform"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-sm rounded-xl flex items-center gap-1.5 active:bg-blue-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              编辑
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Combined Info + Score Card */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-blue-200/50 mb-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative px-5 pt-4 pb-5">
            {/* Student Info */}
            <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-white/15">
              <div>
                <div className="text-[11px] text-white/60 mb-0.5">姓名</div>
                <div className="text-sm text-white font-medium">{studentInfo.name}</div>
              </div>
              <div>
                <div className="text-[11px] text-white/60 mb-0.5">班级</div>
                <div className="text-sm text-white font-medium">{studentInfo.class}</div>
              </div>
              <div>
                <div className="text-[11px] text-white/60 mb-0.5">学号</div>
                <div className="text-sm text-white font-medium">{studentInfo.studentNo}</div>
              </div>
            </div>

            {/* Accuracy & Wrong/Total */}
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2.5 backdrop-blur-sm rounded-xl ${
                isAccuracyHigh ? "bg-green-100/30" : "bg-red-100/30"
              }`}>
                <div className="text-[11px] text-white/60 mb-0.5">正确率</div>
                <div className={`text-xl font-bold ${
                  isAccuracyHigh ? "text-green-300" : "text-red-300"
                }`}>{accuracy}%</div>
              </div>
              <div className="px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <div className="text-[11px] text-white/60 mb-0.5">错题</div>
                <div className="text-xl font-bold text-white flex items-baseline gap-0.5">
                  <span className="text-red-300">{wrongCount}</span>
                  <span className="text-white/60">/</span>
                  <span>{totalCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3 mb-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <div
                    className={`mt-0.5 flex-shrink-0 ${
                      question.isCorrect ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {question.isCorrect ? (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 mb-1.5">
                      第{index + 1}题: {question.question}
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex gap-1.5">
                        <span className="text-gray-500 flex-shrink-0">学生答案:</span>
                        <span
                          className={
                            question.isCorrect ? "text-blue-600" : "text-red-600"
                          }
                        >
                          {question.studentAnswer}
                        </span>
                      </div>
                      {!question.isCorrect && (
                        <div className="flex gap-1.5">
                          <span className="text-gray-500 flex-shrink-0">正确答案:</span>
                          <span className="text-blue-600">{question.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {isEditing ? (
                  <input
                    type="number"
                    defaultValue={question.score}
                    className="w-14 px-1.5 py-0.5 border border-blue-200 rounded text-center text-xs flex-shrink-0"
                  />
                ) : (
                  <div className="text-xs text-blue-700 flex-shrink-0 bg-blue-50 px-2 py-1 rounded-lg">
                    {question.score}/{question.maxScore}分
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl transition-all shadow-lg shadow-blue-200/50 active:scale-95">
            加入错题库
          </button>
          <button className="w-full py-3 bg-white border border-blue-200 text-blue-700 text-sm rounded-2xl active:bg-blue-50 transition-colors">
            生成学情报告
          </button>
        </div>
      </main>
    </div>
  );
}
