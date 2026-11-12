'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-[#1D5FBF] flex-shrink-0" />;
        let borderColor = 'border-[#1D5FBF]/30';
        let bg = 'bg-white';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-[#157F4F] flex-shrink-0" />;
          borderColor = 'border-[#157F4F]/30';
        } else if (toast.type === 'error' || toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-[#B54708] flex-shrink-0" />;
          borderColor = 'border-[#B54708]/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border ${bg} ${borderColor} transition-all duration-300 transform translate-y-0`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium text-[#1C1917]">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#6B645A] hover:text-[#1C1917] ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

