// @/types/auth.ts
export enum UserRole {
  USER = "user",
  ORGANIZER = "organizer",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  MODERATOR = "moderator",
  VERIFIED = "verified",
  PREMIUM = "premium",
  AUTHOR = "author",
  EDITOR = "editor"
}

export interface UserData {
  id?: number;
  email: string;
  name: string;
  full_name?: string | null;
  phone?: string;
  is_active?: boolean;
  avatar_url?: string | null;
  cover_photo?: string | null;

  // Вместо одиночной роли - массив ролей
  roles?: UserRole[];

  // Также добавим флаг суперпользователя
  is_superuser?: boolean;

  created_at?: string | null;
  updated_at?: string | null;
  description?: string | null;
  rating?: number;
  followers_count?: number;
  following_count?: number;
  email_verification_code?: string | null;
  phone_verification_code?: string | null;
  is_phone_verified?: boolean;
  is_verified?: boolean;
}

export interface UserDataReg {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  terms?: string;
  form?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserDataReg {
  full_name?: string;
}

export interface AuthResponse {
  user: UserData;
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, phone: string, password: string) => Promise<any>;
  logout: () => void | Promise<void>;
  updateUserProfile: (data: Record<string, any> | FormData) => Promise<any>;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  fetchUserData?: () => Promise<UserData | undefined>;
  fetchUsersByIds: (userIds: number[]) => Promise<void>;
  getUserById: (userId: number | null) => UserData | null;
  usersCache: { [key: number]: UserData };
}