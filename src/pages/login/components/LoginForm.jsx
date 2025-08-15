import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { authUtils } from '../../../utils/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@medasset.com', password: 'admin123' },
    technician: { email: 'tecnico@medasset.com', password: 'tech123' },
    doctor: { email: 'doctor@medasset.com', password: 'doc123' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Use auth utility to login
        authUtils?.login(formData?.email);
        
        // Store remember me preference if checked
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirect to equipment inventory
        navigate('/equipment-inventory');
      } else {
        setErrors({
          general: 'Credenciales incorrectas. Verifique su correo y contraseña.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Inténtelo de nuevo más tarde.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña próximamente disponible');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg medical-shadow-lg p-8 border border-border">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">MedAsset Pro</h1>
          <p className="text-muted-foreground">Gestión de Equipos Médicos</p>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-foreground mb-2">Bienvenido de vuelta</h2>
          <p className="text-sm text-muted-foreground">
            Ingrese sus credenciales para acceder al sistema
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="ejemplo@hospital.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Recordar contraseña"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 medical-transition"
              disabled={isLoading}
            >
              ¿Olvidé mi contraseña?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            className="mt-6"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center mb-2">
            Credenciales de demostración:
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Admin: admin@medasset.com / admin123</div>
            <div>Técnico: tecnico@medasset.com / tech123</div>
            <div>Doctor: doctor@medasset.com / doc123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;