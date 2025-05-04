/* eslint-disable react/prop-types */
import moment from "moment";
import { Link } from "react-router-dom";
import { BsDot, BsFillPlayCircleFill } from "react-icons/bs";
import MintButton from "../ui/MintButton";
import { PiHeartFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getVideo } from "../hooks/useBlockchain";
import { stringToUint256 } from "../libs/utils";
import { RiFlowerFill } from "react-icons/ri";
import { useUser } from "../hooks/useUser";

export default function ContentCard({ media, onMint }) {
  const [videoData, setVideoData] = useState(null);
  const [isLiked, setLiked] = useState(false);

  
  const { user } = useUser();
  const userId = user?.data?.id;
  
  useEffect(() => {
    setLiked(
      userId ? media?.liked_by?.some((l) => l || l?.id === userId) ?? false : false
    );
  }, [media?.liked_by, userId]);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videoId = stringToUint256(media?.id); // if media.id is a UUID
        const video = await getVideo(videoId);
        setVideoData(video);
      } catch (err) {
        console.error("Failed to load video:", err);
      }
    };

    if (media?.id) loadVideo();
  }, [media?.id]);

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
                className=" w-full min-h-[300px] max-h-[300px] rounded-xl object-cover"
              />
              <div className="absolute inset-0 m-auto flex items-center  rounded-xl justify-center bg-black/30 duration-300">
                <BsFillPlayCircleFill size={46} />
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="w-full flex flex-col md:flex-row md:items-center gap-3 justify-between">
        {media?.creator ? (
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${media?.creator?.id}`}>
              <div
                className="w-10 h-10 bg-white/30 rounded-full"
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
                <p className="text-[10px] ">
                  {moment(media?.created_at).startOf("seconds").fromNow()}
                </p>
                <BsDot size={23} />
                <div className="flex gap-2 items-center">
                  <PiHeartFill
                    size={15}
                    className={`${isLiked  && "text-red-500"}`}
                  />
                  <p className="text-xs ">{media?.liked_by?.length}</p>
                </div>
                <BsDot size={23} />
                <div className="flex gap-2 items-center">
                  <RiFlowerFill size={15} />
                  <p className="text-xs ">
                    {Number(videoData?.totalMints || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <div className="space-y-1">
              <div className="flex gap-4 text-white/60 items-center ">
                <h1 className="text-lg text-white/80 font-semibold capitalize">
                  {media?.title}{" "}
                </h1>
                <p className="text-xs mt-1">
                  {moment(media?.created_at).startOf("seconds").fromNow()}
                </p>
              </div>
              <p className="text-white/40 text-sm">{media?.description}</p>
              <div className="flex gap-1 text-white/60 items-center ">
                <p className="text-[10px] ">
                  {moment(media?.created_at).startOf("seconds").fromNow()}
                </p>
                <BsDot size={23} />
                <div className="flex gap-2 items-center">
                  <PiHeartFill size={15} />
                  <p className="text-xs ">{media?.liked_by?.length}</p>
                </div>
                <BsDot size={23} />
                <div className="flex gap-2 items-center">
                  <RiFlowerFill size={15} />
                  <p className="text-xs ">
                    {Number(videoData?.totalMints || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <MintButton onMint={onMint} />
      </div>
    </div>
  );
}
