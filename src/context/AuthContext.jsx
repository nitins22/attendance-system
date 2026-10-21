import React, { createContext, useContext, useState, useEffect } from 'react';
import { jsonDb } from '../services/jsonDb';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edutrack_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // activeView can be: 'landing' | 'admin-login' | 'student-login' | 'admin-dashboard' | 'student-dashboard'
  const [activeView, setActiveView] = useState(() => {
    try {
      const savedUser = localStorage.getItem('edutrack_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.role === 'admin') return 'admin-dashboard';
        if (parsed.role === 'student') return 'student-dashboard';
      }
      // Check URL hash if available
      const hash = window.location.hash.replace('#', '');
      if (['admin-login', 'student-login', 'landing'].includes(hash)) {
        return hash;
      }
    } catch {
      // fallback
    }
    return 'landing';
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edutrack_user', JSON.stringify(currentUser));
      if (currentUser.role === 'admin') {
        setActiveView('admin-dashboard');
      } else if (currentUser.role === 'student') {
        setActiveView('student-dashboard');
      }
    } else {
      localStorage.removeItem('edutrack_user');
      if (activeView === 'admin-dashboard' || activeView === 'student-dashboard') {
        setActiveView('landing');
      }
    }
  }, [currentUser]);

  const loginAdmin = (identifier, password) => {
    const res = jsonDb.authenticateAdmin(identifier, password);
    if (res.success) {
      setCurrentUser(res.admin);
      showNotification(`Welcome, ${res.admin.name}!`, 'success');
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const registerAdmin = (adminData) => {
    const res = jsonDb.registerAdmin(adminData);
    if (res.success) {
      setCurrentUser(res.admin);
      showNotification(`Administrator registered successfully. Welcome, ${res.admin.name}!`, 'success');
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const loginStudent = (identifier, password) => {
    const res = jsonDb.authenticateStudent(identifier, password);
    if (res.success) {
      setCurrentUser(res.student);
      showNotification(`Welcome, ${res.student.name}!`, 'success');
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const activateStudentAccount = (rollNumber, email, newPassword) => {
    const res = jsonDb.setStudentPassword(rollNumber, email, newPassword);
    if (res.success) {
      showNotification('Account password activated! You can now log in.', 'success');
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('landing');
    showNotification('You have been logged out successfully.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeView,
        setActiveView,
        loginAdmin,
        registerAdmin,
        loginStudent,
        activateStudentAccount,
        logout,
        notification,
        showNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
