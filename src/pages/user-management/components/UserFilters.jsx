import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedRole, 
  onRoleChange, 
  selectedDepartment, 
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
  onClearFilters 
}) => {
  const roles = [
    { value: '', label: 'Todos los roles' },
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Técnico Biomédico', label: 'Técnico Biomédico' },
    { value: 'Personal Clínico', label: 'Personal Clínico' },
    { value: 'Supervisor de Mantenimiento', label: 'Supervisor de Mantenimiento' },
    { value: 'Técnico Externo', label: 'Técnico Externo' }
  ];

  const departments = [
    { value: '', label: 'Todos los departamentos' },
    { value: 'Cardiología', label: 'Cardiología' },
    { value: 'Radiología', label: 'Radiología' },
    { value: 'Laboratorio', label: 'Laboratorio' },
    { value: 'Quirófano', label: 'Quirófano' },
    { value: 'UCI', label: 'UCI' },
    { value: 'Emergencias', label: 'Emergencias' },
    { value: 'Mantenimiento', label: 'Mantenimiento' },
    { value: 'Administración', label: 'Administración' }
  ];

  const statuses = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ];

  const hasActiveFilters = searchTerm || selectedRole || selectedDepartment || selectedStatus;

  return (
    <div className="bg-card border border-border rounded-lg p-4 medical-shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filtros de Búsqueda
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground"
          >
            <Icon name="X" size={16} className="mr-1" />
            Limpiar
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-1">
          <Input
            type="search"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Role Filter */}
        <div>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {roles?.map((role) => (
              <option key={role?.value} value={role?.value}>
                {role?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {departments?.map((dept) => (
              <option key={dept?.value} value={dept?.value}>
                {dept?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            {statuses?.map((status) => (
              <option key={status?.value} value={status?.value}>
                {status?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                <Icon name="Search" size={12} className="mr-1" />
                Búsqueda: "{searchTerm}"
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSearchChange('')}
                  className="h-4 w-4 ml-1 hover:bg-primary/20"
                >
                  <Icon name="X" size={10} />
                </Button>
              </div>
            )}
            {selectedRole && (
              <div className="flex items-center bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                <Icon name="UserCheck" size={12} className="mr-1" />
                Rol: {selectedRole}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRoleChange('')}
                  className="h-4 w-4 ml-1 hover:bg-accent/20"
                >
                  <Icon name="X" size={10} />
                </Button>
              </div>
            )}
            {selectedDepartment && (
              <div className="flex items-center bg-secondary/10 text-secondary px-2 py-1 rounded-full text-sm">
                <Icon name="Building" size={12} className="mr-1" />
                Depto: {selectedDepartment}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDepartmentChange('')}
                  className="h-4 w-4 ml-1 hover:bg-secondary/20"
                >
                  <Icon name="X" size={10} />
                </Button>
              </div>
            )}
            {selectedStatus && (
              <div className="flex items-center bg-warning/10 text-warning px-2 py-1 rounded-full text-sm">
                <Icon name="Activity" size={12} className="mr-1" />
                Estado: {statuses?.find(s => s?.value === selectedStatus)?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onStatusChange('')}
                  className="h-4 w-4 ml-1 hover:bg-warning/20"
                >
                  <Icon name="X" size={10} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;