import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActions = [
    { value: 'assign', label: 'Asignar Técnico', icon: 'UserPlus' },
    { value: 'status', label: 'Cambiar Estado', icon: 'RefreshCw' },
    { value: 'priority', label: 'Cambiar Prioridad', icon: 'Flag' },
    { value: 'export', label: 'Exportar Selección', icon: 'Download' },
    { value: 'delete', label: 'Eliminar', icon: 'Trash2' }
  ];

  const handleExecuteAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4 medical-shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} orden{selectedCount !== 1 ? 'es' : ''} seleccionada{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
            <span className="ml-1">Limpiar</span>
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            placeholder="Seleccionar acción..."
            options={bulkActions}
            value={selectedAction}
            onChange={setSelectedAction}
            className="min-w-48"
          />
          <Button
            variant="default"
            onClick={handleExecuteAction}
            disabled={!selectedAction}
            className="flex items-center space-x-2"
          >
            <Icon name="Play" size={16} />
            <span>Ejecutar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;