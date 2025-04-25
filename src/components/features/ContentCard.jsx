/* eslint-disable react/prop-types */
import moment from "moment";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLike } from "../hooks/useLike";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { HiShare } from "react-icons/hi2";
import { keccak256, toBigInt } from "web3-utils";
import toast from "react-hot-toast";
import { mintVideo } from "../hooks/useBlockchain";
import Spinner from "../ui/Spinner";
import { web3 } from "../../Provider";

export default function ContentCard({ media }) {
  // console.log(media);
  const { user } = useUser();
  const userId = user?.data?.id;
  const mediaId = media?.id;

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(media?.liked_by?.length || 0);
  const [minting, setMinting] = useState(false);

  const { likeFn, isPending } = useLike();

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

  const stringToUint256 = (str) => {
    const hash = keccak256(str); // e.g., 0xabc123...
    const uint = toBigInt(hash).toString(); // Convert to decimal string
    return uint;
  };

  const handleMintVideo = async () => {
    try {
      setMinting(true);
      console.log("Minting video...");
      const priceInWei = web3.utils.toWei(media?.price, "ether");
      const videoId = stringToUint256(media?.id);
      const privateKey = user?.data?.wallet_private_key;

      await mintVideo(privateKey, videoId, priceInWei);
      console.log("Minted video successfully");
      toast.success("Minted video successfully!");
      setMinting(false);
    } catch (error) {
      console.log("Error minting video:", error);
      setMinting(false);
    }
  };

  return (
    <div className="w-full mx-auto space-y-4 relative">
      <Link to={`/${media?.id}`}>
        <div className="space-y-4">
          {!media?.thumbnail_url ? (
            <div className=" w-full h-[220px] rounded-xl bg-white/40"></div>
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
            <HiShare size={21} />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex md:flex-col md:gap-0 gap-2 items-center">
              <p className="text-white/80 text-sm">Total Mints</p>
              <p className="text-white/60 text-sm">0/{media?.max_mints}</p>
            </div>
            <div className="flex md:flex-col md:gap-0 gap-2 items-center">
              <p className="text-white/80 text-sm">Price</p>
              <p className="text-white/60 text-sm"> {media?.price} ETH</p>
            </div>
          </div>
          <button
            className="px-7 py-2.5 bg-[#0052FE] rounded-full text-sm"
            onClick={handleMintVideo}
          >
            {minting ? <Spinner /> : "Mint"}
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
                <h1 className="font-semibold !m-0 text-md text-white">
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
