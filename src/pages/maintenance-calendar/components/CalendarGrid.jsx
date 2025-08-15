import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarGrid = ({ 
  currentDate, 
  viewMode, 
  events, 
  onEventClick, 
  onDateClick,
  onEventDrop 
}) => {
  const today = new Date();
  
  const getMonthDays = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }
    
    return days;
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const getDayEvents = (date) => {
    const dateStr = date?.toDateString();
    return events?.filter(event => 
      new Date(event.scheduledDate)?.toDateString() === dateStr
    );
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors?.[priority] || 'bg-blue-500';
  };

  const getTypeColor = (type) => {
    const colors = {
      preventive: 'bg-blue-100 text-blue-800 border-blue-200',
      corrective: 'bg-red-100 text-red-800 border-red-200',
      calibration: 'bg-purple-100 text-purple-800 border-purple-200',
      inspection: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const isToday = (date) => {
    return date?.toDateString() === today?.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date?.getMonth() === currentDate?.getMonth();
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr)?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDragStart = (e, event) => {
    e?.dataTransfer?.setData('text/plain', JSON.stringify(event));
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e, date) => {
    e?.preventDefault();
    const eventData = JSON.parse(e?.dataTransfer?.getData('text/plain'));
    onEventDrop(eventData, date);
  };

  if (viewMode === 'month') {
    const days = getMonthDays();
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
      <div className="flex-1 bg-card">
        {/* Week Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays?.map((day, index) => (
            <div key={index} className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted/50">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1">
          {days?.map((day, index) => {
            const dayEvents = getDayEvents(day);
            const isCurrentMonthDay = isCurrentMonth(day);
            const isTodayDay = isToday(day);

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-border p-2 cursor-pointer hover:bg-muted/30 transition-colors ${
                  !isCurrentMonthDay ? 'bg-muted/20 text-muted-foreground' : ''
                } ${isTodayDay ? 'bg-primary/5' : ''}`}
                onClick={() => onDateClick(day)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isTodayDay ? 'text-primary' : isCurrentMonthDay ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {day?.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents?.slice(0, 3)?.map((event) => (
                    <div
                      key={event?.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`text-xs p-1 rounded border cursor-pointer hover:shadow-sm transition-shadow ${getTypeColor(event?.type)}`}
                    >
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(event?.priority)}`}></div>
                        <span className="truncate flex-1">{event?.equipmentName}</span>
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {formatTime(event?.scheduledDate)}
                      </div>
                    </div>
                  ))}
                  
                  {dayEvents?.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{dayEvents?.length - 3} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (viewMode === 'week') {
    const days = getWeekDays();
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex-1 bg-card">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-3 border-r border-border"></div>
          {days?.map((day, index) => (
            <div key={index} className={`p-3 text-center border-r border-border ${
              isToday(day) ? 'bg-primary/5' : ''
            }`}>
              <div className="text-sm font-medium text-foreground">
                {day?.toLocaleDateString('es-ES', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-semibold ${
                isToday(day) ? 'text-primary' : 'text-foreground'
              }`}>
                {day?.getDate()}
              </div>
            </div>
          ))}
        </div>
        {/* Week Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-8">
            {/* Time Column */}
            <div className="border-r border-border">
              {hours?.map((hour) => (
                <div key={hour} className="h-16 border-b border-border p-2 text-xs text-muted-foreground">
                  {hour?.toString()?.padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {days?.map((day, dayIndex) => (
              <div key={dayIndex} className="border-r border-border">
                {hours?.map((hour) => {
                  const dayEvents = getDayEvents(day)?.filter(event => {
                    const eventHour = new Date(event.scheduledDate)?.getHours();
                    return eventHour === hour;
                  });

                  return (
                    <div
                      key={hour}
                      className="h-16 border-b border-border p-1 hover:bg-muted/30 cursor-pointer"
                      onClick={() => onDateClick(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour))}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour))}
                    >
                      {dayEvents?.map((event) => (
                        <div
                          key={event?.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onEventClick(event);
                          }}
                          className={`text-xs p-1 rounded border mb-1 cursor-pointer hover:shadow-sm ${getTypeColor(event?.type)}`}
                        >
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(event?.priority)}`}></div>
                            <span className="truncate flex-1">{event?.equipmentName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'day') {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = getDayEvents(currentDate);

    return (
      <div className="flex-1 bg-card">
        {/* Day Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {currentDate?.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dayEvents?.length} mantenimientos programados
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDateClick(currentDate)}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Agregar Mantenimiento
            </Button>
          </div>
        </div>
        {/* Day Schedule */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2">
            {/* Time Column */}
            <div className="border-r border-border">
              {hours?.map((hour) => {
                const hourEvents = dayEvents?.filter(event => {
                  const eventHour = new Date(event.scheduledDate)?.getHours();
                  return eventHour === hour;
                });

                return (
                  <div key={hour} className="min-h-[80px] border-b border-border p-3">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      {hour?.toString()?.padStart(2, '0')}:00
                    </div>
                    <div className="space-y-2">
                      {hourEvents?.map((event) => (
                        <div
                          key={event?.id}
                          onClick={() => onEventClick(event)}
                          className={`p-2 rounded border cursor-pointer hover:shadow-sm ${getTypeColor(event?.type)}`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(event?.priority)}`}></div>
                            <span className="font-medium">{event?.equipmentName}</span>
                          </div>
                          <div className="text-xs opacity-75">
                            {event?.technician} • {event?.estimatedDuration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Details Column */}
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-4">Resumen del Día</h4>
              <div className="space-y-4">
                {dayEvents?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No hay mantenimientos programados para este día</p>
                  </div>
                ) : (
                  dayEvents?.map((event) => (
                    <div
                      key={event?.id}
                      onClick={() => onEventClick(event)}
                      className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(event?.priority)}`}></div>
                          <span className="font-medium text-foreground">{event?.equipmentName}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(event?.scheduledDate)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Técnico: {event?.technician}</div>
                        <div>Tipo: {event?.type}</div>
                        <div>Duración: {event?.estimatedDuration}</div>
                        <div>Ubicación: {event?.location}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CalendarGrid;