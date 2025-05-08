/* eslint-disable react/prop-types */
import { useState } from "react";
import { web3 } from "../../Provider";
import { useUser } from "../hooks/useUser";
import { tipCreator } from "../hooks/useBlockchain";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { useWallet } from "../hooks/useWallet";

export default function TipCreator({ media, onClose }) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const { user } = useUser();
  const { isLoading, balances } = useWallet();

  const handleConfirmMint = async () => {
    setLoading(true);
    try {
      const amountInWei = web3.utils.toWei(media.price, "ether");
      const creatorAddress = media?.creator?.wallet_address;
      const privateKey = user.data.wallet_private_key;

      console.log(
        "Tip amount in Wei:",
        amountInWei,
        "Creator Address:",
        creatorAddress
      );
      await tipCreator(privateKey, creatorAddress, amountInWei);
      toast.success("Tipped creator successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to tip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#131313] w-full max-w-sm m-5 p-8 space-y-6 rounded-2xl relative">
        <h2 className="text-2xl text-center font-semibold text-white mb-4">
          Tip @{media?.creator?.username}
        </h2>
        <div className="space-y-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-white">Enter amount</span>
            <p className="text-white/60">
              {isLoading ? (
                <Spinner />
              ) : (
                <span className="text-white/60">
                  {Number(balances?.eth).toFixed(4)} ETH
                </span>
              )}
            </p>
          </div>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            name=""
            id=""
            className="w-full px-4 py-3 bg-white/5 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4 justify-between">
          <button
            onClick={handleConfirmMint}
            disabled={loading}
            className="w-full bg-[#0052FE] py-3 text-xs rounded-full text-white font-medium flex justify-center"
          >
            {loading ? <Spinner /> : "Tip"}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white/10 py-3 text-xs rounded-full text-white font-medium flex justify-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
