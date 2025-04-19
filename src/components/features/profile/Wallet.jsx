import { BiChevronLeft } from "react-icons/bi";
import { goBack } from "../../libs/utils";
import {
  PiBatteryEmpty,
  PiCoinsFill,
  PiPaperPlaneTiltFill,
  PiQrCode,
} from "react-icons/pi";

export default function Wallet() {
  return (
    <div>
      <div className="mx-auto flex gap-4 justify-between items-center w-full min-h-[60px]">
        <div onClick={goBack} className="cursor-pointer">
          <BiChevronLeft size={28} />
        </div>
        <p className="text-sm text-white/80">Wallet</p>{" "}
      </div>
      <div className="w-full flex flex-col gap-10 items-center my-4">
        <div className="space-y-4 place-items-center">
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
          <div className="space-y-1 place-items-center">
            <p className="text-xs text-white/60">Total balance</p>
            <p className="text-4xl font-bold">$4,543</p>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full gap-2">
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5">
            <PiCoinsFill size={24} />
            <p className="text-xs text-white/60">Buy/Sell</p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5">
            <PiPaperPlaneTiltFill size={24} />
            <p className="text-xs text-white/60">Send</p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5">
            <PiQrCode size={24} />
            <p className="text-xs text-white/60">Recieve</p>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="flex gap-3 w-full justify-between items-center">
            <p className="text-sm">Transaction history</p>
          </div>
          <div className="w-full flex flex-col items-center gap-3 justify-center h-[180px]">
            <PiBatteryEmpty size={24} />
            <p className="text-sm text-white/60">No transaction history</p>
          </div>
        </div>
      </div>
    </div>
  );
}
