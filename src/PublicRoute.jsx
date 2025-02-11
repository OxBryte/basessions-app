import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/hooks/useAuth";

const PublicRoute = () => {
  const { user } = useAuth();

  //   if (isLoading) return <div>Loading...</div>;

  return !user.user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
