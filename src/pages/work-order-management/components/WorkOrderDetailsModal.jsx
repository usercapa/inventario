import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const WorkOrderDetailsModal = ({ isOpen, onClose, workOrder }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !workOrder) return null;

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors?.[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const tabs = [
    { id: 'details', label: 'Detalles', icon: 'FileText' },
    { id: 'history', label: 'Historial', icon: 'Clock' },
    { id: 'attachments', label: 'Archivos', icon: 'Paperclip' },
    { id: 'costs', label: 'Costos', icon: 'DollarSign' }
  ];

  const mockHistory = [
    {
      id: 1,
      action: 'Orden creada',
      user: 'Dr. García',
      timestamp: new Date(Date.now() - 86400000),
      details: 'Orden de trabajo creada por solicitud del departamento'
    },
    {
      id: 2,
      action: 'Técnico asignado',
      user: 'Sistema',
      timestamp: new Date(Date.now() - 82800000),
      details: 'Carlos Martínez asignado como técnico responsable'
    },
    {
      id: 3,
      action: 'Estado actualizado',
      user: 'Carlos Martínez',
      timestamp: new Date(Date.now() - 3600000),
      details: 'Estado cambiado de "Pendiente" a "En Progreso"'
    }
  ];

  const mockAttachments = [
    {
      id: 1,
      name: 'manual_equipo.pdf',
      size: '2.4 MB',
      type: 'pdf',
      uploadedBy: 'Carlos Martínez',
      uploadedAt: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      name: 'foto_problema.jpg',
      size: '1.8 MB',
      type: 'image',
      uploadedBy: 'Dr. García',
      uploadedAt: new Date(Date.now() - 86400000)
    }
  ];

  const mockCosts = {
    laborHours: 4.5,
    laborRate: 25,
    parts: [
      { name: 'Sensor de presión', quantity: 1, unitCost: 150, total: 150 },
      { name: 'Cable de conexión', quantity: 2, unitCost: 25, total: 50 }
    ],
    totalParts: 200,
    totalLabor: 112.5,
    total: 312.5
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg medical-shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ClipboardList" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Orden #{workOrder?.ticketId}
              </h2>
              <p className="text-sm text-muted-foreground">{workOrder?.equipmentName}</p>
            </div>
            <div className="flex space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(workOrder?.priority)}`}>
                {workOrder?.priority === 'critical' ? 'Crítica' : 
                 workOrder?.priority === 'high' ? 'Alta' :
                 workOrder?.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(workOrder?.status)}`}>
                {workOrder?.status === 'pending' ? 'Pendiente' :
                 workOrder?.status === 'in-progress' ? 'En Progreso' :
                 workOrder?.status === 'resolved' ? 'Resuelto' : 'Cancelado'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10"
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
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Información del Equipo</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Equipo</label>
                      <p className="text-foreground">{workOrder?.equipmentName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Ubicación</label>
                      <p className="text-foreground">{workOrder?.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">ID del Equipo</label>
                      <p className="text-foreground font-mono">EQ-2024-0156</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Detalles de la Orden</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Técnico Asignado</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} color="white" />
                        </div>
                        <span className="text-foreground">{workOrder?.assignedTechnician}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Fecha de Creación</label>
                      <p className="text-foreground">{formatDate(workOrder?.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tiempo Estimado</label>
                      <p className="text-foreground">4.5 horas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Descripción del Problema</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-foreground">{workOrder?.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-3">Notas del Técnico</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-foreground">
                    Se identificó que el sensor de presión presenta lecturas inconsistentes. 
                    Se requiere reemplazo del componente y calibración completa del sistema.
                    Tiempo estimado de reparación: 4-5 horas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Historial de Actividades</h3>
              <div className="space-y-4">
                {mockHistory?.map((item) => (
                  <div key={item?.id} className="flex space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={16} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">{item?.action}</h4>
                        <span className="text-sm text-muted-foreground">{formatDate(item?.timestamp)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Por: {item?.user}</p>
                      <p className="text-sm text-foreground">{item?.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Archivos Adjuntos</h3>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Icon name="Upload" size={16} />
                  <span>Subir Archivo</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAttachments?.map((file) => (
                  <div key={file?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name={file?.type === 'pdf' ? 'FileText' : 'Image'} size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{file?.name}</h4>
                        <p className="text-sm text-muted-foreground">{file?.size}</p>
                        <p className="text-xs text-muted-foreground">
                          Por {file?.uploadedBy} • {formatDate(file?.uploadedAt)}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Download" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Análisis de Costos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Mano de Obra</h4>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horas trabajadas:</span>
                      <span className="text-foreground">{mockCosts?.laborHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tarifa por hora:</span>
                      <span className="text-foreground">€{mockCosts?.laborRate}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-border pt-2">
                      <span className="text-foreground">Total Mano de Obra:</span>
                      <span className="text-foreground">€{mockCosts?.totalLabor}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Repuestos y Materiales</h4>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    {mockCosts?.parts?.map((part, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{part?.name} (x{part?.quantity}):</span>
                        <span className="text-foreground">€{part?.total}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium border-t border-border pt-2">
                      <span className="text-foreground">Total Repuestos:</span>
                      <span className="text-foreground">€{mockCosts?.totalParts}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Costo Total:</span>
                  <span className="text-2xl font-bold text-primary">€{mockCosts?.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Icon name="Download" size={16} />
                <span>Exportar PDF</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Icon name="Printer" size={16} />
                <span>Imprimir</span>
              </Button>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              {isEditing && (
                <Button variant="default" className="flex items-center space-x-2">
                  <Icon name="Save" size={16} />
                  <span>Guardar Cambios</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetailsModal;