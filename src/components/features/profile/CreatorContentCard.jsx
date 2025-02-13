import moment from "moment";
import { useState, useRef, useEffect } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiThumbsUp } from "react-icons/fi";
import { TbMessage2 } from "react-icons/tb";

// eslint-disable-next-line react/prop-types
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

  return (
    <div className="w-full mx-auto space-y-4">
      <div className="w-full h-56 md:h-[30vh] rounded-xl overflow-hidden bg-white/40"></div>
      {/* <video src={media?.url}></video> */}
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
              <div className="p-3 w-full hover:bg-white/20 cursor-pointer">
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
          {/* <button className="px-6 py-2.5 bg-[#0052FE] rounded-full text-sm">
            Mint
          </button> */}
        </div>
      </div>
    </div>
  );
}
