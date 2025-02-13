import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../components/libs/utils";
import { useState } from "react";
import { PiVideoFill } from "react-icons/pi";
import { useUser } from "../components/hooks/useUser";
import { useForm } from "react-hook-form";
import { useUploadMedia } from "../queries/useUploadMedia";

export default function UploadVideo() {
  const { user } = useUser();
  const userId = user?.id;

  const [freeMint, setFreeMint] = useState(false);
  const [description, setDescription] = useState(""); // Add state for description
  const [videoFile, setVideoFile] = useState(null); // Add state for video file
  const { uploadMediaFn, isPending } = useUploadMedia();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    const edited = {
      ...data,
      description,
      media_file: videoFile,
      free: freeMint,
      price: freeMint === true && 0,
      user_id: userId,
    };
    uploadMediaFn(edited);
    console.log(edited);
  };

  return (
    <div>
      <div className="w-full max-w-[780px] mx-auto px-4 my-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div onClick={goBack} className="cursor-pointer">
              <IoChevronBack size={24} />
            </div>
            <p>Upload Video</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <div className="relative w-full">
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
              <div className="absolute bottom-0 right-0 bg-[#131313] border border-2 border-[#131313] rounded-full p-1 cursor-pointer">
                {/* <BiEditAlt /> */}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="title" className="font-light">
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
              <label htmlFor="description" className="font-light">
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
                  /100
                </span>{" "}
                {description
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length === 100 && (
                  <span>Limit reached</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4 w-full justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="mintPrice" className="font-light">
                  Set mint price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={freeMint ? "0" : undefined} // Set value to 0 if freeMint is true
                  disabled={freeMint}
                  className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                  {...register("price")}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label htmlFor="mintNumber" className="font-light">
                  Number of mints
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                  // {...register("max_mint", { required: true })}
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <label htmlFor="freeMint" className="font-light">
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
              {isPending ? "Uploading..." : "Upload and Mint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
