"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { API_CONFIG, API_HELPERS } from "@/lib/apiConfig";
import { AuthContextType, AuthResponse, UserData } from "../interface/auth";

// Создаем контекст авторизации
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [usersCache, setUsersCache] = useState<Record<number, UserData>>({});

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.PROFILE), {
        method: "GET",
        headers: API_HELPERS.getJsonHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        // Если 401 или другая ошибка авторизации - просто очищаем данные
        if (response.status === 401) {
          setUserData(null);
          setToken(null);
          return;
        }
        throw new Error("Не удалось получить пользователя");
      }

      const data = await response.json();

      // Проверяем структуру ответа
      let userData: UserData;
      if ('data' in data) {
        // Если API возвращает данные в формате { success, data }
        userData = data.data;
      } else {
        // Если API возвращает данные напрямую
        userData = data;
      }

      setUserData(userData);

      // Обновляем кэш
      if (userData.id) {
        setUsersCache((prev) => ({
          ...prev,
          [userData.id as number]: userData,
        }));
      }

      return userData;
    } catch (err) {
      console.error("Ошибка при получении данных пользователя:", err);
      setUserData(null);
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
      // Строим URL с параметрами запроса
      const url = API_HELPERS.addQueryParams(
        API_HELPERS.getFullUrl('/users'),
        { ids: idsToFetch.join(',') }
      );

      API_HELPERS.logRequest('GET', url);

      const response = await fetch(url, {
        method: "GET",
        headers: API_HELPERS.getJsonHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Не удалось получить данные пользователей");
      }

      const responseData = await response.json();

      // Обрабатываем разные форматы ответа
      let users: UserData[];
      if ('data' in responseData) {
        // Если API возвращает данные в формате { success, data }
        users = responseData.data;
      } else {
        // Если API возвращает данные напрямую
        users = responseData;
      }

      API_HELPERS.logResponse('GET', url, { count: users.length });

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
    setError(null);

    try {
      const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: "POST",
        headers: API_HELPERS.getJsonHeaders(),
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || "Ошибка входа");
      }

      const responseData: AuthResponse = await response.json();

      if (responseData.access_token) {
        setToken(responseData.access_token);
      }

      if (responseData.user) {
        setUserData(responseData.user);

        // Обновляем кэш
        if (responseData.user.id) {
          setUsersCache((prev) => ({
            ...prev,
            [responseData.user.id as number]: responseData.user,
          }));
        }
      } else {
        // Если API не возвращает пользователя вместе с токеном, загрузим его отдельно
        await fetchUserData();
      }

      return responseData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка входа";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
        method: "POST",
        headers: API_HELPERS.getJsonHeaders(),
        credentials: "include",
      });
    } catch (err) {
      console.warn("Ошибка при выходе:", err);
    } finally {
      setUserData(null);
      setToken(null);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
        method: "POST",
        headers: API_HELPERS.getJsonHeaders(),
        body: JSON.stringify({ name, email, phone, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || "Ошибка регистрации");
      }

      const responseData = await response.json();

      // Если API возвращает токен, сохраним его
      if (responseData.access_token) {
        setToken(responseData.access_token);
      }

      // Если API возвращает данные пользователя, используем их
      if (responseData.user) {
        setUserData(responseData.user);

        // Обновляем кэш
        if (responseData.user.id) {
          setUsersCache((prev) => ({
            ...prev,
            [responseData.user.id as number]: responseData.user,
          }));
        }
      } else {
        // Иначе загрузим данные пользователя
        await fetchUserData();
      }

      return responseData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка регистрации";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: FormData | Record<string, any>) => {
    setIsLoading(true);

    try {
      let response;

      if (data instanceof FormData) {
        // Если данные в FormData (с файлами)
        API_HELPERS.logRequest('PATCH', API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, 'FormData');

        response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE), {
          method: "PATCH",
          body: data,
          credentials: "include",
        });
      } else {
        // Если обычные данные
        API_HELPERS.logRequest('PUT', API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, data);

        response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE), {
          method: "PUT",
          headers: API_HELPERS.getJsonHeaders(),
          body: JSON.stringify(data),
          credentials: "include",
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || "Ошибка обновления профиля");
      }

      const responseData = await response.json();

      // Обрабатываем разные форматы ответа
      let updatedData: UserData;
      if ('data' in responseData) {
        // Если API возвращает данные в формате { success, data }
        updatedData = responseData.data;
      } else {
        // Если API возвращает данные напрямую
        updatedData = responseData;
      }

      API_HELPERS.logResponse('PATCH/PUT', API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, { success: !!updatedData });

      // Обновляем данные в состоянии
      setUserData(updatedData);

      // Обновляем кэш
      if (updatedData.id) {
        setUsersCache((prev) => ({
          ...prev,
          [updatedData.id as number]: updatedData,
        }));
      }

      return updatedData;
    } catch (err) {
      console.error("Ошибка updateUserProfile:", err);
      setError(err instanceof Error ? err.message : "Ошибка обновления профиля");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // При первом рендере проверяем авторизацию
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
        token,
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