import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenanceHistory = ({ maintenanceRecords }) => {
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [filterType, setFilterType] = useState('todos');

  const getMaintenanceTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'preventivo':
        return 'bg-success/10 text-success border-success/20';
      case 'correctivo':
        return 'bg-error/10 text-error border-error/20';
      case 'calibración':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'inspección':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completado':
        return 'text-success';
      case 'en progreso':
        return 'text-warning';
      case 'pendiente':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredRecords = filterType === 'todos' 
    ? maintenanceRecords 
    : maintenanceRecords?.filter(record => record?.type?.toLowerCase() === filterType);

  const toggleExpanded = (recordId) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-card rounded-lg border border-border p-4 medical-shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="History" size={20} className="mr-2" />
            Historial de Mantenimiento
          </h2>
          <div className="flex flex-wrap gap-2">
            {['todos', 'preventivo', 'correctivo', 'calibración', 'inspección']?.map((type) => (
              <Button
                key={type}
                variant={filterType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Maintenance Records */}
      <div className="space-y-4">
        {filteredRecords?.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-8 text-center medical-shadow-sm">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No hay registros</h3>
            <p className="text-muted-foreground">
              No se encontraron registros de mantenimiento para el filtro seleccionado.
            </p>
          </div>
        ) : (
          filteredRecords?.map((record) => (
            <div key={record?.id} className="bg-card rounded-lg border border-border medical-shadow-sm">
              {/* Record Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-muted/50 medical-transition"
                onClick={() => toggleExpanded(record?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getMaintenanceTypeColor(record?.type)}`}>
                      {record?.type}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{record?.title}</h3>
                      <p className="text-sm text-muted-foreground">{record?.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-medium ${getStatusColor(record?.status)}`}>
                      {record?.status}
                    </span>
                    <Icon 
                      name={expandedRecord === record?.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={20} 
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedRecord === record?.id && (
                <div className="border-t border-border p-4 bg-muted/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Work Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Detalles del Trabajo</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Técnico:</span>
                            <span className="text-foreground font-medium">{record?.technician}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duración:</span>
                            <span className="text-foreground font-medium">{record?.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Costo:</span>
                            <span className="text-foreground font-medium">{record?.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Orden de Trabajo:</span>
                            <span className="text-primary font-medium cursor-pointer hover:underline">
                              #{record?.workOrderId}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Parts Used */}
                      {record?.partsUsed && record?.partsUsed?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Partes Utilizadas</h4>
                          <div className="space-y-2">
                            {record?.partsUsed?.map((part, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{part?.name}</span>
                                <span className="text-foreground">{part?.quantity} x {part?.cost}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes and Observations */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Notas del Técnico</h4>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-sm text-foreground whitespace-pre-line">
                            {record?.notes}
                          </p>
                        </div>
                      </div>

                      {record?.recommendations && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Recomendaciones</h4>
                          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                            <p className="text-sm text-foreground">
                              {record?.recommendations}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Attachments */}
                      {record?.attachments && record?.attachments?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Archivos Adjuntos</h4>
                          <div className="space-y-2">
                            {record?.attachments?.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                                <span className="text-primary cursor-pointer hover:underline">
                                  {attachment?.name}
                                </span>
                                <span className="text-muted-foreground">({attachment?.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" iconName="Download">
                      Descargar Reporte
                    </Button>
                    <Button variant="outline" size="sm" iconName="Copy">
                      Duplicar Orden
                    </Button>
                    <Button variant="outline" size="sm" iconName="MessageSquare">
                      Comentarios
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Summary Statistics */}
      <div className="bg-card rounded-lg border border-border p-6 medical-shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Resumen de Mantenimiento</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {maintenanceRecords?.filter(r => r?.type?.toLowerCase() === 'preventivo')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Preventivos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {maintenanceRecords?.filter(r => r?.type?.toLowerCase() === 'correctivo')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Correctivos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {maintenanceRecords?.filter(r => r?.type?.toLowerCase() === 'calibración')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Calibraciones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {maintenanceRecords?.filter(r => r?.status?.toLowerCase() === 'pendiente')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Pendientes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceHistory;