import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WorkOrderFilters from './components/WorkOrderFilters';
import WorkOrderTable from './components/WorkOrderTable';
import WorkOrderStats from './components/WorkOrderStats';
import BulkActionsBar from './components/BulkActionsBar';
import CreateWorkOrderModal from './components/CreateWorkOrderModal';
import WorkOrderDetailsModal from './components/WorkOrderDetailsModal';

const WorkOrderManagement = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [stats, setStats] = useState({});

  // Mock data for work orders
  const mockWorkOrders = [
    {
      id: 1,
      ticketId: 'WO-2024-001',
      equipmentName: 'Monitor de Signos Vitales Philips IntelliVue MP70',
      location: 'UCI - Habitación 302',
      description: 'El monitor presenta lecturas inconsistentes en la presión arterial. Los valores fluctúan sin razón aparente.',
      priority: 'critical',
      status: 'in-progress',
      assignedTechnician: 'Carlos Martínez',
      createdAt: new Date('2024-08-14T08:30:00'),
      estimatedHours: 4.5,
      requestType: 'corrective'
    },
    {
      id: 2,
      ticketId: 'WO-2024-002',
      equipmentName: 'Ventilador Mecánico Dräger Evita V500',
      location: 'UCI - Habitación 305',
      description: 'Mantenimiento preventivo programado. Revisión completa del sistema de ventilación y calibración.',
      priority: 'medium',
      status: 'pending',
      assignedTechnician: 'Ana Rodríguez',
      createdAt: new Date('2024-08-14T10:15:00'),
      estimatedHours: 3.0,
      requestType: 'preventive'
    },
    {
      id: 3,
      ticketId: 'WO-2024-003',
      equipmentName: 'Desfibrilador Zoll M Series',
      location: 'Urgencias - Sala 1',
      description: 'El equipo no enciende. Se sospecha problema en la fuente de alimentación.',
      priority: 'high',
      status: 'pending',
      assignedTechnician: 'Miguel Santos',
      createdAt: new Date('2024-08-14T11:45:00'),
      estimatedHours: 2.5,
      requestType: 'corrective'
    },
    {
      id: 4,
      ticketId: 'WO-2024-004',
      equipmentName: 'Bomba de Infusión Fresenius Kabi Agilia',
      location: 'Cardiología - Habitación 201',
      description: 'Calibración anual requerida. El equipo funciona correctamente pero necesita verificación.',
      priority: 'low',
      status: 'resolved',
      assignedTechnician: 'Lucía Fernández',
      createdAt: new Date('2024-08-13T14:20:00'),
      estimatedHours: 1.5,
      requestType: 'calibration'
    },
    {
      id: 5,
      ticketId: 'WO-2024-005',
      equipmentName: 'Electrocardiografo GE MAC 2000',
      location: 'Cardiología - Consulta 3',
      description: 'Los electrodos no hacen buen contacto. Se requiere limpieza profunda y posible reemplazo.',
      priority: 'medium',
      status: 'in-progress',
      assignedTechnician: 'Técnico Externo',
      createdAt: new Date('2024-08-13T16:30:00'),
      estimatedHours: 2.0,
      requestType: 'corrective'
    },
    {
      id: 6,
      ticketId: 'WO-2024-006',
      equipmentName: 'Ultrasonido Mindray DC-70',
      location: 'Radiología - Sala 2',
      description: 'Inspección trimestral programada. Verificación de transductores y sistema de imagen.',
      priority: 'low',
      status: 'pending',
      assignedTechnician: 'Carlos Martínez',
      createdAt: new Date('2024-08-14T09:00:00'),
      estimatedHours: 3.5,
      requestType: 'inspection'
    }
  ];

  // Mock stats
  const mockStats = {
    total: mockWorkOrders?.length,
    pending: mockWorkOrders?.filter(order => order?.status === 'pending')?.length,
    inProgress: mockWorkOrders?.filter(order => order?.status === 'in-progress')?.length,
    resolved: mockWorkOrders?.filter(order => order?.status === 'resolved')?.length,
    critical: mockWorkOrders?.filter(order => order?.priority === 'critical')?.length,
    avgResolutionTime: 6.2
  };

  useEffect(() => {
    setWorkOrders(mockWorkOrders);
    setStats(mockStats);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to work orders
    let filteredOrders = mockWorkOrders;

    if (newFilters?.search) {
      filteredOrders = filteredOrders?.filter(order =>
        order?.ticketId?.toLowerCase()?.includes(newFilters?.search?.toLowerCase()) ||
        order?.equipmentName?.toLowerCase()?.includes(newFilters?.search?.toLowerCase()) ||
        order?.description?.toLowerCase()?.includes(newFilters?.search?.toLowerCase())
      );
    }

    if (newFilters?.status) {
      filteredOrders = filteredOrders?.filter(order => order?.status === newFilters?.status);
    }

    if (newFilters?.priority) {
      filteredOrders = filteredOrders?.filter(order => order?.priority === newFilters?.priority);
    }

    if (newFilters?.technician) {
      filteredOrders = filteredOrders?.filter(order => 
        order?.assignedTechnician?.toLowerCase()?.includes(newFilters?.technician?.toLowerCase())
      );
    }

    setWorkOrders(filteredOrders);
  };

  const handleWorkOrderClick = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDetailsModalOpen(true);
  };

  const handleBulkAction = (action) => {
    console.log(`Executing bulk action: ${action} on orders:`, selectedOrders);
    // Implement bulk actions logic here
    setSelectedOrders([]);
  };

  const handleCreateWorkOrder = (formData) => {
    const newWorkOrder = {
      id: workOrders?.length + 1,
      ticketId: `WO-2024-${String(workOrders?.length + 1)?.padStart(3, '0')}`,
      equipmentName: formData?.equipmentName,
      location: formData?.location,
      description: formData?.description,
      priority: formData?.priority,
      status: 'pending',
      assignedTechnician: formData?.assignedTechnician || 'Sin asignar',
      createdAt: new Date(),
      estimatedHours: parseFloat(formData?.estimatedHours) || 0,
      requestType: formData?.requestType
    };

    setWorkOrders([newWorkOrder, ...workOrders]);
    setIsCreateModalOpen(false);
    
    // Update stats
    const newStats = {
      ...stats,
      total: stats?.total + 1,
      pending: stats?.pending + 1
    };
    setStats(newStats);
  };

  const sidebarWidth = isSidebarCollapsed ? 'ml-16' : 'ml-60';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMenuOpen={isMobileMenuOpen}
      />
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      {/* Main Content */}
      <main className={`pt-16 ${sidebarWidth} lg:${sidebarWidth} medical-transition`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Órdenes de Trabajo</h1>
              <p className="text-muted-foreground mt-1">
                Administra solicitudes de mantenimiento y asignación de técnicos
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/equipment-details'}
                className="flex items-center space-x-2"
              >
                <Icon name="QrCode" size={16} />
                <span className="hidden sm:inline">Escanear QR</span>
              </Button>
              <Button
                variant="default"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Nueva Orden</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <WorkOrderStats stats={stats} />

          {/* Filters */}
          <WorkOrderFilters
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
          />

          {/* Bulk Actions Bar */}
          <BulkActionsBar
            selectedCount={selectedOrders?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedOrders([])}
          />

          {/* Work Orders Table */}
          <WorkOrderTable
            workOrders={workOrders}
            onWorkOrderClick={handleWorkOrderClick}
            onBulkAction={handleBulkAction}
            selectedOrders={selectedOrders}
            onSelectionChange={setSelectedOrders}
          />

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6 medical-shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex flex-col items-center space-y-2 h-20"
              >
                <Icon name="Plus" size={20} />
                <span className="text-sm">Nueva Orden</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleFiltersChange({ ...filters, status: 'pending' })}
                className="flex flex-col items-center space-y-2 h-20"
              >
                <Icon name="Clock" size={20} />
                <span className="text-sm">Ver Pendientes</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleFiltersChange({ ...filters, priority: 'critical' })}
                className="flex flex-col items-center space-y-2 h-20"
              >
                <Icon name="AlertTriangle" size={20} />
                <span className="text-sm">Ver Críticas</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center space-y-2 h-20"
              >
                <Icon name="Download" size={20} />
                <span className="text-sm">Exportar</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <CreateWorkOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateWorkOrder}
      />
      <WorkOrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        workOrder={selectedWorkOrder}
      />
    </div>
  );
};

export default WorkOrderManagement;