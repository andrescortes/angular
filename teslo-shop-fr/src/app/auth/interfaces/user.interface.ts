export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: Role[];
}

export enum Role {
  Admin = "admin",
}
