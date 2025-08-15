import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { authUtils } from '../../utils/auth';
import { roleGuard } from '../../utils/roleGuard';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Get user permissions
  const permissions = roleGuard?.getUserPermissions();

  const primaryNavItems = [
    { path: '/equipment-inventory', label: 'Inventario', icon: 'Package' },
    { path: '/work-order-management', label: 'Órdenes', icon: 'ClipboardList' },
    { path: '/maintenance-calendar', label: 'Calendario', icon: 'Calendar' },
    ...(permissions?.canManageUsers ? [{ path: '/user-management', label: 'Usuarios', icon: 'Users' }] : [])
  ];

  const secondaryNavItems = [
    ...(permissions?.canManageSettings ? [{ path: '/settings', label: 'Configuración', icon: 'Settings' }] : []),
    { path: '/help', label: 'Ayuda', icon: 'HelpCircle' },
    ...(permissions?.canViewReports ? [{ path: '/reports', label: 'Reportes', icon: 'BarChart3' }] : [])
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    setShowMoreMenu(false);
  };

  const handleLogout = () => {
    // Clear authentication data
    authUtils?.logout();
    
    // Close menu
    setShowMoreMenu(false);
    
    // Redirect to login page
    navigate('/login');
    
    // Show confirmation message
    console.log('Sesión cerrada exitosamente');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  // Get current user info
  const currentUser = authUtils?.getCurrentUser();
  const userRole = authUtils?.getUserRole();
  
  // Display name based on role
  const getDisplayName = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrador';
      case 'technician':
        return 'Técnico';
      case 'doctor':
        return 'Dr. García';
      default:
        return 'Usuario';
    }
  };

  const getDisplayRole = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrador';
      case 'technician':
        return 'Técnico de Mantenimiento';
      case 'doctor':
        return 'Doctor';
      default:
        return 'Usuario';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border medical-shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">MedAsset Pro</h1>
              <p className="text-xs text-muted-foreground">Gestión Médica</p>
            </div>
          </div>
        </div>

        {/* Center Section - Primary Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-2 px-3 py-2 medical-transition"
            >
              <Icon name={item?.icon} size={16} />
              <span className="text-sm font-medium">{item?.label}</span>
            </Button>
          ))}
        </nav>

        {/* Right Section - Actions and More Menu */}
        <div className="flex items-center space-x-2">
          {/* QR Scanner Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation('/equipment-details')}
            className="hidden sm:flex items-center space-x-2"
            aria-label="Escanear QR"
          >
            <Icon name="QrCode" size={16} />
            <span className="hidden md:inline">Escanear</span>
          </Button>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex items-center space-x-1"
              aria-label="Más opciones"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span className="hidden md:inline text-sm">Más</span>
            </Button>

            {/* More Menu Dropdown */}
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg medical-shadow-lg z-200">
                <div className="py-2">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                  <div className="border-t border-border my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-muted medical-transition"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2 pl-2 border-l border-border">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">{getDisplayName()}</p>
              <p className="text-xs text-muted-foreground">{getDisplayRole()}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {primaryNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="w-full justify-start space-x-3"
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Button>
            ))}
            <div className="border-t border-border my-3"></div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavigation('/equipment-details')}
              className="w-full justify-start space-x-3"
            >
              <Icon name="QrCode" size={16} />
              <span>Escanear QR</span>
            </Button>
            {/* Mobile Logout Button */}
            <div className="border-t border-border my-3"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start space-x-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Icon name="LogOut" size={16} />
              <span>Cerrar Sesión</span>
            </Button>
          </nav>
        </div>
      )}
      {/* Overlay for More Menu */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setShowMoreMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;