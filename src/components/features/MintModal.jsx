/* eslint-disable react/prop-types */
import { keccak256, toBigInt } from "web3-utils";
import { useState } from "react";
import { web3 } from "../../Provider";
import { useUser } from "../hooks/useUser";
import { mintVideo } from "../hooks/useBlockchain";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

export default function MintModal({ media, onClose }) {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const stringToUint256 = (str) => {
    const hash = keccak256(str); // e.g., 0xabc123...
    const uint = toBigInt(hash).toString(); // Convert to decimal string
    return uint;
  };

  const handleConfirmMint = async () => {
    setLoading(true);
    try {
      const priceInWei = web3.utils.toWei(media.price, "ether");
      const videoId = stringToUint256(media.id);

      console.log(priceInWei, videoId);

      const privateKey = user.data.wallet_private_key;
      await mintVideo(privateKey, videoId, priceInWei);
      toast.success("Video minted successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to mint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#131313] w-full max-w-md m-5 p-8 space-y-6 rounded-2xl relative">
        <h2 className="text-2xl text-center font-semibold text-white mb-4">
          Mint Video
        </h2>
        <div className="space-y-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-white">Video title:</span>
            <p className="text-white/60">{media?.title}</p>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white">Description:</span>
            <p className="text-white/60">{media?.description}</p>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white">Price:</span>
            <p className="text-white/60">{media?.price} ETH</p>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white">Total Mints:</span>
            <p className="text-white/60">
              {media?.current_mints || 0}/{media?.max_mints}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <button
            onClick={handleConfirmMint}
            disabled={loading}
            className="w-full bg-[#0052FE] py-3 text-xs rounded-full text-white font-medium flex justify-center"
          >
            {loading ? <Spinner /> : "Mint Now"}
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
