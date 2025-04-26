import { BiPlusCircle, BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="w-full mx-auto flex items-center justify-between gap-8 py-5">
      <Link to="/profile">
        <div
          className="w-10 h-10 rounded-full bg-white/30"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${user?.data?.avatar_url})`,
          }}
        ></div>
      </Link>
      {!user && (
        <Link to="/login">
          <button className="bg-[#0052FE] text-xs px-4 py-2 rounded-xl">
            Login / Signup
          </button>
        </Link>
      )}
      {user?.data?.type === "creator" && (
        <div className="flex gap-4 items-center">
          <Link to="/upload">
            <div className="m-0">
              <BiPlusCircle size={24} />
            </div>
          </Link>
          <div className="m-0">
            <BiSearch size={24} />
          </div>
          {/* <div className="m-0">
            <BsFillBellFill size={24} />
          </div> */}
        </div>
      )}
      {user?.data?.type === "fan" && (
        <div className="flex gap-4 itemx-center">
          <div className="text-[#0052FE]">
            <p>Get premium</p>
          </div>
          <div className="m-0 text-white/20">
            <BiSearch size={24} />
          </div>
          <div className="m-0 text-white/20">
            <BsFillBellFill size={24} />
          </div>
        </div>
      )}
    </div>
  );
}
