"use client";

const Main = () => {
  const handlePlay = () => {
    console.log("works");
  };

  const handleSettings = () => {
    console.log("settings");
  };

  const buttonClass: string =
    "text-white bg-amber-500 text-2xl py-4 rounded-2xl hover:bg-amber-600";

  return (
    <main className="flex flex-col mx-32 my-32 gap-4">
      <button onClick={handlePlay} className={buttonClass}>
        Играть
      </button>
      <button onClick={handleSettings} className={buttonClass}>
        Настройки
      </button>
    </main>
  );
};

export default Main;
