import { BiChevronLeft, BiHistory } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { goBack } from "../../libs/utils";
import { useAuth } from "../../context/AppContext";
import { FaChartPie } from "react-icons/fa";

export default function ProfileNav() {
  const { user } = useAuth();

  return (
    <div className="bg-[#2C2C2C]">
      <div className="max-w-[780px] mx-auto flex gap-4 justify-between items-center w-full p-4 min-h-[80px] bg-[#2C2C2C] ">
        <div onClick={goBack} className="cursor-pointer">
          <BiChevronLeft size={28} />
        </div>
        <div className="flex items-center gap-3">
          {user?.data.type === "creator" && (
            <div>
              <FaChartPie size={26} />
            </div>
          )}
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
