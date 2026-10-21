import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  FilePlus, 
  X, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  BookOpen, 
  Send, 
  Layers, 
  AlertCircle, 
  Check, 
  Eye
} from 'lucide-react';

export const AssignmentModal = ({ onClose }) => {
  const { addAssignment } = useData();

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Data Structures & Algorithms',
    targetClass: 'B.Tech',
    targetSection: 'A',
    dueDate: '',
    description: ''
  });

  const [fileData, setFileData] = useState(null); // { name, type, size, content }
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Handle file or photo selection (PDF or image format)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a file in PDF or Image (.png, .jpg, .jpeg) format only.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setFileData({
        fileName: file.name,
        fileType: file.type,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        fileData: result
      });

      if (file.type.startsWith('image/')) {
        setFilePreview(result);
      } else {
        setFilePreview(null);
      }
    };
    reader.readAsDataURL(file);
    setError('');
  };

  const removeFile = () => {
    setFileData(null);
    setFilePreview(null);
  };

  const handlePublish = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Assignment Title is required.');
      return;
    }
    if (!formData.dueDate) {
      setError('Please select a Due Date for this assignment.');
      return;
    }

    addAssignment({
      title: formData.title.trim(),
      subject: formData.subject,
      targetClass: formData.targetClass,
      targetSection: formData.targetSection,
      dueDate: formData.dueDate,
      description: formData.description.trim() || 'No description provided.',
      fileName: fileData?.fileName || 'Reference_Material.pdf',
      fileType: fileData?.fileType || 'application/pdf',
      fileSize: fileData?.fileSize || '1.2 MB',
      fileData: fileData?.fileData || null
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl shadow-indigo-950/60 relative transform animate-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto"
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
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FilePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Publish New Assignment</h2>
            <p className="text-xs text-slate-400">Upload brief in PDF or Image format and broadcast to students</p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-4">
          
          {/* Assignment Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Assignment Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Unit 3: Graph Traversal Algorithms Implementation"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Subject & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subject / Course
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="Database Management Systems">Database Management Systems</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Web Technologies Lab">Web Technologies Lab</option>
                <option value="Software Engineering Principles">Software Engineering Principles</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Machine Learning">Machine Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Due Date <span className="text-red-400">*</span></span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer font-sans"
                required
              />
            </div>
          </div>

          {/* Target Audience: Class & Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Class
              </label>
              <select
                name="targetClass"
                value={formData.targetClass}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc">B.Sc Computer Science</option>
                <option value="All Classes">All Classes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Section
              </label>
              <select
                name="targetSection"
                value={formData.targetSection}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="All">All Sections</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description & Submission Instructions
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Provide assignment objectives, test cases, and formatting instructions..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Upload File / Photo option in PDF or Image format */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Attach File or Photo (PDF / Image)</span>
              <span className="text-[11px] text-slate-400">PDF, JPG, PNG up to 5MB</span>
            </label>

            {!fileData ? (
              <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/70 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-white">Click to upload file or photo</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Supports PDF documents and Image attachments</div>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  {filePreview ? (
                    <img 
                      src={filePreview} 
                      alt="Attachment Preview" 
                      className="w-12 h-12 object-cover rounded-lg border border-slate-600 shrink-0" 
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-white truncate max-w-xs">
                      {fileData.fileName}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="uppercase text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-900/60 text-indigo-300">
                        {fileData.fileType.includes('pdf') ? 'PDF Document' : 'Image'}
                      </span>
                      <span>{fileData.fileSize}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-700/80 flex items-center justify-end gap-3">
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
              <Send className="w-3.5 h-3.5" />
              <span>Publish Assignment</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
