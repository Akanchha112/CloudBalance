import { usePermissions } from "../hooks/usePermissions";

export const PermissionGuard = ({ action, children, fallback = null }) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(action)) {
    return fallback;
  }

  return children;
};