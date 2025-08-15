import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentTable = ({ 
  equipment, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  onViewDetails, 
  onEditEquipment, 
  onScheduleMaintenance,
  onGenerateQR,
  sortConfig,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const allSelected = equipment?.length > 0 && selectedItems?.length === equipment?.length;
  const someSelected = selectedItems?.length > 0 && selectedItems?.length < equipment?.length;

  return (
    <div className="bg-card rounded-lg border border-border medical-shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary medical-transition"
                >
                  <span>Equipo</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">QR</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('location')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary medical-transition"
                >
                  <span>Ubicación</span>
                  <Icon name={getSortIcon('location')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary medical-transition"
                >
                  <span>Estado</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('lastMaintenance')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary medical-transition"
                >
                  <span>Último Mantenimiento</span>
                  <Icon name={getSortIcon('lastMaintenance')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-foreground">Técnico Asignado</span>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {equipment?.map((item) => (
              <tr
                key={item?.id}
                className={`hover:bg-muted/30 medical-transition cursor-pointer ${
                  selectedItems?.includes(item?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(item?.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onViewDetails(item)}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      onSelectItem(item?.id, e?.target?.checked);
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {item?.image ? (
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="Package" size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item?.name}</p>
                      <p className="text-sm text-muted-foreground">{item?.model}</p>
                      <p className="text-xs text-muted-foreground">S/N: {item?.serialNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="w-8 h-8 bg-muted rounded border border-border flex items-center justify-center">
                    <Icon name="QrCode" size={16} className="text-muted-foreground" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{item?.location?.facility}</p>
                    <p className="text-muted-foreground">{item?.location?.building}</p>
                    <p className="text-muted-foreground">{item?.location?.department}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                    {item?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <p className="text-foreground">{formatDate(item?.lastMaintenance)}</p>
                    <p className="text-muted-foreground">{item?.maintenanceType}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <span className="text-sm text-foreground">{item?.assignedTechnician}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onViewDetails(item);
                      }}
                      className="h-8 w-8"
                      title="Ver detalles"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEditEquipment(item);
                      }}
                      className="h-8 w-8"
                      title="Editar"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onScheduleMaintenance(item);
                      }}
                      className="h-8 w-8"
                      title="Programar mantenimiento"
                    >
                      <Icon name="Calendar" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onGenerateQR(item);
                      }}
                      className="h-8 w-8"
                      title="Generar QR"
                    >
                      <Icon name="QrCode" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {equipment?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron equipos</h3>
          <p className="text-muted-foreground text-center max-w-md">
            No hay equipos que coincidan con los filtros aplicados. Intenta ajustar los criterios de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentTable;