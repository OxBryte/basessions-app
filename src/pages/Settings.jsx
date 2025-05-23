import { IoChevronBack } from "react-icons/io5";
import { goBack } from "../components/libs/utils";
import { BiChevronRight } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/context/AppContext";

export default function Settings() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="w-full min-h-[90dvh] flex flex-col justify-between max-w-[620px] mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-5 py-3">
            <div onClick={goBack} className="cursor-pointer">
              <IoChevronBack size={24} />
            </div>
            <p>Settings</p>
          </div>
          <div className="w-full flex flex-col gap-5">
            <Link to="/settings/wallet">
              <div className="flex items-center gap-4 justify-between">
                <p className="text-md">Wallet</p>
                <button>
                  <BiChevronRight size={28} />
                </button>
              </div>
            </Link>
            <Link to="/notifications">
              <div className="flex items-center gap-4 justify-between">
                <p className="text-md">Notification settings</p>
                <button>
                  <BiChevronRight size={28} />
                </button>
              </div>
            </Link>
            <div className="flex items-center gap-4 justify-between">
              <p className="text-md">Privacy Policy</p>
              <button>
                <BiChevronRight size={28} />
              </button>
            </div>
            <button
              className="w-full flex items-center justify-center gap-4 py-4 cursor-pointer mt-6 text-white"
              onClick={() => logout()}
            >
              <p>Logout</p>
              <TbLogout size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
