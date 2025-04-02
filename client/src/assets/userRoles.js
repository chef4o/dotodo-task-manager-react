export const UserRoles = {
  LIGHT: 1,
  NORMAL: 2,
  MODERATOR: 3,
  ADMIN: 4,
  SUPER_ADMIN: 5,
};

export function getPossibleRoles(currentAdminUserRole) {
  return Object.entries(UserRoles)
    .filter(([roleName, roleValue]) => roleValue < currentAdminUserRole)
    .map(([roleName]) => roleName);
}

export function getRoleName(roleValue) {
  const entry = Object.entries(UserRoles).find(([key, value]) => value === roleValue);
  return entry ? entry[0] : roleValue;
}
