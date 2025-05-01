/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link } from "react-router-dom";
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

  const mediaId = media?.id;
  const { deleteMediaFn } = useDeleteMedia();

  const handleDelete = () => {
    deleteMediaFn(mediaId);
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
              className="absolute bottom-0 right-8 w-40 min-h-20 bg-[#2C2C2C] overflow-hidden rounded-xl"
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
    </div>
  );
}
