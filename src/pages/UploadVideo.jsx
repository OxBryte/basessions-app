import { stringToUint256 } from "../components/libs/utils";
import { useEffect, useState } from "react";
import { PiImageFill, PiVideoFill } from "react-icons/pi";
import { useUser } from "../components/hooks/useUser";
import { useForm } from "react-hook-form";
import { useUploadMedia } from "../components/hooks/useUploadMedia";
import Spinner from "../components/ui/Spinner";
import {
  getUsdcFeeInEth,
  uploadVideo,
} from "../components/hooks/useBlockchain";
import { BsExclamationCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { web3 } from "../Provider";
import { useWallet } from "../components/hooks/useWallet";
import { useEthToUsdc } from "../components/hooks/useEthUsd";

export default function UploadVideo() {
  const { user } = useUser();
  const userId = user?.data?.id;

  const [freeMint, setFreeMint] = useState(false);
  const [description, setDescription] = useState(""); // Add state for description
  const [videoFile, setVideoFile] = useState(null); // Add state for video file
  const [thumbnail, setThumbnail] = useState(null); // Add state for thumbnail
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [fee, setFee] = useState(null);
  const [minting, setMinting] = useState(false);

  const { balances } = useWallet();
  const { uploadMediaFn, isPending } = useUploadMedia(setOpenModal, setData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();

  const ethAmount = parseFloat(watch("price") || "0");
  const usdcValue = useEthToUsdc(ethAmount);

  const handleDescriptionChange = (event) => {
    const inputText = event.target.value; // Get the current input value
    const wordCount = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length; // Count words

    if (wordCount <= 100) {
      // Check if word count is within limit
      setDescription(inputText); // Update state on change
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setVideoFile(file); // Update state with the selected file
    }
  };

  const handleChangeThumbnail = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setThumbnail(file); // Update state with the selected file
    }
  };

  const onSubmit = async (data) => {
    if (!userId) {
      alert("You must be logged in to upload a video."); // Alert if userId is undefined
      return; // Prevent submission
    }
    if (balances?.eth === "0") {
      toast.error("You need to fund your wallet to upload a video");
      return; // Prevent submission if balance is 0
    }
    if (balances?.eth < "0.0005") {
      toast.error("You need atleast 0.0005 worth of eth to make your upload");
      return; // Prevent submission if balance is less than 0.0005
    }
    const edited = {
      ...data,
      description,
      media_file: videoFile,
      thumbnail: thumbnail,
      free: freeMint,
      // price: freeMint === true && 0,
      // user_id: userId,
    };
    uploadMediaFn(edited);
    // console.log(edited);
  };

  useEffect(() => {
    const loadFee = async () => {
      try {
        const fee = await getUsdcFeeInEth();
        setFee(fee);
      } catch (err) {
        console.error("Failed to load video:", err);
      }
    };

    loadFee();
  }, []);

  const handleUploadVideoMint = async () => {
    setMinting(true);
    try {
      const price = web3.utils.toWei(data?.data?.price, "ether");
      // const price = stringToUint256(data?.data?.price);

      const mintLimit = data?.data?.max_mints;
      const mediaId = stringToUint256(data?.data?.id);
      const privateKey = user?.data?.wallet_private_key;
      await uploadVideo(privateKey, mediaId, mintLimit, price, fee);
      toast.success("Minted video successfully!");
      setMinting(false);
      setOpenModal(false);
      navigate("/"); // Redirect to home page after minting
    } catch (error) {
      console.log("Error minting video:", error);
      toast.error("Failed to Upload.");
      setMinting(false);
    }
  };

  return (
    <div>
      <div className="w-full max-w-[620px] mx-auto px-4">
        <div className="space-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <div className="relative space-y-6 w-full">
              <div className="relative w-full p-4 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center min-h-[240px]">
                {thumbnail ? ( // Check if a thumbnail is uploaded
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(thumbnail)} // Create a URL for the uploaded thumbnail
                      alt="Thumbnail Preview"
                      className="object-cover w-full h-full rounded-xl"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <label className="bg-[#0052FE] rounded-full text-xs px-3 py-1.5 cursor-pointer">
                        Choose an thumbnail
                        <input
                          type="file"
                          accept="image/*" // Restrict to image types
                          className="hidden" // Hide the input
                          onChange={handleChangeThumbnail} // Handle file change
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <PiImageFill size={48} />
                    <p className="text-lg font-light">Upload a thumbnail</p>
                    <p className="text-xs text-white/40 text-center w-3/4">
                      Upload a thumbnail for your video <br /> maximum 5mb.
                      Preferred format is MP4.
                    </p>
                    <label className="bg-[#0052FE] rounded-full text-xs px-3 py-1.5 cursor-pointer">
                      Choose an thumbnail
                      <input
                        type="file"
                        accept="image/*" // Restrict to image types
                        className="hidden" // Hide the input
                        onChange={handleChangeThumbnail} // Handle file change
                      />
                    </label>
                  </>
                )}
              </div>
              <div className="w-full p-4 border border-dashed rounded-xl flex flex-col gap-2 items-center justify-center min-h-[200px]">
                <PiVideoFill size={48} />
                <p className="text-lg font-light">Select video file</p>
                <p className="text-xs text-white/40">
                  Maximum 50mb. Preferred format is MP4.
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-xs">Drag and drop or</p>
                  <label className="bg-[#0052FE] rounded-full text-xs px-3 py-1.5 cursor-pointer">
                    Choose a file
                    <input
                      type="file"
                      accept="video/*" // Restrict to video types
                      className="hidden" // Hide the input
                      onChange={handleFileChange} // Handle file change
                    />
                  </label>
                </div>
                {videoFile && ( // Display video details if a file is selected
                  <div className="mt-2 text-xs">
                    <p>File Name: {videoFile.name}</p>
                    <p>
                      File Size: {(videoFile.size / (1024 * 1024)).toFixed(2)}{" "}
                      MB
                    </p>
                    <p>File Type: {videoFile.type}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-light">
                Title*
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                {...register("title", { required: true })}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-light">
                Description*
              </label>
              <textarea
                rows={6}
                placeholder="Write a video description under 100 words"
                className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                value={description} // Bind value to state
                onChange={handleDescriptionChange} // Handle change
              />
              <div className="flex items-center gap-4 justify-between">
                <span className="justify-self-end text-xs font-light">
                  {
                    description
                      .trim()
                      .split(/\s+/)
                      .filter((word) => word.length > 0).length
                  }
                  /60
                </span>{" "}
                {description
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length === 60 && (
                  <span>Limit reached</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4 w-full justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="mintPrice" className="text-sm font-light">
                  Set mint price (ETH)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={freeMint ? 0 : undefined} // Set value to 0 if freeMint is true
                  disabled={freeMint}
                  className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                  {...register("price")}
                />
                <div className="text-white/60 text-xs">
                  ≈ {Number(usdcValue).toFixed(2)} USDC
                </div>
              </div>
              <div className=" flex flex-col gap-2">
                <label htmlFor="mintNumber" className="text-sm font-light">
                  Number of mints
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                  {...register("max_mints", { required: true })}
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <label htmlFor="freeMint" className="text-sm font-light">
                Free Mint
              </label>
              <div
                className={`relative w-9 h-5 flex items-center rounded-full transition duration-300 ${
                  freeMint ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => setFreeMint(!freeMint)}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 ${
                    freeMint ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-[#0052FE] px-4 py-3 w-full rounded-full"
            >
              {isPending ? <Spinner /> : "Upload video"}
            </button>
          </form>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center p-5 bg-black/50">
          <div className="bg-[#131313] p-5 max-w-[380px] w-full  flex flex-col items-center text-center gap-3 rounded-lg">
            <div className="w-[140px] h-[140px] overflow-hidden">
              <img src="success.gif" alt="" />
            </div>
            <p className="text-white/70">
              Your video has been uploaded successfully!
            </p>
            <div className="flex gap-3 items-center text-white/60">
              <BsExclamationCircle />
              <p className=" text-sm">Proceed to mint your video</p>
            </div>

            <button
              onClick={() => handleUploadVideoMint()}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              {minting ? <Spinner /> : "Mint Video"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
