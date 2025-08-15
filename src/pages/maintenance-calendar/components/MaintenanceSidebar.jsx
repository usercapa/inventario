import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenanceSidebar = ({ 
  upcomingEvents, 
  overdueEvents, 
  technicianWorkload,
  onEventClick,
  onBulkSchedule,
  onGenerateReport 
}) => {
  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'text-red-600 bg-red-50 border-red-200',
      high: 'text-orange-600 bg-orange-50 border-orange-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      low: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors?.[priority] || 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getTypeIcon = (type) => {
    const icons = {
      preventive: 'Shield',
      corrective: 'Wrench',
      calibration: 'Settings',
      inspection: 'Search'
    };
    return icons?.[type] || 'Tool';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays === -1) return 'Ayer';
    if (diffDays < 0) return `Hace ${Math.abs(diffDays)} días`;
    if (diffDays <= 7) return `En ${diffDays} días`;
    
    return date?.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getWorkloadColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Panel de Control</h3>
        <p className="text-sm text-muted-foreground">Resumen y acciones rápidas</p>
      </div>
      <div className="flex-1 overflow-auto">
        {/* Quick Actions */}
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Acciones Rápidas</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkSchedule}
              className="w-full justify-start"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Programación Masiva
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onGenerateReport}
              className="w-full justify-start"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>

        {/* Overdue Items */}
        {overdueEvents?.length > 0 && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Mantenimientos Vencidos</h4>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {overdueEvents?.length}
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-auto">
              {overdueEvents?.map((event) => (
                <div
                  key={event?.id}
                  onClick={() => onEventClick(event)}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={getTypeIcon(event?.type)} size={14} className="text-red-600" />
                      <span className="text-sm font-medium text-red-800">{event?.equipmentName}</span>
                    </div>
                    <Icon name="AlertTriangle" size={14} className="text-red-600" />
                  </div>
                  <div className="text-xs text-red-600 space-y-1">
                    <div>Vencido: {formatDate(event?.scheduledDate)}</div>
                    <div>Técnico: {event?.technician}</div>
                    <div>Ubicación: {event?.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">Próximos Mantenimientos</h4>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {upcomingEvents?.length}
            </span>
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {upcomingEvents?.slice(0, 10)?.map((event) => (
              <div
                key={event?.id}
                onClick={() => onEventClick(event)}
                className={`p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all ${getPriorityColor(event?.priority)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(event?.type)} size={14} />
                    <span className="text-sm font-medium">{event?.equipmentName}</span>
                  </div>
                  <span className="text-xs">{formatDate(event?.scheduledDate)}</span>
                </div>
                <div className="text-xs opacity-75 space-y-1">
                  <div>Técnico: {event?.technician}</div>
                  <div>Duración: {event?.estimatedDuration}</div>
                  <div>Ubicación: {event?.location}</div>
                </div>
              </div>
            ))}
            {upcomingEvents?.length > 10 && (
              <div className="text-center py-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  Ver {upcomingEvents?.length - 10} más
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Technician Workload */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Carga de Trabajo - Técnicos</h4>
          <div className="space-y-3">
            {technicianWorkload?.map((technician) => (
              <div key={technician?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{technician?.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {technician?.assignedTasks}/{technician?.capacity}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getWorkloadColor(technician?.workloadPercentage)}`}
                    style={{ width: `${Math.min(technician?.workloadPercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{technician?.workloadPercentage}% ocupado</span>
                  <span>{technician?.availableSlots} slots libres</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {upcomingEvents?.length + overdueEvents?.length}
            </div>
            <div className="text-xs text-muted-foreground">Total Pendientes</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {technicianWorkload?.reduce((acc, tech) => acc + tech?.assignedTasks, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Tareas Asignadas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSidebar;