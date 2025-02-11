import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/hooks/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log(user,"not allowed")


  //   if (isLoading) return <div>Loading...</div>;
  return user.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
