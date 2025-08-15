import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      path: '/equipment-inventory',
      label: 'Inventario de Equipos',
      icon: 'Package',
      description: 'Gestión de equipos médicos'
    },
    {
      path: '/work-order-management',
      label: 'Órdenes de Trabajo',
      icon: 'ClipboardList',
      description: 'Solicitudes de mantenimiento'
    },
    {
      path: '/maintenance-calendar',
      label: 'Calendario de Mantenimiento',
      icon: 'Calendar',
      description: 'Programación preventiva'
    },
    {
      path: '/user-management',
      label: 'Gestión de Usuarios',
      icon: 'Users',
      description: 'Control de acceso'
    }
  ];

  const quickActions = [
    {
      action: 'scan',
      label: 'Escanear QR',
      icon: 'QrCode',
      path: '/equipment-details'
    },
    {
      action: 'create',
      label: 'Nueva Orden',
      icon: 'Plus',
      path: '/work-order-management'
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-60';
  const sidebarClass = `fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border z-100 medical-shadow-md medical-transition ${sidebarWidth} ${className}`;

  return (
    <>
      {/* Sidebar */}
      <aside className={sidebarClass}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">MedAsset Pro</h1>
                  <p className="text-xs text-muted-foreground">Gestión Médica</p>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Activity" size={20} color="white" />
              </div>
            )}

            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8"
                aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
              >
                <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-border">
            {!isCollapsed && (
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Acciones Rápidas
              </h3>
            )}
            <div className="space-y-2">
              {quickActions?.map((action) => (
                <Button
                  key={action?.action}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation(action?.path)}
                  className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} medical-transition`}
                  title={isCollapsed ? action?.label : undefined}
                >
                  <Icon name={action?.icon} size={16} />
                  {!isCollapsed && <span className="ml-2">{action?.label}</span>}
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            {!isCollapsed && (
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Navegación
              </h3>
            )}
            <div className="space-y-1">
              {navigationItems?.map((item) => {
                const isActive = isActivePath(item?.path);
                return (
                  <Button
                    key={item?.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} medical-transition group`}
                    title={isCollapsed ? item?.label : undefined}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={16} 
                      className={isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                    />
                    {!isCollapsed && (
                      <div className="ml-3 flex-1 text-left">
                        <div className={`text-sm font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                          {item?.label}
                        </div>
                        <div className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {item?.description}
                        </div>
                      </div>
                    )}
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed && (
              <div className="mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Dr. García</p>
                    <p className="text-xs text-muted-foreground">Administrador</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/settings')}
                className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} medical-transition`}
                title={isCollapsed ? 'Configuración' : undefined}
              >
                <Icon name="Settings" size={16} />
                {!isCollapsed && <span className="ml-2">Configuración</span>}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/login')}
                className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} text-destructive hover:text-destructive medical-transition`}
                title={isCollapsed ? 'Cerrar Sesión' : undefined}
              >
                <Icon name="LogOut" size={16} />
                {!isCollapsed && <span className="ml-2">Cerrar Sesión</span>}
              </Button>
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;