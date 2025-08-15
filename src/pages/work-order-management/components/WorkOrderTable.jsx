import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const WorkOrderTable = ({ workOrders, onWorkOrderClick, onBulkAction, selectedOrders, onSelectionChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

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

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Pendiente',
      'in-progress': 'En Progreso',
      resolved: 'Resuelto',
      cancelled: 'Cancelado'
    };
    return statusTexts?.[status] || status;
  };

  const getPriorityText = (priority) => {
    const priorityTexts = {
      critical: 'Crítica',
      high: 'Alta',
      medium: 'Media',
      low: 'Baja'
    };
    return priorityTexts?.[priority] || priority;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(workOrders?.map(order => order?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      onSelectionChange([...selectedOrders, orderId]);
    } else {
      onSelectionChange(selectedOrders?.filter(id => id !== orderId));
    }
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

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow-sm overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedOrders?.length === workOrders?.length && workOrders?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('ticketId')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  ID Ticket
                  <Icon name={getSortIcon('ticketId')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('equipmentName')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  Equipo
                  <Icon name={getSortIcon('equipmentName')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <span className="font-semibold text-foreground">Descripción</span>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('priority')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  Prioridad
                  <Icon name={getSortIcon('priority')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <span className="font-semibold text-foreground">Técnico</span>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  Estado
                  <Icon name={getSortIcon('status')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('createdAt')}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  Fecha
                  <Icon name={getSortIcon('createdAt')} size={14} className="ml-1" />
                </Button>
              </th>
              <th className="w-24 p-4">
                <span className="font-semibold text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {workOrders?.map((order) => (
              <tr
                key={order?.id}
                className="border-b border-border hover:bg-muted/30 medical-transition cursor-pointer"
                onClick={() => onWorkOrderClick(order)}
              >
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <Checkbox
                    checked={selectedOrders?.includes(order?.id)}
                    onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm font-medium text-primary">
                    {order?.ticketId}
                  </span>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{order?.equipmentName}</div>
                    <div className="text-sm text-muted-foreground">{order?.location}</div>
                  </div>
                </td>
                <td className="p-4 max-w-xs">
                  <div className="text-sm text-foreground truncate" title={order?.description}>
                    {order?.description}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order?.priority)}`}>
                    {getPriorityText(order?.priority)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <span className="text-sm text-foreground">{order?.assignedTechnician}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    {getStatusText(order?.status)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(order?.createdAt)}
                  </span>
                </td>
                <td className="p-4" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onWorkOrderClick(order)}
                      className="h-8 w-8"
                      title="Ver detalles"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Editar"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {workOrders?.map((order) => (
          <div
            key={order?.id}
            className="bg-card border border-border rounded-lg p-4 medical-shadow-sm"
            onClick={() => onWorkOrderClick(order)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedOrders?.includes(order?.id)}
                  onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                  onClick={(e) => e?.stopPropagation()}
                />
                <div>
                  <span className="font-mono text-sm font-medium text-primary">
                    {order?.ticketId}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(order?.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order?.priority)}`}>
                  {getPriorityText(order?.priority)}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                  {getStatusText(order?.status)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="font-medium text-foreground">{order?.equipmentName}</div>
                <div className="text-sm text-muted-foreground">{order?.location}</div>
              </div>
              <div className="text-sm text-foreground">{order?.description}</div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} color="white" />
                  </div>
                  <span className="text-sm text-foreground">{order?.assignedTechnician}</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onWorkOrderClick(order);
                    }}
                    className="h-8 w-8"
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Icon name="Edit" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {workOrders?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="ClipboardList" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No hay órdenes de trabajo</h3>
          <p className="text-muted-foreground">No se encontraron órdenes que coincidan con los filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};

export default WorkOrderTable;