import { Cpu } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col h-[75vh] w-[100vw] items-center justify-center space-y-4 p-6 font-mono ">
      {/* Animated Dual-Ring Wrapper */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Outer Tech Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-t-[#FF7E67] border-r-transparent border-b-[#A78BFA]/20 border-l-transparent animate-spin duration-700" />

        {/* Inner Microchip Core */}
        <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg shadow-[#FF7E67]/5 animate-pulse">
          <Cpu className="w-3 h-3 text-[#FF7E67]" />
        </div>
      </div>

      {/* Synchronizing Metadata Text */}
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 animate-pulse">
        Syncing Pipeline...
      </div>
    </div>
  );
}
