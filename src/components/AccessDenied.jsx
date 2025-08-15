import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './ui/Button';

const AccessDenied = ({ requiredRole = 'administrador' }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/equipment-inventory');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="ShieldX" size={40} className="text-error" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Acceso Denegado
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          No tienes permisos suficientes para acceder a esta funcionalidad. 
          Se requiere rol de <span className="font-semibold">{requiredRole}</span> para continuar.
        </p>

        {/* Additional Info */}
        <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>
              Contacta al administrador del sistema para solicitar acceso
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Volver</span>
          </Button>
          <Button
            variant="default"
            onClick={handleGoHome}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={16} />
            <span>Ir al Inicio</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;