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

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    fetch("http://localhost:3000/telegram/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          console.error("Auth failed:", data);
        }
      });
  }, []);

  return { user, token };
};
