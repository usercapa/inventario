import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FilterBar from './components/FilterBar';
import BulkActionsBar from './components/BulkActionsBar';
import EquipmentTable from './components/EquipmentTable';
import EquipmentDetailsModal from './components/EquipmentDetailsModal';
import MobileEquipmentCard from './components/MobileEquipmentCard';

const EquipmentInventory = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    equipmentType: '',
    status: '',
    vendor: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  // Mock equipment data
  const mockEquipment = [
    {
      id: 1,
      name: "Monitor de Signos Vitales",
      model: "Philips IntelliVue MX450",
      serialNumber: "MX450-2024-001",
      manufacturer: "Philips Healthcare",
      manufacturingYear: "2023",
      acquisitionDate: "2024-01-15",
      acquisitionValue: "€12,500",
      status: "Operativo",
      location: {
        facility: "Hospital Central",
        building: "Edificio Principal",
        department: "UCI"
      },
      lastMaintenance: "2024-08-10",
      maintenanceType: "Preventivo",
      assignedTechnician: "Carlos Mendoza",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Ventilador Mecánico",
      model: "Dräger Evita V300",
      serialNumber: "EV300-2024-002",
      manufacturer: "Dräger Medical",
      manufacturingYear: "2023",
      acquisitionDate: "2024-02-20",
      acquisitionValue: "€35,000",
      status: "Mantenimiento",
      location: {
        facility: "Hospital Central",
        building: "Edificio Principal",
        department: "Quirófano 3"
      },
      lastMaintenance: "2024-08-05",
      maintenanceType: "Correctivo",
      assignedTechnician: "Ana García",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Desfibrilador",
      model: "Zoll X Series",
      serialNumber: "ZX-2024-003",
      manufacturer: "Zoll Medical",
      manufacturingYear: "2024",
      acquisitionDate: "2024-03-10",
      acquisitionValue: "€18,750",
      status: "Operativo",
      location: {
        facility: "Clínica Norte",
        building: "Torre A",
        department: "Emergencias"
      },
      lastMaintenance: "2024-07-28",
      maintenanceType: "Preventivo",
      assignedTechnician: "Luis Rodriguez",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Bomba de Infusión",
      model: "B.Braun Perfusor Space",
      serialNumber: "PS-2024-004",
      manufacturer: "B.Braun",
      manufacturingYear: "2023",
      acquisitionDate: "2024-01-25",
      acquisitionValue: "€3,200",
      status: "Fuera de Servicio",
      location: {
        facility: "Centro de Especialidades",
        building: "Edificio Sur",
        department: "Cardiología"
      },
      lastMaintenance: "2024-08-12",
      maintenanceType: "Correctivo",
      assignedTechnician: "María López",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Electrocardiografo",
      model: "GE MAC 2000",
      serialNumber: "MAC-2024-005",
      manufacturer: "GE Healthcare",
      manufacturingYear: "2024",
      acquisitionDate: "2024-04-15",
      acquisitionValue: "€8,900",
      status: "Operativo",
      location: {
        facility: "Hospital Central",
        building: "Edificio Principal",
        department: "Cardiología"
      },
      lastMaintenance: "2024-08-01",
      maintenanceType: "Preventivo",
      assignedTechnician: "Pedro Sánchez",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Ultrasonido Portátil",
      model: "Mindray TE7",
      serialNumber: "TE7-2024-006",
      manufacturer: "Mindray",
      manufacturingYear: "2023",
      acquisitionDate: "2024-05-20",
      acquisitionValue: "€22,000",
      status: "Operativo",
      location: {
        facility: "Clínica Norte",
        building: "Torre B",
        department: "Ginecología"
      },
      lastMaintenance: "2024-07-15",
      maintenanceType: "Preventivo",
      assignedTechnician: "Carmen Ruiz",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort equipment
  const filteredAndSortedEquipment = useMemo(() => {
    let filtered = mockEquipment?.filter(equipment => {
      const matchesSearch = !filters?.search || 
        equipment?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        equipment?.serialNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        equipment?.model?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesLocation = !filters?.location || 
        equipment?.location?.facility?.toLowerCase()?.includes(filters?.location?.toLowerCase());
      
      const matchesStatus = !filters?.status || 
        equipment?.status?.toLowerCase() === filters?.status?.toLowerCase();
      
      const matchesVendor = !filters?.vendor || 
        equipment?.manufacturer?.toLowerCase()?.includes(filters?.vendor?.toLowerCase());

      return matchesSearch && matchesLocation && matchesStatus && matchesVendor;
    });

    // Sort
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (sortConfig?.key === 'location') {
          aValue = a?.location?.facility;
          bValue = b?.location?.facility;
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }
        
        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectItem = (id, checked) => {
    setSelectedItems(prev => 
      checked 
        ? [...prev, id]
        : prev?.filter(item => item !== id)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedItems(checked ? filteredAndSortedEquipment?.map(item => item?.id) : []);
  };

  const handleViewDetails = (equipment) => {
    setSelectedEquipment(equipment);
    setIsDetailsModalOpen(true);
  };

  const handleEditEquipment = (equipment) => {
    console.log('Edit equipment:', equipment);
    // Navigate to edit form or open edit modal
  };

  const handleScheduleMaintenance = (equipment) => {
    console.log('Schedule maintenance for:', equipment);
    // Navigate to maintenance scheduling
  };

  const handleGenerateQR = (equipment) => {
    console.log('Generate QR for:', equipment);
    // Generate and download QR code
  };

  const handleBulkStatusUpdate = (status) => {
    console.log('Bulk status update:', status, selectedItems);
    setSelectedItems([]);
  };

  const handleBulkLocationTransfer = (location) => {
    console.log('Bulk location transfer:', location, selectedItems);
    setSelectedItems([]);
  };

  const handleBulkExport = (format) => {
    console.log('Bulk export:', format, selectedItems);
  };

  const handleExport = (format) => {
    console.log('Export all:', format);
  };

  const handleQRScan = () => {
    console.log('QR Scan initiated');
    // Open QR scanner or navigate to scan page
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      equipmentType: '',
      status: '',
      vendor: '',
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />
      <div className="flex pt-16">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 p-6 medical-transition ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Inventario de Equipos</h1>
                <p className="text-muted-foreground">
                  Gestiona y supervisa todos los equipos médicos de la institución
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleQRScan}
                  className="flex items-center space-x-2"
                >
                  <Icon name="QrCode" size={16} />
                  <span>Escanear QR</span>
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleEditEquipment(null)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Plus" size={16} />
                  <span>Nuevo Equipo</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Equipos</p>
                  <p className="text-xl font-semibold text-foreground">{mockEquipment?.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Operativos</p>
                  <p className="text-xl font-semibold text-foreground">
                    {mockEquipment?.filter(e => e?.status === 'Operativo')?.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En Mantenimiento</p>
                  <p className="text-xl font-semibold text-foreground">
                    {mockEquipment?.filter(e => e?.status === 'Mantenimiento')?.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 medical-shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="XCircle" size={20} className="text-error" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuera de Servicio</p>
                  <p className="text-xl font-semibold text-foreground">
                    {mockEquipment?.filter(e => e?.status === 'Fuera de Servicio')?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            onExport={handleExport}
            onQRScan={handleQRScan}
          />

          {/* Bulk Actions */}
          <BulkActionsBar
            selectedCount={selectedItems?.length}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkLocationTransfer={handleBulkLocationTransfer}
            onBulkExport={handleBulkExport}
            onClearSelection={() => setSelectedItems([])}
          />

          {/* Equipment List */}
          {isMobile ? (
            <div className="space-y-4">
              {filteredAndSortedEquipment?.map((equipment) => (
                <MobileEquipmentCard
                  key={equipment?.id}
                  equipment={equipment}
                  isSelected={selectedItems?.includes(equipment?.id)}
                  onSelect={handleSelectItem}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditEquipment}
                  onScheduleMaintenance={handleScheduleMaintenance}
                  onGenerateQR={handleGenerateQR}
                />
              ))}
            </div>
          ) : (
            <EquipmentTable
              equipment={filteredAndSortedEquipment}
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              onViewDetails={handleViewDetails}
              onEditEquipment={handleEditEquipment}
              onScheduleMaintenance={handleScheduleMaintenance}
              onGenerateQR={handleGenerateQR}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          )}

          {/* Equipment Details Modal */}
          <EquipmentDetailsModal
            equipment={selectedEquipment}
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedEquipment(null);
            }}
            onEdit={handleEditEquipment}
            onScheduleMaintenance={handleScheduleMaintenance}
          />
        </main>
      </div>
    </div>
  );
};

export default EquipmentInventory;