import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  FileText, 
  X, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Download, 
  Eye, 
  Image as ImageIcon, 
  AlertCircle, 
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const StudentAssignmentModal = ({ student, onClose }) => {
  const { jsonDb, markAssignmentStatus } = useData();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'completed'
  const [previewImage, setPreviewImage] = useState(null);

  const rollNumber = student?.rollNumber || 'CSE-2024-042';

  // Retrieve student assignments from JSON storage
  const { pending, completed } = jsonDb.getStudentAssignments(rollNumber);

  const handleToggleStatus = (assignmentId, currentStatus) => {
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    markAssignmentStatus(rollNumber, assignmentId, nextStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl shadow-sky-950/60 relative transform animate-in zoom-in-95 duration-200 my-8 flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">My Assignments & Submissions</h2>
            <p className="text-xs text-slate-400">
              Track course deliverables, deadlines, and attached materials in JSON
            </p>
          </div>
        </div>

        {/* 2 Tabs: Pending & Completed */}
        <div className="flex items-center p-1.5 rounded-xl bg-slate-800 border border-slate-700/70 mb-5 shrink-0">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Assignments ({pending.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed Assignments ({completed.length})</span>
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {activeTab === 'pending' ? (
            pending.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">All caught up!</h4>
                <p className="text-xs text-slate-400 mt-1">You have no pending assignments right now.</p>
              </div>
            ) : (
              pending.map((asg) => (
                <div 
                  key={asg.id} 
                  className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-sky-500/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                          {asg.subject}
                        </span>
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="text-xs text-slate-400 font-mono">ID: {asg.id}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{asg.title}</h3>
                    </div>

                    {/* Due Date Badge */}
                    <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Due: {asg.dueDate}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {asg.description}
                  </p>

                  {/* Attached File/Photo & Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    {/* Attached file chip */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/70 text-xs text-slate-300">
                        {asg.fileType?.includes('image') ? (
                          <ImageIcon className="w-4 h-4 text-sky-400" />
                        ) : (
                          <FileText className="w-4 h-4 text-red-400" />
                        )}
                        <span className="font-medium truncate max-w-[180px]">{asg.fileName}</span>
                        <span className="text-[10px] text-slate-500">({asg.fileSize || '1.2 MB'})</span>
                      </div>

                      {asg.fileData && asg.fileType?.includes('image') && (
                        <button
                          type="button"
                          onClick={() => setPreviewImage(asg.fileData)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-sky-300 border border-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Photo</span>
                        </button>
                      )}
                    </div>

                    {/* Mark as Completed / Submit Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(asg.id, 'pending')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark as Completed / Submit</span>
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            completed.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <Clock className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">No completed assignments yet</h4>
                <p className="text-xs text-slate-400 mt-1">Submit your pending tasks to view them here.</p>
              </div>
            ) : (
              completed.map((asg) => (
                <div 
                  key={asg.id} 
                  className="p-5 rounded-2xl bg-slate-800/90 border border-emerald-500/30 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {asg.subject}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">ID: {asg.id}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 line-through text-slate-300">
                        {asg.title}
                      </h3>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Completed</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
                    <span>
                      Submitted on: <strong className="text-slate-200">{asg.submittedAt || 'Recently'}</strong> • Due was: {asg.dueDate}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(asg.id, 'completed')}
                      className="text-slate-400 hover:text-amber-400 text-xs underline cursor-pointer"
                    >
                      Reopen Assignment
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Image Preview Modal */}
        {previewImage && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
            <div className="relative max-w-xl w-full bg-slate-900 rounded-2xl p-4 border border-slate-700">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 text-white bg-slate-800 p-1 rounded-full hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h4 className="text-sm font-bold text-white mb-3">Assignment Photo Preview</h4>
              <img src={previewImage} alt="Assignment attachment" className="w-full rounded-xl max-h-[70vh] object-contain" />
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Student Submissions stored in JSON storage</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
