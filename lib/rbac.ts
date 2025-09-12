export type Role = 'owner' | 'admin' | 'staff' | 'viewer';

export const RoleOrder: Record<Role, number> = {
  owner: 3,
  admin: 2,
  staff: 1,
  viewer: 0,
};

export function can(role: Role, permission: 'view_revenue' | 'manage_revenue' | 'manage_users' | 'edit_website' | 'manage_crm' | 'view_crm'): boolean {
  switch (permission) {
    case 'view_revenue':
      return role === 'owner' || role === 'admin' || role === 'staff';
    case 'manage_revenue':
      return role === 'owner' || role === 'admin';
    case 'manage_users':
      return role === 'owner' || role === 'admin';
    case 'edit_website':
      return role === 'owner' || role === 'admin';
    case 'manage_crm':
      return role === 'owner' || role === 'admin' || role === 'staff';
    case 'view_crm':
      return role === 'owner' || role === 'admin' || role === 'staff' || role === 'viewer';
    default:
      return false;
  }
}

export function atLeast(role: Role, min: Role) {
  return RoleOrder[role] >= RoleOrder[min];
}
