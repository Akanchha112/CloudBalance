import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SideBar.scss";
import { ROLE_PERMISSIONS } from "../../constants/permissions";
import { useSelector } from "react-redux";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

export const SideBar = ({ collapsed }) => {
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);

  const allowedRoutes = ROLE_PERMISSIONS[role]?.routes || [];

  const menuItems = [
    {
      path: "/app/users",
      label: "Users",
      icon: <PeopleOutlineIcon fontSize="small" />,
    },
    {
      path: "/app/account-onboard",
      label: "Account Onboarding",
      icon: <PersonAddAltOutlinedIcon fontSize="small" />,
    },
    {
      path: "/app/cost-explorer",
      label: "Cost Explorer",
      icon: <AnalyticsOutlinedIcon fontSize="small" />,
    },
  ];

  const filteredMenu = menuItems.filter((item) =>
    allowedRoutes.includes(item.path)
  );

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        {!collapsed && <h2>CloudKeeper</h2>}
      </div>

      <nav className="sidebar-nav">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive && location.pathname === item.path ? "active" : ""
              }`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && (
              <span className="sidebar-text">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
