import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import MobileLayout from './components/MobileLayout';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/equipment-inventory');
      return;
    }

    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  // Mobile layout for screens < 1024px
  if (isMobile) {
    return <MobileLayout />;
  }

  // Desktop layout for screens >= 1024px
  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Login Form */}
            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>

            {/* Right Side - Trust Signals */}
            <div className="flex justify-center lg:justify-start">
              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}

    </div>
  );
};

export default LoginPage;