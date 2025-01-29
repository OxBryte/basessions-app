import { BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="w-full mx-auto flex items-center justify-between gap-8 py-5">
      <div className="w-10 h-10 rounded-full bg-white/30"></div>
      <div className="flex gap-4 itemx-center">
        <div className="text-blue-600">
          <p>Get premium</p>
        </div>
        <div className="m-0 text-white/20">
          <BiSearch size={24} />
        </div>
        <div className="m-0 text-white/20">
          <BsFillBellFill size={24} />
        </div>
      </div>
    </div>
  );
}
