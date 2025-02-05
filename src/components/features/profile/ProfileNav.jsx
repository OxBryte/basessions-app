import { BiChevronLeft, BiHistory } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { goBack } from "../../libs/utils";

export default function ProfileNav() {
  return (
    <div className="bg-[#2C2C2C]">
      <div className="max-w-[780px] mx-auto flex gap-4 justify-between items-center w-full p-4 min-h-[80px] bg-[#2C2C2C] ">
        <div onClick={goBack} className="cursor-pointer">
          <BiChevronLeft size={28} />
        </div>
        <div className="flex items-center gap-3">
          <div>
            <BiHistory size={28} />
          </div>
          <div>
            <CiSettings size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
