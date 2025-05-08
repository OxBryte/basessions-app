import { BsExclamationCircle, BsXLg } from "react-icons/bs";
import ContentCard from "../components/features/ContentCard";
import { useMedia, useUser } from "../components/hooks/useUser";
import { useWallet } from "../components/hooks/useWallet";
import { BiCopy } from "react-icons/bi";
import { copyToClipboard, truncate } from "../components/libs/utils";
import { useState } from "react";
import MintModal from "../components/features/MintModal";

export default function Home() {
  const [hide, setHide] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { medias, isLoading } = useMedia();
  const { user } = useUser();
  const { isLoading: isLoadingBalance, balances } = useWallet();

  if (isLoading) {
    return (
      <div className="w-full h-[60dvh] flex items-center justify-center">
        <img src="session_logo.png" alt="" className="animate-pulse w-16" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="w-full space-y-10 mx-auto">
        {medias.length === 0 ? (
          <div className="w-full h-[80vh] flex flex-col gap-4 items-center justify-center">
            <img src="session_logo.png" alt="" className="w-16" />
            <p className="text-lg text-gray-500">No media content available</p>
          </div>
        ) : (
          <>
            {medias
              ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((media) => (
                <ContentCard
                  key={media.id}
                  media={media}
                  onMint={() => setSelectedMedia(media)}
                />
              ))}
          </>
        )}
      </div>
      {isLoadingBalance ? null : (
        <>
          {user && balances?.eth === "0" && (
            <div
              className={`${
                hide
                  ? "hidden"
                  : "flex w-full p-4 items-center justify-center fixed bottom-20 left-0 inset-x-0 z-10"
              }`}
            >
              <div className="w-full max-w-md p-6 rounded-lg bg-[#2C2C2C] flex flex-col items-center gap-2 relative">
                <div
                  className="absolute top-5 right-5"
                  onClick={() => setHide(true)}
                >
                  <BsXLg />
                </div>
                <div className="flex items-center gap-2">
                  <BsExclamationCircle />
                  <p className="text-sm">Wallet</p>
                </div>
                <p className="text-sm">
                  Your currecnt balance is {Number(balances.eth).toFixed(4)} ETH
                </p>
                <div className="text-sm">Deposit some eth!</div>
                <div className="bg-[#0052FE] pl-4 pr-2 py-2 rounded-full text-sm flex items-center justify-between w-full">
                  {truncate(user?.data?.wallet_address, 24)}
                  <div
                    className="bg-white/30 px-3 py-1.5 rounded-full"
                    onClick={() => copyToClipboard(user?.data?.wallet_address)}
                  >
                    <BiCopy size={18} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {selectedMedia && (
        <MintModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
}
