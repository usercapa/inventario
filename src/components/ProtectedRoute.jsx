import React from 'react';
import { roleGuard } from '../utils/roleGuard';
import { authUtils } from '../utils/auth';
import AccessDenied from './AccessDenied';

const ProtectedRoute = ({ children, requiredRole, requiredPermission, fallback }) => {
  const isAuthenticated = authUtils?.isAuthenticated();
  const userRole = authUtils?.getUserRole();

  // Check authentication first
  if (!isAuthenticated) {
    // Redirect handled by auth guard in main app
    return null;
  }

  // Check role-based access
  if (requiredRole) {
    if (requiredRole === 'admin' && !roleGuard?.isAdmin()) {
      return fallback || <AccessDenied requiredRole="administrador" />;
    }
    if (requiredRole !== userRole && requiredRole !== 'admin') {
      return fallback || <AccessDenied requiredRole={requiredRole} />;
    }
  }

  // Check permission-based access
  if (requiredPermission) {
    const permissions = roleGuard?.getUserPermissions();
    if (!permissions?.[requiredPermission]) {
      return fallback || <AccessDenied requiredRole="permisos específicos" />;
    }
  }

  return children;
};

export default ProtectedRoute;