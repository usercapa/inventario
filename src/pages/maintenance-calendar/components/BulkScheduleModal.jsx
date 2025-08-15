import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkScheduleModal = ({ isOpen, onClose, onSchedule }) => {
  const [scheduleData, setScheduleData] = useState({
    equipmentType: 'all',
    location: 'all',
    maintenanceType: 'preventive',
    startDate: '',
    interval: 'monthly',
    duration: '2 horas',
    technician: '',
    priority: 'medium',
    description: '',
    selectedEquipment: []
  });

  const [availableEquipment] = useState([
    { id: 'eq-001', name: 'Resonancia Magnética - RM001', type: 'imaging', location: 'building-a-er' },
    { id: 'eq-002', name: 'Tomógrafo - TC002', type: 'imaging', location: 'building-b-or' },
    { id: 'eq-003', name: 'Ecógrafo - ECO003', type: 'imaging', location: 'building-c-icu' },
    { id: 'eq-004', name: 'Rayos X - RX004', type: 'imaging', location: 'building-d-cons' },
    { id: 'eq-005', name: 'Monitor Cardíaco - MC005', type: 'monitoring', location: 'building-c-icu' },
    { id: 'eq-006', name: 'Ventilador - VT006', type: 'respiratory', location: 'building-c-icu' },
    { id: 'eq-007', name: 'Desfibrilador - DF007', type: 'monitoring', location: 'building-a-er' },
    { id: 'eq-008', name: 'Bomba de Infusión - BI008', type: 'monitoring', location: 'building-b-or' }
  ]);

  const equipmentTypeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'imaging', label: 'Equipos de Imagen' },
    { value: 'monitoring', label: 'Monitoreo' },
    { value: 'surgical', label: 'Equipos Quirúrgicos' },
    { value: 'laboratory', label: 'Laboratorio' },
    { value: 'respiratory', label: 'Equipos Respiratorios' }
  ];

  const locationOptions = [
    { value: 'all', label: 'Todas las ubicaciones' },
    { value: 'building-a-er', label: 'Edificio A - Urgencias' },
    { value: 'building-b-or', label: 'Edificio B - Quirófanos' },
    { value: 'building-c-icu', label: 'Edificio C - UCI' },
    { value: 'building-d-cons', label: 'Edificio D - Consultas' }
  ];

  const maintenanceTypeOptions = [
    { value: 'preventive', label: 'Preventivo' },
    { value: 'calibration', label: 'Calibración' },
    { value: 'inspection', label: 'Inspección' }
  ];

  const intervalOptions = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'biannual', label: 'Semestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  const durationOptions = [
    { value: '30 minutos', label: '30 minutos' },
    { value: '1 hora', label: '1 hora' },
    { value: '2 horas', label: '2 horas' },
    { value: '4 horas', label: '4 horas' },
    { value: '8 horas', label: '8 horas' }
  ];

  const technicianOptions = [
    { value: '', label: 'Asignación automática' },
    { value: 'tech-1', label: 'Carlos Mendoza' },
    { value: 'tech-2', label: 'Ana Rodríguez' },
    { value: 'tech-3', label: 'Miguel Santos' },
    { value: 'tech-4', label: 'Laura García' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const getFilteredEquipment = () => {
    return availableEquipment?.filter(equipment => {
      const typeMatch = scheduleData?.equipmentType === 'all' || equipment?.type === scheduleData?.equipmentType;
      const locationMatch = scheduleData?.location === 'all' || equipment?.location === scheduleData?.location;
      return typeMatch && locationMatch;
    });
  };

  const handleInputChange = (field, value) => {
    setScheduleData(prev => ({ ...prev, [field]: value }));
  };

  const handleEquipmentToggle = (equipmentId) => {
    setScheduleData(prev => ({
      ...prev,
      selectedEquipment: prev?.selectedEquipment?.includes(equipmentId)
        ? prev?.selectedEquipment?.filter(id => id !== equipmentId)
        : [...prev?.selectedEquipment, equipmentId]
    }));
  };

  const handleSelectAll = () => {
    const filteredEquipment = getFilteredEquipment();
    const allSelected = filteredEquipment?.every(eq => scheduleData?.selectedEquipment?.includes(eq?.id));
    
    if (allSelected) {
      setScheduleData(prev => ({
        ...prev,
        selectedEquipment: prev?.selectedEquipment?.filter(id => 
          !filteredEquipment?.some(eq => eq?.id === id)
        )
      }));
    } else {
      setScheduleData(prev => ({
        ...prev,
        selectedEquipment: [
          ...prev?.selectedEquipment,
          ...filteredEquipment?.filter(eq => !prev?.selectedEquipment?.includes(eq?.id))?.map(eq => eq?.id)
        ]
      }));
    }
  };

  const handleSchedule = () => {
    if (scheduleData?.selectedEquipment?.length === 0) {
      alert('Por favor seleccione al menos un equipo');
      return;
    }
    
    if (!scheduleData?.startDate) {
      alert('Por favor seleccione una fecha de inicio');
      return;
    }

    const scheduleEvents = scheduleData?.selectedEquipment?.map(equipmentId => {
      const equipment = availableEquipment?.find(eq => eq?.id === equipmentId);
      return {
        id: `bulk-${equipmentId}-${Date.now()}`,
        equipmentId,
        equipmentName: equipment?.name,
        type: scheduleData?.maintenanceType,
        priority: scheduleData?.priority,
        technician: scheduleData?.technician || 'Asignación automática',
        scheduledDate: scheduleData?.startDate,
        estimatedDuration: scheduleData?.duration,
        location: equipment?.location,
        description: scheduleData?.description,
        recurring: true,
        recurringInterval: scheduleData?.interval,
        createdAt: new Date()?.toISOString(),
        status: 'scheduled'
      };
    });

    onSchedule(scheduleEvents);
    onClose();
  };

  const filteredEquipment = getFilteredEquipment();
  const selectedCount = scheduleData?.selectedEquipment?.length;
  const allSelected = filteredEquipment?.length > 0 && filteredEquipment?.every(eq => scheduleData?.selectedEquipment?.includes(eq?.id));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Programación Masiva</h2>
              <p className="text-sm text-muted-foreground">
                Programar mantenimiento para múltiples equipos
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-1 max-h-[calc(90vh-140px)]">
          {/* Left Panel - Configuration */}
          <div className="w-1/2 p-6 border-r border-border overflow-auto">
            <h3 className="text-lg font-medium text-foreground mb-4">Configuración del Mantenimiento</h3>
            
            <div className="space-y-4">
              {/* Filters */}
              <div className="grid grid-cols-1 gap-4">
                <Select
                  label="Tipo de Equipo"
                  options={equipmentTypeOptions}
                  value={scheduleData?.equipmentType}
                  onChange={(value) => handleInputChange('equipmentType', value)}
                />
                <Select
                  label="Ubicación"
                  options={locationOptions}
                  value={scheduleData?.location}
                  onChange={(value) => handleInputChange('location', value)}
                />
              </div>

              {/* Maintenance Details */}
              <div className="grid grid-cols-1 gap-4">
                <Select
                  label="Tipo de Mantenimiento"
                  options={maintenanceTypeOptions}
                  value={scheduleData?.maintenanceType}
                  onChange={(value) => handleInputChange('maintenanceType', value)}
                  required
                />
                <Select
                  label="Prioridad"
                  options={priorityOptions}
                  value={scheduleData?.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                  required
                />
              </div>

              {/* Scheduling */}
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Fecha de Inicio"
                  type="datetime-local"
                  value={scheduleData?.startDate}
                  onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                  required
                />
                <Select
                  label="Intervalo de Recurrencia"
                  options={intervalOptions}
                  value={scheduleData?.interval}
                  onChange={(value) => handleInputChange('interval', value)}
                  required
                />
                <Select
                  label="Duración Estimada"
                  options={durationOptions}
                  value={scheduleData?.duration}
                  onChange={(value) => handleInputChange('duration', value)}
                  required
                />
                <Select
                  label="Técnico Asignado"
                  options={technicianOptions}
                  value={scheduleData?.technician}
                  onChange={(value) => handleInputChange('technician', value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descripción
                </label>
                <textarea
                  value={scheduleData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Descripción del mantenimiento programado..."
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Equipment Selection */}
          <div className="w-1/2 p-6 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Seleccionar Equipos</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedCount} de {filteredEquipment?.length} seleccionados
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {filteredEquipment?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No se encontraron equipos con los filtros seleccionados</p>
                </div>
              ) : (
                filteredEquipment?.map((equipment) => (
                  <div
                    key={equipment?.id}
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Checkbox
                      checked={scheduleData?.selectedEquipment?.includes(equipment?.id)}
                      onChange={() => handleEquipmentToggle(equipment?.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{equipment?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Tipo: {equipmentTypeOptions?.find(t => t?.value === equipment?.type)?.label} • 
                        Ubicación: {locationOptions?.find(l => l?.value === equipment?.location)?.label}
                      </div>
                    </div>
                    <Icon name="Package" size={16} className="text-muted-foreground" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            Se programarán {selectedCount} mantenimientos con recurrencia {scheduleData?.interval}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSchedule}
              disabled={selectedCount === 0 || !scheduleData?.startDate}
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Programar {selectedCount} Mantenimientos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkScheduleModal;