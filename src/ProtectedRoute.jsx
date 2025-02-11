import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/context/AppContext";

const ProtectedRoute = () => {
  const { user } = useAuth();

  //   if (isLoading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
