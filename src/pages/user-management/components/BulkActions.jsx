import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onBulkActivate, onBulkDeactivate, onBulkRoleChange, onBulkDelete }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Users" size={16} color="white" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {selectedCount} usuario{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              Selecciona una acción para aplicar a todos los usuarios seleccionados
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkActivate}
            className="text-success border-success hover:bg-success hover:text-white"
          >
            <Icon name="UserCheck" size={16} className="mr-1" />
            Activar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDeactivate}
            className="text-warning border-warning hover:bg-warning hover:text-white"
          >
            <Icon name="UserX" size={16} className="mr-1" />
            Desactivar
          </Button>

          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="text-secondary border-secondary hover:bg-secondary hover:text-white"
            >
              <Icon name="UserCog" size={16} className="mr-1" />
              Cambiar Rol
              <Icon name="ChevronDown" size={14} className="ml-1" />
            </Button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg medical-shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible medical-transition z-50">
              <div className="py-2">
                <button
                  onClick={() => onBulkRoleChange('Administrador')}
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                >
                  Administrador
                </button>
                <button
                  onClick={() => onBulkRoleChange('Técnico Biomédico')}
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                >
                  Técnico Biomédico
                </button>
                <button
                  onClick={() => onBulkRoleChange('Personal Clínico')}
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                >
                  Personal Clínico
                </button>
                <button
                  onClick={() => onBulkRoleChange('Supervisor de Mantenimiento')}
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                >
                  Supervisor de Mantenimiento
                </button>
                <button
                  onClick={() => onBulkRoleChange('Técnico Externo')}
                  className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                >
                  Técnico Externo
                </button>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onBulkDelete}
            className="text-destructive border-destructive hover:bg-destructive hover:text-white"
          >
            <Icon name="Trash2" size={16} className="mr-1" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;