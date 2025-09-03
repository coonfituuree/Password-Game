// import Image from "next/image";
// import Link from "next/link";

// const Header = () => {
//   const username = "coonfituuree"

//   return (
//      <header className="flex items-center gap-3 p-5">
//       <Link href={`/user/${username}`} className="flex items-center gap-3">
//         <div className="w-12 h-12 overflow-hidden rounded-full">
//           <Image
//             src="/ava.jpg"
//             alt="Profile picture"
//             width={48}
//             height={48}
//             className="object-cover"
//           />
//         </div>
//         <div className="flex flex-col">
//           <span className="text-sm text-[#F0A832]">@{username}</span>
//           <span className="text-xs font-sans text-[#00FFF2]">9999 elo</span>
//         </div>
//       </Link>
//     </header>
//   );
// };

// export default Header;

import Image from "next/image";
import Link from "next/link";

type Props = {
  user?: {
    username?: string;
    photoUrl?: string;
    pts?: string;
    rating?: string;
  } | null;
};

const Header = ({ user }: Props) => {
  const username = user?.username || "guest";

  return (
    <header className="flex items-center gap-3 p-5">
      <Link href={`/user/${username}`} className="flex items-center gap-3">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={user?.photoUrl || "/ava.jpg"}
            alt="Profile picture"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-[#F0A832]">@{username}</span>
          <span className="text-xs font-sans text-[#00FFF2]">
            {user?.rating ?? 9999} elo
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;

