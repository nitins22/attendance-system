export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@edutrack.edu',
    password: 'admin123',
    role: 'admin',
    name: 'Dr. Rajesh Sharma',
    title: 'Dean of Academic Affairs',
    department: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    adminId: 'ADM-9021'
  },
  student: {
    email: 'aarav.patel@student.edu',
    rollNumber: 'CSE-2024-042',
    password: 'student123',
    role: 'student',
    name: 'Aarav Patel',
    program: 'B.Tech - Computer Science & Engineering',
    semester: '6th Semester',
    section: 'Section A',
    batch: '2023 - 2027',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    advisor: 'Dr. Neha Kapoor'
  }
};

export const ADMIN_STATS = {
  totalStudents: 1480,
  presentToday: 1320,
  overallRate: 89.2,
  rateChange: '+2.4%',
  totalClassesToday: 38,
  classesCompleted: 24,
  defaultersCount: 28,
  activeFaculty: 72
};

export const TODAY_CLASS_SESSIONS = [
  {
    id: 'CS301-A',
    subject: 'Data Structures & Algorithms',
    code: 'CS-301',
    faculty: 'Prof. Anita Deshmukh',
    batch: 'B.Tech CSE - 3rd Sem',
    time: '09:00 AM - 10:00 AM',
    room: 'Hall B-204',
    totalStudents: 64,
    present: 60,
    absent: 4,
    rate: 93.8,
    status: 'Completed'
  },
  {
    id: 'CS302-B',
    subject: 'Operating Systems & Linux',
    code: 'CS-302',
    faculty: 'Dr. Vikrant Singh',
    batch: 'B.Tech CSE - 5th Sem',
    time: '10:15 AM - 11:15 AM',
    room: 'Lab 4',
    totalStudents: 58,
    present: 52,
    absent: 6,
    rate: 89.6,
    status: 'Completed'
  },
  {
    id: 'CS303-A',
    subject: 'Database Management Systems',
    code: 'CS-303',
    faculty: 'Prof. Sandeep Verma',
    batch: 'B.Tech IT - 4th Sem',
    time: '11:30 AM - 12:30 PM',
    room: 'Hall A-102',
    totalStudents: 62,
    present: 54,
    absent: 8,
    rate: 87.1,
    status: 'In Progress'
  },
  {
    id: 'CS304-C',
    subject: 'Computer Networks & Security',
    code: 'CS-304',
    faculty: 'Dr. Priya Nambiar',
    batch: 'B.Tech CSE - 6th Sem',
    time: '01:30 PM - 02:30 PM',
    room: 'Hall C-301',
    totalStudents: 60,
    present: 0,
    absent: 0,
    rate: 0,
    status: 'Upcoming'
  },
  {
    id: 'CS305-A',
    subject: 'Machine Learning & AI',
    code: 'CS-305',
    faculty: 'Dr. Rajesh Sharma',
    batch: 'B.Tech AI-DS - 6th Sem',
    time: '02:45 PM - 03:45 PM',
    room: 'Lab 7',
    totalStudents: 50,
    present: 0,
    absent: 0,
    rate: 0,
    status: 'Upcoming'
  }
];

export const DEPARTMENT_ATTENDANCE = [
  { dept: 'Computer Science & Engg', code: 'CSE', rate: 92.4, students: 480 },
  { dept: 'Information Technology', code: 'IT', rate: 90.1, students: 240 },
  { dept: 'Electronics & Comm.', code: 'ECE', rate: 86.8, students: 320 },
  { dept: 'Mechanical Engineering', code: 'ME', rate: 84.5, students: 220 },
  { dept: 'Civil Engineering', code: 'CE', rate: 81.2, students: 220 }
];

export const RECENT_ACTIVITY_LOGS = [
  {
    id: 1,
    time: '10 mins ago',
    type: 'attendance_marked',
    user: 'Prof. Anita Deshmukh',
    action: 'Marked attendance for CS-301 (60/64 Present)',
    badge: 'Success'
  },
  {
    id: 2,
    time: '25 mins ago',
    type: 'leave_submitted',
    user: 'Rohan Mehra (IT-2024-019)',
    action: 'Submitted medical leave request for Oct 22-24',
    badge: 'Review'
  },
  {
    id: 3,
    time: '45 mins ago',
    type: 'attendance_marked',
    user: 'Dr. Vikrant Singh',
    action: 'Marked attendance for CS-302 (52/58 Present)',
    badge: 'Success'
  },
  {
    id: 4,
    time: '1 hour ago',
    type: 'alert',
    user: 'Automated Bot',
    action: 'Generated low-attendance alert for 4 students in ECE-3',
    badge: 'Warning'
  }
];

export const STUDENT_ATTENDANCE_SUMMARY = {
  totalHeld: 142,
  attended: 122,
  missed: 20,
  overallRate: 85.9,
  minRequired: 75.0,
  status: 'Safe',
  safeMarginLectures: 5, // Can miss 5 lectures and still stay above 75%
  subjects: [
    {
      code: 'CS-301',
      name: 'Design & Analysis of Algorithms',
      faculty: 'Prof. Anita Deshmukh',
      held: 36,
      attended: 33,
      absent: 3,
      rate: 91.6,
      status: 'Excellent',
      credits: 4
    },
    {
      code: 'CS-302',
      name: 'Database Management Systems',
      faculty: 'Prof. Sandeep Verma',
      held: 32,
      attended: 28,
      absent: 4,
      rate: 87.5,
      status: 'Good',
      credits: 4
    },
    {
      code: 'CS-303',
      name: 'Computer Networks',
      faculty: 'Dr. Priya Nambiar',
      held: 30,
      attended: 25,
      absent: 5,
      rate: 83.3,
      status: 'Good',
      credits: 3
    },
    {
      code: 'CS-304',
      name: 'Web Technologies & Cloud Lab',
      faculty: 'Prof. Hemant Rawat',
      held: 24,
      attended: 22,
      absent: 2,
      rate: 91.7,
      status: 'Excellent',
      credits: 2
    },
    {
      code: 'CS-305',
      name: 'Software Engineering Principles',
      faculty: 'Dr. Vikrant Singh',
      held: 20,
      attended: 14,
      absent: 6,
      rate: 70.0,
      status: 'Attention Needed',
      credits: 3
    }
  ],
  todayClasses: [
    {
      time: '09:00 - 10:00 AM',
      code: 'CS-301',
      subject: 'Algorithms (Lecture)',
      room: 'Hall B-204',
      status: 'Present',
      attendanceMarked: true
    },
    {
      time: '10:15 - 11:15 AM',
      code: 'CS-302',
      subject: 'DBMS (Lecture)',
      room: 'Hall A-102',
      status: 'Present',
      attendanceMarked: true
    },
    {
      time: '01:30 - 02:30 PM',
      code: 'CS-303',
      subject: 'Computer Networks',
      room: 'Hall C-301',
      status: 'Scheduled',
      attendanceMarked: false
    },
    {
      time: '02:45 - 04:45 PM',
      code: 'CS-304',
      subject: 'Web Technologies Lab',
      room: 'Software Lab 3',
      status: 'Scheduled',
      attendanceMarked: false
    }
  ],
  recentHistory: [
    { date: 'Oct 20, 2026', subject: 'Computer Networks', time: '11:30 AM', status: 'Present', mode: 'RFID / Biometric' },
    { date: 'Oct 20, 2026', subject: 'Software Engineering', time: '02:00 PM', status: 'Absent', mode: 'Instructor Roll-call' },
    { date: 'Oct 19, 2026', subject: 'Algorithms', time: '09:00 AM', status: 'Present', mode: 'RFID / Biometric' },
    { date: 'Oct 19, 2026', subject: 'DBMS Lab', time: '10:15 AM', status: 'Present', mode: 'Lab Portal' },
    { date: 'Oct 18, 2026', subject: 'Web Technologies', time: '01:30 PM', status: 'Present', mode: 'Instructor Roll-call' },
    { date: 'Oct 17, 2026', subject: 'Algorithms Tutorial', time: '11:00 AM', status: 'Present', mode: 'RFID / Biometric' }
  ]
};
