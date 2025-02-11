import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/context/AppContext";

const PublicRoute = () => {
  const { user } = useAuth();

  //   if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
