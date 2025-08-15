import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateWorkOrderModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    equipmentName: '',
    location: '',
    description: '',
    priority: 'medium',
    requestType: 'corrective',
    assignedTechnician: '',
    scheduledDate: '',
    estimatedHours: ''
  });

  const [isScanning, setIsScanning] = useState(false);

  const priorityOptions = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' }
  ];

  const requestTypeOptions = [
    { value: 'corrective', label: 'Correctivo' },
    { value: 'preventive', label: 'Preventivo' },
    { value: 'inspection', label: 'Inspección' },
    { value: 'calibration', label: 'Calibración' }
  ];

  const technicianOptions = [
    { value: '', label: 'Asignar después' },
    { value: 'carlos-martinez', label: 'Carlos Martínez' },
    { value: 'ana-rodriguez', label: 'Ana Rodríguez' },
    { value: 'miguel-santos', label: 'Miguel Santos' },
    { value: 'lucia-fernandez', label: 'Lucía Fernández' },
    { value: 'external', label: 'Técnico Externo' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        equipmentId: 'EQ-2024-0156',
        equipmentName: 'Monitor de Signos Vitales Philips IntelliVue MP70',
        location: 'UCI - Habitación 302'
      }));
      setIsScanning(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    setFormData({
      equipmentId: '',
      equipmentName: '',
      location: '',
      description: '',
      priority: 'medium',
      requestType: 'corrective',
      assignedTechnician: '',
      scheduledDate: '',
      estimatedHours: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg medical-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Nueva Orden de Trabajo</h2>
              <p className="text-sm text-muted-foreground">Crear solicitud de mantenimiento</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Equipment Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Información del Equipo</h3>
            
            <div className="flex space-x-3">
              <Input
                label="ID del Equipo"
                placeholder="Escanear QR o ingresar manualmente"
                value={formData?.equipmentId}
                onChange={(e) => handleInputChange('equipmentId', e?.target?.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleQRScan}
                disabled={isScanning}
                className="mt-6 flex items-center space-x-2"
              >
                <Icon name={isScanning ? 'Loader2' : 'QrCode'} size={16} className={isScanning ? 'animate-spin' : ''} />
                <span>{isScanning ? 'Escaneando...' : 'Escanear QR'}</span>
              </Button>
            </div>

            <Input
              label="Nombre del Equipo"
              placeholder="Nombre completo del equipo"
              value={formData?.equipmentName}
              onChange={(e) => handleInputChange('equipmentName', e?.target?.value)}
              required
            />

            <Input
              label="Ubicación"
              placeholder="Departamento - Habitación/Área"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              required
            />
          </div>

          {/* Work Order Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Detalles de la Orden</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Tipo de Solicitud"
                options={requestTypeOptions}
                value={formData?.requestType}
                onChange={(value) => handleInputChange('requestType', value)}
                required
              />
              <Select
                label="Prioridad"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                required
              />
            </div>

            <Input
              label="Descripción del Problema"
              placeholder="Describe detalladamente el problema o solicitud..."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
            />
          </div>

          {/* Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Asignación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Técnico Asignado"
                options={technicianOptions}
                value={formData?.assignedTechnician}
                onChange={(value) => handleInputChange('assignedTechnician', value)}
              />
              <Input
                label="Horas Estimadas"
                type="number"
                placeholder="0"
                value={formData?.estimatedHours}
                onChange={(e) => handleInputChange('estimatedHours', e?.target?.value)}
                min="0"
                step="0.5"
              />
            </div>

            <Input
              label="Fecha Programada (Opcional)"
              type="datetime-local"
              value={formData?.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Crear Orden</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkOrderModal;