import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSingleMedia, useUser } from "../components/hooks/useUser";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import Comments from "../components/features/Comments";
import { BsDot } from "react-icons/bs";
import MintModal from "../components/features/MintModal";
import TipCreator from "../components/features/TipCreator";
import MintButton from "../components/ui/MintButton";
import { stringToUint256 } from "../components/libs/utils";
import { getVideo } from "../components/hooks/useBlockchain";
import TipButton from "../components/ui/TipButton";
import FollowButton from "../components/ui/FollowButton";
import { useEthToUsdc } from "../components/hooks/useEthUsd";
import LikeButton from "../components/ui/LikeButton";
import ShareButton from "../components/ui/ShareButton";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export default function WatchVideo() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [tipMedia, setTipMedia] = useState(null);
  const [videoData, setVideoData] = useState(null);

  const { user } = useUser();
  const userId = user?.data?.id;
  const { id } = useParams();
  const { singleMedia, isLoading, refetch } = useSingleMedia(id);
  const usdcValue = useEthToUsdc(singleMedia?.price);

  // get video data from blockchain
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videoId = stringToUint256(singleMedia?.id); // if media.id is a UUID
        const video = await getVideo(videoId);
        setVideoData(video);
      } catch (err) {
        console.error("Failed to load video:", err);
      }
    };

    if (singleMedia?.id) loadVideo();
  }, [singleMedia?.id]);

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <img src="session_logo.png" alt="" className="animate-pulse w-16 " />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="w-full">
          <MediaPlayer
            title={singleMedia?.title}
            src={singleMedia?.url}
            poster={singleMedia?.thumbnail_url}
            playsInline
          >
            <MediaProvider />
            <Poster
              className="h-full w-full object-cover object-center vds-poster"
              src={singleMedia?.thumbnail_url}
              alt={singleMedia?.title}
              posterType="image"
            />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
        <div className="space-y-4 py-6">
          <div className="space-y-2">
            <h1 className="text-lg text-white/80 font-semibold">
              {singleMedia?.title}{" "}
            </h1>
            <p className="text-white/40 text-xs">{singleMedia?.description}</p>
          </div>
          <div className="w-full flex items-center gap-4 justify-between">
            <Link to={`/profile/${singleMedia?.creator?.id}`}>
              <div className="flex gap-3 items-center">
                <div
                  className="w-12 h-12 bg-white/30 rounded-full"
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${singleMedia?.creator?.avatar_url})`,
                  }}
                ></div>
                <div className="!space-y-1">
                  <h1 className="font-semibold !m-0 text-md text-white">
                    {singleMedia?.creator?.display_name}
                  </h1>
                  <div className="flex gap-1 items-center text-white/60">
                    <p className="!m-0 text-xs">
                      @{singleMedia?.creator?.username}
                    </p>
                    <BsDot size={23} />
                    <p className="text-xs">
                      {moment(singleMedia?.created_at)
                        .startOf("hour")
                        .fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {userId !== singleMedia?.creator?.id && (
              <FollowButton creatorId={singleMedia?.creator?.id} />
            )}
          </div>
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center text-white/60">
                <LikeButton media={singleMedia} onLiked={refetch} />
                {/* <p className="!m-0 text-sm text-white/90"> {likeCount}</p> */}
              </div>
              <div className="flex gap-2 items-center text-white/60">
                <TbMessage2 size={21} />
                <p className="!m-0 text-sm text-white/80">
                  {singleMedia?.comments?.length}
                </p>
              </div>
              <ShareButton singleMedia={singleMedia} />
            </div>
            <div className="flex items-center gap-4">
              <MintButton onMint={() => setSelectedMedia(singleMedia)} />
              <TipButton onTip={() => setTipMedia(singleMedia)} />
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-between items-left md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <p className="text-white/80 text-sm">Total Mints</p>
                <p className="text-white/60 text-sm">
                  {Number(videoData?.totalMints || 0)}/{singleMedia?.max_mints}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-white/80 text-sm">Price</p>
                <p className="text-white/60 text-sm">
                  {" "}
                  {singleMedia?.price} ETH ≈ {Number(usdcValue).toFixed(2)} USDC
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-white/10" />
        <Comments id={id} singleMedia={singleMedia} refetch={refetch} />
      </div>

      {selectedMedia && (
        <MintModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
      {tipMedia && (
        <TipCreator media={tipMedia} onClose={() => setTipMedia(null)} />
      )}
    </>
  );
}
