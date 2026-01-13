// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SideBar.scss';

export const SideBar = () => {
  const location = useLocation();
  console.log(location);
  const menuItems = [
    { path: '/app/users', label: 'Users', icon: '👥' },
    { path: '/app/account-onboard', label: 'Account Onboarding', icon: '🤝' },
    { path: '/app/cost-explorer', label: 'Cost Explorer', icon: '📊' },
    { path: '/module-control', label: 'Module Control Grid', icon: '⚙️' },
    // { path: '/tags', label: 'Tags', icon: '🏷️' },
    // { path: '/permission-group', label: 'Permission Group', icon: '🔐' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>CloudKeeper</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive && location.pathname===item.path ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

