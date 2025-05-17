import { useState } from "react";
import { useLikedMedia } from "../../hooks/useUser";
import ContentCard from "../ContentCard";
import { useMintedMedia } from "../../hooks/useMint";

export default function FanSection() {
  const [activeTab, setActiveTab] = useState("tab1");

  const { likedMedia, isLoadingLiked } = useLikedMedia();
  const { isLoading: isLoadingMintedVideo, mintedMedias } = useMintedMedia();

  return (
    <>
      <div className="mt-6 space-y-10">
        <div className="w-full">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("tab1")}
              className={`px-2 py-2 ${
                activeTab === "tab1"
                  ? "border-b-2 border-white text-white"
                  : "text-white/60"
              }`}
            >
              Minted Videos
            </button>
            <button
              onClick={() => setActiveTab("tab2")}
              className={`px-2 py-2 ${
                activeTab === "tab2"
                  ? "border-b-2 border-white text-white"
                  : "text-white/60"
              }`}
            >
              Liked Videos
            </button>
          </div>
        </div>
        <div className="w-full">
          {activeTab === "tab1" && mintedMedias?.length > 0 && (
            <div className="space-y-6 w-full">
              {mintedMedias?.map((media) => (
                <ContentCard key={media?.id} media={media} />
              ))}
            </div>
          )}
          {activeTab === "tab1" && mintedMedias?.length === 0 && (
            <div className="w-full h-[20dvh] gap-3 flex flex-col items-center justify-center">
              <img src="session_logo.png" alt="" className="w-16" />
              <p className="text-white/60">No liked videos yet</p>
            </div>
          )}
          {activeTab === "tab2" && likedMedia?.length === 0 && (
            <div className="w-full h-[20dvh] gap-3 flex flex-col items-center justify-center">
              <img src="session_logo.png" alt="" className="w-16" />
              <p className="text-white/60">No liked videos yet</p>
            </div>
          )}
          {isLoadingMintedVideo && (
            <div className="w-full h-[60dvh] flex items-center justify-center">
              <img
                src="session_logo.png"
                alt=""
                className="animate-pulse w-16"
              />
            </div>
          )}
          {isLoadingLiked && (
            <div className="w-full h-[60dvh] flex items-center justify-center">
              <img
                src="session_logo.png"
                alt=""
                className="animate-pulse w-16"
              />
            </div>
          )}
          {activeTab === "tab2" && likedMedia?.length > 0 && (
            <div className="space-y-6 w-full">
              {likedMedia?.map((media) => (
                <ContentCard key={media?.id} media={media} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
