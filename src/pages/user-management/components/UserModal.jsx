import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Personal Clínico',
    department: '',
    phone: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'Personal Clínico',
        department: user?.department || '',
        phone: user?.phone || '',
        status: user?.status || 'active'
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        role: 'Personal Clínico',
        department: '',
        phone: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const roles = [
    'Administrador',
    'Técnico Biomédico',
    'Personal Clínico',
    'Supervisor de Mantenimiento',
    'Técnico Externo'
  ];

  const departments = [
    'Cardiología',
    'Radiología',
    'Laboratorio',
    'Quirófano',
    'UCI',
    'Emergencias',
    'Mantenimiento',
    'Administración'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData?.department) {
      newErrors.department = 'El departamento es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card border border-border rounded-lg medical-shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Icon name={mode === 'create' ? 'UserPlus' : 'UserCog'} size={20} className="mr-2" />
            {mode === 'create' ? 'Crear Usuario' : 'Editar Usuario'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Nombre Completo"
            type="text"
            value={formData?.name}
            onChange={(e) => handleChange('name', e?.target?.value)}
            error={errors?.name}
            required
            placeholder="Ingresa el nombre completo"
          />

          <Input
            label="Correo Electrónico"
            type="email"
            value={formData?.email}
            onChange={(e) => handleChange('email', e?.target?.value)}
            error={errors?.email}
            required
            placeholder="usuario@hospital.com"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rol <span className="text-destructive">*</span>
            </label>
            <select
              value={formData?.role}
              onChange={(e) => handleChange('role', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            >
              {roles?.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Departamento <span className="text-destructive">*</span>
            </label>
            <select
              value={formData?.department}
              onChange={(e) => handleChange('department', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            >
              <option value="">Seleccionar departamento</option>
              {departments?.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors?.department && (
              <p className="text-destructive text-sm mt-1">{errors?.department}</p>
            )}
          </div>

          <Input
            label="Teléfono"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleChange('phone', e?.target?.value)}
            placeholder="+34 600 000 000"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Estado
            </label>
            <select
              value={formData?.status}
              onChange={(e) => handleChange('status', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
            >
              {mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;