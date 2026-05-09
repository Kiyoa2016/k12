import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Play,
  Pause,
  Maximize,
  Camera,
  History,
  Mic,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function MonitorPlayer() {
  const { classId } = useParams();
  const [isPlaying, setIsPlaying] = useState(true);
  const [quality, setQuality] = useState("高清");
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickPhrases, setShowQuickPhrases] = useState(false);

  const className = "三年级1班";

  const quickPhrases = [
    "请同学们保持安静",
    "注意听讲",
    "准备下课了",
    "请值日生打扫卫生",
  ];

  const handleMicPress = () => {
    setIsRecording(true);
  };

  const handleMicRelease = () => {
    setIsRecording(false);
    alert("喊话已发送");
  };

  const handleQuickPhrase = (phrase: string) => {
    alert(`已发送: ${phrase}`);
    setShowQuickPhrases(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/monitor-list">
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-base text-white">{className}</h1>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-blue-500 rounded-full">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-[10px] text-white">直播中</span>
          </div>
        </div>
      </header>

      {/* Video Player */}
      <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
        {/* Mock Video Feed */}
        <div className="text-gray-500 text-center">
          <Video className="w-12 h-12 mx-auto mb-1.5 opacity-50" />
          <p className="text-sm">监控画面</p>
        </div>

        {/* Quality Badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur rounded-full text-white text-xs">
          {quality}
        </div>

        {/* Pan-Tilt-Zoom Controls (Optional) */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur rounded-lg p-1.5">
          <div className="grid grid-cols-3 gap-0.5">
            <div></div>
            <button className="p-1.5 active:bg-white/20 rounded">
              <ChevronUp className="w-4 h-4 text-white" />
            </button>
            <div></div>
            <button className="p-1.5 active:bg-white/20 rounded">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div className="p-1.5"></div>
            <button className="p-1.5 active:bg-white/20 rounded">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
            <div></div>
            <button className="p-1.5 active:bg-white/20 rounded">
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
            <div></div>
          </div>
          <div className="flex gap-0.5 mt-1">
            <button className="p-1.5 active:bg-white/20 rounded flex-1">
              <ZoomIn className="w-4 h-4 text-white" />
            </button>
            <button className="p-1.5 active:bg-white/20 rounded flex-1">
              <ZoomOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Phrases Panel */}
      {showQuickPhrases && (
        <div className="bg-black/80 backdrop-blur px-3 py-2">
          <div className="grid grid-cols-2 gap-1.5">
            {quickPhrases.map((phrase) => (
              <button
                key={phrase}
                onClick={() => handleQuickPhrase(phrase)}
                className="px-3 py-2 bg-white/20 active:bg-white/30 text-white rounded-lg text-xs transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-black/80 backdrop-blur px-3 py-3">
        {/* Main Controls */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-white/20 active:bg-white/30 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="px-2 py-1.5 bg-white/20 text-white border border-white/30 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="标清">标清</option>
              <option value="高清">高清</option>
              <option value="超清">超清</option>
            </select>

            <button className="p-2 bg-white/20 active:bg-white/30 rounded-full transition-colors">
              <Camera className="w-5 h-5 text-white" />
            </button>

            <button className="p-2 bg-white/20 active:bg-white/30 rounded-full transition-colors">
              <History className="w-5 h-5 text-white" />
            </button>

            <button className="p-2 bg-white/20 active:bg-white/30 rounded-full transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Voice Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowQuickPhrases(!showQuickPhrases)}
            className="flex-1 px-3 py-2.5 bg-blue-500 active:bg-blue-600 text-white rounded-lg transition-colors text-xs"
          >
            常用语
          </button>

          <button
            onMouseDown={handleMicPress}
            onMouseUp={handleMicRelease}
            onTouchStart={handleMicPress}
            onTouchEnd={handleMicRelease}
            className={`flex-1 px-3 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              isRecording
                ? "bg-red-500 text-white"
                : "bg-blue-500 active:bg-blue-600 text-white"
            }`}
          >
            <Mic className="w-4 h-4" />
            <span className="text-xs">
              {isRecording ? "松开发送..." : "按住说话"}
            </span>
          </button>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-red-400">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs">正在录音...</span>
          </div>
        )}
      </div>

      {/* Network Warning (conditional) */}
      {false && (
        <div className="bg-orange-500 px-3 py-1.5 text-center">
          <p className="text-xs text-white">
            当前网络不佳,已自动切换到标清模式
          </p>
        </div>
      )}
    </div>
  );
}

function Video({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
