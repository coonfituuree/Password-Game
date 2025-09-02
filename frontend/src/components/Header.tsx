import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center gap-3 p-5">
      <div className="w-12 h-12 overflow-hidden rounded-full">
        <Image
          src="/ava.jpg"
          alt="Profile picture"
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-[#F0A832]">@coonfituuree</span>
        <span className="text-xs font-sans text-[#00FFF2]">9999 elo</span>
      </div>
    </header>
  );
};

export default Header;
