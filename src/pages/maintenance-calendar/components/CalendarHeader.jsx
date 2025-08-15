import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onNavigate, 
  onTodayClick,
  onAddEvent 
}) => {
  const formatDate = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return date?.toLocaleDateString('es-ES', options);
  };

  const viewModes = [
    { key: 'month', label: 'Mes', icon: 'Calendar' },
    { key: 'week', label: 'Semana', icon: 'CalendarDays' },
    { key: 'day', label: 'Día', icon: 'CalendarCheck' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-card border-b border-border">
      {/* Left Section - Title and Navigation */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Calendario de Mantenimiento</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Programación preventiva y correctiva
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('prev')}
            className="h-9 w-9 p-0"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          <div className="min-w-[200px] text-center">
            <h2 className="text-lg font-medium text-foreground capitalize">
              {formatDate(currentDate)}
            </h2>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('next')}
            className="h-9 w-9 p-0"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onTodayClick}
            className="ml-2"
          >
            Hoy
          </Button>
        </div>
      </div>
      {/* Right Section - View Controls and Actions */}
      <div className="flex items-center space-x-3">
        {/* View Mode Selector */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.key}
              variant={viewMode === mode?.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.key)}
              className="h-8 px-3"
            >
              <Icon name={mode?.icon} size={14} className="mr-1" />
              <span className="hidden sm:inline">{mode?.label}</span>
            </Button>
          ))}
        </div>

        {/* Add Event Button */}
        <Button
          variant="default"
          size="sm"
          onClick={onAddEvent}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span className="hidden sm:inline">Nuevo Mantenimiento</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;