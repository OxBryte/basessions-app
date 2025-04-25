/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useLike } from "../../hooks/useLike";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { HiShare } from "react-icons/hi2";
import { useDeleteMedia } from "../../hooks/useUploadMedia";

export default function CreatorContentCard({ media }) {
  const [showOption, setShowOption] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user } = useUser();
  const userId = user?.data?.id;
  const mediaId = media?.id;

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(media?.liked_by?.length || 0);

  const { likeFn, isPending } = useLike();
  const { deleteMediaFn } = useDeleteMedia();

  const handleDelete = () => {
    deleteMediaFn(mediaId);
  };

  useEffect(() => {
    // Ensure state updates correctly if media changes
    setLike(media?.liked_by?.some((liker) => liker.id === userId));
    setLikeCount(media?.liked_by?.length || 0);
  }, [media, userId]);

  const handleLike = () => {
    const newLikeStatus = !like;
    setLike(newLikeStatus);

    // Optimistically update the count
    setLikeCount((prevCount) =>
      newLikeStatus ? prevCount + 1 : prevCount - 1
    );

    likeFn(
      { mediaId, status: newLikeStatus },
      {
        onError: () => {
          // Revert state if mutation fails
          setLike(!newLikeStatus);
          setLikeCount((prevCount) =>
            newLikeStatus ? prevCount - 1 : prevCount + 1
          );
        },
      }
    );
  };

  return (
    <div className="w-full mx-auto space-y-4">
      <Link to={`/${media?.id}`}>
        {!media?.thumbnail_url ? (
          <div className=" w-full h-[220px] rounded-xl bg-white/40"></div>
        ) : (
          <img
            src={media?.thumbnail_url}
            alt=""
            className=" w-full max-h-[360px] rounded-xl object-cover"
          />
        )}
      </Link>
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1 ">
          <h1 className="text-lg text-white/80 font-semibold">
            {media?.title}{" "}
          </h1>
          <p className="text-white/40 text-sm">{media?.description}</p>
        </div>
        {/* <p className="text-xs text-white/60">
          {moment(media?.created_at).startOf("hour").fromNow()}
        </p> */}
        <div className="relative">
          <div
            onClick={() => setShowOption(!showOption)}
            className="cursor-pointer"
          >
            <FaEllipsisVertical size={24} />
          </div>
          {showOption && (
            <div
              ref={optionsRef}
              className="absolute top-0 right-8 w-40 min-h-20 bg-[#2C2C2C] overflow-hidden rounded-xl"
            >
              <div className="p-3 w-full hover:bg-white/20 cursor-pointer">
                Edit
              </div>
              <div
                className="p-3 w-full hover:bg-white/20 cursor-pointer"
                onClick={() => {
                  handleDelete();
                  setShowOption(false);
                }}
              >
                Delete
              </div>
              <div className="p-3 w-full hover:bg-white/20 cursor-pointer">
                Share
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row md:flex-row gap-4 justify-between items-left md:items-center">
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
            <HiShare size={21} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex md:flex-col md:gap-0 gap-2 items-center">
            <p className="text-white/80 text-sm">Total Mints</p>
            <p className="text-white/60 text-sm">0/{media?.max_mints}</p>
          </div>
          <div className="flex md:flex-col md:gap-0 gap-2 items-center">
            <p className="text-white/80 text-sm">Price</p>
            <p className="text-white/60 text-sm"> {media?.price}</p>
          </div>
          {/* <button className="px-6 py-2.5 bg-[#0052FE] rounded-full text-sm">
            Mint
          </button> */}
        </div>
      </div>
    </div>
  );
}
