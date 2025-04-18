"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, UserData } from "../interface/auth";
import { API_CONFIG } from "@/lib/apiConfig";

// Создаем контекст авторизации
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [usersCache, setUsersCache] = useState<Record<number, UserData>>({});



  const fetchUserData = async () => {
    try {
      const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.USER_PROFILE), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Не удалось получить пользователя");
      }

      const data = await response.json();
      setUserData(data);

      
      if (data.id) {
        setUsersCache((prev) => ({
          ...prev,
          [data.id]: data,
        }));
      }

      return data;
    } catch (err) {
      setUserData(null);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchUsersByIds = async (userIds: number[]) => {
    // Фильтруем null и undefined значения, оставляем только числа
    const validIds = userIds.filter((id): id is number =>
      id !== null && id !== undefined
    );

    // Фильтруем только те ID, которых нет в кэше
    const idsToFetch = validIds.filter(id => !usersCache[id]);

    if (idsToFetch.length === 0) return;

    try {
      const query = idsToFetch.map(id => `ids=${id}`).join('&');
      const response = await fetch(`${API_CONFIG.BASE_URL}/users?${query}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Не удалось получить данные пользователей");
      }

      const users = await response.json();

      // Обновляем кэш пользователей
      const newCache = { ...usersCache };
      users.forEach((user: UserData) => {
        if (user.id !== undefined && user.id !== null) {
          newCache[user.id] = user;
        }
      });

      setUsersCache(newCache);
    } catch (err) {
      console.error("Ошибка при получении данных пользователей:", err);
    }
  };

  const getUserById = (userId: number | null) => {
    if (!userId) return null;

    // Если это текущий пользователь
    if (userData && userData.id === userId) {
      return userData;
    }

    // Проверяем кэш
    return usersCache[userId] || null;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.LOGIN), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Ошибка входа");
      }

      await fetchUserData();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ошибка входа");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.LOGOUT), {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Ошибка при выходе", err);
    } finally {
      setUserData(null);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.REGISTER), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Ошибка регистрации");
      }

      await fetchUserData();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const updateUserProfile = async (data: FormData | Record<string, any>) => {
    let formData: FormData;

    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      formData.append("user_data", JSON.stringify(data));
    }

    try {
      const res = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.USER_PROFILE), {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.detail || "Ошибка обновления профиля");
      }

      const updated = await res.json();
      await fetchUserData();
      return updated;
    } catch (err) {
      console.error("Ошибка updateUserProfile:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userData,
        userData,
        login,
        logout,
        register,
        updateUserProfile,
        isLoading,
        error,
        token: null,
        fetchUserData,
        fetchUsersByIds,
        getUserById,
        usersCache
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;