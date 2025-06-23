import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="w-full mx-auto flex items-center justify-between gap-8 pt-3 pb-5">
      <Link to="/" className="rounded-full overflow-hidden">
        <img src="session_logo.png" alt="" className="w-8" />
      </Link>

      {!user ? (
        <Link to="/login">
          <button className="bg-[#0052FE] text-xs px-4 py-2 rounded-xl">
            Login / Signup
          </button>
        </Link>
      ) : (
        <div className="flex gap-4 itemx-center">
          <div className="text-[#0052FE]">
            <p>Get premium</p>
          </div>
        </div>
      )}
    </div>
  );
}
