import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),

  refreshSession: async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      return !!(res.ok && json.success);
    } catch {
      return false;
    }
  },

  checkAuth: async () => {
    try {
      let res = await fetch('/api/auth/me', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      // Nếu 401 (token hết hạn hoặc missing), tự động refresh bằng refreshToken 7 ngày
      if (res.status === 401) {
        const refreshed = await useAuthStore.getState().refreshSession();
        if (refreshed) {
          res = await fetch('/api/auth/me', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      const json = await res.json();
      if (res.ok && json.success) {
        set({ user: json.data, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
}));

/**
 * authFetch — Fetch tự động kèm credentials và tự động refresh token khi gặp 401.
 * Dùng thay thế cho fetch thông thường trên mọi trang cần xác thực.
 */
export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const mergedInit: RequestInit = {
    ...init,
    credentials: 'include',
  };

  let res = await fetch(input, mergedInit);

  const urlStr = typeof input === 'string' ? input : input.toString();
  if (res.status === 401 && !urlStr.includes('/api/auth/refresh') && !urlStr.includes('/api/auth/login')) {
    const refreshed = await useAuthStore.getState().refreshSession();
    if (refreshed) {
      // Retry request với token mới
      res = await fetch(input, mergedInit);
    } else {
      useAuthStore.getState().setUser(null);
    }
  }

  return res;
}
