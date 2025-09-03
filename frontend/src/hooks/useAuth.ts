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

  useEffect(() => {
    // без any: создаем типизированный доступ к Telegram
    const tg: TelegramWebApp | undefined = (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;

    if (!tg?.initData) return;

    fetch("http://localhost:3000/telegram/login", {
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
  }, []);

  return { user, token };
};
