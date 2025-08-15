import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTable = ({ 
  users, 
  sortConfig, 
  onSort, 
  onEdit, 
  onViewProfile, 
  onResetPassword, 
  onToggleStatus,
  selectedUsers,
  onSelectUser,
  onSelectAll 
}) => {
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

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = users?.length > 0 && selectedUsers?.length === users?.length;
  const isIndeterminate = selectedUsers?.length > 0 && selectedUsers?.length < users?.length;

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 w-12">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={onSelectAll}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </div>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('name')}
                  className="font-semibold text-muted-foreground hover:text-foreground -ml-2"
                >
                  Usuario
                  <Icon name={getSortIcon('name')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('role')}
                  className="font-semibold text-muted-foreground hover:text-foreground -ml-2"
                >
                  Rol
                  <Icon name={getSortIcon('role')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('department')}
                  className="font-semibold text-muted-foreground hover:text-foreground -ml-2"
                >
                  Departamento
                  <Icon name={getSortIcon('department')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('lastLogin')}
                  className="font-semibold text-muted-foreground hover:text-foreground -ml-2"
                >
                  Último Acceso
                  <Icon name={getSortIcon('lastLogin')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort('status')}
                  className="font-semibold text-muted-foreground hover:text-foreground -ml-2"
                >
                  Estado
                  <Icon name={getSortIcon('status')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-right p-4 w-32">
                <span className="font-semibold text-muted-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?.id} className={`border-b border-border hover:bg-muted/30 medical-transition ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => onSelectUser(user?.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{user?.department}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{formatLastLogin(user?.lastLogin)}</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(user?.status)}`}>
                    {user?.status === 'active' ? 'Activo' : user?.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleStatus(user)}
                      className="h-8 w-8"
                      title={user?.status === 'active' ? 'Desactivar usuario' : 'Activar usuario'}
                    >
                      <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;