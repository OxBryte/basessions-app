import { BsExclamationCircle } from "react-icons/bs";
import ContentCard from "../components/features/ContentCard";
import { useMedia, useUser } from "../components/hooks/useUser";
import { useWallet } from "../components/hooks/useWallet";
import { BiCopy } from "react-icons/bi";
import { copyToClipboard, truncate } from "../components/libs/utils";

export default function Home() {
  const { medias, isLoading } = useMedia();
  const { user } = useUser();
  const { balances } = useWallet(
    user?.data?.wallet_private_key,
    user?.data?.wallet_address
  );

  if (isLoading) {
    return (
      <div className="w-full h-[60dvh] flex items-center justify-center">
        <img src="session_logo.svg" alt="" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="w-full space-y-10 mx-auto">
        {medias.length === 0 ? (
          <div className="w-full h-[60vh] flex flex-col gap-4 items-center justify-center">
            <img src="session_logo.svg" alt="" />
            <p className="text-lg text-gray-500">No media content available</p>
          </div>
        ) : (
          <>
            {medias
              ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((media) => (
                <ContentCard key={media.id} media={media} />
              ))}
          </>
        )}
      </div>
      {balances?.eth === "0" && (
        <div className="w-full p-4 flex items-center justify-center fixed bottom-4 left-0 inset-x-0">
          <div className="w-full max-w-md p-6 rounded-lg bg-[#2C2C2C] flex flex-col items-center gap-2">
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
    </div>
  );
}
