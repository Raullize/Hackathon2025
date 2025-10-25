export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    zipCode: string;
    city: string;
    state: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    city: string;
    state: string;
    createdAt: Date;
  }
  
  export interface AuthResponse {
    message: string;
    user?: UserResponse;
    token?: string;
  }
  
  export interface ApiError {
    error: string;
  }