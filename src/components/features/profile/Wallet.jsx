import { BiChevronLeft } from "react-icons/bi";
import { copyToClipboard, goBack } from "../../libs/utils";
import {
  PiBatteryEmpty,
  PiCoinsFill,
  PiPaperPlaneTiltFill,
  PiQrCode,
} from "react-icons/pi";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useUser } from "../../hooks/useUser";

export default function Wallet() {
  const [send, setSend] = useState(false);
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");

  const { user } = useUser();
  
  const walletAddress = user?.data?.wallet_address;
  // console.log(walletAddress);



  async function handleCopy(address) {
    const ok = await copyToClipboard(address);
    if (ok) {
      // show your toast/snackbar
      console.log("Copied to clipboard!");
    } else {
      console.error("Copy failed");
    }
  }

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
          <div
            className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5 cursor-pointer"
            onClick={() => setSend(true)}
          >
            <PiPaperPlaneTiltFill size={24} />
            <p className="text-xs text-white/60">Send</p>
          </div>
          <div
            className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5 cursor-pointer"
            onClick={() => setModal(true)}
          >
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

      {send && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="bg-white/20 rounded-lg p-6 w-full max-w-sm z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Send Funds</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Amount</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded"
                placeholder="0.00"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">To Address</span>
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded"
                placeholder="0x…"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSend(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // your send logic here
                  console.log({ amount, toAddress });
                  setSend(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="bg-white/20 rounded-lg p-6 w-full max-w-xs z-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Receive Funds</h2>
            <div className="bg-gray-100 p-4 inline-block rounded mb-4">
              <QRCode value={walletAddress} size={128} />
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <code className="truncate">{walletAddress}</code>
              <button
                onClick={handleCopy.bind(null, walletAddress)}
                className="ml-2 px-2 py-1 border rounded"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
