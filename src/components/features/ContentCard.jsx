import moment from "moment";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLike } from "../../queries/useLike";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import ReactPlayer from "react-player";

// eslint-disable-next-line react/prop-types
export default function ContentCard({ media }) {
  // console.log(media);
  const { user } = useUser();
  const userId = user?.data?.id;
  const mediaId = media?.id;
  const [like, setLike] = useState(false);
  const { likeFn, isPending } = useLike();

  const handleLike = () => {
    const newLikeStatus = !like;
    setLike(newLikeStatus);

    likeFn(
      {
        mediaId: mediaId,
        status: newLikeStatus,
      },
      {
        onError: () => {
          setLike(like);
        },
      }
    );
  };

  return (
    <div className="w-full mx-auto space-y-4">
      <Link to={`/${media?.id}`}>
        <div className="space-y-4">
          {!media?.thumbnail_url ? (
            <div className=" w-full h-[220px] rounded-xl bg-white/40"></div>
          ) : (
            <img
              src={media?.thumbnail_url}
              alt=""
              className=" w-full max-h-[360px] rounded-xl object-cover"
            />
          )}
          <h1 className="text-lg text-white/80 font-semibold">
            {media?.title}{" "}
          </h1>
          <p className="text-white/40 text-sm">{media?.description}</p>
        </div>
      </Link>
      <div className="flex flex-row gap-4 justify-between items-left md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center text-white/60">
            {like || media?.liked_by?.some((liker) => liker.id === userId) ? (
              <button className="text-blue-500">
                <RiThumbUpFill size={21} />
              </button>
            ) : (
              <button onClick={() => handleLike()} disabled={isPending}>
                <RiThumbUpLine size={21} />
              </button>
            )}
            <p className="!m-0 text-sm text-white/90">
              {" "}
              {media?.liked_by?.length}
            </p>
          </div>
          <div className="flex gap-2 items-center text-white/60">
            <TbMessage2 size={21} />
            <p className="!m-0 text-sm text-white/80">
              {media?.comments?.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col md:gap-0 gap-2 items-center">
            <p className="text-white/80 text-sm">Total Mints</p>
            <p className="text-white/60 text-sm">0/{media?.max_mints}</p>
          </div>
          <div className="flex flex-col md:gap-0 gap-2 items-center">
            <p className="text-white/80 text-sm">Price</p>
            <p className="text-white/60 text-sm"> {media?.price} ETH</p>
          </div>
          <button className="px-6 py-2.5 bg-[#0052FE] rounded-full text-sm">
            Mint
          </button>
        </div>
      </div>
      {media?.creator && (
        <div className="w-full flex items-center gap-4 justify-between">
          <Link to={`/profile/${media?.creator?.id}`}>
            <div className="flex gap-3 items-center">
              <div
                className="w-12 h-12 bg-white/30 rounded-full"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${media?.creator?.avatar_url})`,
                }}
              ></div>
              <div className="!space-y-1">
                <h1 className="font-semibold !m-0 text-md text-white">
                  {media?.creator?.display_name}
                </h1>
                <p className="text-white/60 !m-0 text-xs">
                  @{media?.creator?.username}
                </p>
              </div>
            </div>
          </Link>
          <p className="text-xs text-white/60">
            {moment(media?.created_at).startOf("hour").fromNow()}
          </p>
          <button className="border border-white/60 text-white/60 px-3 py-1.5 gap-2 rounded-full flex items-center">
            <HiOutlineCurrencyDollar size={20} />
            Tip
          </button>
        </div>
      )}
    </div>
  );
}
