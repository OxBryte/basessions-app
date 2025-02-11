import { BiEditAlt } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { useAuth } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function ProfileDetails() {
  const { user, logout } = useAuth();
  console.log(user?.data);

  return (
    <div className="space-y-4 w-full pb-5 border-b border-white/10">
      <div className="flex items-center justify-between gap-8">
        <div className="w-14 h-14 rounded-full bg-white/40 border border-3 border-[#131313]" />
        <div className="bg-[#FFFFFF0D] rounded-full px-5 py-2 flex gap-2 items-center">
          <BiEditAlt />
          Edit
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-2xl">{user?.data.display_name}</h1>
          <p className="bg-[#FF9A354D] text-xs px-3 py-1.5 rounded-full">
            Premium
          </p>
        </div>
        <p className="text-white/40 text-xs">@{user?.data.username}</p>
      </div>
      <p className="text-xs font-light max-w-[420px]">{user?.data.bio}</p>
      <div>
        <Link to={`https://x.com/${user?.data.twitter_id}`} target="_blank">
          <div className="flex items-center gap-2 border border-white/40 hover:bg-white/10 cursor-pointer rounded-full w-fit text-xs px-3 py-1.5">
            <BsTwitterX />
            {user?.data.twitter_id}
          </div>
        </Link>
      </div>
      <div className="mt-4 flex gap-3 text-[10px] md:text-md">
        <p className="m-0">
          Tips sent <span className="text-[#FFFFFF80] m-0 ml-1">$0</span>{" "}
        </p>
        <p className="m-0">
          Mints purchased <span className="text-[#FFFFFF80] m-0 ml-1">0</span>{" "}
        </p>
        <p className="m-0">
          Token Reward <span className="text-[#FFFFFF80] m-0 ml-1">0</span>{" "}
        </p>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
