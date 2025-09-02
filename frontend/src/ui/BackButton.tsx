"use client";

type BackButtonProps = {
  onClick: () => void;
  className?: string;
};

const BackButton = ({ onClick, className = "" }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-48 text-white bg-amber-500 text-2xl py-4 rounded-2xl hover:bg-amber-600 ${className}`}
    >
      Назад в меню
    </button>
  );
};

export default BackButton;
