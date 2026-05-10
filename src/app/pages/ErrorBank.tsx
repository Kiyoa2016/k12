import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ChevronRight,
  Users,
  BookOpen,
  AlertTriangle,
  Filter,
  GraduationCap,
  FileText,
  BrainCircuit,
  X,
} from "lucide-react";

/* ============ Mock Data Types ============ */

interface StudentError {
  name: string;
  errorCount: number;
  recentErrors: string[];
}

interface ClassInfo {
  className: string;
  errorCount: number;
  studentCount: number;
  errorRate: number;
  students: StudentError[];
}

interface ErrorQuestion {
  id: number;
  content: string;
  type: string;
  difficulty: number;
  errorRate: number;
  errorCount: number;
  students: string[];
}

interface KnowledgePoint {
  id: string;
  name: string;
  fullPath: string;
  subject: string;
  totalErrors: number;
  errorRate: number;
  classCount: number;
  difficulty: number;
  classes: ClassInfo[];
  questions: ErrorQuestion[];
}

/* ============ Mock Data ============ */

const mockKnowledgePoints: KnowledgePoint[] = [
  {
    id: "kp1",
    name: "乘法运算",
    fullPath: "数学 → 第一学段(1-2年级) → 数与代数 → 数的运算 → 乘法运算",
    subject: "数学",
    totalErrors: 42,
    errorRate: 48,
    classCount: 3,
    difficulty: 2,
    classes: [
      {
        className: "三年级1班",
        errorCount: 18,
        studentCount: 42,
        errorRate: 43,
        students: [
          { name: "张小明", errorCount: 5, recentErrors: ["8×7=?", "6×9=?", "7×8=?"] },
          { name: "李华", errorCount: 4, recentErrors: ["8×7=?", "9×6=?"] },
          { name: "王芳", errorCount: 3, recentErrors: ["7×8=?"] },
          { name: "刘强", errorCount: 3, recentErrors: ["6×9=?", "8×7=?"] },
          { name: "陈静", errorCount: 3, recentErrors: ["9×6=?"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 15,
        studentCount: 40,
        errorRate: 38,
        students: [
          { name: "赵丽", errorCount: 4, recentErrors: ["8×7=?", "7×8=?"] },
          { name: "孙伟", errorCount: 4, recentErrors: ["6×9=?", "8×7=?"] },
          { name: "周敏", errorCount: 3, recentErrors: ["9×6=?"] },
          { name: "吴浩", errorCount: 2, recentErrors: ["8×7=?"] },
        ],
      },
      {
        className: "三年级3班",
        errorCount: 9,
        studentCount: 38,
        errorRate: 24,
        students: [
          { name: "郑婷", errorCount: 3, recentErrors: ["8×7=?", "7×8=?"] },
          { name: "黄磊", errorCount: 2, recentErrors: ["6×9=?"] },
        ],
      },
    ],
    questions: [
      { id: 1, content: "8 × 7 = ?", type: "计算题", difficulty: 2, errorRate: 45, errorCount: 18, students: ["张小明", "李华", "刘强", "赵丽"] },
      { id: 2, content: "6 × 9 = ?", type: "计算题", difficulty: 2, errorRate: 38, errorCount: 15, students: ["张小明", "刘强", "孙伟", "郑婷"] },
      { id: 3, content: "7 × 8 = ?", type: "计算题", difficulty: 2, errorRate: 30, errorCount: 12, students: ["王芳", "赵丽", "李华"] },
    ],
  },
  {
    id: "kp2",
    name: "除法运算",
    fullPath: "数学 → 第一学段(1-2年级) → 数与代数 → 数的运算 → 除法运算",
    subject: "数学",
    totalErrors: 35,
    errorRate: 42,
    classCount: 3,
    difficulty: 3,
    trend: "up",
    classes: [
      {
        className: "三年级1班",
        errorCount: 16,
        studentCount: 42,
        errorRate: 38,
        students: [
          { name: "张小明", errorCount: 4, recentErrors: ["56÷7=?", "72÷8=?"] },
          { name: "李华", errorCount: 4, recentErrors: ["56÷7=?", "45÷9=?"] },
          { name: "王芳", errorCount: 3, recentErrors: ["72÷8=?"] },
          { name: "刘强", errorCount: 3, recentErrors: ["45÷9=?"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 12,
        studentCount: 40,
        errorRate: 30,
        students: [
          { name: "赵丽", errorCount: 3, recentErrors: ["56÷7=?"] },
          { name: "孙伟", errorCount: 3, recentErrors: ["72÷8=?"] },
          { name: "周敏", errorCount: 2, recentErrors: ["45÷9=?"] },
        ],
      },
      {
        className: "三年级3班",
        errorCount: 7,
        studentCount: 38,
        errorRate: 18,
        students: [
          { name: "黄磊", errorCount: 2, recentErrors: ["56÷7=?"] },
        ],
      },
    ],
    questions: [
      { id: 4, content: "56 ÷ 7 = ?", type: "计算题", difficulty: 3, errorRate: 40, errorCount: 16, students: ["张小明", "李华", "赵丽", "黄磊"] },
      { id: 5, content: "72 ÷ 8 = ?", type: "计算题", difficulty: 3, errorRate: 35, errorCount: 14, students: ["王芳", "刘强", "孙伟"] },
      { id: 6, content: "45 ÷ 9 = ?", type: "计算题", difficulty: 3, errorRate: 28, errorCount: 11, students: ["李华", "刘强", "周敏"] },
    ],
  },
  {
    id: "kp3",
    name: "分数加减",
    fullPath: "数学 → 第二学段(3-4年级) → 数与代数 → 数的运算 → 分数加减",
    subject: "数学",
    totalErrors: 28,
    errorRate: 36,
    classCount: 2,
    difficulty: 4,
    trend: "down",
    classes: [
      {
        className: "三年级1班",
        errorCount: 16,
        studentCount: 42,
        errorRate: 38,
        students: [
          { name: "张小明", errorCount: 5, recentErrors: ["1/3+1/4=?", "2/5+1/5=?"] },
          { name: "李华", errorCount: 4, recentErrors: ["1/3+1/4=?"] },
          { name: "陈静", errorCount: 3, recentErrors: ["3/4-1/2=?"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 12,
        studentCount: 40,
        errorRate: 30,
        students: [
          { name: "孙伟", errorCount: 4, recentErrors: ["1/3+1/4=?"] },
          { name: "吴浩", errorCount: 3, recentErrors: ["2/5+1/5=?"] },
        ],
      },
    ],
    questions: [
      { id: 7, content: "1/3 + 1/4 = ?", type: "计算题", difficulty: 4, errorRate: 42, errorCount: 17, students: ["张小明", "李华", "孙伟"] },
      { id: 8, content: "2/5 + 1/5 = ?", type: "计算题", difficulty: 3, errorRate: 30, errorCount: 12, students: ["张小明", "吴浩"] },
      { id: 9, content: "3/4 - 1/2 = ?", type: "计算题", difficulty: 4, errorRate: 35, errorCount: 14, students: ["陈静"] },
    ],
  },
  {
    id: "kp4",
    name: "周长计算",
    fullPath: "数学 → 第二学段(3-4年级) → 图形与几何 → 测量 → 周长计算",
    subject: "数学",
    totalErrors: 22,
    errorRate: 32,
    classCount: 3,
    difficulty: 3,
    trend: "stable",
    classes: [
      {
        className: "三年级1班",
        errorCount: 10,
        studentCount: 42,
        errorRate: 24,
        students: [
          { name: "王芳", errorCount: 3, recentErrors: ["长方形周长=?"] },
          { name: "刘强", errorCount: 3, recentErrors: ["正方形边长求周长"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 8,
        studentCount: 40,
        errorRate: 20,
        students: [
          { name: "周敏", errorCount: 3, recentErrors: ["长方形周长=?"] },
        ],
      },
      {
        className: "三年级3班",
        errorCount: 4,
        studentCount: 38,
        errorRate: 11,
        students: [
          { name: "郑婷", errorCount: 2, recentErrors: ["正方形边长求周长"] },
        ],
      },
    ],
    questions: [
      { id: 10, content: "长方形长8cm宽5cm，周长=?", type: "应用题", difficulty: 3, errorRate: 32, errorCount: 13, students: ["王芳", "周敏"] },
      { id: 11, content: "正方形边长6cm，周长=?", type: "应用题", difficulty: 2, errorRate: 22, errorCount: 9, students: ["刘强", "郑婷"] },
    ],
  },
  {
    id: "kp5",
    name: "字词辨析",
    fullPath: "语文 → 第一学段(1-2年级) → 识字与写字 → 字词积累 → 字词辨析",
    subject: "语文",
    totalErrors: 18,
    errorRate: 28,
    classCount: 2,
    difficulty: 2,
    trend: "down",
    classes: [
      {
        className: "三年级1班",
        errorCount: 10,
        studentCount: 42,
        errorRate: 24,
        students: [
          { name: "李华", errorCount: 3, recentErrors: ["风和日丽-错别字"] },
          { name: "陈静", errorCount: 3, recentErrors: ["兴高采烈-错别字"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 8,
        studentCount: 40,
        errorRate: 20,
        students: [
          { name: "赵丽", errorCount: 3, recentErrors: ["风和日丽-错别字"] },
        ],
      },
    ],
    questions: [
      { id: 12, content: "找出错别字：风和日丽", type: "判断题", difficulty: 2, errorRate: 28, errorCount: 11, students: ["李华", "赵丽"] },
      { id: 13, content: "找出错别字：兴高采烈", type: "判断题", difficulty: 2, errorRate: 22, errorCount: 9, students: ["陈静"] },
    ],
  },
  {
    id: "kp6",
    name: "阅读理解",
    fullPath: "语文 → 第二学段(3-4年级) → 阅读与鉴赏 → 文本理解 → 阅读理解",
    subject: "语文",
    totalErrors: 15,
    errorRate: 24,
    classCount: 2,
    difficulty: 4,
    trend: "stable",
    classes: [
      {
        className: "三年级1班",
        errorCount: 9,
        studentCount: 42,
        errorRate: 21,
        students: [
          { name: "张小明", errorCount: 3, recentErrors: ["中心思想概括"] },
          { name: "刘强", errorCount: 2, recentErrors: ["段落大意"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 6,
        studentCount: 40,
        errorRate: 15,
        students: [
          { name: "孙伟", errorCount: 2, recentErrors: ["中心思想概括"] },
        ],
      },
    ],
    questions: [
      { id: 14, content: "阅读短文，概括文章中心思想", type: "简答题", difficulty: 4, errorRate: 24, errorCount: 10, students: ["张小明", "孙伟"] },
    ],
  },
  {
    id: "kp7",
    name: "词汇拼写",
    fullPath: "英语 → 第一学段(1-2年级) → 语言知识 → 词汇 → 词汇拼写",
    subject: "英语",
    totalErrors: 12,
    errorRate: 20,
    classCount: 2,
    difficulty: 2,
    trend: "down",
    classes: [
      {
        className: "三年级1班",
        errorCount: 7,
        studentCount: 42,
        errorRate: 17,
        students: [
          { name: "王芳", errorCount: 3, recentErrors: ["banana拼写"] },
          { name: "陈静", errorCount: 2, recentErrors: ["elephant拼写"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 5,
        studentCount: 40,
        errorRate: 13,
        students: [
          { name: "周敏", errorCount: 2, recentErrors: ["banana拼写"] },
        ],
      },
    ],
    questions: [
      { id: 15, content: "请拼写：香蕉 (banana)", type: "填空题", difficulty: 2, errorRate: 20, errorCount: 8, students: ["王芳", "周敏"] },
      { id: 16, content: "请拼写：大象 (elephant)", type: "填空题", difficulty: 3, errorRate: 18, errorCount: 7, students: ["陈静"] },
    ],
  },
  {
    id: "kp8",
    name: "语法时态",
    fullPath: "英语 → 第二学段(3-4年级) → 语言知识 → 语法 → 语法时态",
    subject: "英语",
    totalErrors: 10,
    errorRate: 16,
    classCount: 2,
    difficulty: 4,
    trend: "stable",
    classes: [
      {
        className: "三年级1班",
        errorCount: 6,
        studentCount: 42,
        errorRate: 14,
        students: [
          { name: "李华", errorCount: 3, recentErrors: ["一般现在时"] },
          { name: "刘强", errorCount: 2, recentErrors: ["现在进行时"] },
        ],
      },
      {
        className: "三年级2班",
        errorCount: 4,
        studentCount: 40,
        errorRate: 10,
        students: [
          { name: "孙伟", errorCount: 2, recentErrors: ["一般现在时"] },
        ],
      },
    ],
    questions: [
      { id: 17, content: "She ___ (go) to school every day.", type: "填空题", difficulty: 4, errorRate: 16, errorCount: 6, students: ["李华", "孙伟"] },
    ],
  },
];

const classes = ["三年级1班", "三年级2班", "三年级3班"];

/* ============ Sub-components ============ */

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-gradient-to-r from-orange-400 to-red-400" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ============ Layer 1: Knowledge Point Overview ============ */

function KnowledgeOverview({
  data,
  onSelectKnowledge,
}: {
  data: KnowledgePoint[];
  onSelectKnowledge: (kp: KnowledgePoint) => void;
}) {
  const totalErrors = data.reduce((s, kp) => s + kp.totalErrors, 0);
  const highFreq = data.filter((kp) => kp.errorRate >= 30).length;

  return (
    <div className="px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Summary Stats — flatter */}
        <div className="pt-4 pb-4">
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <BookOpen className="w-5 h-5 text-blue-600 mb-1.5" />
              <div className="text-xl font-bold text-blue-900">{data.length}</div>
              <div className="text-xs text-gray-500">薄弱知识点</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <AlertTriangle className="w-5 h-5 text-orange-600 mb-1.5" />
              <div className="text-xl font-bold text-orange-900">{highFreq}</div>
              <div className="text-xs text-gray-500">高频(≥30%)</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <FileText className="w-5 h-5 text-indigo-600 mb-1.5" />
              <div className="text-xl font-bold text-indigo-900">{totalErrors}</div>
              <div className="text-xs text-gray-500">错题总数</div>
            </div>
          </div>
        </div>

        {/* Knowledge Point Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-800">知识点掌握情况</h2>
            <span className="text-xs text-gray-400">按错误率排序</span>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
            {data.map((kp) => (
              <button
                key={kp.id}
                onClick={() => onSelectKnowledge(kp)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50/50 transition-colors flex items-center gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-[120px] shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium text-white ${
                    kp.subject === "数学" ? "bg-blue-500" :
                    kp.subject === "语文" ? "bg-emerald-500" : "bg-purple-500"
                  }`}>
                    {kp.subject}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{kp.name}</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[120px]">
                      <div
                        className={`h-full rounded-full ${
                          kp.errorRate >= 40 ? "bg-red-400" :
                          kp.errorRate >= 25 ? "bg-orange-400" : "bg-yellow-400"
                        }`}
                        style={{ width: `${kp.errorRate}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold w-8 text-right ${
                      kp.errorRate >= 40 ? "text-red-600" :
                      kp.errorRate >= 25 ? "text-orange-600" : "text-yellow-600"
                    }`}>{kp.errorRate}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                    <span>{kp.classCount}个班</span>
                    <span>{kp.totalErrors}道错题</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Layer 2: Knowledge Point Detail ============ */

function KnowledgeDetail({
  kp,
  onBack,
  onSelectClass,
}: {
  kp: KnowledgePoint;
  onBack: () => void;
  onSelectClass: (cls: ClassInfo) => void;
}) {
  const sortedClasses = [...kp.classes].sort((a, b) => b.errorRate - a.errorRate);

  return (
    <div className="px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Overview Stats — flatter */}
        <div className="pt-4 pb-4">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-xl lg:text-2xl font-bold ${kp.errorRate >= 40 ? "text-red-600" : kp.errorRate >= 25 ? "text-orange-600" : "text-yellow-600"}`}>
                  {kp.errorRate}%
                </div>
                <div className="text-xs text-gray-500">平均错误率</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">{kp.totalErrors}</div>
                <div className="text-xs text-gray-500">总错题数</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">{kp.classCount}</div>
                <div className="text-xs text-gray-500">涉及班级</div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Comparison — table style */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">各班级掌握情况</h2>
          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
            {sortedClasses.map((cls) => (
              <button
                key={cls.className}
                onClick={() => onSelectClass(cls)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50/50 transition-colors flex items-center gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-[120px] shrink-0">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">{cls.className}</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cls.errorRate >= 35 ? "bg-red-400" :
                          cls.errorRate >= 20 ? "bg-orange-400" : "bg-green-400"
                        }`}
                        style={{ width: `${cls.errorRate}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${
                      cls.errorRate >= 35 ? "text-red-600" :
                      cls.errorRate >= 20 ? "text-orange-600" : "text-green-600"
                    }`}>{cls.errorRate}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                    <span>{cls.errorCount}道错题</span>
                    <span>{cls.students.length}人出错</span>
                  </div>
                </div>
                {/* Student Avatars Preview */}
                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex -space-x-1.5">
                    {cls.students.slice(0, 4).map((s) => (
                      <div
                        key={s.name}
                        className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-[10px] font-medium text-blue-700">{s.name[0]}</span>
                      </div>
                    ))}
                    {cls.students.length > 4 && (
                      <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] text-gray-500">+{cls.students.length - 4}</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Related Error Questions */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">关联错题</h2>
          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
            {kp.questions.map((q) => (
              <div key={q.id} className="px-4 py-3 flex items-center gap-4">
                <div className="flex items-center gap-2 min-w-[60px] shrink-0">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] rounded">{q.type}</span>
                  <DifficultyDots level={q.difficulty} />
                </div>
                <div className="flex-1 text-sm text-gray-900">{q.content}</div>
                <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                  <span className={`font-medium ${q.errorRate >= 40 ? "text-red-600" : "text-orange-600"}`}>{q.errorRate}%</span>
                  <span>{q.errorCount}人</span>
                </div>
                <div className="flex -space-x-1 shrink-0">
                  {q.students.slice(0, 3).map((s) => (
                    <span key={s} className="text-[11px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded-full border border-white">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Layer 3: Class Student Detail ============ */

function ClassStudentDetail({
  kpName,
  classInfo,
}: {
  kpName: string;
  classInfo: ClassInfo;
}) {
  const sortedStudents = [...classInfo.students].sort((a, b) => b.errorCount - a.errorCount);

  return (
    <div className="px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Class Stats — flatter */}
        <div className="pt-4 pb-4">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-orange-600">{classInfo.errorRate}%</div>
                <div className="text-xs text-gray-500">错误率</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">{classInfo.errorCount}</div>
                <div className="text-xs text-gray-500">错题数</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900">{classInfo.students.length}/{classInfo.studentCount}</div>
                <div className="text-xs text-gray-500">出错人数</div>
              </div>
            </div>
          </div>
        </div>

        {/* Student List — table style */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">出错学生</h2>
          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
            {sortedStudents.map((student) => (
              <div key={student.name} className="px-4 py-3 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">{student.name[0]}</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900 min-w-[60px]">{student.name}</span>
                  <span className="text-xs text-gray-500">出错{student.errorCount}次</span>
                  <div className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    student.errorCount >= 4 ? "bg-red-50 text-red-600" :
                    student.errorCount >= 3 ? "bg-orange-50 text-orange-600" : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {student.errorCount >= 4 ? "需重点关注" :
                     student.errorCount >= 3 ? "建议加强" : "适当练习"}
                  </div>
                </div>
                {/* Recent errors */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {student.recentErrors.slice(0, 2).map((err, i) => (
                    <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded">{err}</span>
                  ))}
                  {student.recentErrors.length > 2 && (
                    <span className="text-gray-400">+{student.recentErrors.length - 2}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Filter Modal (PC) ============ */

function FilterSheet({
  open,
  onClose,
  classFilter,
  onClassFilterChange,
  knowledgeFilter,
  onKnowledgeFilterChange,
  knowledgeOptions,
}: {
  open: boolean;
  onClose: () => void;
  classFilter: string;
  onClassFilterChange: (v: string) => void;
  knowledgeFilter: string;
  onKnowledgeFilterChange: (v: string) => void;
  knowledgeOptions: string[];
}) {
  const [tempClass, setTempClass] = useState(classFilter);
  const [tempKnowledge, setTempKnowledge] = useState(knowledgeFilter);

  // Sync temp state when sheet opens
  useEffect(() => {
    if (open) {
      setTempClass(classFilter);
      setTempKnowledge(knowledgeFilter);
    }
  }, [open, classFilter, knowledgeFilter]);

  const handleConfirm = () => {
    onClassFilterChange(tempClass);
    onKnowledgeFilterChange(tempKnowledge);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h3 className="text-lg font-semibold text-gray-900">筛选条件</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          {/* Class Filter */}
          <div className="mb-5">
            <label className="text-sm text-gray-500 mb-2.5 block">班级</label>
            <div className="flex gap-2 flex-wrap">
              {["全部班级", ...classes].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setTempClass(cls)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    tempClass === cls
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Knowledge Filter */}
          <div className="mb-6">
            <label className="text-sm text-gray-500 mb-2.5 block">知识点</label>
            <div className="flex gap-2 flex-wrap">
              {knowledgeOptions.map((k) => (
                <button
                  key={k}
                  onClick={() => setTempKnowledge(k)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    tempKnowledge === k
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ Main Component ============ */

export default function ErrorBank() {
  const navigate = useNavigate();
  const [view, setView] = useState<"overview" | "knowledge" | "class">("overview");
  const [selectedKp, setSelectedKp] = useState<KnowledgePoint | null>(null);
  const [selectedClassInfo, setSelectedClassInfo] = useState<ClassInfo | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [classFilter, setClassFilter] = useState("全部班级");
  const [knowledgeFilter, setKnowledgeFilter] = useState("全部知识点");

  const knowledgeOptions = ["全部知识点", ...mockKnowledgePoints.map((kp) => kp.name)];

  // Filter data
  const filteredData = mockKnowledgePoints.filter((kp) => {
    if (knowledgeFilter !== "全部知识点" && kp.name !== knowledgeFilter) return false;
    if (classFilter !== "全部班级" && !kp.classes.some((c) => c.className === classFilter)) return false;
    return true;
  });

  const handleSelectKnowledge = useCallback((kp: KnowledgePoint) => {
    setSelectedKp(kp);
    setView("knowledge");
  }, []);

  const handleSelectClass = useCallback((cls: ClassInfo) => {
    setSelectedClassInfo(cls);
    setView("class");
  }, []);

  const handleBackToOverview = useCallback(() => {
    setView("overview");
  }, []);

  const handleBackToKnowledge = useCallback(() => {
    setView("knowledge");
  }, []);

  const handleGeneratePaper = useCallback(() => {
    navigate("/console/paper-config");
  }, [navigate]);

  const handleGeneratePaperForKp = useCallback(() => {
    navigate(`/console/paper-config?knowledge=${selectedKp?.id}`);
  }, [navigate, selectedKp]);

  // Title for each view's header bar
  const currentTitle = view === "overview"
    ? "错题库"
    : view === "knowledge"
    ? selectedKp?.name ?? ""
    : selectedClassInfo?.className ?? "";

  const currentSubtitle = view === "overview"
    ? ""
    : view === "knowledge"
    ? selectedKp?.fullPath ?? ""
    : `知识点：${selectedKp?.name ?? ""}`;

  const handleBack = view === "knowledge" ? handleBackToOverview : handleBackToKnowledge;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* ===== Unified Header ===== */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-50/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {view === "overview" ? (
                <button
                  onClick={() => navigate("/console")}
                  className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-blue-700" />
                </button>
              ) : (
                <button
                  onClick={handleBack}
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-blue-700" />
                </button>
              )}
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 truncate">{currentTitle}</h1>
                {currentSubtitle && (
                  <p className="text-xs text-gray-500 truncate">{currentSubtitle}</p>
                )}
              </div>
            </div>
            {view === "overview" && (
              <button
                onClick={() => setFilterOpen(true)}
                className="p-2.5 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm shrink-0"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ===== Content Area ===== */}
      <main>
        {view === "overview" && (
          <KnowledgeOverview
            data={filteredData}
            onSelectKnowledge={handleSelectKnowledge}
          />
        )}

        {view === "knowledge" && selectedKp && (
          <KnowledgeDetail
            kp={selectedKp}
            onBack={handleBackToOverview}
            onSelectClass={handleSelectClass}
          />
        )}

        {view === "class" && selectedKp && selectedClassInfo && (
          <ClassStudentDetail
            kpName={selectedKp.name}
            classInfo={selectedClassInfo}
          />
        )}

        <div className="h-4" />
      </main>

      {/* ===== Bottom Action Bar ===== */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex justify-end">
          <button
            onClick={view === "overview" ? handleGeneratePaper : handleGeneratePaperForKp}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <BrainCircuit className="w-4 h-4" />
            {view === "overview"
              ? "智能组卷"
              : view === "knowledge" && selectedKp
              ? `基于"${selectedKp.name}"智能组卷`
              : `针对"${selectedClassInfo?.className}"智能组卷`}
          </button>
        </div>
      </div>

      {/* ===== Filter Bottom Sheet ===== */}
      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        classFilter={classFilter}
        onClassFilterChange={(v) => { setClassFilter(v); setFilterOpen(false); }}
        knowledgeFilter={knowledgeFilter}
        onKnowledgeFilterChange={(v) => { setKnowledgeFilter(v); setFilterOpen(false); }}
        knowledgeOptions={knowledgeOptions}
      />
    </div>
  );
}
