import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  CalendarCheck, 
  X, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const StudentAttendanceModal = ({ student, onClose }) => {
  const { jsonDb } = useData();

  // 2 views: 'today' | 'all'
  const [activeTab, setActiveTab] = useState('today');

  const rollNumber = student?.rollNumber || 'CSE-2024-042';

  // Load live data from JSON DB
  const todayRecords = jsonDb.getStudentTodayAttendance(rollNumber);
  const allSummary = jsonDb.getStudentAllAttendanceSummary(rollNumber);

  // Today metrics
  const todayTotal = todayRecords.length;
  const todayPresent = todayRecords.filter(r => r.status === 'Present').length;
  const todayAbsent = todayTotal - todayPresent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl shadow-emerald-950/60 relative transform animate-in zoom-in-95 duration-200 my-8 flex flex-col max-h-[90vh]"
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
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">My Attendance Portal</h2>
            <p className="text-xs text-slate-400">
              Student: <span className="text-emerald-300 font-semibold">{student?.name || 'Aarav Patel'}</span> ({rollNumber})
            </p>
          </div>
        </div>

        {/* 2 Primary Tabs: Today's Attendance & All Attendance */}
        <div className="flex items-center p-1.5 rounded-xl bg-slate-800 border border-slate-700/70 mb-5 shrink-0">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'today'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Today's Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>All Attendance (Full Summary)</span>
          </button>
        </div>

        {/* TAB 1: Today's Attendance (Subject Wise: Present in GREEN, Absent in RED) */}
        {activeTab === 'today' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            
            {/* Today's KPI Banner */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 flex items-center justify-between flex-wrap gap-4 shrink-0">
              <div>
                <div className="text-xs font-semibold text-slate-300">Today's Subject-Wise Turnout</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Classes scheduled for today</div>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-slate-300">Total: <strong className="font-mono text-white">{todayTotal}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Present: <strong className="font-mono">{todayPresent}</strong>
                </span>
                <span className="text-red-400 flex items-center gap-1.5 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/30">
                  <XCircle className="w-4 h-4 text-red-400" />
                  Absent: <strong className="font-mono">{todayAbsent}</strong>
                </span>
              </div>
            </div>

            {/* Subject-wise Cards List with RED for Absent and GREEN for Present */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {todayRecords.map((item, idx) => {
                const isPresent = item.status === 'Present';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      isPresent
                        ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500/60'
                        : 'bg-red-950/20 border-red-500/40 hover:border-red-500/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isPresent ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {item.code}
                        </span>
                        <h4 className="text-sm font-bold text-white">{item.subject}</h4>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {item.time}
                        </span>
                        <span>•</span>
                        <span>{item.faculty}</span>
                        <span>•</span>
                        <span className="text-slate-500">{item.room}</span>
                      </div>
                    </div>

                    {/* Prominent Attendance Badge: RED for Absent, GREEN for Present */}
                    <div className="shrink-0">
                      {isPresent ? (
                        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 font-bold text-xs shadow-lg shadow-emerald-950/50">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>PRESENT</span>
                        </div>
                      ) : (
                        <div className="px-3.5 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-2 font-bold text-xs shadow-lg shadow-red-950/50">
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span>ABSENT</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: All Attendance (Student ki Puri Attendance Summary) */}
        {activeTab === 'all' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-4 overflow-y-auto pr-1">
            
            {/* Top 4 Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                <div className="text-[11px] text-slate-400">Total Lectures</div>
                <div className="text-xl font-extrabold text-white font-mono mt-0.5">{allSummary.totalHeld}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                <div className="text-[11px] text-emerald-300">Attended</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">{allSummary.attended}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-center">
                <div className="text-[11px] text-red-300">Absent / Missed</div>
                <div className="text-xl font-extrabold text-red-400 font-mono mt-0.5">{allSummary.absent}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-center">
                <div className="text-[11px] text-indigo-300">Aggregate %</div>
                <div className="text-xl font-extrabold text-indigo-400 font-mono mt-0.5">{allSummary.overallRate}%</div>
              </div>
            </div>

            {/* Subject-wise Complete Breakdown */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Subject-Wise Attendance Summary</span>
                <span className="text-[10px] text-slate-400">Min. Target: 75.0%</span>
              </h3>

              <div className="space-y-3">
                {allSummary.subjects.map((sub) => {
                  const isSafe = sub.rate >= 75.0;
                  return (
                    <div key={sub.code} className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/50">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                        <div>
                          <span className="font-mono text-xs font-bold text-emerald-400 mr-2">{sub.code}</span>
                          <span className="text-xs font-semibold text-white">{sub.name}</span>
                          <span className="text-[10px] text-slate-400 ml-2">({sub.faculty})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-300 font-mono">
                            {sub.attended}/{sub.held} ({sub.rate}%)
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isSafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isSafe ? 'bg-emerald-400' : 'bg-red-400'}`}
                          style={{ width: `${sub.rate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Historical Attendance Log */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Attendance Audit Trail (Recent Sessions)
              </h3>
              <div className="divide-y divide-slate-800">
                {allSummary.history.map((h, i) => (
                  <div key={i} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-200">{h.subject}</span>
                      <span className="text-[11px] text-slate-500 ml-2">{h.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      h.status === 'Present' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {h.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Official student academic record synchronized with JSON storage</span>
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
