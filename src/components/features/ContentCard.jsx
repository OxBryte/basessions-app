import moment from "moment";
import { FiThumbsUp } from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";

// eslint-disable-next-line react/prop-types
export default function ContentCard({ media }) {
  return (
    <div className="w-full mx-auto space-y-4">
      <div className="w-full h-56 md:h-[30vh] rounded-xl overflow-hidden bg-white/40"></div>
      {/* <video src={media?.url}></video> */}
      <h1 className="text-lg text-white/80 font-semibold">{media?.title} </h1>
      <p className="text-white/40 text-sm">{media?.description}</p>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-left md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center text-white/60">
            <FiThumbsUp size={21} />
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
          <div className="flex md:flex-col md:gap-0 gap-2 items-center">
            <p className="text-white/80 text-sm">Total Mints</p>
            <p className="text-white/60 text-sm">0/{media?.max_mints}</p>
          </div>
          <div className="flex md:flex-col md:gap-0 gap-2 items-center">
            <p className="text-white/80 text-sm">Price</p>
            <p className="text-white/60 text-sm"> {media?.price}</p>
          </div>
          <button className="px-6 py-2.5 bg-[#0052FE] rounded-full text-sm">
            Mint
          </button>
        </div>
      </div>
      <div className="w-full flex items-center gap-4 justify-between">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-white/30 rounded-full"></div>
          <div className="space-y-0">
            <h1 className="font-semibold !m-0 text-lg text-white/80">
              {media?.creator?.display_name}
            </h1>
            <p className="text-white/60 !m-0 text-sm">
              @{media?.creator?.username}
            </p>
          </div>
          <p className="text-xs text-white/60">
            {moment(media?.created_at).startOf("hour").fromNow()}
          </p>
        </div>
        <button className="border border-white/60 text-white/60 px-3 py-1.5 gap-2 rounded-full flex items-center">
          <HiOutlineCurrencyDollar size={20} />
          Tip
        </button>
      </div>
    </div>
  );
}
