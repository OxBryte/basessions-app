import { GoHome, GoPlusCircle } from "react-icons/go";
import { LuWallet } from "react-icons/lu";
import { BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";

export default function BottomBar() {
  const { user, isLoading } = useUser();

  const links = [
    { to: "/", icon: <GoHome size={24} /> },
    user?.data?.type === "creator"
      ? { to: "/upload", icon: <GoPlusCircle size={24} /> }
      : { to: "/", icon: <BiSearch size={24} /> },
    { to: "/wallet", icon: <LuWallet size={24} /> },
    {
      to: "/profile",
      icon: (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <div
              className="w-8 h-8 bg-white/30 rounded-full bg-center bg-cover"
              style={{ backgroundImage: `url(${user?.data?.avatar_url})` }}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="w-full px-4 py-6 fixed bottom-0 left-0 mx-auto bg-[#131313] flex items-center justify-between border-t border-white/20">
      {links.map(({ to, icon }, i) => (
        <NavLink
          key={i}
          to={to}
          end={to === "/"} // ensures "/" only matches exactly
          className={({ isActive }) =>
            `flex flex-col gap-2 items-center ${
              isActive
                ? "text-white" // active color
                : "text-white/50" // inactive color
            }`
          }
        >
          {icon}
        </NavLink>
      ))}
    </div>
  );
}
