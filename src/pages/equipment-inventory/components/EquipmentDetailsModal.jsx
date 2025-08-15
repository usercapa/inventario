import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentDetailsModal = ({ equipment, isOpen, onClose, onEdit, onScheduleMaintenance }) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen || !equipment) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: 'Info' },
    { id: 'maintenance', label: 'Mantenimiento', icon: 'Wrench' },
    { id: 'documents', label: 'Documentos', icon: 'FileText' },
    { id: 'history', label: 'Historial', icon: 'Clock' }
  ];

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

  const maintenanceHistory = [
    {
      id: 1,
      date: '2024-08-10',
      type: 'Preventivo',
      description: 'Calibración y limpieza general',
      technician: 'Carlos Mendoza',
      status: 'Completado',
      cost: '€450'
    },
    {
      id: 2,
      date: '2024-07-15',
      type: 'Correctivo',
      description: 'Reemplazo de sensor de temperatura',
      technician: 'Ana García',
      status: 'Completado',
      cost: '€280'
    },
    {
      id: 3,
      date: '2024-06-20',
      type: 'Preventivo',
      description: 'Inspección trimestral',
      technician: 'Luis Rodriguez',
      status: 'Completado',
      cost: '€150'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Manual de Usuario',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      icon: 'FileText'
    },
    {
      id: 2,
      name: 'Certificado de Calibración',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2024-08-10',
      icon: 'Award'
    },
    {
      id: 3,
      name: 'Garantía del Fabricante',
      type: 'PDF',
      size: '890 KB',
      uploadDate: '2024-01-15',
      icon: 'Shield'
    },
    {
      id: 4,
      name: 'Foto del Equipo',
      type: 'JPG',
      size: '3.1 MB',
      uploadDate: '2024-08-12',
      icon: 'Image'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-lg border border-border medical-shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
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
            <div>
              <h2 className="text-xl font-semibold text-foreground">{equipment?.name}</h2>
              <p className="text-muted-foreground">{equipment?.model} - S/N: {equipment?.serialNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => onEdit(equipment)}
              className="flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Editar</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm medical-transition ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Status and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Estado Actual</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipment?.status)}`}>
                        {equipment?.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ubicación</label>
                    <div className="mt-1 text-foreground">
                      <p className="font-medium">{equipment?.location?.facility}</p>
                      <p className="text-sm">{equipment?.location?.building}</p>
                      <p className="text-sm">{equipment?.location?.department}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Técnico Asignado</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <span className="text-foreground">{equipment?.assignedTechnician}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fabricante</label>
                    <p className="mt-1 text-foreground">{equipment?.manufacturer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Año de Fabricación</label>
                    <p className="mt-1 text-foreground">{equipment?.manufacturingYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fecha de Adquisición</label>
                    <p className="mt-1 text-foreground">{formatDate(equipment?.acquisitionDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Valor de Adquisición</label>
                    <p className="mt-1 text-foreground font-medium">{equipment?.acquisitionValue}</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Código QR</h3>
                    <p className="text-sm text-muted-foreground">Escanea para acceso rápido</p>
                  </div>
                  <div className="w-20 h-20 bg-muted rounded-lg border border-border flex items-center justify-center">
                    <Icon name="QrCode" size={32} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              {/* Next Maintenance */}
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Próximo Mantenimiento</h3>
                    <p className="text-sm text-muted-foreground">Mantenimiento preventivo programado</p>
                    <p className="text-sm font-medium text-warning mt-1">15 de Septiembre, 2024</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => onScheduleMaintenance(equipment)}
                    className="flex items-center space-x-2"
                  >
                    <Icon name="Calendar" size={16} />
                    <span>Reprogramar</span>
                  </Button>
                </div>
              </div>

              {/* Maintenance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Último Mantenimiento</p>
                      <p className="font-medium text-foreground">{formatDate(equipment?.lastMaintenance)}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Disponibilidad</p>
                      <p className="font-medium text-foreground">98.5%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Euro" size={20} className="text-warning" />
                    <div>
                      <p className="text-sm text-muted-foreground">Costo Anual</p>
                      <p className="font-medium text-foreground">€1,250</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Documentos del Equipo</h3>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Upload" size={16} />
                  <span>Subir Documento</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents?.map((doc) => (
                  <div key={doc?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 medical-transition">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={doc?.icon} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{doc?.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc?.type} • {doc?.size}</p>
                        <p className="text-xs text-muted-foreground">Subido el {formatDate(doc?.uploadDate)}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Icon name="Download" size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Icon name="Eye" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Historial de Mantenimiento</h3>
              
              <div className="space-y-3">
                {maintenanceHistory?.map((record) => (
                  <div key={record?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {record?.type}
                          </span>
                          <span className="text-sm text-muted-foreground">{formatDate(record?.date)}</span>
                          <span className="text-sm font-medium text-success">{record?.status}</span>
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{record?.description}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="User" size={14} />
                            <span>{record?.technician}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Euro" size={14} />
                            <span>{record?.cost}</span>
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailsModal;