import React, { createContext, useContext, useState, useEffect } from 'react';
import { jsonDb } from '../services/jsonDb';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(() => jsonDb.getStudents());
  const [assignments, setAssignments] = useState(() => jsonDb.getAssignments());
  const [activeModal, setActiveModal] = useState(null); // 'add-student' | 'attendance' | 'assignment' | 'delete-student' | 'json-viewer' | null
  const [popupMessage, setPopupMessage] = useState(null);

  const showPopup = (title, message, type = 'success') => {
    setPopupMessage({ title, message, type });
  };

  const closePopup = () => setPopupMessage(null);

  // Reload data from JSON storage
  const refreshData = () => {
    setStudents(jsonDb.getStudents());
    setAssignments(jsonDb.getAssignments());
  };

  const addStudent = (studentData) => {
    const created = jsonDb.addStudent(studentData);
    setStudents(jsonDb.getStudents());
    showPopup('Success!', 'Student record saved successfully!', 'success');
    return created;
  };

  const addStudentsBulk = (studentsArray) => {
    const res = jsonDb.addStudentsBulk(studentsArray);
    setStudents(jsonDb.getStudents());
    const skippedText = res.skippedCount > 0 ? ` (${res.skippedCount} skipped/duplicates)` : '';
    showPopup(
      'Bulk Import Successful!', 
      `${res.addedCount} student records saved successfully into JSON database!${skippedText}`, 
      'success'
    );
    return res;
  };

  const deleteStudent = (rollNumber) => {
    jsonDb.deleteStudent(rollNumber);
    setStudents(jsonDb.getStudents());
    showPopup('Deleted', `Student record ${rollNumber} deleted successfully!`, 'info');
  };

  const saveAttendanceRegister = (className, section, date, records) => {
    const saved = jsonDb.saveAttendanceRegister(className, section, date, records);
    showPopup('Saved!', `Attendance records saved successfully for ${className} (${section}) on ${date}!`, 'success');
    return saved;
  };

  const addAssignment = (asgData) => {
    const created = jsonDb.addAssignment(asgData);
    setAssignments(jsonDb.getAssignments());
    showPopup('Published!', 'Assignment published successfully!', 'success');
    return created;
  };

  const markAssignmentStatus = (rollNumber, assignmentId, status) => {
    jsonDb.markAssignmentStatus(rollNumber, assignmentId, status);
    setAssignments(jsonDb.getAssignments()); // trigger reactivity
    const actionLabel = status === 'completed' ? 'marked as completed' : 'moved back to pending';
    showPopup('Assignment Updated', `Assignment ${actionLabel}!`, 'success');
  };

  return (
    <DataContext.Provider
      value={{
        students,
        assignments,
        activeModal,
        setActiveModal,
        popupMessage,
        showPopup,
        closePopup,
        refreshData,
        addStudent,
        addStudentsBulk,
        deleteStudent,
        saveAttendanceRegister,
        addAssignment,
        markAssignmentStatus,
        jsonDb
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within DataProvider');
  }
  return ctx;
};
