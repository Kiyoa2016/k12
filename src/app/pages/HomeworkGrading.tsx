import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, FileText,
  ChevronDown, XCircle, CheckCircle, Save,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Textarea } from "../components/ui/textarea";

/* ============ Types ============ */

interface QuestionResult {
  id: number;
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  teacherOverridden: boolean;
  teacherComment: string;
  analysis: string;
}

interface Student {
  id: string;
  name: string;
  studentNo: string;
  accuracy: number;
  totalQuestions: number;
  wrongCount: number;
  graded: boolean;
  photoUrl: string;
  questions: QuestionResult[];
}

interface ClassData {
  className: string;
  students: Student[];
}

/* ============ Mock Data ============ */

const TOPICS = ["第三单元练习题", "第二单元测验", "期中考试试卷", "第一单元复习题", "周末作业-数学"];
const CLASSES = ["三年级1班", "三年级2班", "四年级1班", "四年级2班"];

const studentNames = [
  ["张小明", "001"], ["李华", "002"], ["王芳", "003"], ["刘强", "004"],
  ["陈静", "005"], ["赵丽", "006"], ["孙伟", "007"], ["周敏", "008"],
  ["吴涛", "009"], ["郑红", "010"],
];

const questionBank = [
  { id: 1, question: "计算: 25 + 37 = ?", answer: "62" },
  { id: 2, question: "计算: 86 - 29 = ?", answer: "57" },
  { id: 3, question: "计算: 8 × 7 = ?", answer: "56" },
  { id: 4, question: "计算: 72 ÷ 9 = ?", answer: "8" },
  { id: 5, question: "计算: 15 + 28 = ?", answer: "43" },
  { id: 6, question: "计算: 100 - 45 = ?", answer: "55" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createMockStudent(index: number, wrongCount: number): Student {
  const [name, studentNo] = studentNames[index % studentNames.length];
  const totalQuestions = 4 + Math.floor(Math.random() * 3); // 4-6
  const shuffledQuestions = shuffleArray(questionBank).slice(0, totalQuestions);
  const wrongIndices = shuffleArray([...Array(totalQuestions).keys()]).slice(0, Math.min(wrongCount, totalQuestions));

  const questions: QuestionResult[] = shuffledQuestions.map((q, i) => {
    const isWrong = wrongIndices.includes(i);
    const wrongAnswer = isWrong
      ? String(Number(q.answer) + (Math.random() > 0.5 ? -2 - Math.floor(Math.random() * 8) : 2 + Math.floor(Math.random() * 8)))
      : q.answer;
    return {
      id: q.id,
      question: q.question,
      studentAnswer: isWrong ? wrongAnswer : q.answer,
      correctAnswer: q.answer,
      isCorrect: !isWrong,
      teacherOverridden: false,
      teacherComment: "",
      analysis: "",
    };
  });

  // Fill analysis for wrong answers
  questions.forEach((q) => {
    if (q.isCorrect) return;
    if (q.question.includes("+") || q.question.includes("-")) {
      q.analysis = "本题考查加减法运算。建议：列竖式计算时注意数位对齐，从个位开始逐位计算，进位和借位要标记清楚。";
    } else if (q.question.includes("×")) {
      q.analysis = "本题考查乘法运算。建议：熟记乘法口诀表，做题时先确认乘数和乘数，再调用对应的口诀。可用加法验证结果。";
    } else if (q.question.includes("÷")) {
      q.analysis = "本题考查除法运算。建议：除法是乘法的逆运算，想乘法算除法。如果余数不为零，注意余数要小于除数。";
    } else {
      q.analysis = "本题考查基本运算能力。建议：仔细审题，分步计算，完成后代入验算。";
    }
  });

  const actualWrongCount = questions.filter((q) => !q.isCorrect).length;
  const accuracy = Math.round(((totalQuestions - actualWrongCount) / totalQuestions) * 100);

  return {
    id: `s-${index}`,
    name,
    studentNo,
    accuracy,
    totalQuestions,
    wrongCount: actualWrongCount,
    graded: true,
    photoUrl: "",
    questions,
  };
}

function createMockClassData(className: string): ClassData {
  const studentCount = 8 + Math.floor(Math.random() * 4); // 8-11
  const students: Student[] = [];
  for (let i = 0; i < studentCount; i++) {
    const wrongCount = Math.random() > 0.6 ? 2 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2);
    students.push(createMockStudent(i, wrongCount));
  }
  return { className, students };
}

// Build lookup map
const mockData: Record<string, ClassData> = {};
for (const topic of TOPICS) {
  for (const cls of CLASSES) {
    mockData[`${topic}|${cls}`] = createMockClassData(cls);
  }
}

/* ============ Sub-components ============ */

function AIStatusChip({ isCorrect }: { isCorrect: boolean }) {
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-medium inline-flex items-center gap-1 ${
      isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
    }`}>
      {isCorrect ? (
        <><CheckCircle className="w-3 h-3" /> 正确</>
      ) : (
        <><XCircle className="w-3 h-3" /> 错误</>
      )}
    </span>
  );
}

/* ============ Main Component ============ */

export default function HomeworkGrading() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [edits, setEdits] = useState<Record<number, { teacherOverridden: boolean; teacherComment: string }>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentClassData = mockData[`${selectedTopic}|${selectedClass}`];
  const students = currentClassData?.students ?? [];
  const gradedCount = students.filter((s) => s.graded).length;
  const avgAccuracy = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.accuracy, 0) / students.length)
    : 0;

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    const initEdits: Record<number, { teacherOverridden: boolean; teacherComment: string }> = {};
    student.questions.forEach((q) => {
      initEdits[q.id] = {
        teacherOverridden: q.teacherOverridden,
        teacherComment: q.teacherComment,
      };
    });
    setEdits(initEdits);
  };

  const handleSave = () => {
    toast.success(`「${selectedStudent?.name}」的批改审核结果已保存`);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* ===== Header ===== */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-50/50 shrink-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => navigate("/console")}
              className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">作业批改</h1>
          </div>
        </div>
      </header>

      {/* ===== Filter Bar ===== */}
      <div className="bg-white/80 border-b border-gray-100 shrink-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-6">
          {/* Topic Dropdown */}
          <div className="relative">
            <label className="text-xs text-gray-400 mb-1 block">作业主题</label>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors min-w-[160px]"
            >
              <span className="text-gray-900">{selectedTopic}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg z-10 py-1">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => { setSelectedTopic(topic); setDropdownOpen(false); setSelectedStudent(null); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedTopic === topic
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Class Pills */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">班级</label>
            <div className="flex gap-2">
              {CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => { setSelectedClass(cls); setSelectedStudent(null); }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedClass === cls
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-5 text-xs text-gray-500">
            <span>共 <strong className="text-gray-700">{students.length}</strong> 人</span>
            <span>已批改 <strong className="text-green-600">{gradedCount}</strong></span>
            <span>平均正确率 <strong className={avgAccuracy >= 60 ? "text-green-600" : "text-red-500"}>{avgAccuracy}%</strong></span>
          </div>
        </div>
      </div>

      {/* ===== Main Split Content ===== */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Student Cards */}
        <div className="w-[200px] shrink-0 border-r border-gray-100 bg-white/80 overflow-y-auto">
          <div className="p-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
            {selectedTopic} · {selectedClass}
          </div>
          {students.length > 0 ? (
            <div className="px-3 pb-3 space-y-1.5">
              {students.map((student) => {
                const isSelected = selectedStudent?.id === student.id;
                return (
                  <button
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className={`w-full text-left rounded-xl p-2.5 transition-all border ${
                      isSelected
                        ? "bg-white border-blue-200 shadow-md shadow-blue-100/50"
                        : "bg-white border-gray-100 shadow-sm hover:border-blue-100 hover:shadow"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                        isSelected
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm"
                          : "bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700"
                      }`}>
                        {student.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className={`text-xs font-semibold truncate ${
                            isSelected ? "text-blue-700" : "text-gray-900"
                          }`}>{student.name}</span>
                          {student.wrongCount > 0 && (
                            <span className="ml-auto px-1 py-0.5 rounded text-[9px] bg-red-50 text-red-600 font-medium shrink-0">
                              {student.wrongCount}错
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400 text-sm">
              <FileText className="w-8 h-8 mx-auto mb-2 text-gray-200" />
              暂无学生数据
            </div>
          )}
        </div>

        {/* Right: Detail Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedStudent ? (
            <DetailContent
              student={selectedStudent}
              edits={edits}
              onEditsChange={setEdits}
              onSave={handleSave}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-3 text-gray-200" />
                <p className="text-sm">从左侧选择一个学生查看批改详情</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

/* ============ Detail Content ============ */

function DetailContent({
  student,
  edits,
  onEditsChange,
  onSave,
}: {
  student: Student;
  edits: Record<number, { teacherOverridden: boolean; teacherComment: string }>;
  onEditsChange: (e: Record<number, { teacherOverridden: boolean; teacherComment: string }>) => void;
  onSave: () => void;
}) {
  const [expandedAnalysis, setExpandedAnalysis] = useState<Record<number, boolean>>({});
  const updateEdit = (questionId: number, field: "teacherOverridden" | "teacherComment", value: boolean | string) => {
    onEditsChange({
      ...edits,
      [questionId]: { ...edits[questionId], [field]: value },
    });
  };

  return (
    <div className="flex-1 flex gap-6 p-6 overflow-hidden">
      {/* Left: Photo Panel */}
      <div className="w-[420px] shrink-0 bg-white rounded-xl border border-gray-100 p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-semibold text-gray-800">学生答卷</h3>
        </div>
        <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center">
          {student.photoUrl ? (
            <img src={student.photoUrl} alt="学生答卷" className="w-full h-full object-contain rounded-lg" />
          ) : (
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">原始照片占位</p>
            </div>
          )}
        </div>
      </div>

        {/* Right: Grading Panel */}
        <div className="flex-1 min-w-0 flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Student Info Bar */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-white">{student.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{student.name}</span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-blue-50 text-blue-700">{student.studentNo}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
              student.accuracy >= 60 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              正确率 {student.accuracy}%
            </span>
            <span className="text-xs text-gray-500">
              错题 <strong className={student.wrongCount > 0 ? "text-red-500" : "text-gray-700"}>{student.wrongCount}</strong>
              /{student.totalQuestions}
            </span>
          </div>

          {/* Question List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {student.questions.map((q, index) => {
              const edit = edits[q.id] ?? { teacherOverridden: false, teacherComment: "" };
              return (
                <div key={q.id} className="bg-white rounded-lg border border-gray-50 p-4">
                  {/* Question header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-gray-900">第{index + 1}题</span>
                    <span className="text-sm text-gray-700">{q.question}</span>
                  </div>

                  {/* Answer comparison */}
                  <div className="flex items-center gap-6 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">学生答案:</span>
                      <span className={`font-medium ${q.isCorrect ? "text-green-700" : "text-red-700"}`}>
                        {q.studentAnswer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">正确答案:</span>
                      <span className="font-medium text-gray-900">{q.correctAnswer}</span>
                    </div>
                    <AIStatusChip isCorrect={q.isCorrect} />
                  </div>

                  {/* Review controls for wrong answers */}
                  {!q.isCorrect && (
                    <>
                      <div className="border-t border-gray-50 pt-3 mb-3">
                        <div className="text-xs text-gray-500 mb-2">批改确认</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateEdit(q.id, "teacherOverridden", false)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                              !edit.teacherOverridden
                                ? "bg-blue-600 text-white shadow-sm"
                                : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            接受AI结果
                          </button>
                          <button
                            onClick={() => updateEdit(q.id, "teacherOverridden", true)}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                              edit.teacherOverridden
                                ? "bg-blue-600 text-white shadow-sm"
                                : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            手动纠正
                          </button>
                        </div>

                        {edit.teacherOverridden && (
                          <div className="mt-3">
                            <label className="text-xs text-gray-500 mb-1 block">正确答案</label>
                            <input
                              type="text"
                              defaultValue={q.correctAnswer}
                              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-[120px]"
                            />
                          </div>
                        )}
                      </div>

                      {/* 解题分析 */}
                      <div className="border-t border-gray-50 pt-3">
                        <button
                          onClick={() => setExpandedAnalysis((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedAnalysis[q.id] ? "rotate-0" : "-rotate-90"}`} />
                          解题分析
                        </button>
                        {expandedAnalysis[q.id] && q.analysis && (
                          <div className="mt-2 p-3 bg-blue-50/60 rounded-lg border border-blue-100">
                            <p className="text-xs text-gray-700 leading-relaxed">{q.analysis}</p>
                          </div>
                        )}
                      </div>

                      {/* Teacher comment */}
                      <div className="border-t border-gray-50 pt-3">
                        <label className="text-xs text-gray-500 mb-1.5 block">教师评语</label>
                        <Textarea
                          placeholder="添加评语（可选）"
                          value={edit.teacherComment}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEdit(q.id, "teacherComment", e.target.value)}
                          className="min-h-[60px] text-sm border-gray-200"
                        />
                      </div>

                      <div className="border-t border-gray-50 pt-3 flex justify-end">
                        <button
                          onClick={() => toast.success("错题已加入错题库")}
                          className="px-3 py-1.5 text-xs bg-amber-50 border border-amber-200 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
                        >
                          加入错题库
                        </button>
                      </div>
                    </>
                  )}

                  {/* Teacher comment for correct questions */}
                  {q.isCorrect && (
                    <div className="border-t border-gray-50 pt-3">
                      <label className="text-xs text-gray-500 mb-1.5 block">教师评语</label>
                      <Textarea
                        placeholder="添加评语（可选）"
                        value={edit.teacherComment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEdit(q.id, "teacherComment", e.target.value)}
                        className="min-h-[60px] text-sm border-gray-200"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="border-t border-gray-100 px-5 py-4 flex justify-end">
            <button
              onClick={onSave}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              保存审核结果
            </button>
          </div>
        </div>
      </div>
    );
  }
