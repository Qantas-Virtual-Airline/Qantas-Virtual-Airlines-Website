// Role hierarchy
export const ROLES = {
  pilot: 0,
  staff: 1,
  admin: 2,
  owner: 3
};

// Get current role
export function getRole() {
  return localStorage.getItem("role") || "pilot";
}

// Permission check
export function hasPermission(required) {
  return ROLES[getRole()] >= ROLES[required];
}
