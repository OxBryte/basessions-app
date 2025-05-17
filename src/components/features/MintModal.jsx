/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { web3 } from "../../Provider";
import { useUser } from "../hooks/useUser";
import { getVideo, mintVideo } from "../hooks/useBlockchain";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { stringToUint256 } from "../libs/utils";
import { useEthToUsdc } from "../hooks/useEthUsd";
import { useWallet } from "../hooks/useWallet";
import { useMintVideo } from "../hooks/useMint";

export default function MintModal({ media, onClose }) {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const usdcValue = useEthToUsdc(media?.price);
  const { user } = useUser();
  const { balances } = useWallet();
  const { mintFn } = useMintVideo();

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videoId = stringToUint256(media?.id); // if media.id is a UUID
        const video = await getVideo(videoId);
        setVideoData(video);
      } catch (err) {
        console.error("Failed to load video:", err);
      }
    };

    if (media?.id) loadVideo();
  }, [media?.id]);

  const handleConfirmMint = async () => {
    if (balances?.eth === "0") {
      toast.error("You need to fund your wallet to mint a video.");
      return; // Prevent submission if balance is 0
    }
    if (balances?.eth < media?.price) {
      toast.error(`You need atleast ${media?.price}eth to mint this video!`);
      return; // Prevent submission if balance is 0
    }

    setLoading(true);
    try {
      const priceInWei = web3.utils.toWei(media.price, "ether");
      const videoId = stringToUint256(media.id);
      const mediaId = media?.id;

      console.log(priceInWei, videoId);

      const privateKey = user.data.wallet_private_key;
      mintFn(mediaId);
      await mintVideo(privateKey, videoId, priceInWei);
      toast.success("Video minted successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(`"Failed to mint." ${err?.reason}`);
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
            <div className="space-y-0">
              <p className="text-white/60">
                {media?.price} ETH ≈ {Number(usdcValue).toFixed(2)} USDC
              </p>
              <p className="text-white/60 text-xs">
                {Number(balances?.eth).toFixed(5)}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white">Total Mints:</span>
            <p className="text-white/60">
              {Number(videoData?.totalMints || 0)}/{media?.max_mints}
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
