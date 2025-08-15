import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkOrderStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Órdenes',
      value: stats?.total,
      icon: 'ClipboardList',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pendientes',
      value: stats?.pending,
      icon: 'Clock',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'En Progreso',
      value: stats?.inProgress,
      icon: 'Settings',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Resueltas',
      value: stats?.resolved,
      icon: 'CheckCircle',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Críticas',
      value: stats?.critical,
      icon: 'AlertTriangle',
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Tiempo Promedio',
      value: `${stats?.avgResolutionTime}h`,
      icon: 'Timer',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 medical-shadow-sm medical-transition hover:medical-shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.textColor} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkOrderStats;