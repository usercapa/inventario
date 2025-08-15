import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'GDPR Compliant',
      icon: 'Shield',
      description: 'Cumplimiento total con GDPR'
    },
    {
      id: 2,
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Certificación de seguridad'
    },
    {
      id: 3,
      name: 'HIPAA Compliant',
      icon: 'Lock',
      description: 'Protección de datos médicos'
    },
    {
      id: 4,
      name: 'FDA Registered',
      icon: 'CheckCircle',
      description: 'Registro FDA para dispositivos'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Dr. María González',
      role: 'Directora de Bioingeniería',
      hospital: 'Hospital Universitario Madrid',
      content: `MedAsset Pro ha transformado completamente nuestra gestión de equipos médicos. La reducción del tiempo de inactividad ha sido del 40%.`,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=64&h=64&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Ing. Carlos Ruiz',
      role: 'Jefe de Mantenimiento',
      hospital: 'Clínica San Rafael',
      content: `La programación preventiva automatizada nos ha permitido optimizar recursos y mejorar la disponibilidad de equipos críticos.`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    }
  ];

  return (
    <div className="hidden lg:block w-full max-w-md">
      {/* Certifications */}
      <div className="bg-card rounded-lg medical-shadow-md p-6 border border-border mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Certificaciones y Cumplimiento
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="flex flex-col items-center text-center p-3 bg-muted rounded-lg medical-transition hover:bg-muted/80"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Icon name={cert?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">{cert?.name}</h4>
              <p className="text-xs text-muted-foreground">{cert?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-card rounded-lg medical-shadow-md p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Lo que dicen nuestros clientes
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="border-l-4 border-primary pl-4">
              <blockquote className="text-sm text-muted-foreground mb-3 italic">
                "{testimonial?.content}"
              </blockquote>
              <div className="flex items-center space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial?.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial?.role}</p>
                  <p className="text-xs text-primary">{testimonial?.hospital}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Conexión Segura</p>
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} MedAsset Pro. Todos los derechos reservados.
              Todos los datos se transmiten mediante cifrado SSL/TLS de 256 bits y se almacenan 
              en servidores certificados ISO 27001.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;