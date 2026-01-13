import { TopBar } from "../components/TopBar/TopBar";
import { SideBar } from "../components/SideBar/SideBar";
import "./AppLayout.scss";
import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
export const AppLayout = () => {
  return (
    <div className="layout-container">
      <TopBar />

      <div className="layout-body">
        <div className="layout-sidebar">
          <SideBar />
        </div>

        <div className="layout-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};
