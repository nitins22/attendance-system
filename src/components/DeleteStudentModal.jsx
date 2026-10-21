import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  UserMinus, 
  X, 
  Search, 
  Trash2, 
  AlertTriangle, 
  ShieldAlert, 
  GraduationCap,
  Users
} from 'lucide-react';

export const DeleteStudentModal = ({ onClose }) => {
  const { students, deleteStudent } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // rollNumber awaiting confirmation

  const filteredStudents = students.filter(student => {
    const matchSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClassFilter === 'ALL' || student.class === selectedClassFilter;
    return matchSearch && matchClass;
  });

  const handleDelete = (rollNumber) => {
    deleteStudent(rollNumber);
    setConfirmDeleteId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl shadow-red-950/40 relative transform animate-in zoom-in-95 duration-200 my-8 flex flex-col max-h-[90vh]"
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
          <div className="w-11 h-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <UserMinus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Delete Student Record</h2>
            <p className="text-xs text-slate-400">Show All Student Records & Delete from JSON Database</p>
          </div>
        </div>

        {/* Search & Filter Header Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student by name, roll no, or email..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="ALL">All Classes</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="B.Sc">B.Sc</option>
            </select>

            <span className="text-xs text-slate-400 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono">
              {filteredStudents.length} Students
            </span>
          </div>
        </div>

        {/* All Student Records Table */}
        <div className="flex-1 overflow-y-auto rounded-xl border border-slate-700/80 bg-slate-900/60 divide-y divide-slate-800">
          {filteredStudents.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs">
              No students found matching your search.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-slate-800 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 pl-3">Roll No</th>
                  <th className="py-2.5">Student Name</th>
                  <th className="py-2.5">Class & Section</th>
                  <th className="py-2.5">Email</th>
                  <th className="py-2.5 text-right pr-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredStudents.map((stu) => {
                  const isConfirming = confirmDeleteId === stu.rollNumber;
                  return (
                    <tr key={stu.rollNumber} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 pl-3 font-mono font-bold text-red-300">
                        {stu.rollNumber}
                      </td>
                      <td className="py-3 font-medium text-white">
                        {stu.name}
                        {stu.guardian && stu.guardian !== 'N/A' && (
                          <div className="text-[10px] text-slate-500">Guardian: {stu.guardian}</div>
                        )}
                      </td>
                      <td className="py-3 text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-300">
                          {stu.class} - Sec {stu.section}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-[11px]">
                        {stu.email}
                      </td>
                      <td className="py-3 text-right pr-4">
                        {isConfirming ? (
                          <div className="inline-flex items-center gap-1.5 animate-in fade-in">
                            <span className="text-[10px] text-red-400 font-semibold mr-1">Confirm?</span>
                            <button
                              type="button"
                              onClick={() => handleDelete(stu.rollNumber)}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Yes, Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-[11px] transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(stu.rollNumber)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-[11px] font-semibold transition-all cursor-pointer"
                            title="Delete Student Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Deleted records are permanently removed from JSON database</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
