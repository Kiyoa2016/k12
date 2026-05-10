import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Camera as CameraIcon, Zap, ZapOff, Check, Sparkles } from "lucide-react";

export default function Camera() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [flashOn, setFlashOn] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // 根据mode决定返回路径
  const backPath = mode === "homework" ? "/app/student-selection" : "/app/homework-upload";
  const studentId = searchParams.get("studentId");

  const handleCapture = () => {
    const mockImage = `captured-${Date.now()}`;
    setCapturedImages((prev) => [...prev, mockImage]);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/app/student-selection", {
        state: { uploadedStudentId: studentId ? parseInt(studentId) : undefined },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg z-10 pt-8">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to={backPath}>
              <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center active:scale-90 transition-transform">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
            </Link>
            <h1 className="text-base text-white">
              {mode === "paper" ? "拍摄试卷" : "拍摄课堂作业"}
            </h1>
          </div>
        </div>
      </header>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Mock Camera Feed */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="text-gray-500 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
              <CameraIcon className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-sm text-gray-400">对准作业拍摄</p>
          </div>

          {/* Guide Frame */}
          <div className="absolute inset-6 border-2 border-blue-400/50 rounded-2xl pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="w-full h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-full bg-blue-400 rounded-full"></div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="w-full h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-full bg-blue-400 rounded-full absolute right-0"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8">
              <div className="w-full h-1 bg-blue-400 rounded-full absolute bottom-0"></div>
              <div className="w-1 h-full bg-blue-400 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <div className="w-full h-1 bg-blue-400 rounded-full absolute bottom-0"></div>
              <div className="w-1 h-full bg-blue-400 rounded-full absolute right-0"></div>
            </div>
          </div>

          {/* Flash Toggle */}
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`absolute top-3 right-3 p-2.5 backdrop-blur-sm rounded-xl transition-colors ${
              flashOn ? "bg-yellow-500/30 border border-yellow-500/50" : "bg-white/10 border border-white/20"
            }`}
          >
            {flashOn ? (
              <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            ) : (
              <ZapOff className="w-5 h-5 text-white" />
            )}
          </button>

        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-lg px-4 py-4">
        {/* Thumbnails */}
        {capturedImages.length > 0 && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {capturedImages.map((img, index) => (
              <div
                key={img}
                className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center relative border border-blue-500/30 backdrop-blur-sm"
              >
                <Check className="w-5 h-5 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-xs text-white shadow-lg">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Capture Button */}
        <div className="flex items-center justify-center gap-3">
          {capturedImages.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 disabled:from-gray-600 disabled:to-gray-600 text-white text-sm rounded-full transition-all shadow-lg shadow-blue-500/50 active:scale-95"
            >
              {isProcessing ? "AI批改中..." : `提交 (${capturedImages.length})`}
            </button>
          )}
          <button
            onClick={handleCapture}
            disabled={isProcessing}
            className="w-18 h-18 bg-white disabled:bg-gray-500 rounded-full flex items-center justify-center shadow-2xl shadow-white/30 active:scale-95 transition-all relative"
          >
            <div className="w-14 h-14 border-4 border-blue-500 rounded-full"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          </button>
        </div>

        {/* Hint Text */}
        <p className="text-center text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          {mode === "paper"
            ? "将试卷放入框内,确保学生信息清晰可见"
            : "将作业放入框内拍摄"}
        </p>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-blue-400" />
            </div>
            <p className="text-white text-sm mb-1">正在上传作业...</p>
            <p className="text-blue-400 text-xs">请耐心等待</p>
          </div>
        </div>
      )}
    </div>
  );
}
