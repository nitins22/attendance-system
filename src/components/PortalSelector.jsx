import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  CalendarCheck, 
  Sparkles, 
  Lock, 
  Layers,
  KeyRound,
  UserPlus
} from 'lucide-react';

export const PortalSelector = () => {
  const { setActiveView } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Unified Attendance Management System</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">EduTrack</span> Attendance
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          Select your portal below to sign in. Administrators manage institute-wide records, lecture sessions, and analytics, while students view their real-time attendance standing and schedules.
        </p>
      </div>

      {/* Two Portal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Card 1: Admin Portal */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 hover:border-indigo-500/60 p-7 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none transition-all group-hover:scale-110" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-600/20">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Administrative Staff
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              Admin Portal
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Designed for Deans, HODs, Faculty & Attendance Officers to oversee daily lectures, track attendance percentages, and flag defaulters.
            </p>

            {/* Feature List */}
            <div className="mt-6 space-y-2.5">
              {[
                'Real-time lecture & classroom session tracking',
                'Defaulter threshold alerts (<75% attendance)',
                'Department-wise attendance metrics & charts',
                'Instant student attendance logs & export ready'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-700/60 space-y-3">
            <button
              onClick={() => setActiveView('admin-login')}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:gap-3 cursor-pointer"
            >
              <span>Access Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveView('admin-login')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Register New Administrator</span>
            </button>
          </div>
        </div>

        {/* Card 2: Student Portal */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 hover:border-emerald-500/60 p-7 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] pointer-events-none transition-all group-hover:scale-110" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg shadow-emerald-600/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Student & Scholar
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              Student Portal
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Designed for enrolled students to inspect course-wise attendance stats, safe-bunk lecture allowances, today's schedule, and punch logs.
            </p>

            {/* Feature List */}
            <div className="mt-6 space-y-2.5">
              {[
                'Subject-wise breakdown & percentage progress',
                '75% eligibility calculator & safe lecture buffer',
                'Daily lecture schedule & period attendance status',
                'Transparent attendance audit trail & RFID timestamps'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-700/60 space-y-3">
            <button
              onClick={() => setActiveView('student-login')}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:gap-3 cursor-pointer"
            >
              <span>Access Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveView('student-login')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/80 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span>First Time? Set Student Password</span>
            </button>
          </div>
        </div>

      </div>

      {/* Feature Badges Footer */}
      <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <Layers className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
          <div className="text-xs font-semibold text-white">Dual Role Architecture</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Admin & Student Isolation</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <CalendarCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <div className="text-xs font-semibold text-white">Daily Session Sync</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Live Period Attendance</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <BarChart3 className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
          <div className="text-xs font-semibold text-white">Defaulter Analytics</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Automated 75% Rule</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <Lock className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <div className="text-xs font-semibold text-white">Secure Access</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Role Protected Routes</div>
        </div>
      </div>

    </div>
  );
};
