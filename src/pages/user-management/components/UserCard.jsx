import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onEdit, onViewProfile, onResetPassword, onToggleStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'inactive':
        return 'text-muted-foreground bg-muted';
      case 'suspended':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrador':
        return 'text-primary bg-primary/10';
      case 'Técnico Biomédico':
        return 'text-accent bg-accent/10';
      case 'Personal Clínico':
        return 'text-secondary bg-secondary/10';
      case 'Supervisor de Mantenimiento':
        return 'text-warning bg-warning/10';
      case 'Técnico Externo':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatLastLogin = (date) => {
    if (!date) return 'Nunca';
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 168) return `Hace ${Math.floor(diffInHours / 24)} días`;
    return loginDate?.toLocaleDateString('es-ES');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 medical-shadow-sm hover:medical-shadow-md medical-transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(user)}
            className="h-8 w-8"
            title="Editar usuario"
          >
            <Icon name="Edit2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewProfile(user)}
            className="h-8 w-8"
            title="Ver perfil"
          >
            <Icon name="Eye" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onResetPassword(user)}
            className="h-8 w-8"
            title="Restablecer contraseña"
          >
            <Icon name="Key" size={14} />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rol:</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(user?.role)}`}>
            {user?.role}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Departamento:</span>
          <span className="text-sm text-foreground">{user?.department}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Último acceso:</span>
          <span className="text-sm text-foreground">{formatLastLogin(user?.lastLogin)}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(user?.status)}`}>
              {user?.status === 'active' ? 'Activo' : user?.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleStatus(user)}
              className="h-6 w-6"
              title={user?.status === 'active' ? 'Desactivar usuario' : 'Activar usuario'}
            >
              <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={12} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;