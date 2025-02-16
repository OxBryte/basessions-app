import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./components/hooks/useUser";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  return user?.data || isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
