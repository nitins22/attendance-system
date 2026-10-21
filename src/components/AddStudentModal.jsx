import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BulkAddStudentsModal } from './BulkAddStudentsModal';
import { 
  UserPlus, 
  X, 
  User, 
  Hash, 
  Mail, 
  GraduationCap, 
  Layers, 
  Phone, 
  ShieldAlert, 
  Save, 
  Sparkles,
  Calendar,
  Users
} from 'lucide-react';

export const AddStudentModal = ({ onClose, initialMode = 'single' }) => {
  const { addStudent } = useData();
  const [mode, setMode] = useState(initialMode); // 'single' | 'bulk'

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    class: 'B.Tech',
    section: 'A',
    semester: '1st Semester',
    phone: '',
    guardian: '',
    password: ''
  });

  const [error, setError] = useState('');

  if (mode === 'bulk') {
    return (
      <BulkAddStudentsModal 
        onClose={onClose} 
        onSwitchToSingle={() => setMode('single')} 
      />
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for mandatory fields
    if (!formData.name.trim()) {
      setError('Student Name is mandatory.');
      return;
    }
    if (!formData.rollNumber.trim()) {
      setError('Roll Number is mandatory.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Student Email is mandatory.');
      return;
    }
    if (!formData.class) {
      setError('Class is mandatory.');
      return;
    }
    if (!formData.section) {
      setError('Section is mandatory.');
      return;
    }

    // Save student
    addStudent({
      name: formData.name.trim(),
      rollNumber: formData.rollNumber.trim().toUpperCase(),
      email: formData.email.trim(),
      password: formData.password.trim() || formData.rollNumber.trim().toUpperCase(),
      class: formData.class,
      section: formData.section,
      semester: formData.semester,
      phone: formData.phone.trim() || 'N/A',
      guardian: formData.guardian.trim() || 'N/A'
    });

    onClose();
  };

  // Quick helper to fill dummy student for easy testing
  const fillSample = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFormData({
      name: 'Kunal Singhania',
      rollNumber: `CSE-2024-${randomNum}`,
      email: `kunal.${randomNum}@student.edu`,
      class: 'B.Tech',
      section: 'A',
      semester: '6th Semester',
      phone: '+91 98123 45678',
      guardian: 'Rajesh Singhania'
    });
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl shadow-indigo-950/50 relative transform animate-in zoom-in-95 duration-200 my-8"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Add New Student</h2>
              <p className="text-xs text-slate-400">Add student record into JSON database</p>
            </div>
          </div>
        </div>

        {/* Mode Switcher: Single vs Bulk */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 mb-5">
          <button
            type="button"
            onClick={() => setMode('single')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all cursor-pointer"
          >
            👤 Single Student
          </button>
          <button
            type="button"
            onClick={() => setMode('bulk')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>👥 Bulk Import (CSV / Excel)</span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Name & Roll Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Roll Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="e.g. CSE-2024-089"
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono uppercase"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Student Email <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@edutrack.edu"
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 00000"
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Class, Section & Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Class / Degree <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  required
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc">B.Sc Computer Science</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Section <span className="text-red-400">*</span>
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                required
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Semester
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>
            </div>
          </div>

          {/* Row 4: Guardian Name & Student Initial Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Guardian / Parent Name
              </label>
              <input
                type="text"
                name="guardian"
                value={formData.guardian}
                onChange={handleChange}
                placeholder="e.g. Ramesh Sharma"
                className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Login Password</span>
                <span className="text-[10px] text-slate-400 font-normal">Optional</span>
              </label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Defaults to Roll Number"
                className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={fillSample}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Sample Data</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Student Record</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
