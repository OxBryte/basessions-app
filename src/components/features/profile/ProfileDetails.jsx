import { BiEditAlt } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { RiSettingsFill, RiVerifiedBadgeFill } from "react-icons/ri";

export default function ProfileDetails() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    <div className="w-full h-[60dvh] flex items-center justify-center">
      <img src="session_logo.png" alt="" className="animate-pulse w-16" />
    </div>;
  }

  return (
    <div className="space-y-4 w-full pb-5 border-b border-white/10">
      <div className="flex items-center justify-between gap-8">
        <div
          className="w-20 h-20 rounded-full bg-white/40 border border-3 border-[#131313]"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${user?.data?.avatar_url})`,
          }}
        />
        <div className="flex gap-2 items-center">
          <Link to="/edit-profile">
            <div className="bg-[#FFFFFF0D] rounded-full px-5 py-2 flex gap-2 items-center">
              <BiEditAlt />
              Edit
            </div>
          </Link>
          <Link to="/settings">
            <div className="">
              <RiSettingsFill
                size={20}
                className="p-2 rounded-full w-10 h-10 bg-white/10 "
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl">{user?.data?.display_name}</h1>
          <p className="text-blue-500">
            {user?.data?.type === "creator" && (
              <RiVerifiedBadgeFill size={24} />
            )}
          </p>
        </div>
        <p className="text-white/40 text-xs">@{user?.data?.username}</p>
      </div>
      <p className="text-xs font-light max-w-[420px]">{user?.data?.bio}</p>
      <div>
        <Link to={`https://x.com/${user?.data?.twitter_id}`} target="_blank">
          <div className="flex items-center gap-2 border border-white/40 hover:bg-white/10 cursor-pointer rounded-full w-fit text-xs px-3 py-1.5">
            <BsTwitterX />
            {user?.data?.twitter_id}
          </div>
        </Link>
      </div>
      {user?.data?.type === "creator" ? (
        <div className="mt-4 flex gap-3 text-[10px] md:text-md">
          <p className="m-0">
            Total Tips Earned{" "}
            <span className="text-[#FFFFFF80] m-0 ml-1">0 ETH</span>{" "}
          </p>
          <p className="m-0">
            Total Mints Sold{" "}
            <span className="text-[#FFFFFF80] m-0 ml-1">0</span>{" "}
          </p>
        </div>
      ) : (
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
      )}
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-2">
          {user?.data?.follower_count}
          <p className="text-sm text-white/60">Followers</p>
        </div>
        <div className="flex items-center gap-2">
          {user?.data?.following_count}
          <p className="text-sm text-white/60">Following</p>
        </div>
      </div>
    </div>
  );
}
