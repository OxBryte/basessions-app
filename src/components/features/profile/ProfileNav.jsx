import { BiChevronLeft } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { goBack } from "../../libs/utils";
import { FaChartPie } from "react-icons/fa";
import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";

export default function ProfileNav() {
  const { user } = useUser();

  return (
    <div className="bg-[#2C2C2C]">
      <div className="max-w-[620px] mx-auto flex gap-4 justify-between items-center w-full p-4 min-h-[80px] bg-[#2C2C2C] ">
        <div onClick={goBack} className="cursor-pointer">
          <BiChevronLeft size={28} />
        </div>
        <div className="flex items-center gap-3">
          {user?.data?.type === "creator" && (
            <div>
              <FaChartPie size={26} />
            </div>
          )}
          <Link to="/settings">
            <div>
              <CiSettings size={28} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
