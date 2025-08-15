import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WorkOrderManagement from './pages/work-order-management';
import LoginPage from './pages/login';
import MaintenanceCalendar from './pages/maintenance-calendar';
import UserManagement from './pages/user-management';
import EquipmentInventory from './pages/equipment-inventory';
import EquipmentDetails from './pages/equipment-details';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EquipmentDetails />} />
        <Route path="/work-order-management" element={<WorkOrderManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/maintenance-calendar" element={<MaintenanceCalendar />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/equipment-inventory" element={<EquipmentInventory />} />
        <Route path="/equipment-details" element={<EquipmentDetails />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
