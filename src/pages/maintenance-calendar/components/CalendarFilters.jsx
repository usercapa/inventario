import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CalendarFilters = ({ filters, onFiltersChange, onToggleCollapse, isCollapsed }) => {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  const locationOptions = [
    { value: 'all', label: 'Todas las ubicaciones' },
    { value: 'building-a', label: 'Edificio A - Urgencias' },
    { value: 'building-b', label: 'Edificio B - Quirófanos' },
    { value: 'building-c', label: 'Edificio C - UCI' },
    { value: 'building-d', label: 'Edificio D - Consultas' }
  ];

  const equipmentTypeOptions = [
    { value: 'all', label: 'Todos los equipos' },
    { value: 'imaging', label: 'Equipos de Imagen' },
    { value: 'monitoring', label: 'Monitoreo' },
    { value: 'surgical', label: 'Equipos Quirúrgicos' },
    { value: 'laboratory', label: 'Laboratorio' },
    { value: 'respiratory', label: 'Equipos Respiratorios' }
  ];

  const technicianOptions = [
    { value: 'all', label: 'Todos los técnicos' },
    { value: 'tech-1', label: 'Carlos Mendoza' },
    { value: 'tech-2', label: 'Ana Rodríguez' },
    { value: 'tech-3', label: 'Miguel Santos' },
    { value: 'tech-4', label: 'Laura García' }
  ];

  const maintenanceTypeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'preventive', label: 'Preventivo' },
    { value: 'corrective', label: 'Correctivo' },
    { value: 'calibration', label: 'Calibración' },
    { value: 'inspection', label: 'Inspección' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'Todas las prioridades' },
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    handleFilterChange('search', value);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      location: 'all',
      equipmentType: 'all',
      technician: 'all',
      maintenanceType: 'all',
      priority: 'all',
      search: ''
    });
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => 
    value && value !== 'all' && value !== ''
  )?.length;

  if (isCollapsed) {
    return (
      <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={16} />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-64">
            <Input
              type="search"
              placeholder="Buscar equipos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-9"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/50 border-b border-border">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={16} />
            <span className="font-medium">Filtros Avanzados</span>
            <Icon name="ChevronUp" size={14} />
          </Button>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount} activos
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={14} className="mr-1" />
          Limpiar todo
        </Button>
      </div>
      {/* Filter Controls */}
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <Input
              type="search"
              label="Buscar"
              placeholder="Buscar equipos, técnicos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select
            label="Ubicación"
            options={locationOptions}
            value={filters?.location || 'all'}
            onChange={(value) => handleFilterChange('location', value)}
          />
          
          <Select
            label="Tipo de Equipo"
            options={equipmentTypeOptions}
            value={filters?.equipmentType || 'all'}
            onChange={(value) => handleFilterChange('equipmentType', value)}
          />
          
          <Select
            label="Técnico Asignado"
            options={technicianOptions}
            value={filters?.technician || 'all'}
            onChange={(value) => handleFilterChange('technician', value)}
          />
          
          <Select
            label="Tipo de Mantenimiento"
            options={maintenanceTypeOptions}
            value={filters?.maintenanceType || 'all'}
            onChange={(value) => handleFilterChange('maintenanceType', value)}
          />
          
          <Select
            label="Prioridad"
            options={priorityOptions}
            value={filters?.priority || 'all'}
            onChange={(value) => handleFilterChange('priority', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarFilters;