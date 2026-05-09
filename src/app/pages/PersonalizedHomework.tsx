import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock, Users, Sparkles, TrendingUp } from "lucide-react";

export default function PersonalizedHomework() {
  const [selectedClass, setSelectedClass] = useState("三年级1班");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];

  const students = [
    { id: 1, name: "张小明", errorCount: 15 },
    { id: 2, name: "李华", errorCount: 8 },
    { id: 3, name: "王芳", errorCount: 12 },
    { id: 4, name: "刘强", errorCount: 5 },
    { id: 5, name: "陈静", errorCount: 20 },
    { id: 6, name: "赵丽", errorCount: 7 },
  ];

  const toggleStudent = (id: number) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedStudents(students.map((s) => s.id));
  };

  const estimatedTime = questionCount * 2;

  const handleSend = () => {
    setIsSending(true);
    setSendProgress(0);

    const interval = setInterval(() => {
      setSendProgress((prev) => {
        if (prev >= selectedStudents.length) {
          clearInterval(interval);
          setIsSending(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">个性化作业</h1>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* AI Feature Badge */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 mb-4 shadow-lg shadow-blue-200/50">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm text-white mb-1">AI智能推荐</h3>
              <p className="text-xs text-blue-50/90">
                基于学生错题情况，自动生成个性化作业
              </p>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="mb-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-700 mb-2">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            选择班级
          </label>
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

        {/* Quick Select */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={selectAll}
            className="flex-1 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl text-xs text-blue-700 active:bg-blue-50 transition-colors shadow-sm"
          >
            全选
          </button>
          <button
            onClick={() => setSelectedStudents([])}
            className="flex-1 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl text-xs text-blue-700 active:bg-blue-50 transition-colors shadow-sm"
          >
            清空
          </button>
        </div>

        {/* Student List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-100/50 overflow-hidden mb-4 border border-blue-50/50">
          <div className="px-4 py-2.5 border-b border-blue-50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <h3 className="text-sm text-gray-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              学生列表
            </h3>
          </div>
          <div className="divide-y divide-blue-50">
            {students.map((student) => {
              const isSelected = selectedStudents.includes(student.id);
              return (
                <div
                  key={student.id}
                  onClick={() => toggleStudent(student.id)}
                  className="px-4 py-3 flex items-center gap-3 cursor-pointer active:bg-blue-50/50 transition-colors"
                >
                  <div className={`flex-shrink-0 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {isSelected ? (
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-500">
                      错题库: {student.errorCount} 道
                    </div>
                  </div>
                  {student.errorCount > 15 && (
                    <div className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                      需关注
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Count */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50">
          <label className="block text-sm text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            作业题量
          </label>
          <input
            type="range"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            min="5"
            max="50"
            className="w-full h-2 bg-blue-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>5题</span>
            <span className="text-blue-700 font-medium">{questionCount}题</span>
            <span>50题</span>
          </div>
          <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-700">
              预计完成时间: {estimatedTime} 分钟
            </span>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={selectedStudents.length === 0 || isSending}
          className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white text-sm rounded-2xl transition-all shadow-lg shadow-blue-200/50 active:scale-95"
        >
          {isSending
            ? `AI生成中 (${sendProgress}/${selectedStudents.length})`
            : `发送给 ${selectedStudents.length} 名学生`}
        </button>

        {/* Progress Bar */}
        {isSending && (
          <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50">
            <div className="mb-2 text-sm text-gray-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              正在生成个性化作业...
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${(sendProgress / selectedStudents.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4 border-2 border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200/50">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">发送成功!</h3>
              <p className="text-gray-600 text-sm">
                本次作业已发送给 {selectedStudents.length} 名学生
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
