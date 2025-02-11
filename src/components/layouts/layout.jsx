import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Layout() {
  const { setUser } = useAuth();

  // if (isLoading)
  //   return (
  //     <div className="w-full h-screen flex justify-center items-center">
  //       Loading...
  //     </div>
  //   );
  return (
    <div className="w-full max-w-[780px] mx-auto px-4 py-4">
      <Navbar />
      <Outlet />
    </div>
  );
}
