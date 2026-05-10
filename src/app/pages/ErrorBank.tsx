import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Users,
  BookOpen,
  AlertTriangle,
  GraduationCap,
  FileText,
  School,
  BarChart3,
  BrainCircuit,
} from "lucide-react";
import { toast } from "sonner";

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
  correctAnswer: string;
  type: string;
  difficulty: number;
  errorRate: number;
  errorCount: number;
  students: string[];
  analysis: string;
  videoUrl: string;
  coursewareUrl: string;
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
    totalErrors: 56,
    errorRate: 48,
    classCount: 5,
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
      {
        className: "四年级1班",
        errorCount: 8,
        studentCount: 38,
        errorRate: 21,
        students: [
          { name: "杨磊", errorCount: 3, recentErrors: ["8×7=?", "6×9=?"] },
          { name: "林欣", errorCount: 2, recentErrors: ["7×8=?"] },
        ],
      },
      {
        className: "四年级2班",
        errorCount: 6,
        studentCount: 36,
        errorRate: 17,
        students: [
          { name: "何杰", errorCount: 2, recentErrors: ["8×7=?"] },
        ],
      },
    ],
    questions: [
      { id: 1, content: "8 × 7 = ?", correctAnswer: "56", type: "计算题", difficulty: 2, errorRate: 45, errorCount: 18, students: ["张小明", "李华", "刘强", "赵丽"], analysis: "乘法口诀：七八五十六。学生可能记成七八五十四，需要加强7和8的乘法口诀练习。", videoUrl: "https://example.com/video/multiplication-8x7", coursewareUrl: "https://example.com/courseware/multiplication-table" },
      { id: 2, content: "6 × 9 = ?", correctAnswer: "54", type: "计算题", difficulty: 2, errorRate: 38, errorCount: 15, students: ["张小明", "刘强", "孙伟", "郑婷"], analysis: "乘法口诀：六九五十四。常见错误是记成六九五十六，需重点区分。", videoUrl: "", coursewareUrl: "" },
      { id: 3, content: "7 × 8 = ?", correctAnswer: "56", type: "计算题", difficulty: 2, errorRate: 30, errorCount: 12, students: ["王芳", "赵丽", "李华"], analysis: "乘法口诀：七八五十六。与6×9=54易混淆，建议对比记忆。", videoUrl: "", coursewareUrl: "" },
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
      { id: 4, content: "56 ÷ 7 = ?", correctAnswer: "8", type: "计算题", difficulty: 3, errorRate: 40, errorCount: 16, students: ["张小明", "李华", "赵丽", "黄磊"], analysis: "除法是乘法的逆运算。56÷7=8，可联想乘法口诀：七八五十六。", videoUrl: "", coursewareUrl: "" },
      { id: 5, content: "72 ÷ 8 = ?", correctAnswer: "9", type: "计算题", difficulty: 3, errorRate: 35, errorCount: 14, students: ["王芳", "刘强", "孙伟"], analysis: "72÷8=9，乘法口诀：八九七十二。学生可能误算为8，需强调商和除数的区别。", videoUrl: "", coursewareUrl: "" },
      { id: 6, content: "45 ÷ 9 = ?", correctAnswer: "5", type: "计算题", difficulty: 3, errorRate: 28, errorCount: 11, students: ["李华", "刘强", "周敏"], analysis: "45÷9=5，乘法口诀：五九四十五。重点练习除法的逆运算思维。", videoUrl: "", coursewareUrl: "" },
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
      { id: 7, content: "1/3 + 1/4 = ?", correctAnswer: "7/12", type: "计算题", difficulty: 4, errorRate: 42, errorCount: 17, students: ["张小明", "李华", "孙伟"], analysis: "异分母分数相加，需要先通分。1/3=4/12，1/4=3/12，4/12+3/12=7/12。学生常见错误是直接分子加分子、分母加分母。", videoUrl: "", coursewareUrl: "" },
      { id: 8, content: "2/5 + 1/5 = ?", correctAnswer: "3/5", type: "计算题", difficulty: 3, errorRate: 30, errorCount: 12, students: ["张小明", "吴浩"], analysis: "同分母分数相加，分母不变，分子相加：2/5+1/5=3/5。", videoUrl: "", coursewareUrl: "" },
      { id: 9, content: "3/4 - 1/2 = ?", correctAnswer: "1/4", type: "计算题", difficulty: 4, errorRate: 35, errorCount: 14, students: ["陈静"], analysis: "异分母分数相减，需要先通分。1/2=2/4，3/4-2/4=1/4。", videoUrl: "", coursewareUrl: "" },
    ],
  },
  {
    id: "kp4",
    name: "周长计算",
    fullPath: "数学 → 第二学段(3-4年级) → 图形与几何 → 测量 → 周长计算",
    subject: "数学",
    totalErrors: 27,
    errorRate: 32,
    classCount: 4,
    difficulty: 3,
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
      {
        className: "四年级1班",
        errorCount: 5,
        studentCount: 38,
        errorRate: 13,
        students: [
          { name: "杨磊", errorCount: 2, recentErrors: ["长方形周长=?"] },
        ],
      },
    ],
    questions: [
      { id: 10, content: "长方形长8cm宽5cm，周长=?", correctAnswer: "26cm", type: "应用题", difficulty: 3, errorRate: 32, errorCount: 13, students: ["王芳", "周敏"], analysis: "长方形周长=(长+宽)×2，(8+5)×2=26cm。学生常见错误是只算了长+宽，忘记乘以2。", videoUrl: "", coursewareUrl: "" },
      { id: 11, content: "正方形边长6cm，周长=?", correctAnswer: "24cm", type: "应用题", difficulty: 2, errorRate: 22, errorCount: 9, students: ["刘强", "郑婷"], analysis: "正方形周长=边长×4，6×4=24cm。", videoUrl: "", coursewareUrl: "" },
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
      { id: 12, content: "找出错别字：风和日丽", correctAnswer: "无错别字", type: "判断题", difficulty: 2, errorRate: 28, errorCount: 11, students: ["李华", "赵丽"], analysis: "风和日丽：形容天气晴朗温和。该词无错别字，注意「和」不要写成「合」。", videoUrl: "", coursewareUrl: "https://example.com/courseware/characters" },
      { id: 13, content: "找出错别字：兴高采烈", correctAnswer: "无错别字", type: "判断题", difficulty: 2, errorRate: 22, errorCount: 9, students: ["陈静"], analysis: "兴高采烈：形容兴致高昂，情绪热烈。该词无错别字，注意「采」不要写成「彩」。", videoUrl: "", coursewareUrl: "" },
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
      { id: 14, content: "阅读短文，概括文章中心思想", correctAnswer: "略", type: "简答题", difficulty: 4, errorRate: 24, errorCount: 10, students: ["张小明", "孙伟"], analysis: "概括中心思想的思路：先通读全文了解大意，再找关键句（开头、结尾、反复出现的句子），最后用「本文通过…表达了…」的句式组织语言。", videoUrl: "", coursewareUrl: "" },
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
      { id: 15, content: "请拼写：香蕉 (banana)", correctAnswer: "banana", type: "填空题", difficulty: 2, errorRate: 20, errorCount: 8, students: ["王芳", "周敏"], analysis: "banana 的拼写注意中间音节 ba-na-na，双写 n 是常见易错点。", videoUrl: "", coursewareUrl: "" },
      { id: 16, content: "请拼写：大象 (elephant)", correctAnswer: "elephant", type: "填空题", difficulty: 3, errorRate: 18, errorCount: 7, students: ["陈静"], analysis: "elephant 有三个音节：el-e-phant。注意第一个 e 不是 a，ph 发 /f/ 音。", videoUrl: "", coursewareUrl: "" },
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
      { id: 17, content: "She ___ (go) to school every day.", correctAnswer: "goes", type: "填空题", difficulty: 4, errorRate: 16, errorCount: 6, students: ["李华", "孙伟"], analysis: "一般现在时，主语是第三人称单数 She，动词 go 要加 -es 变为 goes。注意：以 o 结尾的动词加 -es 而不是 -s。", videoUrl: "", coursewareUrl: "" },
    ],
  },
];

const allClassNames = ["三年级1班", "三年级2班", "三年级3班", "四年级1班", "四年级2班"];

/* ============ Derived Data Helpers ============ */

interface ClassSummary {
  className: string;
  grade: string;
  overallErrorRate: number;
  weakKnowledgeCount: number;
  totalErrors: number;
  studentCount: number;
}

interface ClassKnowledgePoint {
  kpId: string;
  kpName: string;
  subject: string;
  fullPath: string;
  errorRate: number;
  errorCount: number;
  studentCount: number;
}

function getGrade(className: string): string {
  const match = className.match(/^(.+?)\d/);
  return match ? match[1] : className;
}

function getClassSummary(className: string): ClassSummary {
  let totalErrors = 0;
  let totalStudents = 0;
  let errorRateSum = 0;
  let kpCount = 0;
  let weakCount = 0;

  for (const kp of mockKnowledgePoints) {
    const cls = kp.classes.find((c) => c.className === className);
    if (cls) {
      totalErrors += cls.errorCount;
      totalStudents += cls.studentCount;
      errorRateSum += cls.errorRate;
      kpCount++;
      if (cls.errorRate >= 25) weakCount++;
    }
  }

  return {
    className,
    grade: getGrade(className),
    overallErrorRate: kpCount > 0 ? Math.round(errorRateSum / kpCount) : 0,
    weakKnowledgeCount: weakCount,
    totalErrors,
    studentCount: totalStudents,
  };
}

function getClassKnowledgePoints(className: string): ClassKnowledgePoint[] {
  const result: ClassKnowledgePoint[] = [];
  for (const kp of mockKnowledgePoints) {
    const cls = kp.classes.find((c) => c.className === className);
    if (cls) {
      result.push({
        kpId: kp.id,
        kpName: kp.name,
        subject: kp.subject,
        fullPath: kp.fullPath,
        errorRate: cls.errorRate,
        errorCount: cls.errorCount,
        studentCount: cls.students.length,
      });
    }
  }
  return result.sort((a, b) => b.errorRate - a.errorRate);
}

function getStudentsForClassAndKp(className: string, kp: KnowledgePoint): ClassInfo | undefined {
  return kp.classes.find((c) => c.className === className);
}

/* ============ Sub-components ============ */

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < level ? "bg-gradient-to-r from-orange-400 to-red-400" : "bg-gray-200"}`} />
      ))}
    </div>
  );
}

function ErrorRateBadge({ rate, size = "sm" }: { rate: number; size?: "sm" | "lg" }) {
  const colors = rate >= 35 ? "bg-red-50 text-red-600" : rate >= 20 ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600";
  const cls = size === "lg" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs";
  return <span className={`${cls} rounded-lg font-medium ${colors}`}>{rate}%</span>;
}

function SeverityBadge({ errorCount }: { errorCount: number }) {
  const config = errorCount >= 4
    ? { text: "需重点关注", cls: "bg-red-50 text-red-600" }
    : errorCount >= 3
    ? { text: "建议加强", cls: "bg-orange-50 text-orange-600" }
    : { text: "适当练习", cls: "bg-yellow-50 text-yellow-700" };
  return <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${config.cls}`}>{config.text}</span>;
}

function SubjectBadge({ subject }: { subject: string }) {
  const colorMap: Record<string, string> = {
    数学: "bg-blue-500",
    语文: "bg-emerald-500",
    英语: "bg-purple-500",
  };
  return <span className={`px-2 py-0.5 rounded text-[11px] font-medium text-white ${colorMap[subject] || "bg-gray-500"}`}>{subject}</span>;
}

/* ============ 共用第三层：学生错题明细 ============ */

function StudentErrorDetail({
  kpName,
  classInfo,
  onBack,
}: {
  kpName: string;
  classInfo: ClassInfo;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const sortedStudents = [...classInfo.students].sort((a, b) => b.errorCount - a.errorCount);

  return (
    <div className="px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
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

        {/* Student list */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">出错学生</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {sortedStudents.map((student) => (
              <div key={student.name} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">{student.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-500">出错{student.errorCount}次</div>
                  </div>
                  <SeverityBadge errorCount={student.errorCount} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {student.recentErrors.map((err, i) => (
                    <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded">{err}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom action */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            onClick={() => navigate("/console/paper-config")}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <BrainCircuit className="w-4 h-4" />
            AI个性化智能组卷
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ Main Component ============ */

export default function ErrorBank() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"class" | "knowledge" | "all">("class");

  // Class tab views
  const [classView, setClassView] = useState<"list" | "knowledge" | "student">("list");
  const [selectedClassName, setSelectedClassName] = useState("");
  const [selectedKpForClass, setSelectedKpForClass] = useState<KnowledgePoint | null>(null);

  // Knowledge tab views
  const [kpView, setKpView] = useState<"list" | "class" | "student">("list");
  const [selectedKp, setSelectedKp] = useState<KnowledgePoint | null>(null);
  const [selectedClassForKp, setSelectedClassForKp] = useState<ClassInfo | null>(null);

  // Compute class summaries
  const classSummaries = allClassNames.map(getClassSummary);
  const grades = [...new Set(classSummaries.map((c) => c.grade))];

  // Current class info for shared student detail
  const currentStudentClassInfo =
    activeTab === "class"
      ? (selectedKpForClass && selectedClassName ? getStudentsForClassAndKp(selectedClassName, selectedKpForClass) : null)
      : selectedClassForKp;

  const currentKpName =
    activeTab === "class"
      ? selectedKpForClass?.name ?? ""
      : selectedKp?.name ?? "";

  const handleSelectClass = (className: string) => {
    setSelectedClassName(className);
    setClassView("knowledge");
  };

  const handleSelectKpForClass = (kp: KnowledgePoint) => {
    setSelectedKpForClass(kp);
    setClassView("student");
  };

  const handleSelectKp = (kp: KnowledgePoint) => {
    setSelectedKp(kp);
    setKpView("class");
  };

  const handleSelectClassForKp = (cls: ClassInfo) => {
    setSelectedClassForKp(cls);
    setKpView("student");
  };

  // Title
  const getTitle = () => {
    if (activeTab === "class") {
      if (classView === "list") return "错题库";
      if (classView === "knowledge") return selectedClassName;
      return `${selectedClassName} · ${selectedKpForClass?.name}`;
    } else if (activeTab === "knowledge") {
      if (kpView === "list") return "错题库";
      if (kpView === "class") return selectedKp?.name ?? "";
      return `${selectedClassForKp?.className} · ${selectedKp?.name}`;
    } else {
      return "错题库";
    }
  };

  const getSubtitle = () => {
    if (activeTab === "class") {
      if (classView === "knowledge") return "各知识点掌握情况";
      if (classView === "student") return selectedKpForClass?.fullPath ?? "";
    } else if (activeTab === "knowledge") {
      if (kpView === "class") return selectedKp?.fullPath ?? "";
      if (kpView === "student") return "出错学生明细";
    } else {
      return "";
    }
    return "";
  };

  const handleBack = () => {
    if (activeTab === "class") {
      if (classView === "student") setClassView("knowledge");
      else if (classView === "knowledge") setClassView("list");
    } else {
      if (kpView === "student") setKpView("class");
      else if (kpView === "class") setKpView("list");
    }
  };

  const showBack = (activeTab === "class" && classView !== "list") || (activeTab === "knowledge" && kpView !== "list");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-blue-50/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <button
                onClick={showBack ? handleBack : () => navigate("/console")}
                className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-blue-700" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 truncate">{getTitle()}</h1>
                {getSubtitle() && <p className="text-xs text-gray-500 truncate">{getSubtitle()}</p>}
              </div>
            </div>
          </div>

          {/* Tab Bar — show only at top level */}
          {(classView === "list" && kpView === "list") && (
            <div className="flex gap-1 -mb-px">
              <button
                onClick={() => { setActiveTab("class"); setClassView("list"); setKpView("list"); }}
                className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                  activeTab === "class"
                    ? "bg-white text-blue-600 border border-b-white border-blue-100"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <School className="w-4 h-4 inline-block mr-1.5" />
                班级看板
              </button>
              <button
                onClick={() => { setActiveTab("knowledge"); setClassView("list"); setKpView("list"); }}
                className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                  activeTab === "knowledge"
                    ? "bg-white text-blue-600 border border-b-white border-blue-100"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-1.5" />
                知识点看板
              </button>
              <button
                onClick={() => { setActiveTab("all"); setClassView("list"); setKpView("list"); }}
                className={`px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                  activeTab === "all"
                    ? "bg-white text-blue-600 border border-b-white border-blue-100"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText className="w-4 h-4 inline-block mr-1.5" />
                全部错题
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main>
        {activeTab === "class" && classView === "list" && (
          <ClassListView
            grades={grades}
            classSummaries={classSummaries}
            onSelectClass={handleSelectClass}
          />
        )}

        {activeTab === "class" && classView === "knowledge" && selectedClassName && (
          <ClassKnowledgeView
            className={selectedClassName}
            onSelectKp={handleSelectKpForClass}
          />
        )}

        {activeTab === "class" && classView === "student" && currentStudentClassInfo && (
          <StudentErrorDetail
            kpName={currentKpName}
            classInfo={currentStudentClassInfo}
            onBack={handleBack}
          />
        )}

        {activeTab === "knowledge" && kpView === "list" && (
          <KnowledgeListView
            knowledgePoints={mockKnowledgePoints}
            onSelectKp={handleSelectKp}
          />
        )}

        {activeTab === "knowledge" && kpView === "class" && selectedKp && (
          <KnowledgeClassView
            kp={selectedKp}
            onSelectClass={handleSelectClassForKp}
          />
        )}

        {activeTab === "knowledge" && kpView === "student" && currentStudentClassInfo && (
          <StudentErrorDetail
            kpName={currentKpName}
            classInfo={currentStudentClassInfo}
            onBack={handleBack}
          />
        )}

        {activeTab === "all" && (
          <AllQuestionsView
            knowledgePoints={mockKnowledgePoints}
          />
        )}

        <div className="h-4" />
      </main>
    </div>
  );
}

/* ============ 班级看板 — 第一层：班级列表 ============ */

function ClassListView({
  grades,
  classSummaries,
  onSelectClass,
}: {
  grades: string[];
  classSummaries: ClassSummary[];
  onSelectClass: (name: string) => void;
}) {
  return (
    <div className="px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-6 space-y-6">
        {grades.map((grade) => {
          const gradeClasses = classSummaries.filter((c) => c.grade === grade);
          return (
            <div key={grade}>
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <School className="w-4 h-4 text-blue-600" />
                {grade}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {gradeClasses.map((cls) => (
                  <button
                    key={cls.className}
                    onClick={() => onSelectClass(cls.className)}
                    className="w-full text-left bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">{cls.className}</span>
                      </div>
                      <ErrorRateBadge rate={cls.overallErrorRate} />
                    </div>
                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            cls.overallErrorRate >= 35 ? "bg-red-400" :
                            cls.overallErrorRate >= 20 ? "bg-orange-400" : "bg-green-400"
                          }`}
                          style={{ width: `${cls.overallErrorRate}%` }}
                        />
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>薄弱点 <strong className="text-gray-700">{cls.weakKnowledgeCount}</strong> 个</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <FileText className="w-3.5 h-3.5" />
                        <span>错题 <strong className="text-gray-700">{cls.totalErrors}</strong> 道</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ 班级看板 — 第二层：班级知识点掌握情况 ============ */

function ClassKnowledgeView({
  className,
  onSelectKp,
}: {
  className: string;
  onSelectKp: (kp: KnowledgePoint) => void;
}) {
  const navigate = useNavigate();
  const knowledgePoints = getClassKnowledgePoints(className);
  const summary = getClassSummary(className);

  // Find full KnowledgePoint for each entry
  const getFullKp = (kpId: string) => mockKnowledgePoints.find((kp) => kp.id === kpId)!;

  return (
    <div className="px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-6">
        {/* Class summary card */}
        <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">{summary.overallErrorRate}%</div>
              <div className="text-xs text-gray-500">整体错误率</div>
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold text-orange-600">{summary.weakKnowledgeCount}</div>
              <div className="text-xs text-gray-500">薄弱知识点</div>
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">{summary.totalErrors}</div>
              <div className="text-xs text-gray-500">总错题数</div>
            </div>
          </div>
        </div>

        {/* Knowledge points */}
        <h2 className="text-base font-semibold text-gray-800 mb-3">各知识点掌握情况</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {knowledgePoints.map((kp) => {
            const fullKp = getFullKp(kp.kpId);
            return (
              <button
                key={kp.kpId}
                onClick={() => onSelectKp(fullKp)}
                className="w-full text-left bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SubjectBadge subject={kp.subject} />
                    <span className="text-sm font-semibold text-gray-900">{kp.kpName}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <ErrorRateBadge rate={kp.errorRate} />
                  <span className="text-xs text-gray-500">{kp.studentCount}人出错</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      kp.errorRate >= 35 ? "bg-red-400" :
                      kp.errorRate >= 20 ? "bg-orange-400" : "bg-green-400"
                    }`}
                    style={{ width: `${kp.errorRate}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom action */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => navigate("/console/paper-config")}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <BrainCircuit className="w-4 h-4" />
            AI智能组卷
          </button>
        </div>
      </div>
    </div>
  );
}

function getKpGrade(fullPath: string): string {
  const match = fullPath.match(/[第一二三四五六七八九十]+学段\(\d+-\d+年级\)/);
  return match ? match[0] : "其他";
}

/* ============ 知识点看板 — 第一层：知识点列表 ============ */

function KnowledgeListView({
  knowledgePoints,
  onSelectKp,
}: {
  knowledgePoints: KnowledgePoint[];
  onSelectKp: (kp: KnowledgePoint) => void;
}) {
  const sorted = [...knowledgePoints].sort((a, b) => b.errorRate - a.errorRate);
  const grades = [...new Set(sorted.map((kp) => getKpGrade(kp.fullPath)))];

  return (
    <div className="px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-6 space-y-6">
        {grades.map((grade) => {
          const gradeKps = sorted.filter((kp) => getKpGrade(kp.fullPath) === grade);
          return (
            <div key={grade}>
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                {grade}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {gradeKps.map((kp) => (
                  <button
                    key={kp.id}
                    onClick={() => onSelectKp(kp)}
                    className="w-full text-left bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <SubjectBadge subject={kp.subject} />
                        <span className="text-sm font-semibold text-gray-900">{kp.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-0.5" />
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <ErrorRateBadge rate={kp.errorRate} />
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-3.5 h-3.5" />
                        <span className="text-xs">{kp.classCount}个班</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="text-xs">{kp.totalErrors}道错题</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          kp.errorRate >= 35 ? "bg-red-400" :
                          kp.errorRate >= 25 ? "bg-orange-400" : "bg-yellow-400"
                        }`}
                        style={{ width: `${kp.errorRate}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ 知识点看板 — 第二层：涉及班级 ============ */

function KnowledgeClassView({
  kp,
  onSelectClass,
}: {
  kp: KnowledgePoint;
  onSelectClass: (cls: ClassInfo) => void;
}) {
  const sortedClasses = [...kp.classes].sort((a, b) => b.errorRate - a.errorRate);

  return (
    <div className="px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-6">
        <h2 className="text-base font-semibold text-gray-800 mb-3">各班级掌握情况</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {sortedClasses.map((cls) => (
            <button
              key={cls.className}
              onClick={() => onSelectClass(cls)}
              className="w-full text-left bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">{cls.className}</span>
                </div>
                <ErrorRateBadge rate={cls.errorRate} />
              </div>
              <div className="mb-3">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cls.errorRate >= 35 ? "bg-red-400" :
                      cls.errorRate >= 20 ? "bg-orange-400" : "bg-green-400"
                    }`}
                    style={{ width: `${cls.errorRate}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{cls.errorCount}道错题</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>{cls.students.length}人出错</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {cls.students.slice(0, 4).map((s) => (
                    <div key={s.name} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] font-medium text-blue-700">{s.name[0]}</span>
                    </div>
                  ))}
                  {cls.students.length > 4 && (
                    <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] text-gray-500">+{cls.students.length - 4}</span>
                    </div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ 全部错题 ============ */

interface QuestionWithKp {
  kpName: string;
  subject: string;
  kpGrade: string;
  question: ErrorQuestion;
}

function AllQuestionsView({
  knowledgePoints,
}: {
  knowledgePoints: KnowledgePoint[];
}) {
  const [gradeFilter, setGradeFilter] = useState("all");
  const [kpFilter, setKpFilter] = useState("all");
  const [gradeOpen, setGradeOpen] = useState(false);
  const [kpOpen, setKpOpen] = useState(false);
  const [expandedAnalysis, setExpandedAnalysis] = useState<Record<number, boolean>>({});
  const [analysisEdits, setAnalysisEdits] = useState<Record<number, string>>({});
  const [expandedVideo, setExpandedVideo] = useState<Record<number, boolean>>({});
  const [expandedCourseware, setExpandedCourseware] = useState<Record<number, boolean>>({});
  const [videoEdits, setVideoEdits] = useState<Record<number, string>>({});
  const [coursewareEdits, setCoursewareEdits] = useState<Record<number, string>>({});

  // Flatten all questions
  const allQuestions: QuestionWithKp[] = [];
  for (const kp of knowledgePoints) {
    const kpGrade = getKpGrade(kp.fullPath);
    for (const q of kp.questions) {
      allQuestions.push({ kpName: kp.name, subject: kp.subject, kpGrade, question: q });
    }
  }

  // Available grades from fullPath
  const allGrades = [...new Set(knowledgePoints.map((kp) => getKpGrade(kp.fullPath)))];

  // Available KPs based on grade filter (linked/联动)
  const availableKps = gradeFilter === "all"
    ? [...new Set(knowledgePoints.map((kp) => kp.name))]
    : [...new Set(knowledgePoints.filter((kp) => getKpGrade(kp.fullPath) === gradeFilter).map((kp) => kp.name))];

  // Filter questions
  let filtered = allQuestions;
  if (gradeFilter !== "all") filtered = filtered.filter((item) => item.kpGrade === gradeFilter);
  if (kpFilter !== "all") filtered = filtered.filter((item) => item.kpName === kpFilter);
  filtered.sort((a, b) => b.question.errorCount - a.question.errorCount);

  // Reset KP filter when grade changes
  const handleGradeSelect = (grade: string) => {
    setGradeFilter(grade);
    setKpFilter("all");
    setGradeOpen(false);
  };

  return (
    <div className="px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-6">
        {/* Header with filters */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">全部错题</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-1">{filtered.length}道错题</span>

            {/* Grade dropdown */}
            <div className="relative">
              <button
                onClick={() => setGradeOpen(!gradeOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
              >
                {gradeFilter === "all" ? "年级" : gradeFilter}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${gradeOpen ? "rotate-180" : ""}`} />
              </button>
              {gradeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setGradeOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[180px] whitespace-nowrap flex flex-col">
                    <button
                      onClick={() => handleGradeSelect("all")}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors ${
                        gradeFilter === "all" ? "text-blue-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      全部
                    </button>
                    {allGrades.map((g) => (
                      <button
                        key={g}
                        onClick={() => handleGradeSelect(g)}
                        className={`w-full text-left px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors ${
                          gradeFilter === g ? "text-blue-600 font-medium" : "text-gray-700"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* KP dropdown */}
            <div className="relative">
              <button
                onClick={() => setKpOpen(!kpOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-colors"
              >
                {kpFilter === "all" ? "知识点" : kpFilter}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${kpOpen ? "rotate-180" : ""}`} />
              </button>
              {kpOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setKpOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[160px] whitespace-nowrap flex flex-col">
                    <button
                      onClick={() => { setKpFilter("all"); setKpOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors ${
                        kpFilter === "all" ? "text-blue-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      全部
                    </button>
                    {availableKps.map((name) => (
                      <button
                        key={name}
                        onClick={() => { setKpFilter(name); setKpOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors ${
                          kpFilter === name ? "text-blue-600 font-medium" : "text-gray-700"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.question.id} className="bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <SubjectBadge subject={item.subject} />
                  <span className="text-xs text-gray-500">{item.kpName}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                  <Users className="w-3.5 h-3.5" />
                  <span>{item.question.students.length}人出错</span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-2">{item.question.content}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-400">正确答案：</span>
                <span className="text-sm font-semibold text-green-600">{item.question.correctAnswer}</span>
              </div>

              {/* Collapsible analysis */}
              <div className="border-t border-gray-50 pt-2">
                <button
                  onClick={() => setExpandedAnalysis((prev) => ({ ...prev, [item.question.id]: !prev[item.question.id] }))}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedAnalysis[item.question.id] ? "rotate-90" : ""}`} />
                  解题分析
                </button>
                {expandedAnalysis[item.question.id] && (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={analysisEdits[item.question.id] ?? item.question.analysis}
                      onChange={(e) => setAnalysisEdits((prev) => ({ ...prev, [item.question.id]: e.target.value }))}
                      className="w-full text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-2.5 resize-none focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => toast.success("解题分析已保存")}
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        保存修改
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible video */}
              <div className="border-t border-gray-50 pt-2 mt-2">
                <button
                  onClick={() => setExpandedVideo((prev) => ({ ...prev, [item.question.id]: !prev[item.question.id] }))}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedVideo[item.question.id] ? "rotate-90" : ""}`} />
                  视频讲解
                </button>
                {expandedVideo[item.question.id] && (
                  <div className="mt-2 space-y-2">
                    {item.question.videoUrl ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">当前链接：</span>
                        <a href={item.question.videoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{item.question.videoUrl}</a>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">暂无视频讲解</p>
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={videoEdits[item.question.id] ?? item.question.videoUrl ?? ""}
                        onChange={(e) => setVideoEdits((prev) => ({ ...prev, [item.question.id]: e.target.value }))}
                        placeholder="输入视频链接..."
                        className="flex-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                      />
                      <button
                        onClick={() => toast.success("视频链接已保存")}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible courseware */}
              <div className="border-t border-gray-50 pt-2 mt-2">
                <button
                  onClick={() => setExpandedCourseware((prev) => ({ ...prev, [item.question.id]: !prev[item.question.id] }))}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedCourseware[item.question.id] ? "rotate-90" : ""}`} />
                  关联课件
                </button>
                {expandedCourseware[item.question.id] && (
                  <div className="mt-2 space-y-2">
                    {item.question.coursewareUrl ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">当前链接：</span>
                        <a href={item.question.coursewareUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{item.question.coursewareUrl}</a>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">暂无关联课件</p>
                    )}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={coursewareEdits[item.question.id] ?? item.question.coursewareUrl ?? ""}
                        onChange={(e) => setCoursewareEdits((prev) => ({ ...prev, [item.question.id]: e.target.value }))}
                        placeholder="输入课件链接..."
                        className="flex-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                      />
                      <button
                        onClick={() => toast.success("课件链接已保存")}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
