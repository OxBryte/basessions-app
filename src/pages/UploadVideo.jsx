import { stringToUint256 } from "../components/libs/utils";
import { useState, useEffect } from "react";
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState(null);
  const [fee, setFee] = useState(null);
  const [minting, setMinting] = useState(false);
  const [uploadButtonProgress, setUploadButtonProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // New enhanced progress states
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [uploadStartTime, setUploadStartTime] = useState(null);

  const { balances } = useWallet();
  const { uploadMediaFn, isPending } = useUploadMedia(setOpenModal, setData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue, // Add this to be able to programmatically set form values
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
    processFile(file);
  };

  const handleChangeThumbnail = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setThumbnail(file); // Update state with the selected file
    }
  };

  const processFile = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    // Validate file size (200MB limit)
    if (file.size > 200 * 1024 * 1024) {
      toast.error("File size must be less than 200MB");
      return;
    }

    setVideoFile(file);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  // Enhanced upload progress simulation with network constraints
  const simulateUploadProgressAdvanced = (fileSize) => {
    const startTime = Date.now();
    setUploadStartTime(startTime);
    let uploadedBytes = 0;

    const progressInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // in seconds

      // Simulate variable upload speed (network constraints)
      const speedVariation = 0.4 + Math.random() * 0.9; // 0.4x to 1.3x speed variation
      const baseSpeed = 80 * 1024; // 80 KB/s base speed
      const currentSpeed = baseSpeed * speedVariation;

      uploadedBytes += currentSpeed * 0.5; // Update every 500ms
      const percentage = Math.min((uploadedBytes / fileSize) * 100, 95); // Cap at 95% until completion

      setUploadButtonProgress(percentage);

      // Calculate and display upload speed
      const speedKBps = uploadedBytes / elapsedTime / 1024;
      if (speedKBps < 1024) {
        setUploadSpeed(`${speedKBps.toFixed(1)} KB/s`);
      } else {
        setUploadSpeed(`${(speedKBps / 1024).toFixed(2)} MB/s`);
      }

      // Calculate estimated time remaining
      if (percentage > 5 && percentage < 95) {
        const remainingBytes = fileSize - uploadedBytes;
        const avgSpeed = uploadedBytes / elapsedTime;
        const remainingTime = remainingBytes / avgSpeed;

        if (remainingTime < 60) {
          setEstimatedTime(`${Math.ceil(remainingTime)}s remaining`);
        } else {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = Math.ceil(remainingTime % 60);
          setEstimatedTime(`${minutes}m ${seconds}s remaining`);
        }
      } else if (percentage >= 95) {
        setEstimatedTime("Finalizing...");
      }

      if (percentage >= 95) {
        clearInterval(progressInterval);
        return;
      }
    }, 500);

    return progressInterval;
  };

  const formatFileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  const onSubmit = async (data) => {
    if (!userId) {
      toast.error("You must be logged in to upload a video");
      return;
    }
    if (balances?.eth === "0") {
      toast.error("You need to fund your wallet to upload a video");
      return;
    }
    if (balances?.eth < "0.00006") {
      toast.error("You need atleast 0.00006 worth of eth to make your upload");
      return;
    }

    const edited = {
      ...data,
      description,
      media_file: videoFile,
      thumbnail: thumbnail,
      free: freeMint,
    };

    // Start upload tracking with enhanced progress
    setIsUploading(true);
    setUploadButtonProgress(0);
    setUploadSpeed("");
    setEstimatedTime("");

    // Start enhanced progress simulation
    let progressInterval = null;
    if (videoFile) {
      progressInterval = simulateUploadProgressAdvanced(videoFile.size);
    }

    try {
      await uploadMediaFn(edited);
      // When upload completes successfully
      if (progressInterval) clearInterval(progressInterval);
      setUploadButtonProgress(100);
      setUploadSpeed("");
      setEstimatedTime("Upload complete!");

      // Brief delay to show completion before resetting
      setTimeout(() => {
        setEstimatedTime("");
      }, 2000);
    } catch (error) {
      if (progressInterval) clearInterval(progressInterval);
      setIsUploading(false);
      setUploadButtonProgress(0);
      setUploadSpeed("");
      setEstimatedTime("");
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  useEffect(() => {
    const loadFee = async () => {
      try {
        const fee = await getUsdcFeeInEth();
        setFee(fee);
      } catch (err) {
        console.error("Failed to load fee:", err);
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
      console.log("Error minting video:", error?.reason);
      toast.error(`${error?.reason}`);
      setMinting(false);
    }
  };

  // Reset upload progress when modal closes
  useEffect(() => {
    if (!openModal) {
      setIsUploading(false);
      setUploadButtonProgress(0);
      setUploadSpeed("");
      setEstimatedTime("");
    }
  }, [openModal]);

  // Effect to set price to 0 when freeMint is true
  useEffect(() => {
    if (freeMint) {
      setValue("price", "0"); // Set the form value to "0" as a string
    }
  }, [freeMint, setValue]); // Run this effect when freeMint changes

  return (
    <div>
      <div className="w-full max-w-[620px] mx-auto px-4">
        <div className="space-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <div className="relative space-y-6 w-full">
              <div className="relative w-full p-4 bg-[#FFFFFF08] rounded-xl flex flex-col gap-2 items-center justify-center min-h-[240px]">
                {thumbnail ? ( // Check if a thumbnail is uploaded
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(thumbnail)} // Create a URL for the uploaded thumbnail
                      alt="Thumbnail Preview"
                      className="object-cover w-full h-full rounded-xl"
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <label className="bg-[#0052FE] rounded-full text-xs px-3 py-1.5 cursor-pointer">
                        Choose another thumbnail
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
                    <PiImageFill size={40} />
                    <p className="font-medium">Upload a thumbnail</p>
                    <p className="text-[10px] font-light text-white/40 text-center w-3/4">
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
              {!videoFile ? (
                <div className="w-full p-4 bg-[#FFFFFF08] rounded-xl flex flex-col gap-2 items-center justify-center min-h-[200px]">
                  <PiVideoFill size={40} />
                  <p className="font-medium">Select video file</p>
                  <p className="text-xs text-center font-light text-white/40">
                    Maximum 200mb. <br /> Preferred format is MP4.
                  </p>
                  <label className="bg-[#0052FE] rounded-full text-xs px-3 py-1.5 cursor-pointer">
                    Choose a video file
                    <input
                      type="file"
                      accept="video/*" // Restrict to video types
                      className="hidden" // Hide the input
                      onChange={handleFileChange} // Handle file change
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  <div className="w-full p-4 bg-[#FFFFFF08] rounded-xl flex items-center gap-3">
                    {videoFile.name.includes(".mov") && (
                      <img src="/video.png" alt="" className="w-12" />
                    )}
                    {videoFile.name.includes(".mp4") && (
                      <img src="/video.png" alt="" className="w-12" />
                    )}
                    <div className="w-full space-y-2 font-light text-xs text-white/60">
                      <div className="flex items-center justify-between gap-4">
                        <p>{videoFile.name}</p>
                        <p className="text-[#0052FE]">
                          {Math.round(uploadProgress)}%
                        </p>
                      </div>
                      <div className="w-full bg-[#FFFFFF08] rounded-full h-2">
                        <div
                          className="bg-[#0052FE] h-2 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p>{formatFileSize(videoFile.size)} MB</p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <label className="bg-[#0052FE] w-fit rounded-full text-xs px-3 py-1.5 cursor-pointer">
                      Choose another video file
                      <input
                        type="file"
                        accept="video/*" // Restrict to video types
                        className="hidden" // Hide the input
                        onChange={handleFileChange} // Handle file change
                      />
                    </label>
                  </div>
                </div>
              )}
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
                rows={4}
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
            <div className="grid grid-cols-2 items-top gap-4 w-full justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="mintPrice" className="text-sm font-light">
                  Set mint price (ETH)
                </label>
                <input
                  type="number"
                  placeholder="0"
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
              className={`px-4 py-3 text-sm w-full rounded-full relative overflow-hidden transition-all duration-300 ${
                isPending || isUploading
                  ? "bg-[#0052FE]/80 cursor-not-allowed"
                  : "bg-[#0052FE] hover:bg-[#0066FF]"
              }`}
              disabled={isPending || isUploading}
            >
              {isUploading ? (
                <>
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${uploadButtonProgress}%` }}
                  ></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Uploading... {Math.round(uploadButtonProgress)}%
                  </span>
                </>
              ) : isPending ? (
                <Spinner />
              ) : (
                "Upload video"
              )}
            </button>
            {/* Enhanced Upload Progress Display - Show above button when uploading */}
            {isUploading && (uploadSpeed || estimatedTime) && (
              <div className="w-full bg-[#FFFFFF08] rounded-lg space-y-3">
                <div className="w-full bg-[#FFFFFF08] rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0052FE] to-[#0066FF] h-3 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${uploadButtonProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0052FE]">
                      {uploadButtonProgress.toFixed(1)}%
                    </span>
                    <span>{uploadSpeed}</span>
                  </div>
                  <span>{estimatedTime}</span>
                </div>
              </div>
            )}
            <p className="text-xs text-white/60 text-center -mt-2 font-light animate-bounce">
              Make sure you have atleast $0.2 ≈ 0.00006 ETH funded in your
              wallet{" "}
            </p>
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
