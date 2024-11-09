export interface NavItemInterface {
  name: string;
  path: string;
  requiresAuth?: boolean;
  dropdown?: { name: string; path: string }[];
}
