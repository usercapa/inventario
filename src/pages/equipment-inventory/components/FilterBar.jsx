import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  onExport,
  onQRScan 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const locationOptions = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'hospital-central', label: 'Hospital Central' },
    { value: 'clinica-norte', label: 'Clínica Norte' },
    { value: 'centro-especialidades', label: 'Centro de Especialidades' }
  ];

  const equipmentTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'diagnostico', label: 'Diagnóstico por Imagen' },
    { value: 'laboratorio', label: 'Laboratorio' },
    { value: 'quirofano', label: 'Quirófano' },
    { value: 'cuidados-intensivos', label: 'Cuidados Intensivos' },
    { value: 'rehabilitacion', label: 'Rehabilitación' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'operativo', label: 'Operativo' },
    { value: 'mantenimiento', label: 'En Mantenimiento' },
    { value: 'fuera-servicio', label: 'Fuera de Servicio' }
  ];

  const vendorOptions = [
    { value: '', label: 'Todos los proveedores' },
    { value: 'siemens', label: 'Siemens Healthineers' },
    { value: 'ge', label: 'GE Healthcare' },
    { value: 'philips', label: 'Philips Healthcare' },
    { value: 'medtronic', label: 'Medtronic' },
    { value: 'abbott', label: 'Abbott' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters?.dateRange,
        [field]: value
      }
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value)?.some(v => v !== '');
    }
    return value !== '';
  });

  return (
    <div className="bg-card rounded-lg border border-border p-4 medical-shadow-sm">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search and QR Scan */}
        <div className="flex-1 flex items-center space-x-3">
          <div className="relative flex-1 max-w-md">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Buscar por nombre, serie o QR..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={onQRScan}
            className="flex items-center space-x-2"
          >
            <Icon name="QrCode" size={16} />
            <span className="hidden sm:inline">Escanear</span>
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center space-x-2">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Estado"
            className="w-40"
          />
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2"
          >
            <Icon name="Filter" size={16} />
            <span>Filtros</span>
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} />
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Ubicación"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
            />
            
            <Select
              label="Tipo de Equipo"
              options={equipmentTypeOptions}
              value={filters?.equipmentType}
              onChange={(value) => handleFilterChange('equipmentType', value)}
            />
            
            <Select
              label="Proveedor"
              options={vendorOptions}
              value={filters?.vendor}
              onChange={(value) => handleFilterChange('vendor', value)}
            />

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full justify-between"
              >
                <span className="text-sm">
                  {filters?.dateRange?.start || filters?.dateRange?.end 
                    ? `${filters?.dateRange?.start || 'Inicio'} - ${filters?.dateRange?.end || 'Fin'}`
                    : 'Rango de fechas'
                  }
                </span>
                <Icon name="Calendar" size={16} />
              </Button>

              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-popover border border-border rounded-lg medical-shadow-lg z-50 min-w-[280px]">
                  <div className="space-y-3">
                    <Input
                      label="Fecha inicio"
                      type="date"
                      value={filters?.dateRange?.start}
                      onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
                    />
                    <Input
                      label="Fecha fin"
                      type="date"
                      value={filters?.dateRange?.end}
                      onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          handleDateRangeChange('start', '');
                          handleDateRangeChange('end', '');
                        }}
                      >
                        Limpiar
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Export Actions */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {hasActiveFilters && (
            <span className="flex items-center space-x-2">
              <Icon name="Filter" size={14} />
              <span>Filtros activos aplicados</span>
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('excel')}
            className="flex items-center space-x-2"
          >
            <Icon name="FileSpreadsheet" size={14} />
            <span>Excel</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('pdf')}
            className="flex items-center space-x-2"
          >
            <Icon name="FileText" size={14} />
            <span>PDF</span>
          </Button>
        </div>
      </div>
      {/* Overlay for date picker */}
      {showDatePicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
};

export default FilterBar;