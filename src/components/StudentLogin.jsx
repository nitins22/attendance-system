import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  IdCard, 
  Mail, 
  CheckCircle2, 
  KeyRound,
  ShieldCheck
} from 'lucide-react';

export const StudentLogin = () => {
  const { loginStudent, activateStudentAccount, setActiveView } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'activate'

  // Login fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Activate fields
  const [actRoll, setActRoll] = useState('');
  const [actEmail, setActEmail] = useState('');
  const [actNewPassword, setActNewPassword] = useState('');
  const [actConfirmPassword, setActConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!identifier.trim()) {
      setError('Please enter your University Roll Number or Student Email');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginStudent(identifier, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error);
      }
    }, 350);
  };

  const handleActivateSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!actRoll.trim()) {
      setError('Please enter your University Roll Number');
      return;
    }
    if (!actEmail.trim()) {
      setError('Please enter your registered student email');
      return;
    }
    if (!actNewPassword || actNewPassword.length < 5) {
      setError('New password must be at least 5 characters long');
      return;
    }
    if (actNewPassword !== actConfirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = activateStudentAccount(actRoll, actEmail, actNewPassword);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg('Your student password has been activated successfully! You can now sign in.');
        setIdentifier(actRoll.toUpperCase());
        setPassword(actNewPassword);
        setTab('login');
      } else {
        setError(res.error);
      }
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      
      {/* Back button */}
      <button
        onClick={() => setActiveView('landing')}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Portal Selection</span>
      </button>

      {/* Main Login Card */}
      <div className="rounded-2xl bg-slate-800/90 border border-slate-700/80 p-8 shadow-2xl shadow-emerald-950/40 relative backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />

        {/* Portal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-600/25">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <span>Student Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Student Academic Access</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in using your University Roll Number & password</p>
        </div>

        {/* Tab Switcher: Login vs Activate */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-700 mb-6">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'login' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('activate'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'activate' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            First Time? Set Password
          </button>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{error}</div>
          </div>
        )}

        {/* TAB 1: LOGIN FORM */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Roll Number or Student Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <IdCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. CSE-2024-042 or email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setTab('activate')}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot / Set Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Default password is your Roll Number if not customized yet.
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-emerald-600 focus:ring-0"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[11px] text-slate-500">Verified Student</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as Student</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* TAB 2: ACTIVATE ACCOUNT FORM */
          <form onSubmit={handleActivateSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                University Roll Number
              </label>
              <div className="relative">
                <IdCard className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={actRoll}
                  onChange={(e) => setActRoll(e.target.value)}
                  placeholder="e.g. CSE-2024-042"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono uppercase"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Registered Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={actEmail}
                  onChange={(e) => setActEmail(e.target.value)}
                  placeholder="e.g. student@student.edu"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Create New Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={actNewPassword}
                  onChange={(e) => setActNewPassword(e.target.value)}
                  placeholder="At least 5 characters"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={actConfirmPassword}
                  onChange={(e) => setActConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer mt-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Activate & Save Password</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Switch to Admin Portal */}
        <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-700/60 pt-5">
          <span>College Faculty or Staff? </span>
          <button
            onClick={() => setActiveView('admin-login')}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline transition-colors"
          >
            Switch to Admin Portal
          </button>
        </div>

      </div>
    </div>
  );
};
