import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MobileEquipmentCard = ({ 
  equipment, 
  isSelected, 
  onSelect, 
  onViewDetails, 
  onEdit, 
  onScheduleMaintenance,
  onGenerateQR 
}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'operativo':
        return 'bg-success text-success-foreground';
      case 'mantenimiento':
        return 'bg-warning text-warning-foreground';
      case 'fuera de servicio':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 medical-shadow-sm medical-transition ${
      isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
    }`}>
      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(equipment?.id, e?.target?.checked)}
          className="mt-1 rounded border-border"
        />
        
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          {equipment?.image ? (
            <Image
              src={equipment?.image}
              alt={equipment?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="Package" size={24} className="text-muted-foreground" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{equipment?.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{equipment?.model}</p>
          <p className="text-xs text-muted-foreground">S/N: {equipment?.serialNumber}</p>
        </div>
        
        <div className="w-8 h-8 bg-muted rounded border border-border flex items-center justify-center">
          <Icon name="QrCode" size={16} className="text-muted-foreground" />
        </div>
      </div>
      {/* Status and Location */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(equipment?.status)}`}>
            {equipment?.status}
          </span>
        </div>
        
        <div className="flex items-start justify-between">
          <span className="text-sm text-muted-foreground">Ubicación:</span>
          <div className="text-right text-sm">
            <p className="font-medium text-foreground">{equipment?.location?.facility}</p>
            <p className="text-muted-foreground">{equipment?.location?.building}</p>
            <p className="text-muted-foreground">{equipment?.location?.department}</p>
          </div>
        </div>
      </div>
      {/* Maintenance Info */}
      <div className="bg-muted/30 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Último Mantenimiento:</span>
          <span className="text-sm font-medium text-foreground">{formatDate(equipment?.lastMaintenance)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Técnico:</span>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={10} color="white" />
            </div>
            <span className="text-sm text-foreground">{equipment?.assignedTechnician}</span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(equipment)}
          className="flex items-center space-x-2"
        >
          <Icon name="Eye" size={14} />
          <span>Ver Detalles</span>
        </Button>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(equipment)}
            className="h-8 w-8"
            title="Editar"
          >
            <Icon name="Edit" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onScheduleMaintenance(equipment)}
            className="h-8 w-8"
            title="Programar mantenimiento"
          >
            <Icon name="Calendar" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onGenerateQR(equipment)}
            className="h-8 w-8"
            title="Generar QR"
          >
            <Icon name="QrCode" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileEquipmentCard;