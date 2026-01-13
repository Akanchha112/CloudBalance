import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ROLE_PERMISSIONS } from "../constants/permissions";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const role = useSelector(state => state.auth.role);
  const location = useLocation();

  // Check if user's role is in allowed roles
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/app" replace />;
  }

  // Check if current route is allowed for this role
  const allowedRoutes = ROLE_PERMISSIONS[role]?.routes || [];
  const currentPath = location.pathname;
  
  const isAllowed = allowedRoutes.some(route => {
    // Handle dynamic routes like /app/users/:id/edit
    const routePattern = route.replace(/:id/g, '[^/]+');
    const regex = new RegExp(`^${routePattern}$`);
    return regex.test(currentPath);
  });

  if (!isAllowed) {
    return <Navigate to="/app" replace />;
  }

  return children;
}