import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../../libs/utils";
import { useUser } from "../../hooks/useUser";

export default function WalletSettings() {
  const { user } = useUser();

  return (
    <>
      <div className="w-full min-h-[90dvh] flex flex-col justify-between max-w-[620px] mx-auto px-4 my-10">
        <div className="space-y-4">
          <div className="flex items-center gap-5">
            <div onClick={goBack} className="cursor-pointer">
              <IoChevronBack size={24} />
            </div>
            <p>Wallet Details</p>
          </div>
          <div className="w-full overflow-auto flex flex-col gap-5">
            <div className="space-y-3">
              <p className="text-white/60">Wallet address</p>
              <p className="text-white font-semibold">
                {user?.data?.wallet_address}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-white/60">Private key</p>
              <p className="text-white font-semibold">
                {user?.data?.wallet_private_key}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
