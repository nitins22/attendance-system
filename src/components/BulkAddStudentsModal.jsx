import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Users, 
  X, 
  Upload, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Wand2, 
  ClipboardPaste, 
  Trash2,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';

export const BulkAddStudentsModal = ({ onClose, onSwitchToSingle }) => {
  const { addStudentsBulk } = useData();

  // Active Tab inside Bulk modal: 'paste' | 'upload' | 'generator'
  const [activeTab, setActiveTab] = useState('paste');

  // Textarea input
  const [pasteText, setPasteText] = useState('');

  // Generated or parsed students list ready for preview & import
  const [parsedStudents, setParsedStudents] = useState([]);
  const [error, setError] = useState('');

  // Batch Generator Form State
  const [genClass, setGenClass] = useState('B.Tech');
  const [genSection, setGenSection] = useState('A');
  const [genSemester, setGenSemester] = useState('6th Semester');
  const [genPrefix, setGenPrefix] = useState('CSE-2024-');
  const [genStartRoll, setGenStartRoll] = useState(50);
  const [genCount, setGenCount] = useState(15);

  // Parse CSV or delimited text
  const parseDelimitedText = (text) => {
    if (!text.trim()) {
      setParsedStudents([]);
      return;
    }

    const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const results = [];

    // Check if line 1 is header
    const firstLineLower = lines[0].toLowerCase();
    const startIndex = (firstLineLower.includes('name') && firstLineLower.includes('roll')) ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      // Split by tab or comma
      const delimiter = line.includes('\t') ? '\t' : ',';
      const parts = line.split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));

      if (parts.length >= 2) {
        const name = parts[0] || '';
        const rollNumber = (parts[1] || '').toUpperCase();
        const email = parts[2] || (rollNumber ? `${rollNumber.toLowerCase()}@student.edu` : '');
        const className = parts[3] || 'B.Tech';
        const section = parts[4] || 'A';
        const semester = parts[5] || '1st Semester';
        const phone = parts[6] || 'N/A';
        const guardian = parts[7] || 'N/A';

        if (name && rollNumber) {
          results.push({
            name,
            rollNumber,
            email,
            class: className,
            section,
            semester,
            phone,
            guardian
          });
        }
      }
    }

    setParsedStudents(results);
    setError(results.length === 0 ? 'Could not parse any valid student records. Ensure Name and Roll Number columns exist.' : '');
  };

  // Handle File Upload (.csv or .txt)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt') && !file.name.endsWith('.tsv')) {
      setError('Please upload a .csv, .tsv, or .txt file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setPasteText(content);
      parseDelimitedText(content);
      setError('');
    };
    reader.readAsText(file);
  };

  // Download Sample CSV template
  const downloadSampleTemplate = () => {
    const csvContent = 
`Name,Roll Number,Email,Class,Section,Semester,Contact Phone,Guardian Name
Manish Verma,CSE-2024-051,manish.v@student.edu,B.Tech,A,6th Semester,+91 98765 11111,S. Verma
Ritu Aggarwal,CSE-2024-052,ritu.a@student.edu,B.Tech,A,6th Semester,+91 98765 22222,P. Aggarwal
Aditya Mishra,CSE-2024-053,aditya.m@student.edu,B.Tech,A,6th Semester,+91 98765 33333,R. Mishra
Tanya Chawla,CSE-2024-054,tanya.c@student.edu,B.Tech,A,6th Semester,+91 98765 44444,K. Chawla
Gaurav Pandey,CSE-2024-055,gaurav.p@student.edu,B.Tech,A,6th Semester,+91 98765 55555,D. Pandey`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students_bulk_import_template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Pre-load 10 Sample Students for instant testing
  const loadDemoRoster = (dept = 'B.Tech') => {
    const sampleBatch = dept === 'B.Tech' ? 
`Kavya Natarajan, CSE-2024-061, kavya.n@student.edu, B.Tech, A, 6th Semester, +91 98111 22331, Natarajan S.
Harsh Vardhan, CSE-2024-062, harsh.v@student.edu, B.Tech, A, 6th Semester, +91 98111 22332, V. Vardhan
Meera Nambiar, CSE-2024-063, meera.n@student.edu, B.Tech, A, 6th Semester, +91 98111 22333, K. Nambiar
Nikhil Saxena, CSE-2024-064, nikhil.s@student.edu, B.Tech, A, 6th Semester, +91 98111 22334, R. Saxena
Ishaan Ghosh, CSE-2024-065, ishaan.g@student.edu, B.Tech, A, 6th Semester, +91 98111 22335, S. Ghosh
Anika Deshmukh, CSE-2024-066, anika.d@student.edu, B.Tech, A, 6th Semester, +91 98111 22336, Deshmukh P.
Tarun Khanna, CSE-2024-067, tarun.k@student.edu, B.Tech, A, 6th Semester, +91 98111 22337, Khanna M.
Simran Bhatia, CSE-2024-068, simran.b@student.edu, B.Tech, A, 6th Semester, +91 98111 22338, Bhatia G.
Devansh Sen, CSE-2024-069, devansh.s@student.edu, B.Tech, A, 6th Semester, +91 98111 22339, Sen B.
Zoya Farooqui, CSE-2024-070, zoya.f@student.edu, B.Tech, A, 6th Semester, +91 98111 22340, Farooqui A.` :
`Varun Joshi, BCA-2024-021, varun.j@student.edu, BCA, B, 4th Semester, +91 98222 33441, Joshi K.
Pooja Hegde, BCA-2024-022, pooja.h@student.edu, BCA, B, 4th Semester, +91 98222 33442, Hegde M.
Siddharth Rao, BCA-2024-023, sid.r@student.edu, BCA, B, 4th Semester, +91 98222 33443, Rao S.
Tanvi Kulkarni, BCA-2024-024, tanvi.k@student.edu, BCA, B, 4th Semester, +91 98222 33444, Kulkarni A.
Aman Gill, BCA-2024-025, aman.g@student.edu, BCA, B, 4th Semester, +91 98222 33445, Gill H.`;

    setPasteText(sampleBatch);
    parseDelimitedText(sampleBatch);
  };

  // Generate automated class roll range
  const handleGenerateBatch = () => {
    const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith', 'Ananya', 'Diya', 'Gauri', 'Isha', 'Kavya', 'Khushi', 'Mira', 'Navya', 'Pooja', 'Riya'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Patel', 'Kumar', 'Singh', 'Iyer', 'Reddy', 'Nair', 'Mehta', 'Bhat', 'Deshmukh', 'Joshi', 'Chopra', 'Malhotra'];

    const generated = [];
    const count = Math.min(Math.max(Number(genCount) || 10, 1), 50);
    const start = Number(genStartRoll) || 1;

    for (let i = 0; i < count; i++) {
      const rollNum = start + i;
      const formattedRoll = `${genPrefix}${String(rollNum).padStart(3, '0')}`;
      const fn = firstNames[(rollNum + i) % firstNames.length];
      const ln = lastNames[(rollNum * 3 + i) % lastNames.length];
      const name = `${fn} ${ln}`;
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@student.edu`;

      generated.push({
        name,
        rollNumber: formattedRoll,
        email,
        class: genClass,
        section: genSection,
        semester: genSemester,
        phone: `+91 98765 ${String(10000 + rollNum).slice(-5)}`,
        guardian: `${ln} Family`
      });
    }

    setParsedStudents(generated);
    setError('');
  };

  // Submit and save bulk students
  const handleSaveBulk = () => {
    if (parsedStudents.length === 0) {
      setError('No student records found to import.');
      return;
    }

    addStudentsBulk(parsedStudents);
    onClose();
  };

  // Remove a single student from the preview table
  const removePreviewItem = (index) => {
    setParsedStudents(prev => prev.filter((_, i) => i !== index));
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Bulk Student Import</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Batch Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">Add dozens or hundreds of students into JSON storage in one click</p>
            </div>
          </div>

          {onSwitchToSingle && (
            <button
              onClick={onSwitchToSingle}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline self-start sm:self-auto cursor-pointer"
            >
              Switch to Single Student Form
            </button>
          )}
        </div>

        {/* 3 Import Mode Tabs */}
        <div className="flex items-center p-1.5 rounded-xl bg-slate-800 border border-slate-700/70 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'paste'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ClipboardPaste className="w-4 h-4" />
            <span>Copy-Paste Excel / CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload CSV / Excel File</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Quick Batch Generator</span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: Copy-Paste Excel / CSV */}
        {activeTab === 'paste' && (
          <div className="space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">
                Paste student records (Comma or Tab separated: Name, Roll Number, Email, Class, Section)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadDemoRoster('B.Tech')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load 10 B.Tech Demo</span>
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => loadDemoRoster('BCA')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load 5 BCA Demo</span>
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={pasteText}
              onChange={(e) => {
                setPasteText(e.target.value);
                parseDelimitedText(e.target.value);
              }}
              placeholder={`Example:\nRahul Sharma, CSE-2024-051, rahul.s@student.edu, B.Tech, A\nNeha Gupta, CSE-2024-052, neha.g@student.edu, B.Tech, A\nAmit Kumar, CSE-2024-053, amit.k@student.edu, B.Tech, A`}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-indigo-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        )}

        {/* TAB 2: Upload CSV / Excel File */}
        {activeTab === 'upload' && (
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3 shrink-0">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-white">Upload .CSV or Excel Export</span>
              <button
                type="button"
                onClick={downloadSampleTemplate}
                className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-900/50 hover:bg-slate-900/80 transition-all">
              <FileSpreadsheet className="w-8 h-8 text-indigo-400 mb-2" />
              <div className="text-xs font-semibold text-white">Click or drag & drop CSV file here</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Supports CSV, TSV, or TXT format</div>
              <input
                type="file"
                accept=".csv,.tsv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* TAB 3: Quick Batch Generator */}
        {activeTab === 'generator' && (
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3 shrink-0">
            <div className="text-xs font-semibold text-white">
              Generate Class Roster Automatically
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Class</label>
                <select
                  value={genClass}
                  onChange={(e) => setGenClass(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Section</label>
                <select
                  value={genSection}
                  onChange={(e) => setGenSection(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Roll Prefix</label>
                <input
                  type="text"
                  value={genPrefix}
                  onChange={(e) => setGenPrefix(e.target.value)}
                  placeholder="e.g. CSE-2024-"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Count (Max 50)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={genCount}
                  onChange={(e) => setGenCount(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleGenerateBatch}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Generate {genCount} Students Preview</span>
              </button>
            </div>
          </div>
        )}

        {/* PARSED PREVIEW TABLE */}
        <div className="flex-1 flex flex-col min-h-0 mt-4">
          <div className="flex items-center justify-between mb-2 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Parsed Students Preview
              </h3>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                parsedStudents.length > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {parsedStudents.length} Students Detected
              </span>
            </div>

            {parsedStudents.length > 0 && (
              <button
                type="button"
                onClick={() => setParsedStudents([])}
                className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {parsedStudents.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
              <Users className="w-8 h-8 text-slate-600 mb-2" />
              <div className="text-xs text-slate-400">
                Paste student rows above, upload a CSV file, or click <strong>Load Demo</strong> to preview records.
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto rounded-xl border border-slate-700/80 bg-slate-900/60 divide-y divide-slate-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-slate-800 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-2 pl-3">#</th>
                    <th className="py-2">Roll No</th>
                    <th className="py-2">Student Name</th>
                    <th className="py-2">Class & Section</th>
                    <th className="py-2">Email</th>
                    <th className="py-2 text-right pr-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {parsedStudents.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2 pl-3 text-slate-500 text-[11px]">{idx + 1}</td>
                      <td className="py-2 font-mono font-bold text-indigo-300">{s.rollNumber}</td>
                      <td className="py-2 font-medium text-white">{s.name}</td>
                      <td className="py-2 text-slate-300">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">
                          {s.class} - {s.section}
                        </span>
                      </td>
                      <td className="py-2 text-slate-400 font-mono text-[11px]">{s.email}</td>
                      <td className="py-2 text-right pr-3">
                        <button
                          type="button"
                          onClick={() => removePreviewItem(idx)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Remove from batch"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            {parsedStudents.length > 0 
              ? `Ready to import ${parsedStudents.length} student records into JSON` 
              : 'Add records to proceed'}
          </span>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={parsedStudents.length === 0}
              onClick={handleSaveBulk}
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Import {parsedStudents.length} Students Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
