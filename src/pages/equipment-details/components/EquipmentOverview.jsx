import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentOverview = ({ equipment, onStatusChange, onScheduleMaintenance, onCreateWorkOrder }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'operativo':
        return 'bg-success text-success-foreground';
      case 'mantenimiento':
        return 'bg-warning text-warning-foreground';
      case 'fuera de servicio':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta':
        return 'text-error';
      case 'media':
        return 'text-warning';
      case 'baja':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Equipment Header */}
      <div className="bg-card rounded-lg border border-border p-6 medical-shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-4 lg:space-y-0">
          {/* Equipment Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-muted rounded-lg overflow-hidden">
              <Image
                src={equipment?.image}
                alt={equipment?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Equipment Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">{equipment?.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipment?.status)}`}>
                  {equipment?.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  ID: {equipment?.id}
                </span>
                <span className="text-sm text-muted-foreground">
                  Serie: {equipment?.serialNumber}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Fabricante</h3>
                <p className="text-foreground">{equipment?.manufacturer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Modelo</h3>
                <p className="text-foreground">{equipment?.model}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Ubicación</h3>
                <p className="text-foreground">{equipment?.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Departamento</h3>
                <p className="text-foreground">{equipment?.department}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-4">
              <Button
                variant="default"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={onScheduleMaintenance}
              >
                Programar Mantenimiento
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="ClipboardList"
                iconPosition="left"
                onClick={onCreateWorkOrder}
              >
                Crear Orden
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MapPin"
                iconPosition="left"
              >
                Actualizar Ubicación
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex-shrink-0 text-center">
            <div className="w-32 h-32 bg-white border-2 border-border rounded-lg flex items-center justify-center mb-2">
              <div className="w-24 h-24 bg-black" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Crect x='0' y='0' width='20' height='20' fill='black'/%3E%3Crect x='80' y='0' width='20' height='20' fill='black'/%3E%3Crect x='0' y='80' width='20' height='20' fill='black'/%3E%3Crect x='40' y='40' width='20' height='20' fill='black'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain'
              }}></div>
            </div>
            <p className="text-xs text-muted-foreground">Código QR</p>
            <Button variant="ghost" size="sm" className="mt-1">
              <Icon name="Download" size={14} />
            </Button>
          </div>
        </div>
      </div>
      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Specifications */}
        <div className="bg-card rounded-lg border border-border p-6 medical-shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Settings" size={20} className="mr-2" />
            Especificaciones Técnicas
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Año de Fabricación:</span>
              <span className="text-foreground font-medium">{equipment?.yearManufactured}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha de Instalación:</span>
              <span className="text-foreground font-medium">{equipment?.installationDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Voltaje:</span>
              <span className="text-foreground font-medium">{equipment?.voltage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potencia:</span>
              <span className="text-foreground font-medium">{equipment?.power}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Peso:</span>
              <span className="text-foreground font-medium">{equipment?.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dimensiones:</span>
              <span className="text-foreground font-medium">{equipment?.dimensions}</span>
            </div>
          </div>
        </div>

        {/* Warranty & Service */}
        <div className="bg-card rounded-lg border border-border p-6 medical-shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Shield" size={20} className="mr-2" />
            Garantía y Servicio
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado de Garantía:</span>
              <span className={`font-medium ${equipment?.warrantyStatus === 'Vigente' ? 'text-success' : 'text-error'}`}>
                {equipment?.warrantyStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vencimiento:</span>
              <span className="text-foreground font-medium">{equipment?.warrantyExpiry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Proveedor:</span>
              <span className="text-foreground font-medium">{equipment?.vendor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contrato de Servicio:</span>
              <span className="text-foreground font-medium">{equipment?.serviceContract}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Próximo Mantenimiento:</span>
              <span className="text-foreground font-medium">{equipment?.nextMaintenance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Prioridad:</span>
              <span className={`font-medium ${getPriorityColor(equipment?.priority)}`}>
                {equipment?.priority}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Assigned Personnel */}
      <div className="bg-card rounded-lg border border-border p-6 medical-shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Users" size={20} className="mr-2" />
          Personal Asignado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment?.assignedPersonnel?.map((person, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{person?.name}</p>
                <p className="text-xs text-muted-foreground">{person?.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentOverview;