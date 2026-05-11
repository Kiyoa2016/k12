import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft, Camera } from "lucide-react";

export default function StudentSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { selectedClass?: string; selectedTopic?: string; uploadedStudentId?: number } | null;

  const classes = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];

  const homeworkTopics = [
    "第三单元练习题",
    "第二单元测验",
    "期中考试试卷",
    "第一单元复习题",
    "周末作业-数学",
  ];

  const selectedClass = state?.selectedClass || classes[0];
  const selectedTopic = state?.selectedTopic || homeworkTopics[0];

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
    const uploadedStudentId = location.state?.uploadedStudentId;
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
    navigate(`/app/camera?mode=homework&studentId=${id}`);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm shrink-0 pt-8">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/app/homework-upload">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </div>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{selectedClass}</h1>
            <p className="text-xs text-gray-400">
              {selectedTopic} · {students.filter(s => s.uploaded).length}/{students.length} 人已提交
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {(["已批改", "批改中", "待上传"] as const).map((status) => {
          const group = students.filter((s) => s.status === status);
          if (group.length === 0) return null;
          const statusMeta = {
            "已批改": { icon: "✓", color: "text-green-600", bg: "bg-green-100", label: "已批改" },
            "批改中": { icon: "◉", color: "text-indigo-600", bg: "bg-indigo-100", label: "批改中" },
            "待上传": { icon: "○", color: "text-gray-400", bg: "bg-gray-100", label: "待上传" },
          }[status];
          return (
            <div key={status}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-5 h-5 rounded-full ${statusMeta.bg} flex items-center justify-center text-xs ${statusMeta.color}`}>
                  {statusMeta.icon}
                </span>
                <span className={`text-xs font-medium ${statusMeta.color}`}>{statusMeta.label}</span>
                <span className={`text-xs ${statusMeta.color} opacity-60`}>{group.length}人</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {group.map((student) => {
                  const isGraded = student.status === "已批改";
                  const isGrading = student.status === "批改中";

                  let cardStyle, avatarStyle, nameStyle, noStyle, badgeContent;

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
                  } else {
                    // 待上传 — 虚线边框 + 拍照提示
                    cardStyle = "border-2 border-dashed border-blue-300 bg-white cursor-pointer active:scale-[0.97] shadow-sm";
                    avatarStyle = "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200";
                    nameStyle = "text-blue-700";
                    noStyle = "text-blue-400";
                    badgeContent = (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={student.id}
                      onClick={() => {
                        if (isGraded) {
                          navigate(`/app/grading-result/${student.id}`);
                        } else if (!isGrading) {
                          // 待上传 — 跳转拍照
                          selectStudent(student.id);
                        }
                      }}
                      className={`bg-white rounded-2xl p-4 border flex flex-col items-center gap-1.5 transition-all duration-300 ${cardStyle}`}
                    >
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 ${avatarStyle}`}>
                          {isGrading ? "◉" : student.avatar}
                        </div>
                        {badgeContent}
                      </div>
                      <span className={`text-sm font-semibold text-center leading-tight transition-all duration-300 ${nameStyle}`}>
                        {student.name}
                      </span>
                      <span className={`text-[11px] transition-all duration-300 ${noStyle}`}>
                        {isGraded ? `学号 ${student.studentNo}` : isGrading ? `学号 ${student.studentNo}` : "去拍照"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      {/* 拍照批改按钮 */}
      <div className="shrink-0 px-4 pb-[30px] pt-3 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={() => {
            const firstPending = students.find(s => s.status === "待上传");
            if (firstPending) {
              navigate(`/app/camera?mode=homework&studentId=${firstPending.id}`);
            }
          }}
          disabled={students.filter(s => s.status === "待上传").length === 0}
          className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-300/60 disabled:opacity-40 disabled:shadow-none"
        >
          <Camera className="w-5 h-5" />
          拍照批改（{students.filter(s => s.status === "待上传").length}人待拍）
        </button>
      </div>
    </div>
  );
}
