import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WorkOrderFilters = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: activeFilters?.search || '',
    status: activeFilters?.status || '',
    priority: activeFilters?.priority || '',
    technician: activeFilters?.technician || '',
    dateRange: activeFilters?.dateRange || '',
    equipmentType: activeFilters?.equipmentType || ''
  });

  const statusOptions = [
    { value: '', label: 'Todos los Estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'resolved', label: 'Resuelto' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const priorityOptions = [
    { value: '', label: 'Todas las Prioridades' },
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const technicianOptions = [
    { value: '', label: 'Todos los Técnicos' },
    { value: 'carlos-martinez', label: 'Carlos Martínez' },
    { value: 'ana-rodriguez', label: 'Ana Rodríguez' },
    { value: 'miguel-santos', label: 'Miguel Santos' },
    { value: 'lucia-fernandez', label: 'Lucía Fernández' },
    { value: 'external', label: 'Técnico Externo' }
  ];

  const equipmentTypeOptions = [
    { value: '', label: 'Todos los Equipos' },
    { value: 'imaging', label: 'Equipos de Imagen' },
    { value: 'monitoring', label: 'Monitoreo' },
    { value: 'surgical', label: 'Quirúrgicos' },
    { value: 'laboratory', label: 'Laboratorio' },
    { value: 'respiratory', label: 'Respiratorios' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Todas las Fechas' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'quarter', label: 'Este Trimestre' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      priority: '',
      technician: '',
      dateRange: '',
      equipmentType: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== '')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
              <span className="ml-1">Limpiar</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Search */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            type="search"
            placeholder="Buscar por ID, equipo o descripción..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
          <Select
            placeholder="Filtrar por estado"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            placeholder="Prioridad"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => handleFilterChange('priority', value)}
          />
          <Select
            placeholder="Técnico asignado"
            options={technicianOptions}
            value={filters?.technician}
            onChange={(value) => handleFilterChange('technician', value)}
          />
          <Select
            placeholder="Tipo de equipo"
            options={equipmentTypeOptions}
            value={filters?.equipmentType}
            onChange={(value) => handleFilterChange('equipmentType', value)}
          />
          <Select
            placeholder="Rango de fecha"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* Quick Filter Presets */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground font-medium">Filtros rápidos:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('status', 'pending')}
            className="text-xs"
          >
            Pendientes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('priority', 'critical')}
            className="text-xs"
          >
            Críticas
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('technician', 'external')}
            className="text-xs"
          >
            Externos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('dateRange', 'today')}
            className="text-xs"
          >
            Hoy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderFilters;