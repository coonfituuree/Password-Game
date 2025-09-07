"use client";

import { useEffect, useState } from "react";

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

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Базовый URL API (Railway или локалка)
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    const tg: TelegramWebApp | undefined = (
      window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }
    ).Telegram?.WebApp;

    if (!tg?.initData) return;

    fetch(`${API_URL}/telegram/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then((res) => res.json())
      .then((data: { success: boolean; user?: User; token?: string }) => {
        if (data.success && data.user && data.token) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          console.error("Auth failed:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [API_URL]);

  return { user, token };
};
