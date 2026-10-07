import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="level-3-elevated px-5 py-3.5 rounded-[0.25rem] border border-[#d4af37]/60 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center space-x-3 text-xs">
        <span className="text-[#f2ca50] text-sm">✦</span>
        <span className="text-[#f7f5f0] font-medium">{message}</span>
        <button
          onClick={onClear}
          className="text-[#d0c5af]/60 hover:text-[#f7f5f0] text-xs pl-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
