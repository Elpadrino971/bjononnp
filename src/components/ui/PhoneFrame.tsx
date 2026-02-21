import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn("relative w-[280px] mx-auto", className)}>
      {/* Phone outer shell */}
      <div className="relative bg-[#1a1a2e] rounded-[44px] p-3 shadow-[0_0_60px_rgba(124,58,237,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-[100px] w-[3px] h-[32px] bg-[#2a2a3e] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[145px] w-[3px] h-[56px] bg-[#2a2a3e] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[212px] w-[3px] h-[56px] bg-[#2a2a3e] rounded-l-sm" />
        <div className="absolute right-[-3px] top-[145px] w-[3px] h-[80px] bg-[#2a2a3e] rounded-r-sm" />

        {/* Screen */}
        <div className="bg-[#000010] rounded-[36px] overflow-hidden relative" style={{ aspectRatio: "9/19.5" }}>
          {/* Notch / Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-24 h-7 bg-black rounded-full flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1a1a2e]" />
            <div className="w-3 h-3 rounded-full bg-[#1a1a2e]" />
          </div>
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-end justify-between px-6 pb-1 z-10">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5 items-end">
                {[3, 5, 7, 9].map((h, i) => (
                  <div key={i} className="w-1 bg-white rounded-sm" style={{ height: `${h}px` }} />
                ))}
              </div>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="white" className="ml-1">
                <path d="M7.5 2.2C4.8 2.2 2.4 3.3.7 5.1L0 4.3C1.9 2.3 4.6 1 7.5 1s5.6 1.3 7.5 3.3l-.7.8C12.6 3.3 10.2 2.2 7.5 2.2zm0 3.4c-1.5 0-2.8.6-3.8 1.6L3 6.4C4.2 5.2 5.8 4.4 7.5 4.4s3.3.8 4.5 2L11.3 7.2C10.3 6.2 9 5.6 7.5 5.6zm0 2.8c-.8 0-1.5.3-2 .8L4.8 8.5C5.6 7.6 6.5 7.1 7.5 7.1s1.9.5 2.7 1.4l-.7.7c-.5-.5-1.2-.8-2-.8z"/>
              </svg>
              <div className="flex items-center gap-0.5 ml-1">
                <div className="w-5 h-2.5 border border-white rounded-sm relative">
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-sm m-0.5" />
                </div>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="absolute inset-0 pt-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
