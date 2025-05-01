/* eslint-disable react/prop-types */
import moment from "moment";
import { Link } from "react-router-dom";
import { BsDot, BsFillPlayCircleFill } from "react-icons/bs";
import MintButton from "../ui/MintButton";

export default function ContentCard({ media, onMint }) {
  return (
    <div className="w-full mx-auto space-y-4 relative">
      <Link to={`/${media?.id}`}>
        <div className="space-y-3">
          {!media?.thumbnail_url ? (
            <div className="w-full h-[220px] max-h-[220px] min-h-[220px] rounded-xl bg-white/40"></div>
          ) : (
            <div className="relative">
              <img
                src={media?.thumbnail_url}
                alt=""
                className=" w-full min-h-[300px] max-h-[360px] rounded-xl object-cover"
              />
              <div className="absolute inset-0 m-auto flex items-center  rounded-xl justify-center bg-black/30 duration-300">
                <BsFillPlayCircleFill size={46} />
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="w-full flex items-center gap-4 justify-between">
        {media?.creator ? (
          <div className="flex gap-3 items-center">
            <Link to={`/profile/${media?.creator?.id}`}>
              <div
                className="w-12 h-12 bg-white/30 rounded-full"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${media?.creator?.avatar_url})`,
                }}
              />
            </Link>
            <div className="space-y-0">
              <h1 className="text-lg text-white/80 font-semibold capitalize">
                {media?.title}{" "}
              </h1>
              <div className="flex gap-1 text-white/60 items-center ">
                <Link to={`/profile/${media?.creator?.id}`}>
                  <p className=" !m-0 text-xs">@{media?.creator?.username}</p>
                </Link>
                <BsDot size={23} />
                <p className="text-xs ">
                  {moment(media?.created_at).startOf("seconds").fromNow()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <div className="space-y-2">
              <div className="flex gap-4 text-white/60 items-center ">
                <h1 className="text-lg text-white/80 font-semibold capitalize">
                  {media?.title}{" "}
                </h1>
                <p className="text-xs mt-1">
                  {moment(media?.created_at).startOf("seconds").fromNow()}
                </p>
              </div>
              <p className="text-white/40 text-sm">{media?.description}</p>
            </div>
          </div>
        )}
        <MintButton onMint={onMint} />
      </div>
    </div>
  );
}
