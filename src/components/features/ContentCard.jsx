/* eslint-disable react/prop-types */
import moment from "moment";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLike } from "../hooks/useLike";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../hooks/useUser";
import {
  RiShareCircleLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";
import { BsFillPlayCircleFill } from "react-icons/bs";

export default function ContentCard({ media, onMint }) {
  const { user } = useUser();
  const userId = user?.data?.id;
  const prevMediaId = useRef(media?.id);

  const [like, setLike] = useState(
    () =>
      media?.liked_by?.some((liker) => liker.id?.toString() === userId) ?? false
  );
  const [likeCount, setLikeCount] = useState(
    () => media?.liked_by?.length || 0
  );

  const { likeFn, isPending } = useLike();

  // When the media ID changes, reset to whatever the new props say
  useEffect(() => {
    if (media?.id !== prevMediaId.current) {
      prevMediaId.current = media?.id;
      setLike(
        media?.liked_by?.some((liker) => liker.id.toString() === userId) ??
          false
      );
      setLikeCount(media?.liked_by?.length || 0);
    }
  }, [media?.id, media?.liked_by, userId]);

  const handleLike = () => {
    const next = !like;
    setLike(next);
    setLikeCount((c) => c + (next ? 1 : -1));

    likeFn(
      { mediaId: media.id, status: next },
      {
        onError: () => {
          // rollback
          setLike(!next);
          setLikeCount((c) => c + (next ? -1 : 1));
        },
        onSuccess: () => {
        },
      }
    );
  };

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
                className=" w-full max-h-[360px] rounded-xl object-cover"
              />
              <div className="absolute inset-0 m-auto flex items-center  rounded-xl justify-center bg-black/30 duration-300">
                <BsFillPlayCircleFill size={46} />
              </div>
            </div>
          )}
          <h1 className="text-lg text-white/80 font-semibold">
            {media?.title}{" "}
          </h1>
          <p className="text-white/40 text-sm">{media?.description}</p>
        </div>
      </Link>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-left md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center text-white/60">
            <button
              onClick={handleLike}
              disabled={isPending}
              className={like ? "text-blue-500" : ""}
            >
              {like ? <RiThumbUpFill size={21} /> : <RiThumbUpLine size={21} />}
            </button>
            <p className="!m-0 text-sm text-white/90"> {likeCount}</p>
          </div>
          <div className="flex gap-2 items-center text-white/60">
            <TbMessage2 size={21} />
            <p className="!m-0 text-sm text-white/80">
              {media?.comments?.length}
            </p>
          </div>
          <div className="text-white/80">
            <RiShareCircleLine size={21} />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex md:flex-col md:gap-0 gap-2 items-center">
              <p className="text-white/80 text-xs md:text-sm">Total Mints</p>
              <p className="text-white/60 text-xs md:text-sm">
                0/{media?.max_mints}
              </p>
            </div>
            <div className="flex md:flex-col md:gap-0 gap-2 items-center">
              <p className="text-white/80 text-xs md:text-sm">Price</p>
              <p className="text-white/60 text-xs md:text-sm">
                {" "}
                {media?.price} ETH
              </p>
            </div>
          </div>
          <button
            className="px-5 py-2.5 bg-[#0052FE] rounded-full text-xs"
            onClick={onMint}
          >
            Mint
          </button>
        </div>
      </div>
      {media?.creator && (
        <div className="w-full flex items-center gap-4 justify-between">
          <Link to={`/profile/${media?.creator?.id}`}>
            <div className="flex gap-3 items-center">
              <div
                className="w-10 h-10 bg-white/30 rounded-full"
                style={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${media?.creator?.avatar_url})`,
                }}
              ></div>
              <div className="!space-y-0">
                <h1 className="font-semibold !m-0 text-sm text-white">
                  {media?.creator?.display_name}
                </h1>
                <p className="text-white/60 !m-0 text-xs">
                  @{media?.creator?.username}
                </p>
              </div>
              <p className="text-xs text-white/60">
                {moment(media?.created_at).startOf("seconds").fromNow()}
              </p>
            </div>
          </Link>
          <button className="border border-white/60 text-white/60 px-3 py-1.5 gap-2 text-sm rounded-full flex items-center">
            <HiOutlineCurrencyDollar size={20} />
            Tip
          </button>
        </div>
      )}
    </div>
  );
}
