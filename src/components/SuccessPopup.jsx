import React from 'react';
import { useData } from '../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const SuccessPopup = () => {
  const { popupMessage, closePopup } = useData();

  if (!popupMessage) return null;

  const isSuccess = popupMessage.type === 'success';
  const isInfo = popupMessage.type === 'info';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl shadow-indigo-950/60 relative text-center transform animate-in zoom-in-95 duration-200"
        role="alertdialog"
        aria-modal="true"
      >
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
          isSuccess 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
            : isInfo
            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isSuccess ? (
            <CheckCircle2 className="w-8 h-8 animate-bounce" />
          ) : isInfo ? (
            <Info className="w-8 h-8" />
          ) : (
            <AlertCircle className="w-8 h-8" />
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          {popupMessage.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {popupMessage.message}
        </p>

        <button
          onClick={closePopup}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-lg cursor-pointer ${
            isSuccess 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          OK, Got It
        </button>
      </div>
    </div>
  );
};
