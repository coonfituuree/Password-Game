"use client";

import BackButton from "@/ui/BackButton";
import { useState } from "react";

type User = {
  username?: string;
  photoUrl?: string;
  pts?: string;
  rating?: string;
};

type MainProps = {
  user: User | null;
};

const Main = ({ user }: MainProps) => {
  const [step, setStep] = useState<"menu" | "settings" | "mode" | "game">(
    "menu"
  );
  const [mode, setMode] = useState<"" | "single" | "multiplayer">("");

  const handlePlay = () => setStep("mode");
  const handleModeSelect = (selectedMode: "single" | "multiplayer") => {
    setMode(selectedMode);
    setStep("game");
  };
  const handleBack = () => setStep("menu");
  const handleSettings = () => setStep("settings");

  const buttonClass =
    "text-white bg-amber-500 text-2xl w-48 py-4 rounded-2xl hover:bg-amber-600";

  return (
    <main className="flex flex-col items-center mx-32 my-32 gap-4">
      {step === "menu" && (
        <>
          <h1 className="text-center text-2xl xs:text-xl pb-3 text-amber-300">
            Добро Пожаловать {user?.username ?? "гость"}!
          </h1>
          {user?.rating && (
            <p className="text-lg text-[#00FFF2]">
              Твой рейтинг: {user.rating}
            </p>
          )}
          <button onClick={handlePlay} className={buttonClass}>
            Играть
          </button>
          <button onClick={handleSettings} className={buttonClass}>
            Настройки
          </button>
        </>
      )}

      {step === "settings" && (
        <>
          <h1 className="text-center text-xl text-amber-300">Настройки</h1>
          <BackButton onClick={handleBack} />
        </>
      )}

      {step === "mode" && (
        <>
          <p className="text-center text-lg text-amber-200">Выберите режим:</p>
          <button
            onClick={() => handleModeSelect("single")}
            className={buttonClass}
          >
            Одиночный
          </button>
          <button
            onClick={() => handleModeSelect("multiplayer")}
            className={buttonClass}
          >
            Мультиплеер
          </button>
          <BackButton onClick={handleBack} />
        </>
      )}

      {step === "game" && (
        <>
          <h1 className="text-center text-xl text-green-400">
            🚀 Игра запущена: {mode === "single" ? "Одиночный" : "Мультиплеер"}
          </h1>
          <BackButton onClick={handleBack} />
        </>
      )}
    </main>
  );
};

export default Main;
