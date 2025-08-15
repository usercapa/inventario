import React from 'react';
import LoginForm from './LoginForm';
import Icon from '../../../components/AppIcon';

const MobileLayout = () => {
  const quickFeatures = [
    {
      icon: 'QrCode',
      title: 'Escaneo QR',
      description: 'Identificación rápida de equipos'
    },
    {
      icon: 'Calendar',
      title: 'Mantenimiento',
      description: 'Programación automatizada'
    },
    {
      icon: 'BarChart3',
      title: 'Reportes',
      description: 'Análisis en tiempo real'
    }
  ];

  const mobileCertifications = [
    { icon: 'Shield', name: 'GDPR' },
    { icon: 'Lock', name: 'HIPAA' },
    { icon: 'Award', name: 'ISO 27001' }
  ];

  return (
    <div className="lg:hidden min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 text-center">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Icon name="Activity" size={24} color="white" />
        </div>
        <h1 className="text-xl font-semibold mb-1">MedAsset Pro</h1>
        <p className="text-sm opacity-90">Gestión de Equipos Médicos</p>
      </div>
      {/* Login Form Container */}
      <div className="px-4 py-6">
        <LoginForm />
      </div>
      {/* Quick Features */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Características Principales
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {quickFeatures?.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border medical-shadow-sm"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Certifications */}
      <div className="px-4 pb-6">
        <div className="bg-card rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3 text-center">
            Certificaciones de Seguridad
          </h4>
          <div className="flex justify-center space-x-6">
            {mobileCertifications?.map((cert, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-1">
                  <Icon name={cert?.icon} size={16} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{cert?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="px-4 pb-6 text-center">
               <p className="text-xs text-muted-foreground mt-1">
          Conexión segura SSL/TLS 256-bit
        </p>
      </div>
    </div>
  );
};

export default MobileLayout;