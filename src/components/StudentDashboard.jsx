import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { STUDENT_ATTENDANCE_SUMMARY } from '../data/mockData';
import { StudentAttendanceModal } from './StudentAttendanceModal';
import { StudentAssignmentModal } from './StudentAssignmentModal';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BookOpen, 
  Award, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CalendarCheck,
  FileText,
  AlertCircle
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { jsonDb } = useData();

  // Modals for the 2 student features
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  const rollNumber = currentUser?.rollNumber || 'CSE-2024-042';
  const summary = STUDENT_ATTENDANCE_SUMMARY;
  const todayRecords = jsonDb.getStudentTodayAttendance(rollNumber);
  const { pending, completed } = jsonDb.getStudentAssignments(rollNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Student ID Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-900/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 p-1 flex items-center justify-center overflow-hidden">
              <span className="text-xl font-extrabold text-emerald-300">
                {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'AP'}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center">
              <GraduationCap className="w-3 h-3 text-slate-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Welcome, {currentUser?.name || 'Aarav Patel'}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                Student Academic Hub
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Roll No: <span className="font-mono text-emerald-300 font-semibold">{rollNumber}</span> • {currentUser?.program || 'B.Tech CSE'} • {currentUser?.semester || '6th Semester'}
            </p>
          </div>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-emerald-500/30 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Attendance Status: <strong className="text-emerald-400">85.9% (Eligible)</strong></span>
          </div>
        </div>
      </div>

      {/* CORE STUDENT ACTION BUTTONS BAR (As requested by user) */}
      <div className="rounded-2xl bg-slate-800/90 border border-emerald-500/30 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Student Quick Actions
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Real-time attendance & course work</span>
        </div>

        {/* 2 Requested Student Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Button 1: Show My Attendance */}
          <button
            onClick={() => setShowAttendanceModal(true)}
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/90 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold flex items-center gap-4 shadow-xl shadow-emerald-600/25 transition-all hover:scale-[1.01] cursor-pointer text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold">Show My Attendance</div>
              <div className="text-xs text-emerald-100 font-normal mt-0.5">
                Today's attendance (Green/Red) & Full summary
              </div>
            </div>
          </button>

          {/* Button 2: Show My Assignment */}
          <button
            onClick={() => setShowAssignmentModal(true)}
            className="p-5 rounded-2xl bg-gradient-to-br from-sky-600/90 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-semibold flex items-center gap-4 shadow-xl shadow-sky-600/25 transition-all hover:scale-[1.01] cursor-pointer text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold">Show My Assignment</div>
              <div className="text-xs text-sky-100 font-normal mt-0.5">
                Pending & completed assignments with due dates
              </div>
            </div>
          </button>

        </div>
      </div>

      {/* Primary Attendance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Overall Percentage */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Aggregate Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {summary.overallRate}%
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Safe
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Target threshold: 75.0% minimum
          </p>
        </div>

        {/* KPI 2: Total Classes Attended */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Lectures Attended</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {summary.attended}
            </span>
            <span className="text-xs text-slate-400">
              of {summary.totalHeld} held
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Missed lectures: {summary.missed}
          </p>
        </div>

        {/* KPI 3: Safe Margin Bunk Calculator */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Safe Lecture Buffer</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
              +{summary.safeMarginLectures}
            </span>
            <span className="text-xs text-cyan-400 font-medium">
              Lectures can miss
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Without falling below 75%
          </p>
        </div>

        {/* KPI 4: Pending Assignments */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Pending Assignments</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
              {pending.length}
            </span>
            <span className="text-xs text-slate-400">
              ({completed.length} completed)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Click Show My Assignment to submit</p>
        </div>

      </div>

      {/* Main Grid: Subject Breakdown & Today's Schedule Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Subject-Wise Attendance Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-6">
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <span>Subject-Wise Attendance Overview</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Course-by-course attendance status and minimum cutoff</p>
              </div>

              <button
                onClick={() => setShowAttendanceModal(true)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline"
              >
                View Detailed Record
              </button>
            </div>

            {/* Subject Cards List */}
            <div className="space-y-4">
              {summary.subjects.map((sub) => {
                const isWarning = sub.rate < 75.0;
                return (
                  <div 
                    key={sub.code} 
                    className={`p-4 rounded-xl border transition-all ${
                      isWarning 
                        ? 'bg-amber-500/10 border-amber-500/30' 
                        : 'bg-slate-900/70 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-400">{sub.code}</span>
                          <span className="text-white font-semibold text-sm">{sub.name}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Instructor: {sub.faculty} • {sub.credits} Credits
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-base font-extrabold font-mono ${isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {sub.rate}%
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {sub.attended} / {sub.held} lectures
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          isWarning 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isWarning ? 'bg-amber-400' : sub.rate >= 90 ? 'bg-emerald-400' : 'bg-cyan-400'
                          }`}
                          style={{ width: `${sub.rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right 1 Col: Today's Class Schedule with Green for Present and Red for Absent */}
        <div className="space-y-6">
          
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-6">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Today's Attendance Status</span>
              </span>
              <button 
                onClick={() => setShowAttendanceModal(true)}
                className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
              >
                Expand
              </button>
            </h3>

            <div className="space-y-3">
              {todayRecords.map((item, idx) => {
                const isPresent = item.status === 'Present';
                return (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      isPresent 
                        ? 'bg-emerald-950/20 border-emerald-500/30' 
                        : 'bg-red-950/20 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{item.subject}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isPresent
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border-red-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {item.time}
                      </span>
                      <span>{item.room}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Render Student Modals */}
      {showAttendanceModal && (
        <StudentAttendanceModal 
          student={currentUser} 
          onClose={() => setShowAttendanceModal(false)} 
        />
      )}

      {showAssignmentModal && (
        <StudentAssignmentModal 
          student={currentUser} 
          onClose={() => setShowAssignmentModal(false)} 
        />
      )}

    </div>
  );
};
