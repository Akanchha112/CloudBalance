import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { AppLayout } from "./layout/AppLayout";
import { UserList } from "./pages/UserList/UserList";
import { UserCreate } from "./pages/UserCreate/UserCreate";
import { UserEdit } from "./pages/UserEdit/UserEdit";
import Onboarding from "./pages/onboarding/Onboarding";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "./layout/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";
import { ToastContainer } from "react-toastify";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import { ROLES } from "./constants/roles";
import CostExplorer from "./pages/CostExplorer/CostExplorer";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute />} />

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="users">
                  <Route index element={
                    <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.READONLY]}>
                      <UserList />
                    </RoleProtectedRoute>
                  } />

                  <Route path="create" element={
                    <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                      <UserCreate />
                    </RoleProtectedRoute>
                  } />

                  <Route path=":id/edit" element={
                    <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                      <UserEdit />
                    </RoleProtectedRoute>
                  } />
              </Route>

              <Route path="account-onboard" element={
                <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.READONLY]}>
                   <Onboarding />
                 </RoleProtectedRoute>
                } />

              <Route path="cost-explorer" element={
                <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.READONLY,ROLES.CUSTOMER]}>
                   <CostExplorer/>
                 </RoleProtectedRoute>}>
              </Route>
            </Route>
            
            <Route path="*" element={<ErrorFallback />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;