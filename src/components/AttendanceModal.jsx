import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  CalendarCheck2, 
  X, 
  Calendar, 
  Layers, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Save, 
  Search, 
  Sparkles,
  Filter
} from 'lucide-react';

export const AttendanceModal = ({ onClose }) => {
  const { students, saveAttendanceRegister, jsonDb } = useData();

  const todayStr = new Date().toISOString().split('T')[0];

  // 3 Dropdowns
  const [selectedClass, setSelectedClass] = useState('B.Tech');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Display state
  const [hasQueried, setHasQueried] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  // Handle "Show Student Record" button click
  const handleShowStudentRecord = () => {
    // Check if an existing register exists in JSON database
    const existing = jsonDb.getAttendanceRegister(selectedClass, selectedSection, selectedDate);

    // Filter students belonging to this class & section
    const matchingStudents = students.filter(
      s => s.class === selectedClass && s.section === selectedSection
    );

    if (existing && existing.records && existing.records.length > 0) {
      // Map existing records
      const mapped = matchingStudents.map(student => {
        const found = existing.records.find(r => r.rollNumber.toLowerCase() === student.rollNumber.toLowerCase());
        return {
          rollNumber: student.rollNumber,
          name: student.name,
          email: student.email,
          status: found ? found.status : 'Present'
        };
      });
      setAttendanceList(mapped);
    } else {
      // Default all to 'Present'
      const newList = matchingStudents.map(student => ({
        rollNumber: student.rollNumber,
        name: student.name,
        email: student.email,
        status: 'Present'
      }));
      setAttendanceList(newList);
    }

    setHasQueried(true);
  };

  // Toggle status for a student
  const toggleStatus = (rollNumber) => {
    setAttendanceList(prev =>
      prev.map(item =>
        item.rollNumber === rollNumber
          ? { ...item, status: item.status === 'Present' ? 'Absent' : 'Present' }
          : item
      )
    );
  };

  const setStatus = (rollNumber, status) => {
    setAttendanceList(prev =>
      prev.map(item =>
        item.rollNumber === rollNumber ? { ...item, status } : item
      )
    );
  };

  const markAll = (status) => {
    setAttendanceList(prev => prev.map(item => ({ ...item, status })));
  };

  // Handle "Save Data" button click
  const handleSaveData = () => {
    if (attendanceList.length === 0) {
      alert('No student records to save. Please select a valid class and section.');
      return;
    }

    saveAttendanceRegister(selectedClass, selectedSection, selectedDate, attendanceList);
    onClose();
  };

  // Metrics
  const totalCount = attendanceList.length;
  const presentCount = attendanceList.filter(s => s.status === 'Present').length;
  const absentCount = totalCount - presentCount;

  const filteredList = attendanceList.filter(s =>
    s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl shadow-indigo-950/60 relative transform animate-in zoom-in-95 duration-200 my-8 flex flex-col max-h-[90vh]"
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
            <CalendarCheck2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Class Attendance Register</h2>
            <p className="text-xs text-slate-400">Record and store daily attendance directly in JSON database</p>
          </div>
        </div>

        {/* 3 Dropdowns Box */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 mb-5 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Select Class */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Select Class / Degree</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setHasQueried(false);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc">B.Sc Computer Science</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MBA">MBA</option>
              </select>
            </div>

            {/* 2. Select Section */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Section</span>
              </label>
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setHasQueried(false);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>

            {/* 3. Select Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Select Date</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setHasQueried(false);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer font-sans"
              />
            </div>

          </div>

          {/* Show Student Record CTA Button */}
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-slate-400">
              Target: <strong className="text-slate-200">{selectedClass} - Section {selectedSection}</strong> on <strong className="text-slate-200">{selectedDate}</strong>
            </span>
            <button
              onClick={handleShowStudentRecord}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Show Student Record</span>
            </button>
          </div>
        </div>

        {/* Student Records Section */}
        {hasQueried && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Quick Summary & Bulk Mark Controls */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 shrink-0">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">Total: <strong className="text-white font-mono">{totalCount}</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Present: <strong className="font-mono">{presentCount}</strong>
                </span>
                <span className="text-red-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Absent: <strong className="font-mono">{absentCount}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => markAll('Present')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => markAll('Absent')}
                  className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            {/* List */}
            {attendanceList.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-400 text-xs">
                No students enrolled in <strong>{selectedClass} - Section {selectedSection}</strong>.
                <div className="mt-2 text-indigo-400">Use "Add Student" to enroll students in this section.</div>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1 rounded-xl border border-slate-700/70 divide-y divide-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="sticky top-0 bg-slate-800 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-2.5 pl-3">Roll No</th>
                      <th className="py-2.5">Student Name</th>
                      <th className="py-2.5">Email</th>
                      <th className="py-2.5 text-right pr-4">Attendance Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                    {filteredList.map((stu) => {
                      const isPresent = stu.status === 'Present';
                      return (
                        <tr key={stu.rollNumber} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2.5 pl-3 font-mono font-bold text-indigo-300">
                            {stu.rollNumber}
                          </td>
                          <td className="py-2.5 font-medium text-white">
                            {stu.name}
                          </td>
                          <td className="py-2.5 text-slate-400">
                            {stu.email}
                          </td>
                          <td className="py-2.5 text-right pr-4">
                            <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-slate-800 border border-slate-700">
                              <button
                                type="button"
                                onClick={() => setStatus(stu.rollNumber, 'Present')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                  isPresent
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Present</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setStatus(stu.rollNumber, 'Absent')}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                  !isPresent
                                    ? 'bg-red-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Absent</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Bottom "Save Data" Button */}
            {attendanceList.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-400">
                  Ready to commit <strong className="text-white">{attendanceList.length}</strong> records to JSON
                </span>
                <button
                  type="button"
                  onClick={handleSaveData}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Data</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
