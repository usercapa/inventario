// Authentication utility functions
export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // Get current user email
  getCurrentUser: () => {
    return localStorage.getItem('userEmail') || null;
  },

  // Login user
  login: (email) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe'); // Clear any remember me setting
    
    // Clear any other session data if exists
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('session_') || key?.startsWith('user_')) {
        keysToRemove?.push(key);
      }
    }
    keysToRemove?.forEach(key => localStorage.removeItem(key));
  },

  // Get user role based on email
  getUserRole: () => {
    const email = authUtils?.getCurrentUser();
    if (!email) return null;
    
    if (email?.includes('admin')) return 'admin';
    if (email?.includes('tecnico')) return 'technician';
    if (email?.includes('doctor')) return 'doctor';
    return 'user';
  }
};

export default authUtils;