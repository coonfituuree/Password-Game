"use client";

import { useEffect, useState } from "react";

// User type
type User = {
  id: number;
  telegramId: number;
  username?: string;
  photoUrl?: string;
  pts?: string;
  rating?: string;
};

type TelegramWebApp = {
  initData?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Хук авторизации
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Если токен уже был сохранён - просто присваиваем его из localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setLoading(false);
      return;
    }

    // Проверяем, доступен ли Telegram в window (если не из Telegram, initData не будет)
    const tg: TelegramWebApp | undefined = (
      window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }
    ).Telegram?.WebApp;

    if (!tg?.initData) {
      setLoading(false);
      setError("Не запущено в Telegram WebApp — initData не найден!");
      return;
    }

    // Логируем initData для отладки (можно убрать)
    // console.log("initData:", tg.initData);

    setLoading(true);
    fetch(`${API_URL}/telegram/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        return res.json();
      })
      .then((data: { success: boolean; user?: User; token?: string }) => {
        if (data.success && data.user && data.token) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setError(null);
        } else {
          setError("Авторизация не удалась: " + JSON.stringify(data));
        }
      })
      .catch((err) => {
        setError("Ошибка запроса: " + err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, token, loading, error };
};