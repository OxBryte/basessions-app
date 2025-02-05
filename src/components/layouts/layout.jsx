import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="w-full max-w-[780px] mx-auto px-4 py-4">
      <Navbar />
      <Outlet />
    </div>
  );
}
