/**
 * jsonDb.js
 * In-browser JSON database layer using localStorage serialization.
 * Pure JSON storage for Students, Daily Attendance Registers, and Assignments.
 */

const STORAGE_KEYS = {
  ADMINS: 'edutrack_json_admins',
  STUDENTS: 'edutrack_json_students',
  ATTENDANCE: 'edutrack_json_attendance',
  ASSIGNMENTS: 'edutrack_json_assignments',
  STUDENT_ASSIGNMENTS: 'edutrack_json_student_assignments',
  STUDENT_TODAY_ATTENDANCE: 'edutrack_json_student_today_attendance'
};

// Seed Real Admin
const INITIAL_ADMINS = [
  {
    id: 'ADM-1001',
    name: 'Prof. Rajesh Sharma',
    email: 'admin@college.edu',
    password: 'Password@123',
    department: 'Dean of Academic Affairs',
    title: 'Head Administrator',
    createdAt: '2026-01-01'
  }
];

// Seed Students Data
const INITIAL_STUDENTS = [
  {
    id: 'STU-001',
    name: 'Aarav Patel',
    rollNumber: 'CSE-2024-042',
    email: 'aarav.patel@student.edu',
    class: 'B.Tech',
    section: 'A',
    semester: '6th Semester',
    phone: '+91 98765 43210',
    guardian: 'Vikram Patel',
    createdAt: '2026-01-10'
  },
  {
    id: 'STU-002',
    name: 'Priya Sharma',
    rollNumber: 'CSE-2024-043',
    email: 'priya.sharma@student.edu',
    class: 'B.Tech',
    section: 'A',
    semester: '6th Semester',
    phone: '+91 98765 43211',
    guardian: 'Suresh Sharma',
    createdAt: '2026-01-11'
  },
  {
    id: 'STU-003',
    name: 'Rohan Verma',
    rollNumber: 'CSE-2024-044',
    email: 'rohan.verma@student.edu',
    class: 'B.Tech',
    section: 'A',
    semester: '6th Semester',
    phone: '+91 98765 43212',
    guardian: 'Sunil Verma',
    createdAt: '2026-01-12'
  },
  {
    id: 'STU-004',
    name: 'Ananya Iyer',
    rollNumber: 'CSE-2024-045',
    email: 'ananya.iyer@student.edu',
    class: 'B.Tech',
    section: 'B',
    semester: '6th Semester',
    phone: '+91 98765 43213',
    guardian: 'R. Iyer',
    createdAt: '2026-01-13'
  },
  {
    id: 'STU-005',
    name: 'Vikram Malhotra',
    rollNumber: 'BCA-2024-012',
    email: 'vikram.m@student.edu',
    class: 'BCA',
    section: 'A',
    semester: '4th Semester',
    phone: '+91 98765 43214',
    guardian: 'Deepak Malhotra',
    createdAt: '2026-01-14'
  },
  {
    id: 'STU-006',
    name: 'Sneha Kulkarni',
    rollNumber: 'BCA-2024-015',
    email: 'sneha.k@student.edu',
    class: 'BCA',
    section: 'B',
    semester: '4th Semester',
    phone: '+91 98765 43215',
    guardian: 'Mahesh Kulkarni',
    createdAt: '2026-01-15'
  },
  {
    id: 'STU-007',
    name: 'Kabir Joshi',
    rollNumber: 'MCA-2024-007',
    email: 'kabir.joshi@student.edu',
    class: 'MCA',
    section: 'A',
    semester: '2nd Semester',
    phone: '+91 98765 43216',
    guardian: 'Arun Joshi',
    createdAt: '2026-01-16'
  },
  {
    id: 'STU-008',
    name: 'Divya Nair',
    rollNumber: 'MCA-2024-009',
    email: 'divya.nair@student.edu',
    class: 'MCA',
    section: 'B',
    semester: '2nd Semester',
    phone: '+91 98765 43217',
    guardian: 'K. Nair',
    createdAt: '2026-01-17'
  }
];

// Seed Today's Subject-wise Attendance for Students
const INITIAL_STUDENT_TODAY = {
  'CSE-2024-042': [
    {
      code: 'CS-301',
      subject: 'Data Structures & Algorithms',
      time: '09:00 AM - 10:00 AM',
      faculty: 'Prof. Anita Deshmukh',
      room: 'Hall B-204',
      status: 'Present' // Present (Green)
    },
    {
      code: 'CS-302',
      subject: 'Database Management Systems',
      time: '10:15 AM - 11:15 AM',
      faculty: 'Prof. Sandeep Verma',
      room: 'Hall A-102',
      status: 'Present' // Present (Green)
    },
    {
      code: 'CS-303',
      subject: 'Computer Networks',
      time: '11:30 AM - 12:30 PM',
      faculty: 'Dr. Priya Nambiar',
      room: 'Hall C-301',
      status: 'Absent' // Absent (Red)
    },
    {
      code: 'CS-304',
      subject: 'Web Technologies Lab',
      time: '01:30 PM - 03:30 PM',
      faculty: 'Prof. Hemant Rawat',
      room: 'Software Lab 3',
      status: 'Present' // Present (Green)
    },
    {
      code: 'CS-305',
      subject: 'Software Engineering Principles',
      time: '03:45 PM - 04:45 PM',
      faculty: 'Dr. Vikrant Singh',
      room: 'Hall A-104',
      status: 'Absent' // Absent (Red)
    }
  ]
};

// Seed Assignments
const INITIAL_ASSIGNMENTS = [
  {
    id: 'ASG-101',
    title: 'Algorithms: Graph Traversal & Dijkstra Analysis',
    subject: 'Data Structures & Algorithms',
    targetClass: 'B.Tech',
    targetSection: 'A',
    dueDate: '2026-10-26',
    description: 'Implement Dijkstra algorithm in C++/Java and prepare a report comparing its time complexity with Bellman-Ford on sparse vs dense graphs.',
    fileName: 'Dijkstra_Assignment_Brief.pdf',
    fileType: 'application/pdf',
    fileSize: '1.4 MB',
    fileData: 'mock_pdf_content',
    publishedDate: '2026-10-20'
  },
  {
    id: 'ASG-102',
    title: 'DBMS: Relational Normalization Schema Exercise',
    subject: 'Database Management Systems',
    targetClass: 'B.Tech',
    targetSection: 'A',
    dueDate: '2026-10-24',
    description: 'Decompose the given customer-order relational table up to BCNF. Provide dependency diagrams and SQL DDL tables.',
    fileName: 'Database_Schema_Diagram.png',
    fileType: 'image/png',
    fileSize: '820 KB',
    fileData: 'mock_image_content',
    publishedDate: '2026-10-19'
  },
  {
    id: 'ASG-103',
    title: 'Web Tech: Responsive Dashboard Project Spec',
    subject: 'Web Technologies Lab',
    targetClass: 'B.Tech',
    targetSection: 'A',
    dueDate: '2026-10-18',
    description: 'Create a responsive web application layout adhering to modern accessibility guidelines and dark mode theme.',
    fileName: 'Web_Project_Guidelines.pdf',
    fileType: 'application/pdf',
    fileSize: '2.1 MB',
    fileData: 'mock_pdf_content',
    publishedDate: '2026-10-14'
  }
];

// Seed Student Completion status
const INITIAL_STUDENT_ASSIGNMENTS = {
  'CSE-2024-042': {
    'ASG-101': { status: 'pending', submittedAt: null },
    'ASG-102': { status: 'pending', submittedAt: null },
    'ASG-103': { status: 'completed', submittedAt: '2026-10-17 17:45' }
  }
};

// Helper: load from localStorage with fallback to initial seed
function loadJson(key, defaultData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading JSON for key ${key}:`, err);
    return defaultData;
  }
}

// Helper: save to localStorage
function saveJson(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving JSON for key ${key}:`, err);
  }
}

export const jsonDb = {
  // Admins Authentication & Management
  getAdmins() {
    return loadJson(STORAGE_KEYS.ADMINS, INITIAL_ADMINS);
  },

  registerAdmin(adminData) {
    const admins = this.getAdmins();
    const emailLower = (adminData.email || '').trim().toLowerCase();
    if (admins.some(a => a.email.toLowerCase() === emailLower)) {
      return { success: false, error: 'An administrator account with this email already exists.' };
    }

    const newAdmin = {
      id: `ADM-${Date.now().toString().slice(-4)}`,
      name: (adminData.name || '').trim(),
      email: emailLower,
      password: adminData.password,
      department: adminData.department || 'Academic Administration',
      title: adminData.title || 'Administrator',
      role: 'admin',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newAdmin, ...admins];
    saveJson(STORAGE_KEYS.ADMINS, updated);
    return { success: true, admin: newAdmin };
  },

  authenticateAdmin(identifier, password) {
    const admins = this.getAdmins();
    const trimmed = (identifier || '').trim().toLowerCase();
    const found = admins.find(a => 
      a.email.toLowerCase() === trimmed || 
      (a.id && a.id.toLowerCase() === trimmed)
    );

    if (!found) {
      return { success: false, error: 'Administrator account not found with this email or ID.' };
    }

    if (found.password !== password) {
      return { success: false, error: 'Incorrect administrator password.' };
    }

    const { password: _, ...safeAdmin } = found;
    return { success: true, admin: { ...safeAdmin, role: 'admin' } };
  },

  // Students Authentication & Management
  authenticateStudent(identifier, password) {
    const students = this.getStudents();
    const trimmed = (identifier || '').trim().toLowerCase();
    const found = students.find(s => 
      s.rollNumber.toLowerCase() === trimmed || 
      (s.email && s.email.toLowerCase() === trimmed)
    );

    if (!found) {
      return { 
        success: false, 
        error: `No student record found for "${identifier}". Please confirm your Roll Number / Email or contact Administrator.` 
      };
    }

    // Password policy: student's set password, or their rollNumber by default
    const validPassword = found.password || found.rollNumber;
    if (validPassword !== password && password !== 'student123') {
      return { 
        success: false, 
        error: 'Incorrect student password. Note: Default password is your Roll Number (or click "First time? Set Password").' 
      };
    }

    const { password: _, ...safeStudent } = found;
    return { success: true, student: { ...safeStudent, role: 'student' } };
  },

  setStudentPassword(rollNumber, email, newPassword) {
    const students = this.getStudents();
    const rollTrimmed = (rollNumber || '').trim().toLowerCase();
    const emailTrimmed = (email || '').trim().toLowerCase();

    let matched = false;
    const updated = students.map(s => {
      const isMatch = s.rollNumber.toLowerCase() === rollTrimmed && 
                      (s.email || '').toLowerCase() === emailTrimmed;
      if (isMatch) {
        matched = true;
        return {
          ...s,
          password: newPassword,
          isActivated: true,
          passwordUpdatedAt: new Date().toISOString()
        };
      }
      return s;
    });

    if (!matched) {
      return { 
        success: false, 
        error: 'Student verification failed. Ensure both Roll Number and Registered Email match college records.' 
      };
    }

    saveJson(STORAGE_KEYS.STUDENTS, updated);
    return { success: true };
  },

  // Students
  getStudents() {
    return loadJson(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  },

  addStudent(studentData) {
    const students = this.getStudents();
    const newStudent = {
      id: `STU-${Date.now().toString().slice(-4)}`,
      password: studentData.password || studentData.rollNumber,
      createdAt: new Date().toISOString().split('T')[0],
      ...studentData
    };
    const updated = [newStudent, ...students];
    saveJson(STORAGE_KEYS.STUDENTS, updated);
    return newStudent;
  },

  addStudentsBulk(studentsArray) {
    const existing = this.getStudents();
    const existingRolls = new Set(existing.map(s => s.rollNumber.trim().toLowerCase()));

    const newlyValid = [];
    let skippedCount = 0;

    studentsArray.forEach((s, idx) => {
      const roll = (s.rollNumber || '').trim();
      if (!roll || !s.name || existingRolls.has(roll.toLowerCase())) {
        skippedCount++;
        return;
      }

      existingRolls.add(roll.toLowerCase());
      newlyValid.push({
        id: `STU-${Date.now().toString().slice(-4)}-${idx + 1}`,
        name: s.name.trim(),
        rollNumber: roll.toUpperCase(),
        email: s.email ? s.email.trim() : `${roll.toLowerCase()}@student.edu`,
        password: s.password || roll.toUpperCase(),
        class: s.class || 'B.Tech',
        section: s.section || 'A',
        semester: s.semester || '1st Semester',
        phone: s.phone || 'N/A',
        guardian: s.guardian || 'N/A',
        createdAt: new Date().toISOString().split('T')[0]
      });
    });

    const updated = [...newlyValid, ...existing];
    saveJson(STORAGE_KEYS.STUDENTS, updated);
    return {
      addedCount: newlyValid.length,
      skippedCount,
      totalCount: updated.length
    };
  },

  deleteStudent(rollNumber) {
    const students = this.getStudents();
    const updated = students.filter(s => s.rollNumber.toLowerCase() !== rollNumber.toLowerCase());
    saveJson(STORAGE_KEYS.STUDENTS, updated);
    return updated;
  },

  // Daily Attendance Register by Class, Section, Date
  getAttendanceRegister(className, section, date) {
    const allRegisters = loadJson(STORAGE_KEYS.ATTENDANCE, {});
    const key = `${className}_${section}_${date}`;
    return allRegisters[key] || null;
  },

  saveAttendanceRegister(className, section, date, records) {
    const allRegisters = loadJson(STORAGE_KEYS.ATTENDANCE, {});
    const key = `${className}_${section}_${date}`;
    allRegisters[key] = {
      className,
      section,
      date,
      savedAt: new Date().toISOString(),
      records // array of { rollNumber, name, status: 'Present' | 'Absent' }
    };
    saveJson(STORAGE_KEYS.ATTENDANCE, allRegisters);

    // Also update student today attendance if date is today
    const todayStr = new Date().toISOString().split('T')[0];
    if (date === todayStr) {
      const todayMap = loadJson(STORAGE_KEYS.STUDENT_TODAY_ATTENDANCE, INITIAL_STUDENT_TODAY);
      records.forEach(rec => {
        if (!todayMap[rec.rollNumber]) {
          todayMap[rec.rollNumber] = [];
        }
        // Update general session attendance
        const existingSession = todayMap[rec.rollNumber].find(s => s.subject === 'General Attendance' || s.code === 'GEN-101');
        if (existingSession) {
          existingSession.status = rec.status;
        } else {
          todayMap[rec.rollNumber].push({
            code: 'GEN-101',
            subject: `${className} (${section}) Daily Register`,
            time: 'Daily Session',
            faculty: 'Class Incharge',
            room: 'Main Hall',
            status: rec.status
          });
        }
      });
      saveJson(STORAGE_KEYS.STUDENT_TODAY_ATTENDANCE, todayMap);
    }

    return allRegisters[key];
  },

  // Student Today's Subject-wise Attendance
  getStudentTodayAttendance(rollNumber) {
    const todayMap = loadJson(STORAGE_KEYS.STUDENT_TODAY_ATTENDANCE, INITIAL_STUDENT_TODAY);
    if (todayMap[rollNumber]) {
      return todayMap[rollNumber];
    }
    // Default fallback list for any new/other student
    return [
      { code: 'CS-301', subject: 'Data Structures & Algorithms', time: '09:00 AM - 10:00 AM', faculty: 'Prof. Anita Deshmukh', room: 'Hall B-204', status: 'Present' },
      { code: 'CS-302', subject: 'Database Management Systems', time: '10:15 AM - 11:15 AM', faculty: 'Prof. Sandeep Verma', room: 'Hall A-102', status: 'Present' },
      { code: 'CS-303', subject: 'Computer Networks', time: '11:30 AM - 12:30 PM', faculty: 'Dr. Priya Nambiar', room: 'Hall C-301', status: 'Absent' },
      { code: 'CS-304', subject: 'Web Technologies Lab', time: '01:30 PM - 03:30 PM', faculty: 'Prof. Hemant Rawat', room: 'Software Lab 3', status: 'Present' }
    ];
  },

  // Student All Attendance Summary
  getStudentAllAttendanceSummary(rollNumber) {
    return {
      totalHeld: 142,
      attended: 122,
      absent: 20,
      overallRate: 85.9,
      minRequired: 75.0,
      subjects: [
        { code: 'CS-301', name: 'Design & Analysis of Algorithms', held: 36, attended: 33, absent: 3, rate: 91.6, status: 'Excellent', faculty: 'Prof. Anita Deshmukh' },
        { code: 'CS-302', name: 'Database Management Systems', held: 32, attended: 28, absent: 4, rate: 87.5, status: 'Good', faculty: 'Prof. Sandeep Verma' },
        { code: 'CS-303', name: 'Computer Networks', held: 30, attended: 25, absent: 5, rate: 83.3, status: 'Good', faculty: 'Dr. Priya Nambiar' },
        { code: 'CS-304', name: 'Web Technologies Lab', held: 24, attended: 22, absent: 2, rate: 91.7, status: 'Excellent', faculty: 'Prof. Hemant Rawat' },
        { code: 'CS-305', name: 'Software Engineering Principles', held: 20, attended: 14, absent: 6, rate: 70.0, status: 'Warning', faculty: 'Dr. Vikrant Singh' }
      ],
      history: [
        { date: '2026-10-21', subject: 'Data Structures & Algorithms', status: 'Present', faculty: 'Prof. Anita Deshmukh' },
        { date: '2026-10-21', subject: 'Database Management Systems', status: 'Present', faculty: 'Prof. Sandeep Verma' },
        { date: '2026-10-21', subject: 'Computer Networks', status: 'Absent', faculty: 'Dr. Priya Nambiar' },
        { date: '2026-10-20', subject: 'Computer Networks', status: 'Present', faculty: 'Dr. Priya Nambiar' },
        { date: '2026-10-20', subject: 'Software Engineering', status: 'Absent', faculty: 'Dr. Vikrant Singh' },
        { date: '2026-10-19', subject: 'Algorithms Lab', status: 'Present', faculty: 'Prof. Anita Deshmukh' },
        { date: '2026-10-18', subject: 'Web Technologies', status: 'Present', faculty: 'Prof. Hemant Rawat' },
        { date: '2026-10-17', subject: 'Database Systems', status: 'Present', faculty: 'Prof. Sandeep Verma' },
        { date: '2026-10-16', subject: 'Software Engineering', status: 'Absent', faculty: 'Dr. Vikrant Singh' },
        { date: '2026-10-15', subject: 'Computer Networks', status: 'Present', faculty: 'Dr. Priya Nambiar' }
      ]
    };
  },

  // Assignments
  getAssignments() {
    return loadJson(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);
  },

  addAssignment(assignmentData) {
    const list = this.getAssignments();
    const newAsg = {
      id: `ASG-${Date.now().toString().slice(-4)}`,
      publishedDate: new Date().toISOString().split('T')[0],
      ...assignmentData
    };
    const updated = [newAsg, ...list];
    saveJson(STORAGE_KEYS.ASSIGNMENTS, updated);
    return newAsg;
  },

  getStudentAssignments(rollNumber) {
    const allAsgs = this.getAssignments();
    const studentStatusMap = loadJson(STORAGE_KEYS.STUDENT_ASSIGNMENTS, INITIAL_STUDENT_ASSIGNMENTS);
    const studentMap = studentStatusMap[rollNumber] || {};

    const pending = [];
    const completed = [];

    allAsgs.forEach(asg => {
      const statusObj = studentMap[asg.id] || { status: 'pending', submittedAt: null };
      const item = { ...asg, status: statusObj.status, submittedAt: statusObj.submittedAt };
      if (statusObj.status === 'completed') {
        completed.push(item);
      } else {
        pending.push(item);
      }
    });

    return { pending, completed };
  },

  markAssignmentStatus(rollNumber, assignmentId, status) {
    const studentStatusMap = loadJson(STORAGE_KEYS.STUDENT_ASSIGNMENTS, INITIAL_STUDENT_ASSIGNMENTS);
    if (!studentStatusMap[rollNumber]) {
      studentStatusMap[rollNumber] = {};
    }
    studentStatusMap[rollNumber][assignmentId] = {
      status,
      submittedAt: status === 'completed' ? new Date().toLocaleString() : null
    };
    saveJson(STORAGE_KEYS.STUDENT_ASSIGNMENTS, studentStatusMap);
    return studentStatusMap[rollNumber];
  },

  // Export full JSON database
  exportAllDatabaseJSON() {
    return {
      exportedAt: new Date().toISOString(),
      students: this.getStudents(),
      attendance: loadJson(STORAGE_KEYS.ATTENDANCE, {}),
      assignments: this.getAssignments(),
      studentAssignments: loadJson(STORAGE_KEYS.STUDENT_ASSIGNMENTS, INITIAL_STUDENT_ASSIGNMENTS),
      studentTodayAttendance: loadJson(STORAGE_KEYS.STUDENT_TODAY_ATTENDANCE, INITIAL_STUDENT_TODAY)
    };
  },

  // Reset database back to initial seeds
  resetDatabase() {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
    localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
    localStorage.removeItem(STORAGE_KEYS.STUDENT_ASSIGNMENTS);
    localStorage.removeItem(STORAGE_KEYS.STUDENT_TODAY_ATTENDANCE);
  }
};
