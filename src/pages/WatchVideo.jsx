import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { RiThumbUpLine } from "react-icons/ri";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSingleMedia } from "../components/hooks/useUser";
import { useParams } from "react-router-dom";
import moment from "moment";
import Player from "../components/features/videoPlayer/Player";
import { BiChevronLeft } from "react-icons/bi";
import { goBack } from "../components/libs/utils";

export default function WatchVideo() {
  const { id } = useParams();

  const { singleMedia, isLoading } = useSingleMedia(id);

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <img src="session_logo.svg" alt="" className="animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#2C2C2C]">
        <div className="max-w-[620px] mx-auto flex gap-4 justify-between items-center w-full p-4 min-h-[80px] bg-[#2C2C2C] ">
          <div onClick={goBack} className="cursor-pointer">
            <BiChevronLeft size={28} />
          </div>
        </div>
      </div>
      <div className="max-w-[620px] mx-auto">
        <div className="w-full">
          <Player
            src={singleMedia?.url}
            thumbnail={singleMedia?.thumbnail_url}
          />
        </div>
        {/* <div className="w-full h-60 md:h-[40vh] overflow-hidden bg-white/40"></div> */}
        <div className="space-y-6 px-4 py-6">
          <div className="space-y-4">
            <h1 className="text-lg text-white/80 font-semibold">
              {singleMedia?.title}{" "}
            </h1>
            <p className="text-white/40 text-sm">{singleMedia?.description}</p>
          </div>
          <div className="flex flex-row gap-4 justify-between items-left md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center text-white/60">
                {/* <button className="text-blue-500">
                <RiThumbUpFill size={21} />
              </button> */}
                <button>
                  <RiThumbUpLine size={21} />
                </button>
                <p className="!m-0 text-sm text-white/90">
                  {" "}
                  {singleMedia?.liked_by?.length}
                </p>
              </div>
              <div className="flex gap-2 items-center text-white/60">
                <TbMessage2 size={21} />
                <p className="!m-0 text-sm text-white/80">0</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col md:gap-0 gap-2 items-center">
                <p className="text-white/80 text-sm">Total Mints</p>
                <p className="text-white/60 text-sm">
                  0/{singleMedia?.max_mints}
                </p>
              </div>
              <div className="flex flex-col md:gap-0 gap-2 items-center">
                <p className="text-white/80 text-sm">Price</p>
                <p className="text-white/60 text-sm">
                  {" "}
                  {singleMedia?.price} ETH
                </p>
              </div>
              <button className="px-6 py-2.5 bg-[#0052FE] rounded-full text-sm">
                Mint
              </button>
            </div>
          </div>
          <div className="w-full flex items-center gap-4 justify-between">
            <Link to="">
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
                  <p className="text-white/60 !m-0 text-xs">
                    @{singleMedia?.creator?.username}
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-xs text-white/60">
              {moment(singleMedia?.created_at).startOf("hour").fromNow()}
            </p>
            <button className="border border-white/60 text-white/60 px-3 py-1.5 gap-2 rounded-full flex items-center">
              <HiOutlineCurrencyDollar size={20} />
              Tip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
