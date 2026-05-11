import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

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
    { id: 2, name: "李华", studentNo: "002", avatar: "👧", uploaded: false, status: "待拍照" as const },
    { id: 3, name: "王芳", studentNo: "003", avatar: "👩‍🎓", uploaded: true, status: "批改中" as const },
    { id: 4, name: "刘强", studentNo: "004", avatar: "🧑‍💻", uploaded: false, status: "待拍照" as const },
    { id: 5, name: "陈静", studentNo: "005", avatar: "👩", uploaded: true, status: "已批改" as const },
    { id: 6, name: "赵丽", studentNo: "006", avatar: "🧑‍🎨", uploaded: false, status: "待拍照" as const },
    { id: 7, name: "孙伟", studentNo: "007", avatar: "👨‍🎓", uploaded: true, status: "批改中" as const },
    { id: 8, name: "周敏", studentNo: "008", avatar: "🧒", uploaded: true, status: "已批改" as const },
    { id: 9, name: "吴涛", studentNo: "009", avatar: "👦", uploaded: false, status: "待拍照" as const },
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
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.uploadedStudentId]);

  const selectStudent = (id: number) => {
    navigate(`/app/camera?mode=homework&studentId=${id}`);
  };

  const uploadedCount = students.filter((s) => s.uploaded).length;

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
              {selectedTopic} · {uploadedCount}/{students.length} 人已提交
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {(["待拍照", "批改中", "已批改"] as const).map((status) => {
          const group = students.filter((s) => s.status === status);
          if (group.length === 0) return null;
          const statusMeta = {
            "待拍照": { icon: "○", color: "text-gray-400", bg: "bg-gray-100", label: "待拍照" },
            "批改中": { icon: "◉", color: "text-indigo-600", bg: "bg-indigo-100", label: "批改中" },
            "已批改": { icon: "✓", color: "text-green-600", bg: "bg-green-100", label: "已批改" },
          }[status];
          return (
            <div key={status} className="mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-5 h-5 rounded-full ${statusMeta.bg} flex items-center justify-center text-xs ${statusMeta.color}`}>
                  {statusMeta.icon}
                </span>
                <span className={`text-xs font-medium ${statusMeta.color}`}>{statusMeta.label}</span>
                <span className={`text-xs ${statusMeta.color} opacity-60`}>{group.length}人</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {group.map((student) => {
                  const isPending = student.status === "待拍照";
                  const isProcessing = student.status === "批改中";
                  const isGraded = student.status === "已批改";

                  let cardStyle: string, avatarStyle: string, nameStyle: string, labelText: string, labelStyle: string;

                  if (isPending) {
                    cardStyle = "border-gray-200 bg-white cursor-pointer active:scale-[0.97]";
                    avatarStyle = "bg-gray-50 border-gray-200";
                    nameStyle = "text-gray-800";
                    labelText = "去拍照";
                    labelStyle = "text-gray-400";
                  } else if (isProcessing) {
                    cardStyle = "border-indigo-300 bg-indigo-50/30 cursor-default";
                    avatarStyle = "bg-white border-indigo-300";
                    nameStyle = "text-indigo-800";
                    labelText = "批改中";
                    labelStyle = "text-indigo-500 font-medium";
                  } else {
                    cardStyle = "border-green-100 bg-green-50/30 cursor-pointer active:scale-[0.97] shadow-sm";
                    avatarStyle = "bg-white border-green-200";
                    nameStyle = "text-green-800";
                    labelText = `学号 ${student.studentNo}`;
                    labelStyle = "text-green-400";
                  }

                  return (
                    <div
                      key={student.id}
                      onClick={() => {
                        if (isPending) {
                          selectStudent(student.id);
                        } else if (isGraded) {
                          navigate(`/app/grading-result/${student.id}`);
                        }
                      }}
                      className={`bg-white rounded-2xl p-3 border flex flex-col items-center gap-1.5 transition-all duration-300 ${cardStyle}`}
                    >
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border transition-all duration-300 ${avatarStyle}`}>
                          {isProcessing ? "◉" : student.avatar}
                        </div>
                        {isProcessing && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-2 h-2 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          </div>
                        )}
                        {isGraded && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-semibold text-center leading-tight transition-all duration-300 ${nameStyle}`}>
                        {student.name}
                      </span>
                      <span className={`text-[10px] transition-all duration-300 ${labelStyle}`}>
                        {labelText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

    </div>
  );
}
