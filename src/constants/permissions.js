// src/constants/permissions.js
export const ROLE_PERMISSIONS = {
  ADMIN: {
    routes: [
      "/app/users",
      "/app/users/create",
      "/app/users/:id/edit",
      "/app/account-onboard",
      "/app/cost-explorer",
    ],
    actions: ["CREATE", "EDIT", "ONBOARD"],
  },

  READONLY: {
    routes: [
      "/app/users",
      "/app/account-onboard",
      "/app/cost-explorer",
    ],
    actions: [],
  },

  CUSTOMER: {
    routes: [
      "/app/cost-explorer",
    ],
    actions: [],
  },
};
