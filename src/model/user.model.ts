export interface User{
    id: string;
  username: string;
  email: string;
  phoneNumber: string; 
  address: string;
  gender: string;
  password?: string;   
  roleId?: number;   
  createdAt: string;
  updatedAt: string | null;
}