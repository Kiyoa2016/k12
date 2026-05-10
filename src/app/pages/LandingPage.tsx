import { useNavigate } from "react-router";
import { Smartphone, Monitor } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">K12教师助手</h1>
        <p className="text-gray-500 mb-10">选择进入方式</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/app")}
            className="w-full py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-blue-200/50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <Smartphone className="w-6 h-6" />
            移动端主页
          </button>

          <button
            onClick={() => navigate("/console")}
            className="w-full py-5 bg-white text-gray-800 text-lg font-semibold rounded-2xl border border-gray-200 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:border-blue-200 hover:shadow-blue-100/50"
          >
            <Monitor className="w-6 h-6" />
            PC端主页
          </button>
        </div>
      </div>
    </div>
  );
}
