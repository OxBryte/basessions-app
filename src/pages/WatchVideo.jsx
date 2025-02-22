import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { TbMessage2 } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function WatchVideo() {
  return (
    <div>
      <div className="w-full h-60 md:h-[40vh] overflow-hidden bg-white/40"></div>
      <div className="space-y-6 px-4 py-6">
        <div className="space-y-4">
          <h1 className="text-lg text-white/80 font-semibold">Title </h1>
          <p className="text-white/40 text-sm">description</p>
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
              <p className="!m-0 text-sm text-white/90"> 0</p>
            </div>
            <div className="flex gap-2 items-center text-white/60">
              <TbMessage2 size={21} />
              <p className="!m-0 text-sm text-white/80">0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col md:gap-0 gap-2 items-center">
              <p className="text-white/80 text-sm">Total Mints</p>
              <p className="text-white/60 text-sm">0/0</p>
            </div>
            <div className="flex flex-col md:gap-0 gap-2 items-center">
              <p className="text-white/80 text-sm">Price</p>
              <p className="text-white/60 text-sm"> 0</p>
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
                //   style={{
                //     backgroundPosition: "center",
                //     backgroundSize: "cover",
                //     backgroundRepeat: "no-repeat",
                //     backgroundImage: `url(${media?.creator?.avatar_url})`,
                //   }}
              ></div>
              <div className="!space-y-1">
                <h1 className="font-semibold !m-0 text-md text-white">
                  display_name
                </h1>
                <p className="text-white/60 !m-0 text-xs">@username</p>
              </div>
            </div>
          </Link>
          <p className="text-xs text-white/60">
            {/* {moment(media?.created_at).startOf("hour").fromNow()} */}
          </p>
          <button className="border border-white/60 text-white/60 px-3 py-1.5 gap-2 rounded-full flex items-center">
            <HiOutlineCurrencyDollar size={20} />
            Tip
          </button>
        </div>
      </div>
    </div>
  );
}
