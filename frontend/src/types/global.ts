// frontend/src/types/global.ts
// Global types used across the entire marketplace (import as: import type { ApiResponse, ApiError } from '@/types/global')

/** Standard API response wrapper (matches Django REST Framework) */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/** Paginated response (for future product listing with pagination) */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Standard API error shape */
export interface ApiError {
  detail: string;
  code?: string;
  [key: string]: any;
}

/** Global user type (shared between auth, account, orders) */
export interface GlobalUser {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  avatar?: string;
}

/** Common money/currency type (BDT focused) */
export type BDT = number; // always store as number, display with ৳

/** Generic ID type (used everywhere) */
export type ID = number | string;

/** Route params helper (for React Router) */
export interface RouteParams {
  [key: string]: string | undefined;
}

/** Toast / notification type (for future global toast system) */
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}