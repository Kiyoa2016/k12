import { Link } from "react-router";
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, Printer, Star } from "lucide-react";

export default function ParentHomeworkDetail() {
  const homeworkInfo = {
    name: "数学练习题",
    assignTime: "2026-04-23 14:00",
    completeTime: "2026-04-23 18:30",
    score: 92,
    totalScore: 100,
    accuracy: 92,
    teacherComment: "计算能力不错，继续保持!",
  };

  const questions = [
    {
      id: 1,
      content: "计算: 25 + 37 = ?",
      studentAnswer: "62",
      correctAnswer: "62",
      isCorrect: true,
      analysis: "",
    },
    {
      id: 2,
      content: "计算: 8 × 7 = ?",
      studentAnswer: "54",
      correctAnswer: "56",
      isCorrect: false,
      analysis: "乘法口诀需要加强记忆，建议每天复习乘法口诀表",
    },
    {
      id: 3,
      content: "计算: 72 ÷ 9 = ?",
      studentAnswer: "8",
      correctAnswer: "8",
      isCorrect: true,
      analysis: "",
    },
  ];

  const recommendedExercises = [
    "计算: 7 × 8 = ?",
    "计算: 9 × 7 = ?",
    "计算: 8 × 6 = ?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/parent-archive">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">作业详情</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Homework Basic Info */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-5 shadow-xl shadow-blue-200/50 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="relative">
            <h2 className="text-base text-white mb-3">{homeworkInfo.name}</h2>
            <div className="space-y-1 text-xs text-white/90 mb-4">
              <div>布置时间: {homeworkInfo.assignTime}</div>
              <div>完成时间: {homeworkInfo.completeTime}</div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/90">批改结果</span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="text-2xl text-white">{homeworkInfo.score}</span>
                  <span className="text-sm text-white/80">/{homeworkInfo.totalScore}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/90">
                <span>正确率</span>
                <span>{homeworkInfo.accuracy}%</span>
              </div>
              {homeworkInfo.teacherComment && (
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="text-xs text-white/80 mb-1">老师评语</div>
                  <div className="text-xs text-white">{homeworkInfo.teacherComment}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Details */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
            <h3 className="text-sm text-gray-900">答题详情</h3>
          </div>

          <div className="space-y-3">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`mt-0.5 flex-shrink-0`}>
                    {question.isCorrect ? (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 mb-2">
                      第{index + 1}题: {question.content}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 flex-shrink-0">孩子的答案:</span>
                        <span className={question.isCorrect ? "text-blue-600" : "text-red-600"}>
                          {question.studentAnswer}
                        </span>
                      </div>
                      {!question.isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 flex-shrink-0">正确答案:</span>
                          <span className="text-blue-600">{question.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {question.analysis && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs text-blue-900 mb-0.5">解析</div>
                        <div className="text-xs text-blue-700">{question.analysis}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Exercises */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h3 className="text-sm text-gray-900">推荐类似练习</h3>
            </div>
            <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-lg active:bg-blue-50 flex items-center gap-1">
              <Printer className="w-3.5 h-3.5" />
              打印
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
            <div className="space-y-3">
              {recommendedExercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                >
                  <span className="text-xs text-blue-700 flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs text-gray-700 flex-1">{exercise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

        {/* Bottom Action */}
        <div className="mt-4 bg-white/90 backdrop-blur-lg rounded-2xl border border-blue-100 p-4 shadow-lg shadow-blue-100/50">
          <button className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl shadow-lg shadow-blue-200/50 active:scale-95 transition-all">
            已了解，标记已读
          </button>
        </div>
    </div>
  );
}
