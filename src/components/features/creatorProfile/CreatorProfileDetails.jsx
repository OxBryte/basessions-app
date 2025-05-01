/* eslint-disable react/prop-types */
import { BsTwitterX } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import FollowButton from "../../ui/FollowButton";

export default function CreatorProfileDetails({ creator }) {
  // console.log(creator);
  return (
    <div className="space-y-4 w-full pb-5 border-b border-white/10">
      <div className="flex items-center justify-between gap-8">
        <div
          className="w-20 h-20 rounded-full bg-white/40 border border-3 border-[#131313]"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${creator?.avatar_url})`,
          }}
        />
        <FollowButton />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-2xl">{creator?.display_name}</h1>
          <p className="text-blue-500">
            <RiVerifiedBadgeFill size={24} />
          </p>
        </div>
        <p className="text-white/40 text-xs">@{creator?.username}</p>
      </div>
      <p className="text-xs font-light max-w-[420px]">{creator?.bio}</p>
      <div>
        <Link to={`https://x.com/${creator?.twitter_id}`} target="_blank">
          <div className="flex items-center gap-2 border border-white/40 hover:bg-white/10 cursor-pointer rounded-full w-fit text-xs px-3 py-1.5">
            <BsTwitterX />
            {creator?.twitter_id}
          </div>
        </Link>
      </div>
    </div>
  );
}
