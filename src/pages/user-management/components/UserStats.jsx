import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ users }) => {
  const totalUsers = users?.length;
  const activeUsers = users?.filter(user => user?.status === 'active')?.length;
  const inactiveUsers = users?.filter(user => user?.status === 'inactive')?.length;
  const suspendedUsers = users?.filter(user => user?.status === 'suspended')?.length;

  const roleStats = users?.reduce((acc, user) => {
    acc[user.role] = (acc?.[user?.role] || 0) + 1;
    return acc;
  }, {});

  const departmentStats = users?.reduce((acc, user) => {
    acc[user.department] = (acc?.[user?.department] || 0) + 1;
    return acc;
  }, {});

  const recentLogins = users?.filter(user => {
    if (!user?.lastLogin) return false;
    const loginDate = new Date(user.lastLogin);
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return loginDate > dayAgo;
  })?.length;

  const stats = [
    {
      title: 'Total Usuarios',
      value: totalUsers,
      icon: 'Users',
      color: 'text-primary bg-primary/10',
      description: 'Usuarios registrados'
    },
    {
      title: 'Usuarios Activos',
      value: activeUsers,
      icon: 'UserCheck',
      color: 'text-success bg-success/10',
      description: 'Con acceso al sistema'
    },
    {
      title: 'Usuarios Inactivos',
      value: inactiveUsers,
      icon: 'UserX',
      color: 'text-warning bg-warning/10',
      description: 'Sin acceso temporal'
    },
    {
      title: 'Accesos Recientes',
      value: recentLogins,
      icon: 'Activity',
      color: 'text-accent bg-accent/10',
      description: 'Últimas 24 horas'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 medical-shadow-sm hover:medical-shadow-md medical-transition">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.description}</div>
            </div>
          </div>
          <h3 className="font-semibold text-foreground">{stat?.title}</h3>
        </div>
      ))}
      {/* Role Distribution */}
      <div className="bg-card border border-border rounded-lg p-6 medical-shadow-sm md:col-span-2">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="UserCog" size={20} className="mr-2" />
          Distribución por Roles
        </h3>
        <div className="space-y-3">
          {Object.entries(roleStats)?.map(([role, count]) => (
            <div key={role} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{role}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(count / totalUsers) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Department Distribution */}
      <div className="bg-card border border-border rounded-lg p-6 medical-shadow-sm md:col-span-2">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Building" size={20} className="mr-2" />
          Distribución por Departamentos
        </h3>
        <div className="space-y-3">
          {Object.entries(departmentStats)?.slice(0, 5)?.map(([dept, count]) => (
            <div key={dept} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{dept}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full" 
                    style={{ width: `${(count / totalUsers) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
          {Object.keys(departmentStats)?.length > 5 && (
            <div className="text-sm text-muted-foreground text-center pt-2">
              +{Object.keys(departmentStats)?.length - 5} departamentos más
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;