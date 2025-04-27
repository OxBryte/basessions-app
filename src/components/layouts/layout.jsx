import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomBar from "./BottomBar";

export default function Layout() {
  return (
    <div className="w-full max-w-[620px] relative mx-auto">
      <div className="w-full px-4 py-4">
        <Navbar />
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
