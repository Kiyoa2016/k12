import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft, BookOpen, Play, ChevronDown } from "lucide-react";

export default function StudentSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState("三年级1班");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [gradingStarted, setGradingStarted] = useState(false);

  const state = location.state as { homeworkTitle?: string; mode?: string; uploadedStudentId?: number } | null;
  const homeworkTitle = state?.homeworkTitle;
  const isRecordsMode = state?.mode === "records";

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];

  const homeworkTopics = [
    "第三单元练习题",
    "第二单元测验",
    "期中考试试卷",
    "第一单元复习题",
    "周末作业-数学",
  ];
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showTopicPicker, setShowTopicPicker] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: "张小明", studentNo: "001", avatar: "👦", uploaded: true, status: "已批改" as const },
    { id: 2, name: "李华", studentNo: "002", avatar: "👧", uploaded: false, status: "待上传" as const },
    { id: 3, name: "王芳", studentNo: "003", avatar: "👩‍🎓", uploaded: true, status: "批改中" as const },
    { id: 4, name: "刘强", studentNo: "004", avatar: "🧑‍💻", uploaded: false, status: "待上传" as const },
    { id: 5, name: "陈静", studentNo: "005", avatar: "👩", uploaded: true, status: "已批改" as const },
    { id: 6, name: "赵丽", studentNo: "006", avatar: "🧑‍🎨", uploaded: false, status: "待上传" as const },
    { id: 7, name: "孙伟", studentNo: "007", avatar: "👨‍🎓", uploaded: true, status: "批改中" as const },
    { id: 8, name: "周敏", studentNo: "008", avatar: "🧒", uploaded: true, status: "已批改" as const },
    { id: 9, name: "吴涛", studentNo: "009", avatar: "👦", uploaded: false, status: "待上传" as const },
    { id: 10, name: "郑红", studentNo: "010", avatar: "👧", uploaded: true, status: "批改中" as const },
  ]);

  // Handle returning from camera with uploaded student
  useEffect(() => {
    const uploadedStudentId = state?.uploadedStudentId;
    if (uploadedStudentId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === uploadedStudentId ? { ...s, uploaded: true, status: "批改中" as const } : s
        )
      );
      // Clear the state so refresh doesn't re-trigger
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.uploadedStudentId]);

  const selectStudent = (id: number) => {
    if (gradingStarted) return;
    setSelectedStudent(id);
    setTimeout(() => {
      navigate(`/camera?mode=homework&studentId=${id}`);
    }, 300);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm shrink-0 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/homework-upload">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{isRecordsMode ? "批改情况" : "上传作业"}</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {/* Homework Topic */}
        {homeworkTitle && !isRecordsMode && (
          <div className="mb-4 px-4 py-3 bg-white rounded-2xl border border-indigo-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 mb-0.5">当前作业主题</div>
              <div className="text-sm font-medium text-gray-900 truncate">{homeworkTitle}</div>
            </div>
          </div>
        )}

        {/* Records mode: filters */}
        {isRecordsMode && (
          <div className="mb-4 space-y-3">
            {/* Topic Selection - Mobile bottom sheet */}
            <div>
              <div className="text-xs text-gray-400 mb-2">选择作业主题</div>
              <button
                type="button"
                onClick={() => setShowTopicPicker(true)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm bg-white border border-blue-100 rounded-2xl shadow-sm text-gray-900 active:scale-[0.99] transition-all"
              >
                <span className={selectedTopic ? "text-gray-900" : "text-gray-400"}>
                  {selectedTopic || "请选择作业主题"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {/* Class Selection */}
            <div>
              <div className="text-xs text-gray-400 mb-2">选择班级</div>
              <div className="flex gap-2 flex-wrap">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls === selectedClass ? "" : cls)}
                    className={`px-4 py-2.5 text-sm rounded-xl transition-all ${
                      selectedClass === cls
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200/50"
                        : "bg-white border border-blue-100 text-gray-600 active:bg-gray-100"
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Student Grid */}
        <div className="grid grid-cols-3 gap-3">
          {students.map((student) => {
            const isSelected = selectedStudent === student.id;
            const isGrading = gradingStarted || (isRecordsMode && student.status === "批改中");
            const isGraded = student.status === "已批改";
            const isPending = student.status === "待上传";

            // Determine visual style based on status
            let cardStyle, avatarStyle, nameStyle, noStyle, badgeContent, statusStyle, statusText, showPulse;

            if (isRecordsMode) {
              // Records mode: show actual status
              if (isGraded) {
                cardStyle = "border-green-100 bg-green-50/30 cursor-pointer active:scale-[0.97] shadow-sm hover:shadow-md";
                avatarStyle = "bg-white border-green-200";
                nameStyle = "text-green-800";
                noStyle = "text-green-400";
                badgeContent = (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                );
                statusStyle = "bg-green-100 text-green-600";
                statusText = "已批改";
                showPulse = false;
              } else if (isGrading) {
                cardStyle = "border-indigo-100 bg-indigo-50/30 cursor-default shadow-sm";
                avatarStyle = "bg-white border-indigo-200";
                nameStyle = "text-indigo-800";
                noStyle = "text-indigo-400";
                badgeContent = (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                );
                statusStyle = "bg-indigo-100 text-indigo-600";
                statusText = "批改中";
                showPulse = true;
              } else {
                cardStyle = "border-gray-100 bg-white cursor-default shadow-sm opacity-60";
                avatarStyle = "bg-gray-50 border-gray-200";
                nameStyle = "text-gray-400";
                noStyle = "text-gray-300";
                badgeContent = null;
                statusStyle = "bg-gray-100 text-gray-400";
                statusText = "待上传";
                showPulse = false;
              }
            } else if (gradingStarted) {
              // Upload mode: grading started state
              cardStyle = "border-indigo-100 bg-indigo-50/30 cursor-default shadow-sm";
              avatarStyle = "bg-white border-indigo-200";
              nameStyle = "text-indigo-800";
              noStyle = "text-indigo-400";
              badgeContent = (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-3 h-3 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              );
              statusStyle = "bg-indigo-100 text-indigo-600";
              statusText = "批改中";
              showPulse = true;
            } else {
              // Upload mode: normal state
              cardStyle = isSelected
                ? "border-indigo-300 shadow-md shadow-indigo-100/50 cursor-pointer active:scale-[0.97]"
                : "border-blue-50/50 shadow-sm cursor-pointer active:scale-[0.97]";
              avatarStyle = isSelected
                ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 shadow-md shadow-indigo-200/50"
                : "bg-gradient-to-br from-indigo-100 to-purple-100 border-indigo-200/50";
              nameStyle = isSelected ? "text-indigo-700" : "text-gray-900";
              noStyle = isSelected ? "text-indigo-500" : "text-gray-400";
              badgeContent = student.uploaded ? (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : null;
              statusStyle = student.uploaded ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400";
              statusText = student.uploaded ? "已上传" : "待上传";
              showPulse = false;
            }

            return (
              <div
                key={student.id}
                onClick={() => {
                  if (isRecordsMode && isGraded) {
                    navigate(`/grading-result/${student.id}`);
                  } else if (!gradingStarted && !isRecordsMode) {
                    selectStudent(student.id);
                  }
                }}
                className={`bg-white rounded-2xl p-4 border flex flex-col items-center gap-1.5 transition-all duration-300 ${cardStyle}`}
              >
                {/* Avatar with badge */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 ${avatarStyle}`}>
                    {student.avatar}
                  </div>
                  {badgeContent}
                </div>

                {/* Name */}
                <span className={`text-sm font-semibold text-center leading-tight transition-all duration-300 ${nameStyle}`}>
                  {student.name}
                </span>

                {/* Student No */}
                <span className={`text-[11px] transition-all duration-300 ${noStyle}`}>
                  学号 {student.studentNo}
                </span>

                {/* Status text - only show in records mode or grading started */}
                {(isRecordsMode || gradingStarted) && (
                  <span className={`text-[10px] px-2.5 py-1 rounded-full transition-all duration-300 flex items-center gap-1 ${statusStyle}`}>
                    {showPulse && (
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    )}
                    {statusText}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom: Start Grading Button (upload mode only) */}
      {!isRecordsMode && (
        <div className="shrink-0 px-4 pb-[30px] pt-3 bg-gradient-to-t from-white via-white to-transparent">
          <button
            onClick={() => !gradingStarted && setGradingStarted(true)}
            className={`w-full rounded-2xl py-3.5 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-sm font-medium ${
              gradingStarted
                ? "bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm cursor-default"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-300/60"
            }`}
          >
            {gradingStarted ? (
              <>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                正在批改中...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                开始批改作业
              </>
            )}
          </button>
          {gradingStarted && (
            <p className="text-center text-xs text-gray-400 mt-2">
              作业批改结果请在批改记录中查看
            </p>
          )}
        </div>
      )}

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
    </div>
  );
}
