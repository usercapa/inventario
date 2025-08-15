import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserStats from './components/UserStats';
import UserFilters from './components/UserFilters';
import BulkActions from './components/BulkActions';
import UserTable from './components/UserTable';
import UserCard from './components/UserCard';
import UserModal from './components/UserModal';

const UserManagementContent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data
  const mockUsers = [
    {
      id: 1,
      name: "Dr. María García López",
      email: "maria.garcia@hospital.es",
      role: "Administrador",
      department: "Administración",
      phone: "+34 600 123 456",
      status: "active",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date('2023-01-15')
    },
    {
      id: 2,
      name: "Carlos Rodríguez Martín",
      email: "carlos.rodriguez@hospital.es",
      role: "Técnico Biomédico",
      department: "Mantenimiento",
      phone: "+34 600 234 567",
      status: "active",
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      createdAt: new Date('2023-02-20')
    },
    {
      id: 3,
      name: "Ana Fernández Silva",
      email: "ana.fernandez@hospital.es",
      role: "Personal Clínico",
      department: "Cardiología",
      phone: "+34 600 345 678",
      status: "active",
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      createdAt: new Date('2023-03-10')
    },
    {
      id: 4,
      name: "José Luis Moreno",
      email: "jose.moreno@hospital.es",
      role: "Supervisor de Mantenimiento",
      department: "Mantenimiento",
      phone: "+34 600 456 789",
      status: "active",
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000),
      createdAt: new Date('2023-01-25')
    },
    {
      id: 5,
      name: "Laura Jiménez Ruiz",
      email: "laura.jimenez@hospital.es",
      role: "Personal Clínico",
      department: "Radiología",
      phone: "+34 600 567 890",
      status: "inactive",
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date('2023-04-05')
    },
    {
      id: 6,
      name: "Miguel Ángel Torres",
      email: "miguel.torres@hospital.es",
      role: "Técnico Externo",
      department: "Mantenimiento",
      phone: "+34 600 678 901",
      status: "active",
      lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000),
      createdAt: new Date('2023-05-12')
    },
    {
      id: 7,
      name: "Carmen Vázquez Díaz",
      email: "carmen.vazquez@hospital.es",
      role: "Personal Clínico",
      department: "Laboratorio",
      phone: "+34 600 789 012",
      status: "active",
      lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000),
      createdAt: new Date('2023-06-18')
    },
    {
      id: 8,
      name: "Francisco Herrera",
      email: "francisco.herrera@hospital.es",
      role: "Técnico Biomédico",
      department: "Quirófano",
      phone: "+34 600 890 123",
      status: "suspended",
      lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      createdAt: new Date('2023-07-22')
    },
    {
      id: 9,
      name: "Isabel Romero Castro",
      email: "isabel.romero@hospital.es",
      role: "Personal Clínico",
      department: "UCI",
      phone: "+34 600 901 234",
      status: "active",
      lastLogin: new Date(Date.now() - 45 * 60 * 1000),
      createdAt: new Date('2023-08-08')
    },
    {
      id: 10,
      name: "Roberto Sánchez Gil",
      email: "roberto.sanchez@hospital.es",
      role: "Administrador",
      department: "Administración",
      phone: "+34 600 012 345",
      status: "active",
      lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000),
      createdAt: new Date('2023-09-14')
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter and sort users
  useEffect(() => {
    let filtered = users?.filter(user => {
      const matchesSearch = !searchTerm || 
        user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesRole = !selectedRole || user?.role === selectedRole;
      const matchesDepartment = !selectedDepartment || user?.department === selectedDepartment;
      const matchesStatus = !selectedStatus || user?.status === selectedStatus;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });

    // Sort filtered users
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'lastLogin') {
          aValue = aValue ? new Date(aValue) : new Date(0);
          bValue = bValue ? new Date(bValue) : new Date(0);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedDepartment, selectedStatus, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers?.length === filteredUsers?.length 
        ? [] 
        : filteredUsers?.map(user => user?.id)
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRole('');
    setSelectedDepartment('');
    setSelectedStatus('');
  };

  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleViewProfile = (user) => {
    // Mock implementation - would navigate to user profile
    alert(`Ver perfil de ${user?.name}\n\nEsta funcionalidad abriría el perfil detallado del usuario con información completa, historial de actividad y configuraciones de seguridad.`);
  };

  const handleResetPassword = (user) => {
    // Mock implementation
    alert(`Restablecer contraseña para ${user?.name}\n\nSe enviará un enlace de restablecimiento de contraseña al email: ${user?.email}`);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleSaveUser = (userData) => {
    if (modalMode === 'create') {
      const newUser = {
        ...userData,
        id: Math.max(...users?.map(u => u?.id)) + 1,
        lastLogin: null,
        createdAt: new Date()
      };
      setUsers(prev => [...prev, newUser]);
    } else {
      setUsers(prev => prev?.map(u => 
        u?.id === selectedUser?.id ? { ...u, ...userData } : u
      ));
    }
  };

  const handleBulkActivate = () => {
    setUsers(prev => prev?.map(u => 
      selectedUsers?.includes(u?.id) ? { ...u, status: 'active' } : u
    ));
    setSelectedUsers([]);
  };

  const handleBulkDeactivate = () => {
    setUsers(prev => prev?.map(u => 
      selectedUsers?.includes(u?.id) ? { ...u, status: 'inactive' } : u
    ));
    setSelectedUsers([]);
  };

  const handleBulkRoleChange = (newRole) => {
    setUsers(prev => prev?.map(u => 
      selectedUsers?.includes(u?.id) ? { ...u, role: newRole } : u
    ));
    setSelectedUsers([]);
  };

  const handleBulkDelete = () => {
    if (confirm(`¿Estás seguro de que deseas eliminar ${selectedUsers?.length} usuarios? Esta acción no se puede deshacer.`)) {
      setUsers(prev => prev?.filter(u => !selectedUsers?.includes(u?.id)));
      setSelectedUsers([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border medical-shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center">
                <Icon name="Users" size={28} className="mr-3" />
                Gestión de Usuarios
              </h1>
              <p className="text-muted-foreground mt-1">
                Administra usuarios, roles y permisos del sistema MedAsset Pro
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="px-3"
                >
                  <Icon name="Table" size={16} className="mr-1" />
                  Tabla
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="px-3"
                >
                  <Icon name="Grid3X3" size={16} className="mr-1" />
                  Tarjetas
                </Button>
              </div>
              <Button
                variant="default"
                onClick={handleCreateUser}
                className="flex items-center"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Nuevo Usuario
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <UserStats users={users} />

        {/* Filters */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onClearFilters={handleClearFilters}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selectedUsers?.length}
          onBulkActivate={handleBulkActivate}
          onBulkDeactivate={handleBulkDeactivate}
          onBulkRoleChange={handleBulkRoleChange}
          onBulkDelete={handleBulkDelete}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground">
              Usuarios ({filteredUsers?.length})
            </h2>
            {(searchTerm || selectedRole || selectedDepartment || selectedStatus) && (
              <span className="text-sm text-muted-foreground">
                Filtrado de {users?.length} usuarios totales
              </span>
            )}
          </div>
        </div>

        {/* User List */}
        {filteredUsers?.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedRole || selectedDepartment || selectedStatus
                ? 'Intenta ajustar los filtros de búsqueda' :'Comienza creando tu primer usuario'
              }
            </p>
            {!(searchTerm || selectedRole || selectedDepartment || selectedStatus) && (
              <Button variant="default" onClick={handleCreateUser}>
                <Icon name="UserPlus" size={16} className="mr-2" />
                Crear Primer Usuario
              </Button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <UserTable
            users={filteredUsers}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleEditUser}
            onViewProfile={handleViewProfile}
            onResetPassword={handleResetPassword}
            onToggleStatus={handleToggleStatus}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers?.map((user) => (
              <UserCard
                key={user?.id}
                user={user}
                onEdit={handleEditUser}
                onViewProfile={handleViewProfile}
                onResetPassword={handleResetPassword}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>
      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        mode={modalMode}
      />
    </div>
  );
};

const UserManagement = () => {
  return (
    <ProtectedRoute requiredRole="admin" requiredPermission="user_management" fallback={<div>Access Denied</div>}>
      <UserManagementContent />
    </ProtectedRoute>
  );
};

export default UserManagement;