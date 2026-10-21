import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  LogOut, 
  Clock, 
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, activeView, setActiveView, logout } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            if (!currentUser) setActiveView('landing');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                EduTrack
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Attendance OS
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Campus Attendance & Analytics Portal</p>
          </div>
        </div>

        {/* Center Live Clock */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-medium">{formattedDate}</span>
          <span className="text-slate-500">•</span>
          <span className="font-mono text-cyan-300 font-semibold">{formattedTime}</span>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* User Pill */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
                <div className={`w-2.5 h-2.5 rounded-full ${currentUser.role === 'admin' ? 'bg-indigo-400 ring-2 ring-indigo-400/30' : 'bg-emerald-400 ring-2 ring-emerald-400/30'} animate-pulse`} />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1.5">
                    {currentUser.name}
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      currentUser.role === 'admin' 
                        ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50' 
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                    }`}>
                      {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 transition-all cursor-pointer"
                title="Log out of session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('admin-login')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'admin-login'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin Login</span>
              </button>

              <button
                onClick={() => setActiveView('student-login')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'student-login'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Student Login</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
