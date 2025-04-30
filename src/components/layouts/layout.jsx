import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";

export default function Layout() {
  const { pathname } = useLocation();
  console.log(pathname);
  const isPage = pathname === "/" || pathname === "/";

  return (
    <div className="w-full max-w-[620px] h-screen relative mx-auto">
      <div className="w-full px-4 pt-4 pb-[100px]">
        {isPage ? <Navbar /> : null}
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
}

// profile layout
export function ProfileLayout() {
  return (
    <div className="w-full max-w-[620px] mx-auto px-4 py-4">
      <Outlet />
      <BottomBar />
    </div>
  );
}
