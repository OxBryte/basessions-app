import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="w-full max-w-[620px] mx-auto px-4 py-4">
      <Navbar />
      <Outlet />
    </div>
  );
}

// profile layout
export function ProfileLayout() {
  return (
    <div className="w-full max-w-[620px] mx-auto px-4 py-4">
      <Outlet />
    </div>
  );
}
