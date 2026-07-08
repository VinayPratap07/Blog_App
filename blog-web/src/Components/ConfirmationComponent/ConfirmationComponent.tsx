import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "System Override Required",
  message = "Are you certain you want to delete this Blog? This action cannot be reversed.",
  confirmText = "Execute Action",
}: ConfirmationModalProps) {
  // Close modal automatically on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop blur overlay with fade animation */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      />

      {/* Main Modal Shell Box Container */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[28px] p-6 md:p-8 shadow-2xl shadow-black/80 flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Subtle Ambient Glowing Background Accent inside modal */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#FF7E67]/5 rounded-full blur-[60px] pointer-events-none" />

        {/* Top Header Vector Block */}
        <div className="flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-mono font-black uppercase tracking-wider text-white">
                {title}
              </h3>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                Verification Protocol Staged
              </p>
            </div>
          </div>

          {/* Close cross anchor button */}
          <button
            onClick={onClose}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white transition-colors border border-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative description text segment */}
        <p className="text-sm text-zinc-400 leading-relaxed relative font-sans">
          {message}
        </p>

        {/* Action button trigger cluster */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 relative font-mono text-xs">
          <button
            onClick={onClose}
            className="w-full sm:w-auto sm:flex-1 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white font-bold rounded-xl transition-all active:scale-95"
          >
            Abort Protocol
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto sm:flex-1 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black uppercase tracking-wide rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
