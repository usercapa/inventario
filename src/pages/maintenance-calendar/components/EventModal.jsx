import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventModal = ({ 
  isOpen, 
  onClose, 
  event, 
  onSave, 
  onDelete,
  mode = 'view' // 'view', 'edit', 'create'
}) => {
  const [formData, setFormData] = useState({
    equipmentName: '',
    equipmentId: '',
    type: 'preventive',
    priority: 'medium',
    technician: '',
    scheduledDate: '',
    estimatedDuration: '',
    location: '',
    description: '',
    recurring: false,
    recurringInterval: 'monthly'
  });

  const [isEditing, setIsEditing] = useState(mode === 'create' || mode === 'edit');

  useEffect(() => {
    if (event) {
      setFormData({
        equipmentName: event?.equipmentName || '',
        equipmentId: event?.equipmentId || '',
        type: event?.type || 'preventive',
        priority: event?.priority || 'medium',
        technician: event?.technician || '',
        scheduledDate: event?.scheduledDate ? new Date(event.scheduledDate)?.toISOString()?.slice(0, 16) : '',
        estimatedDuration: event?.estimatedDuration || '',
        location: event?.location || '',
        description: event?.description || '',
        recurring: event?.recurring || false,
        recurringInterval: event?.recurringInterval || 'monthly'
      });
    } else if (mode === 'create') {
      setFormData({
        equipmentName: '',
        equipmentId: '',
        type: 'preventive',
        priority: 'medium',
        technician: '',
        scheduledDate: '',
        estimatedDuration: '2 horas',
        location: '',
        description: '',
        recurring: false,
        recurringInterval: 'monthly'
      });
    }
    setIsEditing(mode === 'create' || mode === 'edit');
  }, [event, mode]);

  const equipmentOptions = [
    { value: 'eq-001', label: 'Resonancia Magnética - RM001' },
    { value: 'eq-002', label: 'Tomógrafo - TC002' },
    { value: 'eq-003', label: 'Ecógrafo - ECO003' },
    { value: 'eq-004', label: 'Rayos X - RX004' },
    { value: 'eq-005', label: 'Monitor Cardíaco - MC005' }
  ];

  const typeOptions = [
    { value: 'preventive', label: 'Preventivo' },
    { value: 'corrective', label: 'Correctivo' },
    { value: 'calibration', label: 'Calibración' },
    { value: 'inspection', label: 'Inspección' }
  ];

  const priorityOptions = [
    { value: 'critical', label: 'Crítica' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Media' },
    { value: 'low', label: 'Baja' }
  ];

  const technicianOptions = [
    { value: 'tech-1', label: 'Carlos Mendoza' },
    { value: 'tech-2', label: 'Ana Rodríguez' },
    { value: 'tech-3', label: 'Miguel Santos' },
    { value: 'tech-4', label: 'Laura García' }
  ];

  const locationOptions = [
    { value: 'building-a-er', label: 'Edificio A - Urgencias' },
    { value: 'building-b-or', label: 'Edificio B - Quirófanos' },
    { value: 'building-c-icu', label: 'Edificio C - UCI' },
    { value: 'building-d-cons', label: 'Edificio D - Consultas' }
  ];

  const durationOptions = [
    { value: '30 minutos', label: '30 minutos' },
    { value: '1 hora', label: '1 hora' },
    { value: '2 horas', label: '2 horas' },
    { value: '4 horas', label: '4 horas' },
    { value: '8 horas', label: '8 horas' },
    { value: '1 día', label: '1 día' }
  ];

  const recurringOptions = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const eventData = {
      ...event,
      ...formData,
      scheduledDate: new Date(formData.scheduledDate)?.toISOString(),
      id: event?.id || `event-${Date.now()}`
    };
    onSave(eventData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('¿Está seguro de que desea eliminar este mantenimiento?')) {
      onDelete(event?.id);
      onClose();
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'text-red-600 bg-red-50',
      high: 'text-orange-600 bg-orange-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors?.[priority] || 'text-blue-600 bg-blue-50';
  };

  const getTypeIcon = (type) => {
    const icons = {
      preventive: 'Shield',
      corrective: 'Wrench',
      calibration: 'Settings',
      inspection: 'Search'
    };
    return icons?.[type] || 'Tool';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getPriorityColor(formData?.priority)}`}>
              <Icon name={getTypeIcon(formData?.type)} size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'create' ? 'Nuevo Mantenimiento' : isEditing ?'Editar Mantenimiento' : 'Detalles del Mantenimiento'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {formData?.equipmentName || 'Seleccione un equipo'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Equipment Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Equipo Médico"
                options={equipmentOptions}
                value={formData?.equipmentId}
                onChange={(value) => {
                  const equipment = equipmentOptions?.find(eq => eq?.value === value);
                  handleInputChange('equipmentId', value);
                  handleInputChange('equipmentName', equipment?.label || '');
                }}
                disabled={!isEditing}
                required
              />
              <Select
                label="Ubicación"
                options={locationOptions}
                value={formData?.location}
                onChange={(value) => handleInputChange('location', value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Maintenance Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Tipo de Mantenimiento"
                options={typeOptions}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
                disabled={!isEditing}
                required
              />
              <Select
                label="Prioridad"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                disabled={!isEditing}
                required
              />
              <Select
                label="Duración Estimada"
                options={durationOptions}
                value={formData?.estimatedDuration}
                onChange={(value) => handleInputChange('estimatedDuration', value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Fecha y Hora Programada"
                type="datetime-local"
                value={formData?.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Select
                label="Técnico Asignado"
                options={technicianOptions}
                value={formData?.technician}
                onChange={(value) => handleInputChange('technician', value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Recurring Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData?.recurring}
                  onChange={(e) => handleInputChange('recurring', e?.target?.checked)}
                  disabled={!isEditing}
                  className="rounded border-border"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-foreground">
                  Mantenimiento recurrente
                </label>
              </div>
              
              {formData?.recurring && (
                <Select
                  label="Intervalo de Recurrencia"
                  options={recurringOptions}
                  value={formData?.recurringInterval}
                  onChange={(value) => handleInputChange('recurringInterval', value)}
                  disabled={!isEditing}
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción y Notas
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                disabled={!isEditing}
                rows={4}
                className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:text-muted-foreground"
                placeholder="Descripción detallada del mantenimiento, procedimientos específicos, herramientas necesarias..."
              />
            </div>

            {/* Event History (if viewing existing event) */}
            {event && !isEditing && (
              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Historial del Evento</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Creado: {new Date(event.createdAt || Date.now())?.toLocaleDateString('es-ES')}</div>
                  <div>Última modificación: {new Date(event.updatedAt || Date.now())?.toLocaleDateString('es-ES')}</div>
                  <div>Estado: {event?.status || 'Programado'}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2">
            {event && !isEditing && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Eliminar
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {isEditing ? (
              <Button onClick={handleSave}>
                <Icon name="Save" size={16} className="mr-2" />
                Guardar
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Icon name="Edit" size={16} className="mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;