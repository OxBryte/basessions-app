import { BiEditAlt } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";

export default function ProfileDetails() {
  return (
    <div className="space-y-4 w-full pb-5 border-b border-white/10">
      <div className="flex items-center justify-between gap-8">
        <div className="w-14 h-14 rounded-full bg-white/40 border border-3 border-[#131313]" />
        <div className="bg-[#FFFFFF0D] rounded-full px-5 py-2 flex gap-2 items-center">
          <BiEditAlt />
          Edit
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-2xl">Dslegacy</h1>
          <p className="bg-[#FF9A354D] text-xs px-3 py-1.5 rounded-full">
            Premium
          </p>
        </div>
        <p className="text-white/40 text-xs">@legacy</p>
      </div>
      <p className="text-xs font-light max-w-[420px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
        reiciendis harum inventore nisi, similique ex a doloremque iste fugit
        minus nostrum odio? Tempore ut neque error nemo debitis labore nulla?
      </p>
      <div className="flex items-center gap-3 border border-white/40 hover:bg-white/10 cursor-pointer rounded-full w-fit text-xs px-3 py-1.5">
        <BsTwitterX />
        @dslegacy
      </div>
      <div className="mt-4 flex gap-3 text-[10px] md:text-md">
        <p className="m-0">
          Tips sent <span className="text-[#FFFFFF80] m-0 ml-1">$430</span>{" "}
        </p>
        <p className="m-0">
          Mints purchased <span className="text-[#FFFFFF80] m-0 ml-1">200</span>{" "}
        </p>
        <p className="m-0">
          Token Reward <span className="text-[#FFFFFF80] m-0 ml-1">30</span>{" "}
        </p>
      </div>
    </div>
  );
}
