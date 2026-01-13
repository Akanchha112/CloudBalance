import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import { AppLayout } from "../layout/AppLayout";
import { Login } from "../pages/Login/Login";
import { UserList } from "../pages/UserList/UserList";
import { UserCreate } from "../pages/UserCreate/UserCreate";
import { UserEdit } from "../pages/UserEdit/UserEdit";
import Onboarding from "../pages/Onboarding/Onboarding";
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";
import { ROLES } from "../constants/roles";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<ProtectedRoute />} />

      {/* Protected App */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Users - list (ADMIN + READONLY) */}
        <Route
          path="users"
          element={
            <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.READONLY]}>
              <UserList />
            </RoleProtectedRoute>
          }
        />

        {/* Users - create (ADMIN) */}
        <Route
          path="users/create"
          element={
            <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <UserCreate />
            </RoleProtectedRoute>
          }
        />

        {/* Users - edit (ADMIN) */}
        <Route
          path="users/:id/edit"
          element={
            <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <UserEdit />
            </RoleProtectedRoute>
          }
        />

        <Route path="account-onboard" element={<Onboarding />} />
      </Route>

      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/app" replace />} />

      {/* Fallback */}
      <Route path="*" element={<ErrorFallback />} />
    </Routes>
  );
};

export default AppRoutes;
