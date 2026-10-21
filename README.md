# 🎓 EduTrack | Smart Attendance & Academic Management System

A modern, high-performance **Attendance and Academic Management System** built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Pure JSON Storage Architecture** (no external database required).

Designed for colleges, universities, and schools with isolated **Admin** and **Student** portals.

---

## 🚀 Key Features

### 🏛️ Administrator Portal
- **🔐 Secure Role-Based Authentication:** Multi-admin registration and login with institutional credential verification.
- **👤 Add Student Record:** Add students individually with mandatory fields (Name, Roll Number, Email, Class, Section, Guardian, and Login Password).
- **👥 Bulk Student Import:**
  - **Copy-Paste Mode:** Direct tabular paste from Excel / Google Sheets / CSV.
  - **CSV File Upload:** Drag-and-drop `.csv` with auto-parsing and sample template download.
  - **Class Roster Auto-Generator:** Generate 10–50 students automatically with custom roll prefixes.
- **📅 Daily Attendance Register:**
  - 3-tier filtering: **Class** *(B.Tech, BCA, MCA, B.Sc, M.Tech, MBA)*, **Section** *(A, B, C, D)*, and **Date**.
  - One-click Present/Absent toggles and bulk mark shortcuts.
  - Persistent commit directly to JSON storage.
- **📄 Assignment Publishing:**
  - Broadcast course assignments with due dates and descriptions.
  - **File Attachment Support:** Attach guidelines and briefs in **PDF** or **Image** (`.png`, `.jpg`) formats with live preview.
- **🗑️ Delete Student Records:** Search, inspect, and remove students from the JSON database with confirmation safeguards.
- **💾 JSON Storage Inspector:** View raw JSON database in real-time, copy to clipboard, or download full database backup (`edutrack-database.json`).

---

### 🎓 Student Portal
- **🔐 Student Authentication & Self-Activation:**
  - Sign in using University Roll Number or Email.
  - **First-Time Password Activation:** Students can verify their roll number and email to set their private password.
- **📊 Show My Attendance:**
  - **Today's Attendance:** Subject-wise lecture breakdown with status badges (**GREEN for Present**, **RED for Absent**).
  - **All Attendance:** Aggregate attendance percentage, total classes held vs. attended, 75% cutoff status, subject-wise breakdown, and chronological audit log.
- **📝 Show My Assignment:**
  - **Pending Assignments:** View assigned tasks with due date indicators, read instructions, and download/preview attached PDFs or photos.
  - **Submit / Mark Completed:** 1-click submission workflow.
  - **Completed Tab:** History of submitted assignments with timestamps.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, JavaScript (ES Modules)
- **Styling:** Tailwind CSS v4, Plus Jakarta Sans Font
- **Build Tool:** Vite 8
- **Icons:** Lucide React
- **Data Persistence:** Pure Structured JSON (`localStorage` serialization layer with JSON export/import capability)

---

## 💻 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/attendance-system.git
   cd attendance-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://127.0.0.1:5173/
   ```

---

## 🔑 Initial Default Accounts

| Role | Identifier | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@college.edu` | `Password@123` | Full Administrative & Attendance Control |
| **Student** | `CSE-2024-042` | `CSE-2024-042` *(or `student123`)* | Attendance & Assignment Hub |

*(New admins can register via the "Register Admin" tab, and newly added students can use their Roll Number or activate their account via "Set Password".)*

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
