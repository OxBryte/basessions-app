import { copyToClipboard } from "../components/libs/utils";
import {
  PiBatteryEmpty,
  PiCoinsFill,
  PiPaperPlaneTiltFill,
  PiQrCode,
} from "react-icons/pi";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useUser } from "../components/hooks/useUser";
import { useWallet } from "../components/hooks/useWallet";
import Spinner from "../components/ui/Spinner";
import { RxReload } from "react-icons/rx";
import { MdOutlineSwapHoriz } from "react-icons/md";
import useTransactionHistory from "../components/hooks/useTransactionHistory";
import toast from "react-hot-toast";
import { web3 } from "../Provider";

export default function Wallet() {
  const [send, setSend] = useState(false);
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");

  const { user } = useUser();
  const walletAddress = user?.data?.wallet_address;
  const walletPrivateKey = user?.data?.wallet_private_key;
  const { isLoading, balances, ethUsdValue, refreshBalances } = useWallet(
    walletPrivateKey,
    walletAddress
  );
  const { transactions, isLoading: isLoadingTransactions } =
    useTransactionHistory(walletAddress);
  // console.log(transactions);

  async function handleCopy(address) {
    const ok = await copyToClipboard(address);
    if (ok) {
      // show your toast/snackbar
      toast.success("Address copied successfully");
      console.log("Copied to clipboard!");
    } else {
      toast.success("Failed to copy address");
      console.error("Copy failed");
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center my-4">
        <div className="space-y-4 place-items-center">
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
          <div className="space-y-1 place-items-center">
            <p className="text-xs text-white/60">Total balance</p>
            <div className="flex gap-2 items-center">
              {isLoading ? (
                <div className="pt-2">
                  <Spinner />
                </div>
              ) : (
                <p className="text-4xl font-bold">${ethUsdValue}</p>
              )}
              <div className="" onClick={refreshBalances}>
                <RxReload size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 w-full gap-2">
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5">
            <PiCoinsFill size={22} />
            <p className="text-xs text-white/60">Buy/Sell</p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5">
            <MdOutlineSwapHoriz size={22} />
            <p className="text-xs text-white/60">Swap</p>
          </div>
          <div
            className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5 cursor-pointer"
            // onClick={() => setSend(true)}
          >
            <PiPaperPlaneTiltFill size={22} />
            <p className="text-xs text-white/60">Send</p>
          </div>
          <div
            className="flex flex-col gap-2 items-center justify-center p-4 rounded-lg bg-white/5 cursor-pointer"
            onClick={() => setModal(true)}
          >
            <PiQrCode size={22} />
            <p className="text-xs text-white/60">Recieve</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-3 w-full justify-between items-center">
            <p className="text-sm">Tokens</p>
          </div>
          <div className="w-full flex items-center justify-between gap-5">
            <div className="flex gap-3 items-center">
              <img src="base.png" alt="" className="w-8" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Ethereum</p>
                <p className="text-white/60 text-xs">
                  {Number(balances.eth).toFixed(4)}
                </p>
              </div>
            </div>
            <p>${ethUsdValue}</p>
          </div>
          <div className="w-full flex items-center justify-between gap-5">
            <div className="flex gap-3 items-center">
              <img src="usdc.png" alt="" className="w-8" />
              <div className="space-y-1">
                <p className="text-sm font-medium">USDC</p>
                <p className="text-white/60 text-xs">
                  {Number(balances.usdc).toFixed(4)}
                </p>
              </div>
            </div>
            <p>$00.00</p>
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
          {isLoadingTransactions ? (
            <div
              // style={divStyles2}
              className="d-flex flex-column align-items-center gap-2"
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <span>Wait a moment</span>
            </div>
          ) : (
            <div className="overflow-auto w-[100%]">
              {transactions?.length > 0 && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date/Time</th>
                      <th scope="col">TX Hash</th>
                      <th scope="col">Method</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions?.map((tx, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {new Date(tx?.timeStamp * 1000).toLocaleString()}
                        </td>
                        <td>
                          <a
                            href={`https://basescan.org/tx/${tx?.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#FFFFFF", textDecoration: "none" }}
                          >
                            {tx?.hash?.substring(0, 20)}...
                          </a>
                        </td>
                        <td>
                          {tx?.from === walletAddress ? "Sent" : "Received"}
                        </td>
                        <td>{`${web3.utils.fromWei(
                          tx?.value,
                          "ether"
                        )} ETH`}</td>
                        <td>{tx?.isError === "0" ? "Success" : "Failed"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {send && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="bg-[#131313] rounded-lg p-6 w-full max-w-sm z-10"
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
            className="bg-[#131313] rounded-lg p-6 w-full max-w-xs z-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Receive Funds</h2>
            <div className="bg-gray-100 p-4 inline-block rounded mb-4">
              <QRCode value={walletAddress} size={128} />
            </div>
            <div className="flex items-center justify-between bg-none">
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
              className="mt-4 px-4 py-2 bg-white/10 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
