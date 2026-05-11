import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, FileText, CheckCircle2, Clock, Users, TrendingUp, ChevronDown } from "lucide-react";

export default function HomeworkUpload() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("第三单元练习题");
  const [showTopicPicker, setShowTopicPicker] = useState(false);
  const [showTopicSheet, setShowTopicSheet] = useState(false);

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];
  const homeworkTopics = ["第三单元练习题", "第二单元测验", "期中考试试卷", "第一单元复习题", "周末作业-数学"];

  const recentTopics = [
    "第三单元练习题",
    "第二单元测验",
    "期中考试试卷",
  ];

  const handleUpload = () => {
    if (homeworkTitle.trim() && selectedClass) {
      setShowModal(false);
      navigate("/app/student-selection", { state: { selectedTopic: homeworkTitle.trim(), selectedClass } });
    }
  };

  const classStats = [
    { id: 1, name: "三年级1班", total: 45, submitted: 42, graded: 40, accuracy: 78 },
    { id: 2, name: "三年级2班", total: 44, submitted: 38, graded: 35, accuracy: 72 },
    { id: 3, name: "四年级1班", total: 46, submitted: 46, graded: 44, accuracy: 85 },
    { id: 4, name: "四年级2班", total: 43, submitted: 30, graded: 25, accuracy: 65 },
  ];

  const overallTotal = classStats.reduce((s, c) => s + c.total, 0);
  const overallSubmitted = classStats.reduce((s, c) => s + c.submitted, 0);
  const overallRate = Math.round((overallSubmitted / overallTotal) * 100);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm shrink-0 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/app">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">作业批改</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {/* Topic Selector - Mobile picker */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2">选择作业主题</div>
          <button
            type="button"
            onClick={() => setShowTopicPicker(true)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm bg-white border border-blue-100 rounded-2xl shadow-sm text-gray-900 active:scale-[0.99] transition-all"
          >
            <span>{selectedTopic}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Overall Stats Overview */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-5 shadow-xl shadow-indigo-200/50 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-white/90" />
              <span className="text-xs text-white/80">今日作业完成概况</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold text-white">{overallRate}%</span>
              <span className="text-sm text-white/70 mb-1">总体提交率</span>
            </div>
            <div className="flex gap-4">
              <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <div className="text-[11px] text-white/70 mb-0.5">已提交</div>
                <div className="text-sm font-semibold text-white">{overallSubmitted}<span className="text-white/60 font-normal">/{overallTotal}</span></div>
              </div>
              <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <div className="text-[11px] text-white/70 mb-0.5">班级</div>
                <div className="text-sm font-semibold text-white">{classStats.length}个</div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Comparison List */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 px-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-gray-800">班级横向对比</h2>
          </div>

          {classStats.map((cls) => {
            const submissionRate = Math.round((cls.submitted / cls.total) * 100);
            const gradingRate = Math.round((cls.graded / cls.submitted) * 100);
            return (
              <div
                key={cls.id}
                onClick={() => navigate("/app/student-selection", { state: { selectedClass: cls.name, selectedTopic } })}
                className="bg-white rounded-2xl p-4 active:scale-[0.98] transition-all cursor-pointer shadow-sm border border-blue-50/50"
              >
                {/* Class Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm">
                      {cls.name.replace(/[^\d]/g, '')}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{cls.name}</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    submissionRate >= 90 ? "bg-green-100 text-green-700" :
                    submissionRate >= 70 ? "bg-orange-100 text-orange-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {submissionRate}%
                  </div>
                </div>

                {/* Submission Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>提交进度</span>
                    <span>{cls.submitted}/{cls.total} 人</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        submissionRate >= 90 ? "bg-green-500" :
                        submissionRate >= 70 ? "bg-orange-400" :
                        "bg-red-400"
                      }`}
                      style={{ width: `${submissionRate}%` }}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span>已批改 <strong className="text-gray-700">{cls.graded}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>待批改 <strong className="text-gray-700">{cls.submitted - cls.graded}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 ml-auto">
                    正确率 <strong className={cls.accuracy >= 60 ? "text-green-600" : "text-red-600"}>{cls.accuracy}%</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FAB — 快速新建批改 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-[100px] right-5 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-300/60 active:scale-90 transition-transform z-40"
      >
        <FileText className="w-6 h-6 text-white" />
      </button>

      {/* Topic Picker Bottom Sheet */}
      {showTopicPicker && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTopicPicker(false)} />
          <div className="relative bg-white rounded-t-3xl px-6 pt-8 pb-10 shadow-2xl animate-slide-up">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">选择作业主题</h3>
            <div className="space-y-1">
              {homeworkTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setShowTopicPicker(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 text-sm rounded-2xl transition-all ${
                    selectedTopic === topic
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium"
                      : "text-gray-600 active:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {topic}
                    {selectedTopic === topic && (
                      <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-50"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />

            {/* Sheet */}
            <motion.div
              key="modal-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-5">新建批改</h3>

              {/* Topic Dropdown */}
              <div className="mb-5">
                <label className="text-xs text-gray-500 mb-2 block">作业主题</label>
                <button
                  type="button"
                  onClick={() => setShowTopicSheet(true)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 active:scale-[0.99] transition-all"
                >
                  <span className={homeworkTitle ? "text-gray-900" : "text-gray-400"}>
                    {homeworkTitle || "请选择作业主题"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Class Selection */}
              <div className="mb-6">
                <label className="text-xs text-gray-500 mb-2 block">选择班级</label>
                <div className="flex gap-2 flex-wrap">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedClass(cls === selectedClass ? "" : cls)}
                      className={`px-4 py-2.5 text-sm rounded-xl transition-all active:scale-95 ${
                        selectedClass === cls
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "bg-gray-50 border border-gray-200 text-gray-600"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selection Bottom Sheet inside modal */}
              {showTopicSheet && (
                <div className="absolute inset-0 z-50 flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/50" onClick={() => setShowTopicSheet(false)} />
                  <div className="relative bg-white rounded-t-3xl px-6 pt-8 pb-10 shadow-2xl animate-slide-up">
                    <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">选择作业主题</h3>
                    <div className="space-y-1">
                      {homeworkTopics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            setHomeworkTitle(topic);
                            setShowTopicSheet(false);
                          }}
                          className={`w-full text-left px-4 py-3.5 text-sm rounded-2xl transition-all ${
                            homeworkTitle === topic
                              ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium"
                              : "text-gray-600 active:bg-gray-50"
                          }`}
                        >
                          <span className="flex items-center justify-between">
                            {topic}
                            {homeworkTitle === topic && (
                              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3.5 text-sm text-gray-600 bg-gray-100 rounded-xl active:scale-95 transition-all font-medium"
                >
                  取消
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!homeworkTitle.trim() || !selectedClass}
                  className="flex-1 py-3.5 text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl active:scale-95 transition-all font-medium shadow-lg shadow-indigo-200/50 disabled:opacity-40 disabled:shadow-none"
                >
                  开始批改
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
