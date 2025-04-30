import { IoChevronBack } from "react-icons/io5";
import { copyToClipboard, goBack } from "../components/libs/utils";
import { useUser } from "../components/hooks/useUser";
import { BiCopy } from "react-icons/bi";

export default function WalletSettings() {
  const { user } = useUser();

  return (
    <>
      <div className="w-full min-h-[90dvh] flex flex-col justify-between max-w-[620px] mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-5 py-3">
            <div onClick={goBack} className="cursor-pointer">
              <IoChevronBack size={24} />
            </div>
            <p>Wallet Details</p>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="space-y-3">
              <p className="text-white/60">Wallet address</p>
              <div className="space-y-4 p-3 bg-white/10 rounded-lg min-h-[100px] w-full">
                <p className="text-white font-semibold break-words">
                  {user?.data?.wallet_address}
                </p>
                <div
                  className=""
                  onClick={() => copyToClipboard(user?.data?.wallet_address)}
                >
                  <BiCopy className="text-white/60" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-white/60">Private key</p>
              <div className="space-y-4 p-3 bg-white/10 rounded-lg min-h-[100px] w-full">
                <p className="text-white font-semibold break-words">
                  {user?.data?.wallet_private_key}
                </p>
                <div
                  className=""
                  onClick={() =>
                    copyToClipboard(user?.data?.wallet_private_key)
                  }
                >
                  <BiCopy className="text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
