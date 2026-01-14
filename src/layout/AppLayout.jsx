import { TopBar } from "../components/TopBar/TopBar";
import { SideBar } from "../components/SideBar/SideBar";
import { useState } from "react";
import "./AppLayout.scss";
import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
export const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <TopBar toggleSidebar={toggleSidebar} />

      <div className="layout-body">
        <div className="layout-sidebar">
          <SideBar collapsed={isSidebarCollapsed} />
        </div>

        <div className="layout-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};
