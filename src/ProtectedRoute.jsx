import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./components/hooks/useUser";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
