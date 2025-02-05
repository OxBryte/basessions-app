import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../libs/utils";

export default function UploadVideo() {
  return (
    <div>
      <div className="w-full max-w-[780px] mx-auto px-4 my-10">
        <div className="space-y-4">
          <div onClick={goBack} className="cursor-pointer">
            <IoChevronBack size={24} />
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 rounded-full" />
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
              />
              <span className="self-end text-xs font-light">0/100</span>
            </div>
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="mintPrice" className="font-light">
                  Set mint price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="mintNumber" className="font-light">
                  Number of mints
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
                />
              </div>
            </div>
            <div className="w-full flex gap-2">
              <label htmlFor="freeMint" className="font-light">
                Free Mint
              </label>
              
              {/* <input type="radio" name="freeMint" id="freeMint" /> */}
            </div>
            <button className="bg-[#0052FE] px-4 py-3 w-full rounded-full">
              Upload and Mint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
