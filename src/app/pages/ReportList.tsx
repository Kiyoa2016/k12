import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Filter, Calendar, FileText, Share2, Trash2, Eye, Plus, Clock, CheckCircle, XCircle, Loader } from "lucide-react";

export default function ReportList() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [reportType, setReportType] = useState("全部");
  const [timeRange, setTimeRange] = useState("近30天");

  const classes = ["", "三年级1班", "三年级2班", "四年级1班"];
  const reportTypes = ["全部", "时间维度", "知识点维度"];
  const timeRanges = ["近7天", "近30天", "本学期", "自定义"];

  const reports = [
    {
      id: 1,
      title: "2026年春季上半学期学情分析报告",
      type: "时间维度",
      createTime: "2026-04-23 14:30",
      creator: "张老师",
      status: "completed",
      class: "三年级1班",
    },
    {
      id: 2,
      title: "乘法运算知识点掌握情况分析",
      type: "知识点维度",
      createTime: "2026-04-22 10:15",
      creator: "张老师",
      status: "generating",
      progress: 65,
      class: "三年级2班",
    },
    {
      id: 3,
      title: "本月数学学科综合分析",
      type: "时间维度",
      createTime: "2026-04-20 16:45",
      creator: "张老师",
      status: "completed",
      class: "三年级1班",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { text: "已生成", color: "bg-blue-100 text-blue-700", icon: CheckCircle };
      case "generating":
        return { text: "生成中", color: "bg-orange-100 text-orange-700", icon: Loader };
      case "failed":
        return { text: "生成失败", color: "bg-red-100 text-red-700", icon: XCircle };
      default:
        return { text: "未知", color: "bg-gray-100 text-gray-700", icon: Clock };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/console">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <ArrowLeft className="w-5 h-5 text-blue-700" />
              </div>
            </Link>
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">学情报告</h1>
          </div>
          <button className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-blue-700" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 mb-4 border border-blue-50/50">
          <div className="space-y-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择班级</option>
              {classes.slice(1).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-2 text-xs bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-xs bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {reports.map((report) => {
            const statusConfig = getStatusConfig(report.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={report.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-blue-100/50 border border-blue-50/50"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm text-gray-900 flex-1 pr-2">{report.title}</h3>
                  <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg shadow-sm flex-shrink-0">
                    {report.type}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {report.createTime}
                  </div>
                  <div className="text-xs text-gray-600">生成人: {report.creator}</div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-blue-50">
                  <div className="flex items-center gap-2">
                    <div className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 ${statusConfig.color}`}>
                      <StatusIcon className={`w-3.5 h-3.5 ${report.status === 'generating' ? 'animate-spin' : ''}`} />
                      {statusConfig.text}
                    </div>
                    {report.status === "generating" && report.progress && (
                      <span className="text-xs text-gray-600">{report.progress}%</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/console/report-detail/${report.id}`)}
                      disabled={report.status !== "completed"}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 disabled:from-gray-300 disabled:to-gray-300 text-white text-xs rounded-lg shadow-sm active:scale-95 transition-transform disabled:cursor-not-allowed"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs rounded-lg active:bg-blue-50">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-red-200 text-red-600 text-xs rounded-lg active:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar for generating status */}
                {report.status === "generating" && report.progress && (
                  <div className="mt-3">
                    <div className="w-full bg-blue-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300"
                        style={{ width: `${report.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 z-20">
        <button
          onClick={() => navigate("/console/analysis-config")}
          className="group w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-300/50 active:scale-95 transition-all"
        >
          <Plus className="w-7 h-7 text-white" />
        </button>
        <div className="text-center mt-1">
          <span className="text-xs text-blue-700">新建分析</span>
        </div>
      </div>
    </div>
  );
}
