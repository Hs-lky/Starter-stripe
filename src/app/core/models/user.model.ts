export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  enabled: boolean;
  lastLoginDate?: string;
}

export interface UserResponse {
  content: User[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
} 