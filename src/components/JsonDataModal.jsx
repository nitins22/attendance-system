import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Database, X, Download, Copy, Check, RefreshCw } from 'lucide-react';

export const JsonDataModal = ({ onClose }) => {
  const { jsonDb, refreshData, showPopup } = useData();
  const [copied, setCopied] = useState(false);

  const rawJson = jsonDb.exportAllDatabaseJSON();
  const jsonString = JSON.stringify(rawJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edutrack-database-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showPopup('Exported!', 'Full JSON database downloaded successfully!', 'success');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the JSON database to initial demo state?')) {
      jsonDb.resetDatabase();
      refreshData();
      showPopup('Reset', 'Database reset to default JSON seed!', 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl shadow-indigo-950/60 relative transform animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Live JSON Storage Inspector</h2>
            <p className="text-xs text-slate-400">Zero external databases — All records stored in pure structured JSON</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 text-xs shrink-0">
          <span className="text-slate-400 font-mono text-[11px]">
            Size: {(new Blob([jsonString]).size / 1024).toFixed(1)} KB • Students: {rawJson.students?.length} • Assignments: {rawJson.assignments?.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
          </div>
        </div>

        {/* Code viewer */}
        <div className="flex-1 overflow-y-auto rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-indigo-300">
          <pre className="whitespace-pre-wrap">{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs shrink-0">
          <button
            onClick={handleReset}
            className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Initial Demo JSON</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
