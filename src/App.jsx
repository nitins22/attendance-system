import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { PortalSelector } from './components/PortalSelector';
import { AdminLogin } from './components/AdminLogin';
import { StudentLogin } from './components/StudentLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { SuccessPopup } from './components/SuccessPopup';
import { CheckCircle2, Info, AlertTriangle, ShieldCheck, GraduationCap, Database } from 'lucide-react';

const AppContent = () => {
  const { currentUser, activeView, setActiveView, notification } = useAuth();
  const { setActiveModal } = useData();

  const renderCurrentView = () => {
    // If logged in as admin
    if (currentUser?.role === 'admin') {
      return <AdminDashboard />;
    }

    // If logged in as student
    if (currentUser?.role === 'student') {
      return <StudentDashboard />;
    }

    // When logged out, check view state
    switch (activeView) {
      case 'admin-login':
        return <AdminLogin />;
      case 'student-login':
        return <StudentLogin />;
      case 'landing':
      default:
        return <PortalSelector />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className={`px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-2.5 text-xs font-medium backdrop-blur-lg ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
              : notification.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500/40 text-amber-200'
              : 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : notification.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Popups & Modals */}
      <SuccessPopup />

      {/* Navigation bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">EduTrack Attendance System</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Database className="w-3.5 h-3.5" /> Pure JSON Storage
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-slate-400">
            {!currentUser ? (
              <>
                <button 
                  onClick={() => setActiveView('admin-login')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
                <span>|</span>
                <button 
                  onClick={() => setActiveView('student-login')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student Portal</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">
                  Logged in as <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.role})
                </span>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setActiveModal('json-viewer')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    View JSON Storage
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
