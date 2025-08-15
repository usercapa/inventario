import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkStatusUpdate, 
  onBulkLocationTransfer, 
  onBulkExport,
  onClearSelection 
}) => {
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [showLocationTransfer, setShowLocationTransfer] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const statusOptions = [
    { value: 'operativo', label: 'Operativo' },
    { value: 'mantenimiento', label: 'En Mantenimiento' },
    { value: 'fuera-servicio', label: 'Fuera de Servicio' }
  ];

  const locationOptions = [
    { value: 'hospital-central-uci', label: 'Hospital Central - UCI' },
    { value: 'hospital-central-quirofano', label: 'Hospital Central - Quirófano' },
    { value: 'clinica-norte-emergencias', label: 'Clínica Norte - Emergencias' },
    { value: 'centro-especialidades-cardiologia', label: 'Centro Especialidades - Cardiología' }
  ];

  const handleStatusUpdate = () => {
    if (selectedStatus) {
      onBulkStatusUpdate(selectedStatus);
      setSelectedStatus('');
      setShowStatusUpdate(false);
    }
  };

  const handleLocationTransfer = () => {
    if (selectedLocation) {
      onBulkLocationTransfer(selectedLocation);
      setSelectedLocation('');
      setShowLocationTransfer(false);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
            <span className="font-medium text-foreground">
              {selectedCount} equipo{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={14} />
            <span className="ml-1">Limpiar</span>
          </Button>
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Update */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStatusUpdate(!showStatusUpdate)}
              className="flex items-center space-x-2"
            >
              <Icon name="RefreshCw" size={14} />
              <span>Cambiar Estado</span>
              <Icon name="ChevronDown" size={12} />
            </Button>

            {showStatusUpdate && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-popover border border-border rounded-lg medical-shadow-lg z-50 min-w-[200px]">
                <Select
                  label="Nuevo Estado"
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  className="mb-3"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStatusUpdate(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleStatusUpdate}
                    disabled={!selectedStatus}
                  >
                    Aplicar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Location Transfer */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLocationTransfer(!showLocationTransfer)}
              className="flex items-center space-x-2"
            >
              <Icon name="MapPin" size={14} />
              <span>Transferir</span>
              <Icon name="ChevronDown" size={12} />
            </Button>

            {showLocationTransfer && (
              <div className="absolute top-full left-0 mt-2 p-3 bg-popover border border-border rounded-lg medical-shadow-lg z-50 min-w-[250px]">
                <Select
                  label="Nueva Ubicación"
                  options={locationOptions}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  className="mb-3"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLocationTransfer(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleLocationTransfer}
                    disabled={!selectedLocation}
                  >
                    Transferir
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Export Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkExport('excel')}
            className="flex items-center space-x-2"
          >
            <Icon name="FileSpreadsheet" size={14} />
            <span>Exportar Excel</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkExport('pdf')}
            className="flex items-center space-x-2"
          >
            <Icon name="FileText" size={14} />
            <span>Exportar PDF</span>
          </Button>

          {/* Generate QR Labels */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkExport('qr-labels')}
            className="flex items-center space-x-2"
          >
            <Icon name="QrCode" size={14} />
            <span>Etiquetas QR</span>
          </Button>
        </div>
      </div>

      {/* Overlays */}
      {(showStatusUpdate || showLocationTransfer) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowStatusUpdate(false);
            setShowLocationTransfer(false);
          }}
        />
      )}
    </div>
  );
};

export default BulkActionsBar;