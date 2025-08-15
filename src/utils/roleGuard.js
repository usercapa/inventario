import { authUtils } from './auth';

// Role-based access control utility
export const roleGuard = {
  // Check if user has admin role
  isAdmin: () => {
    const userRole = authUtils?.getUserRole();
    return userRole === 'admin';
  },

  // Check if user has specific role
  hasRole: (role) => {
    const userRole = authUtils?.getUserRole();
    return userRole === role;
  },

  // Check if user has any of the specified roles
  hasAnyRole: (roles) => {
    const userRole = authUtils?.getUserRole();
    return roles?.includes(userRole);
  },

  // Check if user can access user management
  canAccessUserManagement: () => {
    return roleGuard?.isAdmin();
  },

  // Get user permissions based on role
  getUserPermissions: () => {
    const userRole = authUtils?.getUserRole();
    
    switch (userRole) {
      case 'admin':
        return {
          canManageUsers: true,
          canManageEquipment: true,
          canManageWorkOrders: true,
          canViewReports: true,
          canManageSettings: true
        };
      case 'technician':
        return {
          canManageUsers: false,
          canManageEquipment: true,
          canManageWorkOrders: true,
          canViewReports: true,
          canManageSettings: false
        };
      case 'doctor':
        return {
          canManageUsers: false,
          canManageEquipment: false,
          canManageWorkOrders: true,
          canViewReports: true,
          canManageSettings: false
        };
      default:
        return {
          canManageUsers: false,
          canManageEquipment: false,
          canManageWorkOrders: false,
          canViewReports: false,
          canManageSettings: false
        };
    }
  }
};

export default roleGuard;