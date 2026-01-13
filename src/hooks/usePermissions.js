import { useSelector } from "react-redux";
import { ROLE_PERMISSIONS } from "../constants/permissions";

export const usePermissions = () => {
  const role = useSelector(state => state.auth.role);

  const hasPermission = (action) => {
    if (!role) return false;
    const permissions = ROLE_PERMISSIONS[role];
    return permissions?.actions?.includes(action) || false;
  };

  const canAccessRoute = (route) => {
    if (!role) return false;
    const allowedRoutes = ROLE_PERMISSIONS[role]?.routes || [];
    return allowedRoutes.some(allowedRoute =>
      route.startsWith(allowedRoute.replace("/:id", ""))
    );
  };

  const canCreate = () => hasPermission("CREATE");
  const canEdit = () => hasPermission("EDIT");
  const canOnboard = () => hasPermission("ONBOARD");

  return {
    hasPermission,
    canAccessRoute,
    canCreate,
    canEdit,
    canOnboard,
    role
  };
};