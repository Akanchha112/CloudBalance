// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SideBar.scss';

export const SideBar = ({ collapsed }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/app/users', label: 'Users', icon: '👥' },
    { path: '/app/account-onboard', label: 'Account Onboarding', icon: '🤝' },
    { path: '/app/cost-explorer', label: 'Cost Explorer', icon: '📊' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">{!collapsed && <h2>CloudKeeper</h2>}</div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive && location.pathname===item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-text">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};


