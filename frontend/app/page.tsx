"use client";

import Header from "@/components/Header";
import Main from "@/components/Main";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        ⏳ Авторизация через Telegram...
      </div>
    );
  }

  return (
    <div>
      <Header user={user} />
      <Main user={user} />
    </div>
  );
};

export default Page;
