import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CalendarHeader from './components/CalendarHeader';
import CalendarFilters from './components/CalendarFilters';
import CalendarGrid from './components/CalendarGrid';
import MaintenanceSidebar from './components/MaintenanceSidebar';
import EventModal from './components/EventModal';
import BulkScheduleModal from './components/BulkScheduleModal';

const MaintenanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventModalMode, setEventModalMode] = useState('view');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBulkScheduleOpen, setIsBulkScheduleOpen] = useState(false);

  const [filters, setFilters] = useState({
    location: 'all',
    equipmentType: 'all',
    technician: 'all',
    maintenanceType: 'all',
    priority: 'all',
    search: ''
  });

  const [maintenanceEvents, setMaintenanceEvents] = useState([
    {
      id: 'event-1',
      equipmentId: 'eq-001',
      equipmentName: 'Resonancia Magnética - RM001',
      type: 'preventive',
      priority: 'high',
      technician: 'Carlos Mendoza',
      scheduledDate: new Date(2025, 0, 15, 9, 0)?.toISOString(),
      estimatedDuration: '4 horas',
      location: 'Edificio A - Urgencias',
      description: `Mantenimiento preventivo programado según especificaciones del fabricante.\nIncluye limpieza de componentes, verificación de calibración y pruebas de funcionamiento.\nRevisión de sistemas de seguridad y actualización de registros.`,
      recurring: true,
      recurringInterval: 'quarterly',
      status: 'scheduled',
      createdAt: '2025-01-10T10:00:00Z'
    },
    {
      id: 'event-2',
      equipmentId: 'eq-002',
      equipmentName: 'Tomógrafo - TC002',
      type: 'calibration',
      priority: 'critical',
      technician: 'Ana Rodríguez',
      scheduledDate: new Date(2025, 0, 16, 14, 30)?.toISOString(),
      estimatedDuration: '2 horas',
      location: 'Edificio B - Quirófanos',
      description: `Calibración anual del tomógrafo computarizado.\nVerificación de precisión de imagen y ajuste de parámetros.\nDocumentación de resultados para cumplimiento normativo.`,
      recurring: true,
      recurringInterval: 'yearly',
      status: 'scheduled',
      createdAt: '2025-01-08T15:30:00Z'
    },
    {
      id: 'event-3',
      equipmentId: 'eq-003',
      equipmentName: 'Ecógrafo - ECO003',
      type: 'corrective',
      priority: 'medium',
      technician: 'Miguel Santos',
      scheduledDate: new Date(2025, 0, 12, 8, 0)?.toISOString(),
      estimatedDuration: '1 hora',
      location: 'Edificio C - UCI',
      description: `Reparación de transductor con problemas de imagen.\nReemplazo de componentes defectuosos y pruebas de calidad.\nVerificación de funcionamiento completo.`,
      recurring: false,
      status: 'overdue',
      createdAt: '2025-01-05T11:20:00Z'
    },
    {
      id: 'event-4',
      equipmentId: 'eq-004',
      equipmentName: 'Rayos X - RX004',
      type: 'inspection',
      priority: 'low',
      technician: 'Laura García',
      scheduledDate: new Date(2025, 0, 18, 16, 0)?.toISOString(),
      estimatedDuration: '30 minutos',
      location: 'Edificio D - Consultas',
      description: `Inspección rutinaria de seguridad radiológica.\nVerificación de blindaje y sistemas de protección.\nDocumentación para autoridades regulatorias.`,
      recurring: true,
      recurringInterval: 'monthly',
      status: 'scheduled',
      createdAt: '2025-01-12T09:45:00Z'
    },
    {
      id: 'event-5',
      equipmentId: 'eq-005',
      equipmentName: 'Monitor Cardíaco - MC005',
      type: 'preventive',
      priority: 'medium',
      technician: 'Carlos Mendoza',
      scheduledDate: new Date(2025, 0, 20, 10, 30)?.toISOString(),
      estimatedDuration: '1 hora',
      location: 'Edificio C - UCI',
      description: `Mantenimiento preventivo de monitor cardíaco.\nLimpieza de sensores y verificación de alarmas.\nActualización de software y calibración.`,
      recurring: true,
      recurringInterval: 'monthly',
      status: 'scheduled',
      createdAt: '2025-01-13T14:15:00Z'
    },
    {
      id: 'event-6',
      equipmentId: 'eq-006',
      equipmentName: 'Ventilador - VT006',
      type: 'corrective',
      priority: 'critical',
      technician: 'Ana Rodríguez',
      scheduledDate: new Date(2025, 0, 10, 7, 0)?.toISOString(),
      estimatedDuration: '8 horas',
      location: 'Edificio C - UCI',
      description: `Reparación urgente de ventilador mecánico.\nReemplazo de válvulas defectuosas y recalibración.\nPruebas exhaustivas antes de puesta en servicio.`,
      recurring: false,
      status: 'overdue',
      createdAt: '2025-01-07T16:30:00Z'
    }
  ]);

  const technicianWorkload = [
    {
      id: 'tech-1',
      name: 'Carlos Mendoza',
      assignedTasks: 8,
      capacity: 10,
      workloadPercentage: 80,
      availableSlots: 2
    },
    {
      id: 'tech-2',
      name: 'Ana Rodríguez',
      assignedTasks: 6,
      capacity: 8,
      workloadPercentage: 75,
      availableSlots: 2
    },
    {
      id: 'tech-3',
      name: 'Miguel Santos',
      assignedTasks: 4,
      capacity: 8,
      workloadPercentage: 50,
      availableSlots: 4
    },
    {
      id: 'tech-4',
      name: 'Laura García',
      assignedTasks: 9,
      capacity: 10,
      workloadPercentage: 90,
      availableSlots: 1
    }
  ];

  const getFilteredEvents = () => {
    return maintenanceEvents?.filter(event => {
      const locationMatch = filters?.location === 'all' || event?.location?.includes(filters?.location);
      const typeMatch = filters?.maintenanceType === 'all' || event?.type === filters?.maintenanceType;
      const technicianMatch = filters?.technician === 'all' || event?.technician === filters?.technician;
      const priorityMatch = filters?.priority === 'all' || event?.priority === filters?.priority;
      const searchMatch = !filters?.search || 
        event?.equipmentName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        event?.technician?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        event?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      return locationMatch && typeMatch && technicianMatch && priorityMatch && searchMatch;
    });
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return getFilteredEvents()?.filter(event => new Date(event.scheduledDate) > now && event?.status !== 'overdue')?.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
  };

  const getOverdueEvents = () => {
    const now = new Date();
    return getFilteredEvents()?.filter(event => new Date(event.scheduledDate) < now || event?.status === 'overdue')?.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
  };

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'month') {
      newDate?.setMonth(currentDate?.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'day') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEventModalMode('view');
    setIsEventModalOpen(true);
  };

  const handleDateClick = (date) => {
    setSelectedEvent({
      scheduledDate: date?.toISOString(),
      type: 'preventive',
      priority: 'medium',
      estimatedDuration: '2 horas'
    });
    setEventModalMode('create');
    setIsEventModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setEventModalMode('create');
    setIsEventModalOpen(true);
  };

  const handleEventSave = (eventData) => {
    if (eventModalMode === 'create') {
      setMaintenanceEvents(prev => [...prev, eventData]);
    } else {
      setMaintenanceEvents(prev => 
        prev?.map(event => event?.id === eventData?.id ? eventData : event)
      );
    }
  };

  const handleEventDelete = (eventId) => {
    setMaintenanceEvents(prev => prev?.filter(event => event?.id !== eventId));
  };

  const handleEventDrop = (event, newDate) => {
    const updatedEvent = {
      ...event,
      scheduledDate: newDate?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };
    
    setMaintenanceEvents(prev => 
      prev?.map(e => e?.id === event?.id ? updatedEvent : e)
    );
  };

  const handleBulkSchedule = (scheduleEvents) => {
    setMaintenanceEvents(prev => [...prev, ...scheduleEvents]);
  };

  const handleGenerateReport = () => {
    const reportData = {
      totalEvents: maintenanceEvents?.length,
      upcomingEvents: getUpcomingEvents()?.length,
      overdueEvents: getOverdueEvents()?.length,
      eventsByType: maintenanceEvents?.reduce((acc, event) => {
        acc[event.type] = (acc?.[event?.type] || 0) + 1;
        return acc;
      }, {}),
      eventsByPriority: maintenanceEvents?.reduce((acc, event) => {
        acc[event.priority] = (acc?.[event?.priority] || 0) + 1;
        return acc;
      }, {}),
      technicianWorkload
    };
    
    console.log('Generating maintenance report:', reportData);
    alert('Reporte de mantenimiento generado. Revise la consola para ver los datos.');
  };

  const filteredEvents = getFilteredEvents();
  const upcomingEvents = getUpcomingEvents();
  const overdueEvents = getOverdueEvents();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
        isMenuOpen={isHeaderMenuOpen}
      />

      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          {/* Calendar Header */}
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigate={handleNavigate}
            onTodayClick={handleTodayClick}
            onAddEvent={handleAddEvent}
          />

          {/* Filters */}
          <CalendarFilters
            filters={filters}
            onFiltersChange={setFilters}
            onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
            isCollapsed={isFiltersCollapsed}
          />

          {/* Calendar Content */}
          <div className="flex flex-1">
            {/* Calendar Grid */}
            <CalendarGrid
              currentDate={currentDate}
              viewMode={viewMode}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onEventDrop={handleEventDrop}
            />

            {/* Maintenance Sidebar */}
            <MaintenanceSidebar
              upcomingEvents={upcomingEvents}
              overdueEvents={overdueEvents}
              technicianWorkload={technicianWorkload}
              onEventClick={handleEventClick}
              onBulkSchedule={() => setIsBulkScheduleOpen(true)}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
        mode={eventModalMode}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />

      {/* Bulk Schedule Modal */}
      <BulkScheduleModal
        isOpen={isBulkScheduleOpen}
        onClose={() => setIsBulkScheduleOpen(false)}
        onSchedule={handleBulkSchedule}
      />
    </div>
  );
};

export default MaintenanceCalendar;