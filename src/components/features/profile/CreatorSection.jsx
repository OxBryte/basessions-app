import { useState } from "react";
import { useUser, useUserMedia } from "../../hooks/useUser";
import CreatorContentCard from "./CreatorContentCard";

export default function CreatorSection() {
  const [activeTab, setActiveTab] = useState("tab1");
  const { user } = useUser();
  const userId = user?.data?.id;

  const { userMedia, isLoading } = useUserMedia(userId);
  console.log(userMedia);

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
              Uploads
            </button>
            <button
              onClick={() => setActiveTab("tab2")}
              className={`px-2 py-2 ${
                activeTab === "tab2"
                  ? "border-b-2 border-white text-white"
                  : "text-white/60"
              }`}
            >
              Minted Videos
            </button>
          </div>
        </div>
        {activeTab === "tab1" && (
          <div className="w-full space-y-6">
            {isLoading && (
              <div className="w-full h-[20dvh] flex items-center justify-center">
                Loading...
              </div>
            )}
            {userMedia?.map((media) => (
              <CreatorContentCard key={media.id} media={media} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
