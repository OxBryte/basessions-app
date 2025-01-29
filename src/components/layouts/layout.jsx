import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="w-full max-w-[860px] mx-auto px-4">
      <Navbar />
      <Outlet />
    </div>
  );
}
