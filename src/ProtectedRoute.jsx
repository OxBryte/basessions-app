import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./components/hooks/useUser";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useUser();
  const isVerified = user?.data?.isVerified;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // // If authenticated but not verified, redirect to verify page
  // if (isAuthenticated && !isVerified) {
  //   return <Navigate to="/verify" replace />;
  // }

  // If authenticated and verified, allow access to protected content
  return <Outlet />;
};

export default ProtectedRoute;