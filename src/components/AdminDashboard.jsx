import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  ADMIN_STATS, 
  TODAY_CLASS_SESSIONS, 
  DEPARTMENT_ATTENDANCE, 
  RECENT_ACTIVITY_LOGS 
} from '../data/mockData';
import { AddStudentModal } from './AddStudentModal';
import { BulkAddStudentsModal } from './BulkAddStudentsModal';
import { AttendanceModal } from './AttendanceModal';
import { AssignmentModal } from './AssignmentModal';
import { DeleteStudentModal } from './DeleteStudentModal';
import { JsonDataModal } from './JsonDataModal';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  AlertTriangle, 
  Search, 
  Plus, 
  CalendarCheck2, 
  FilePlus, 
  UserMinus, 
  ShieldCheck, 
  Building2, 
  Clock, 
  Database,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { students, assignments, activeModal, setActiveModal } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSessions = TODAY_CLASS_SESSIONS.filter(session =>
    session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Welcome Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 p-1 flex items-center justify-center overflow-hidden">
              <span className="text-xl font-extrabold text-indigo-300">
                {currentUser?.name?.split(' ').map(n => n[0]).join('') || 'AD'}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-slate-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Welcome, {currentUser?.name || 'Administrator'}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                Admin Control Center
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {currentUser?.title || 'Dean of Academic Affairs'} • JSON DB: <span className="font-mono text-emerald-300 font-semibold">{students.length} Students</span> • <span className="font-mono text-cyan-300">{assignments.length} Assignments</span>
            </p>
          </div>
        </div>

        {/* JSON Database Badge */}
        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => setActiveModal('json-viewer')}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            title="Inspect raw JSON storage"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Inspect JSON DB</span>
          </button>
        </div>
      </div>

      {/* CORE ADMIN ACTION BUTTONS BAR (As requested by user) */}
      <div className="rounded-2xl bg-slate-800/90 border border-indigo-500/30 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Admin Operations Center
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Pure JSON Storage Operations</span>
        </div>

        {/* Operations Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* Button 1: Add Student */}
          <button
            onClick={() => setActiveModal('add-student')}
            className="p-4 rounded-xl bg-gradient-to-br from-indigo-600/90 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Add Student</div>
              <div className="text-[11px] text-indigo-100 font-normal">Single student form</div>
            </div>
          </button>

          {/* Button 2: Bulk Import Students */}
          <button
            onClick={() => setActiveModal('bulk-student')}
            className="p-4 rounded-xl bg-gradient-to-br from-cyan-600/90 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-cyan-600/25 transition-all hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Bulk Import</div>
              <div className="text-[11px] text-cyan-100 font-normal">CSV / Excel / Generator</div>
            </div>
          </button>

          {/* Button 3: Attendance */}
          <button
            onClick={() => setActiveModal('attendance')}
            className="p-4 rounded-xl bg-gradient-to-br from-emerald-600/90 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Attendance</div>
              <div className="text-[11px] text-emerald-100 font-normal">Class & date register</div>
            </div>
          </button>

          {/* Button 4: Assignment */}
          <button
            onClick={() => setActiveModal('assignment')}
            className="p-4 rounded-xl bg-gradient-to-br from-sky-600/90 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <FilePlus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Assignment</div>
              <div className="text-[11px] text-sky-100 font-normal">PDF/Image publish</div>
            </div>
          </button>

          {/* Button 5: Delete Student Record */}
          <button
            onClick={() => setActiveModal('delete-student')}
            className="p-4 rounded-xl bg-gradient-to-br from-rose-600/90 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <UserMinus className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold">Delete Record</div>
              <div className="text-[11px] text-rose-100 font-normal">View all & remove</div>
            </div>
          </button>

        </div>
      </div>

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Registered Students</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {students.length}
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> In JSON DB
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Manage via Add/Delete Student buttons</p>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Overall Attendance Rate</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {ADMIN_STATS.overallRate}%
            </span>
            <span className="text-xs text-emerald-400 font-semibold">
              {ADMIN_STATS.rateChange}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            {ADMIN_STATS.presentToday} of {ADMIN_STATS.totalStudents} campus attendance
          </p>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Assignments Published</span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
              <FilePlus className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {assignments.length}
            </span>
            <span className="text-xs text-sky-400 font-semibold">
              Active Briefs
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">PDF & Image format submissions open</p>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-red-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Defaulter Warning</span>
            <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-red-400">
              {ADMIN_STATS.defaultersCount}
            </span>
            <span className="text-xs text-red-400/80 font-semibold">
              Students &lt; 75%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Automated warning notices dispatched</p>
        </div>

      </div>

      {/* Main Content Layout: Table & Department breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Today's Classroom Sessions Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Today's Lecture Sessions</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {filteredSessions.length} sessions
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Live period tracking and attendance register</p>
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by subject or faculty..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/80 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                    <th className="pb-3 pl-2">Subject & Batch</th>
                    <th className="pb-3">Faculty</th>
                    <th className="pb-3">Timing & Room</th>
                    <th className="pb-3 text-center">Turnout</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-xs">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-700/20 transition-colors group">
                      <td className="py-3.5 pl-2">
                        <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {session.subject}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-indigo-400 font-medium">{session.code}</span>
                          <span>•</span>
                          <span>{session.batch}</span>
                        </div>
                      </td>

                      <td className="py-3.5 text-slate-300">
                        {session.faculty}
                      </td>

                      <td className="py-3.5 text-slate-300">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{session.time}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{session.room}</div>
                      </td>

                      <td className="py-3.5 text-center">
                        {session.status === 'Upcoming' ? (
                          <span className="text-[11px] text-slate-500 italic">Not started yet</span>
                        ) : (
                          <div>
                            <div className="font-semibold text-white">
                              {session.present}/{session.totalStudents}
                              <span className="text-[11px] font-normal text-slate-400 ml-1">
                                ({session.rate}%)
                              </span>
                            </div>
                            <div className="w-20 mx-auto bg-slate-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${session.rate >= 90 ? 'bg-emerald-400' : session.rate >= 75 ? 'bg-indigo-400' : 'bg-amber-400'}`}
                                style={{ width: `${session.rate}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 text-right pr-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          session.status === 'Completed'
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : session.status === 'In Progress'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse'
                            : 'bg-slate-700/60 text-slate-300 border-slate-600'
                        }`}>
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Right 1 Col: Department Stats & Activity Log */}
        <div className="space-y-6">
          
          {/* Department Breakdown */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-6">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Department Attendance</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">Target: 75%</span>
            </h3>

            <div className="space-y-4">
              {DEPARTMENT_ATTENDANCE.map((dept) => (
                <div key={dept.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{dept.dept}</span>
                    <span className="font-bold text-white font-mono">{dept.rate}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/40">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${dept.rate >= 90 ? 'bg-emerald-400' : dept.rate >= 80 ? 'bg-indigo-400' : 'bg-amber-400'}`}
                      style={{ width: `${dept.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/70 p-6">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4 text-cyan-400" />
                <span>Recent System Activity</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live
              </span>
            </h3>

            <div className="space-y-3.5">
              {RECENT_ACTIVITY_LOGS.map((log) => (
                <div key={log.id} className="text-xs p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/40 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-300">{log.user}</span>
                    <span className="text-slate-500">{log.time}</span>
                  </div>
                  <p className="text-slate-400 leading-snug">{log.action}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Render Active Admin Modals */}
      {activeModal === 'add-student' && (
        <AddStudentModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'bulk-student' && (
        <BulkAddStudentsModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'attendance' && (
        <AttendanceModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'assignment' && (
        <AssignmentModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'delete-student' && (
        <DeleteStudentModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'json-viewer' && (
        <JsonDataModal onClose={() => setActiveModal(null)} />
      )}

    </div>
  );
};
