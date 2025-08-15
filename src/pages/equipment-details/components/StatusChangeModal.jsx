import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StatusChangeModal = ({ isOpen, onClose, currentStatus, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [reason, setReason] = useState('');
  const [priority, setPriority] = useState('media');
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [scheduleMaintenance, setScheduleMaintenance] = useState(false);
  const [maintenanceDate, setMaintenanceDate] = useState('');

  const statusOptions = [
    { value: 'operativo', label: 'Operativo', description: 'Equipo funcionando correctamente' },
    { value: 'mantenimiento', label: 'En Mantenimiento', description: 'Equipo en proceso de mantenimiento' },
    { value: 'fuera de servicio', label: 'Fuera de Servicio', description: 'Equipo no disponible para uso' },
    { value: 'calibración', label: 'En Calibración', description: 'Equipo en proceso de calibración' },
    { value: 'reparación', label: 'En Reparación', description: 'Equipo siendo reparado' }
  ];

  const priorityOptions = [
    { value: 'baja', label: 'Baja', description: 'No afecta operaciones críticas' },
    { value: 'media', label: 'Media', description: 'Impacto moderado en operaciones' },
    { value: 'alta', label: 'Alta', description: 'Afecta operaciones críticas' },
    { value: 'crítica', label: 'Crítica', description: 'Requiere atención inmediata' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const changeData = {
      newStatus,
      reason,
      priority,
      notifyUsers,
      scheduleMaintenance,
      maintenanceDate: scheduleMaintenance ? maintenanceDate : null,
      timestamp: new Date()?.toISOString()
    };

    if (onStatusChange) {
      onStatusChange(changeData);
    }
    
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'operativo':
        return 'text-success';
      case 'mantenimiento':
        return 'text-warning';
      case 'fuera de servicio':
        return 'text-error';
      case 'calibración':
        return 'text-primary';
      case 'reparación':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-md w-full medical-shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Settings" size={20} className="mr-2" />
            Cambiar Estado del Equipo
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Current Status Display */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estado Actual:</span>
              <span className={`font-medium ${getStatusColor(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
          </div>

          {/* New Status Selection */}
          <Select
            label="Nuevo Estado"
            required
            options={statusOptions}
            value={newStatus}
            onChange={setNewStatus}
            description="Selecciona el nuevo estado para el equipo"
          />

          {/* Reason for Change */}
          <Input
            label="Motivo del Cambio"
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e?.target?.value)}
            placeholder="Describe el motivo del cambio de estado"
            description="Explica brevemente por qué se cambia el estado"
          />

          {/* Priority Level */}
          <Select
            label="Nivel de Prioridad"
            options={priorityOptions}
            value={priority}
            onChange={setPriority}
            description="Establece la prioridad de este cambio"
          />

          {/* Notification Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="notifyUsers"
                checked={notifyUsers}
                onChange={(e) => setNotifyUsers(e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="notifyUsers" className="text-sm text-foreground">
                Notificar a usuarios asignados
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="scheduleMaintenance"
                checked={scheduleMaintenance}
                onChange={(e) => setScheduleMaintenance(e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="scheduleMaintenance" className="text-sm text-foreground">
                Programar mantenimiento automáticamente
              </label>
            </div>
          </div>

          {/* Maintenance Date (conditional) */}
          {scheduleMaintenance && (
            <Input
              label="Fecha de Mantenimiento"
              type="datetime-local"
              required
              value={maintenanceDate}
              onChange={(e) => setMaintenanceDate(e?.target?.value)}
              description="Selecciona cuándo se debe realizar el mantenimiento"
            />
          )}

          {/* Impact Warning */}
          {newStatus === 'fuera de servicio' && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-error">Advertencia</p>
                  <p className="text-xs text-error/80">
                    Este cambio marcará el equipo como no disponible y puede afectar las operaciones.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              Confirmar Cambio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusChangeModal;