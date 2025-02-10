import { BiEditAlt } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../../libs/utils";

export default function ProfileComplete() {
  return (
    <div className="w-full max-w-[780px] mx-auto px-4 my-10">
      <div className="space-y-4">
        <div onClick={goBack} className="cursor-pointer">
          <IoChevronBack size={24} />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-300 rounded-full" />
            <div className="absolute bottom-0 right-0 bg-[#131313] border border-2 border-[#131313] rounded-full p-1 cursor-pointer">
              <BiEditAlt />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="displayName" className="font-light">
              Display Name*
            </label>
            <input
              type="text"
              placeholder="Enter display name"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="userName" className="font-light">
              Username*
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="Bio" className="font-light">
              Bio*
            </label>
            <textarea
              rows={6}
              placeholder="Write a short bio under 40 words"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
            />
            <span className="self-end text-xs font-light">0/40</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="twitter" className="font-light">
              Twitter (X)
            </label>
            <input
              type="text"
              placeholder="Enter X username"
              className="bg-[#FFFFFF08] px-4 py-2.5 rounded-lg"
            />
          </div>
          <button className="bg-[#0052FE] px-4 py-3 w-full rounded-full">
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
