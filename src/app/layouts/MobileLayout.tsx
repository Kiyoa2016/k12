import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />

        {/* Screen Content */}
        <div className="w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
