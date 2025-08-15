import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import EquipmentOverview from './components/EquipmentOverview';
import MaintenanceHistory from './components/MaintenanceHistory';
import DocumentsTab from './components/DocumentsTab';
import StatusChangeModal from './components/StatusChangeModal';

const EquipmentDetails = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Mock equipment data
  const equipmentData = {
    id: "EQ-2024-001",
    name: "Monitor de Signos Vitales Philips IntelliVue MX450",
    serialNumber: "MX450-2024-001",
    manufacturer: "Philips Healthcare",
    model: "IntelliVue MX450",
    status: "Operativo",
    location: "UCI - Habitación 301",
    department: "Unidad de Cuidados Intensivos",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    yearManufactured: "2023",
    installationDate: "15/03/2024",
    voltage: "100-240V AC",
    power: "65W",
    weight: "2.8 kg",
    dimensions: "24 x 18 x 8 cm",
    warrantyStatus: "Vigente",
    warrantyExpiry: "15/03/2027",
    vendor: "Philips Healthcare España",
    serviceContract: "Contrato Premium",
    nextMaintenance: "15/02/2025",
    priority: "Alta",
    assignedPersonnel: [
      { name: "Dr. María García", role: "Médico Responsable" },
      { name: "Enf. Carlos López", role: "Enfermero Jefe" },
      { name: "Téc. Ana Martínez", role: "Técnico Biomédico" }
    ]
  };

  // Mock maintenance history
  const maintenanceHistory = [
    {
      id: "MH-001",
      type: "Preventivo",
      title: "Mantenimiento Preventivo Trimestral",
      date: "10/01/2025",
      status: "Completado",
      technician: "Téc. Juan Rodríguez",
      duration: "2.5 horas",
      cost: "€150.00",
      workOrderId: "WO-2025-045",
      notes: `Mantenimiento preventivo realizado según protocolo:\n\n• Limpieza general del equipo\n• Verificación de conexiones eléctricas\n• Calibración de sensores de presión\n• Actualización de firmware a versión 3.2.1\n• Pruebas de funcionamiento completas\n\nTodos los parámetros dentro de especificaciones normales.`,
      recommendations: "Reemplazar cable de alimentación en próximo mantenimiento (muestra signos de desgaste leve).",
      partsUsed: [
        { name: "Filtro de aire", quantity: 1, cost: "€15.00" },
        { name: "Sensor de temperatura", quantity: 1, cost: "€45.00" }
      ],
      attachments: [
        { name: "reporte_mantenimiento_enero.pdf", size: "2.3 MB" },
        { name: "calibracion_sensores.xlsx", size: "156 KB" }
      ]
    },
    {
      id: "MH-002",
      type: "Correctivo",
      title: "Reparación de Pantalla LCD",
      date: "28/12/2024",
      status: "Completado",
      technician: "Téc. Laura Fernández",
      duration: "4 horas",
      cost: "€320.00",
      workOrderId: "WO-2024-198",
      notes: `Reparación correctiva por falla en pantalla LCD:\n\n• Diagnóstico inicial: píxeles muertos en cuadrante superior\n• Reemplazo completo de módulo LCD\n• Recalibración de colores y brillo\n• Pruebas de visualización en diferentes condiciones de luz\n• Verificación de conectores internos\n\nEquipo restaurado a funcionamiento óptimo.`,
      partsUsed: [
        { name: "Módulo LCD 12.1\"", quantity: 1, cost: "€280.00" },
        { name: "Cable flex LCD", quantity: 1, cost: "€25.00" }
      ],
      attachments: [
        { name: "diagnostico_pantalla.pdf", size: "1.8 MB" },
        { name: "foto_antes_reparacion.jpg", size: "3.2 MB" },
        { name: "foto_despues_reparacion.jpg", size: "2.9 MB" }
      ]
    },
    {
      id: "MH-003",
      type: "Calibración",
      title: "Calibración Anual de Sensores",
      date: "15/11/2024",
      status: "Completado",
      technician: "Téc. Miguel Santos",
      duration: "3 horas",
      cost: "€200.00",
      workOrderId: "WO-2024-156",
      notes: `Calibración anual completa de todos los sensores:\n\n• Calibración de sensor de presión arterial\n• Ajuste de sensor de temperatura corporal\n• Verificación de sensor de saturación de oxígeno\n• Calibración de sensor de frecuencia cardíaca\n• Documentación de certificados de calibración\n\nTodos los sensores calibrados según estándares ISO 13485.`,
      attachments: [
        { name: "certificado_calibracion_2024.pdf", size: "4.1 MB" },
        { name: "protocolo_calibracion.docx", size: "890 KB" }
      ]
    },
    {
      id: "MH-004",
      type: "Inspección",
      title: "Inspección de Seguridad Eléctrica",
      date: "02/10/2024",
      status: "Completado",
      technician: "Téc. Carmen Ruiz",
      duration: "1.5 horas",
      cost: "€80.00",
      workOrderId: "WO-2024-134",
      notes: `Inspección de seguridad eléctrica según normativa IEC 60601:\n\n• Medición de resistencia de aislamiento\n• Verificación de corriente de fuga\n• Prueba de continuidad de tierra\n• Inspección visual de cables y conectores\n• Verificación de etiquetado de seguridad\n\nEquipo cumple con todos los requisitos de seguridad.`,
      attachments: [
        { name: "certificado_seguridad_electrica.pdf", size: "1.5 MB" }
      ]
    }
  ];

  // Mock documents
  const documentsData = [
    {
      id: "DOC-001",
      name: "Manual de Usuario MX450",
      type: "pdf",
      category: "manuales",
      size: 15728640, // 15 MB
      uploadDate: "15/03/2024",
      url: "https://example.com/manual.pdf"
    },
    {
      id: "DOC-002",
      name: "Certificado de Calibración 2024",
      type: "pdf",
      category: "certificados",
      size: 2097152, // 2 MB
      uploadDate: "15/11/2024",
      url: "https://example.com/certificate.pdf"
    },
    {
      id: "DOC-003",
      name: "Garantía del Fabricante",
      type: "pdf",
      category: "garantias",
      size: 1048576, // 1 MB
      uploadDate: "15/03/2024",
      url: "https://example.com/warranty.pdf"
    },
    {
      id: "DOC-004",
      name: "Foto Instalación Inicial",
      type: "jpg",
      category: "fotos",
      size: 3145728, // 3 MB
      uploadDate: "15/03/2024",
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop"
    },
    {
      id: "DOC-005",
      name: "Reporte Mantenimiento Enero",
      type: "pdf",
      category: "reportes",
      size: 2621440, // 2.5 MB
      uploadDate: "10/01/2025",
      url: "https://example.com/report.pdf"
    },
    {
      id: "DOC-006",
      name: "Especificaciones Técnicas",
      type: "docx",
      category: "manuales",
      size: 524288, // 512 KB
      uploadDate: "15/03/2024",
      url: "https://example.com/specs.docx"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Información General', icon: 'Info' },
    { id: 'maintenance', label: 'Historial de Mantenimiento', icon: 'History' },
    { id: 'documents', label: 'Documentos', icon: 'FolderOpen' }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStatusChange = (changeData) => {
    console.log('Status change:', changeData);
    // Here you would typically update the equipment status
    // and trigger any necessary notifications or workflows
  };

  const handleScheduleMaintenance = () => {
    // Navigate to maintenance calendar or open scheduling modal
    console.log('Schedule maintenance for equipment:', equipmentData?.id);
  };

  const handleCreateWorkOrder = () => {
    // Navigate to work order creation or open modal
    console.log('Create work order for equipment:', equipmentData?.id);
  };

  const handleDocumentUpload = (file) => {
    console.log('Upload document:', file?.name);
    // Handle file upload logic here
  };

  const handleDocumentDelete = (documentId) => {
    console.log('Delete document:', documentId);
    // Handle document deletion logic here
  };

  const sidebarWidth = isSidebarCollapsed ? 'ml-16' : 'ml-60';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        className={isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      />
      {/* Main Content */}
      <main className={`pt-16 ${sidebarWidth} medical-transition`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <a href="/equipment-inventory" className="hover:text-foreground medical-transition">
              Inventario de Equipos
            </a>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Detalles del Equipo</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Detalles del Equipo
              </h1>
              <p className="text-muted-foreground">
                Información completa y gestión del equipo médico
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                onClick={() => setShowStatusModal(true)}
              >
                Cambiar Estado
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Generar Reporte
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Edit"
                iconPosition="left"
              >
                Editar Equipo
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg border border-border mb-6 medical-shadow-sm">
            <div className="flex flex-wrap border-b border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium medical-transition ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <EquipmentOverview
                  equipment={equipmentData}
                  onStatusChange={() => setShowStatusModal(true)}
                  onScheduleMaintenance={handleScheduleMaintenance}
                  onCreateWorkOrder={handleCreateWorkOrder}
                />
              )}

              {activeTab === 'maintenance' && (
                <MaintenanceHistory maintenanceRecords={maintenanceHistory} />
              )}

              {activeTab === 'documents' && (
                <DocumentsTab
                  documents={documentsData}
                  onUpload={handleDocumentUpload}
                  onDelete={handleDocumentDelete}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Status Change Modal */}
      <StatusChangeModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        currentStatus={equipmentData?.status}
        onStatusChange={handleStatusChange}
      />
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={handleMenuToggle}
        />
      )}
    </div>
  );
};

export default EquipmentDetails;