import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLogin, AuthSignup } from "./pages/Auth";
import Layout from "./components/layouts/layout";
import Home from "./pages/Home";
import ProfileComplete from "./components/features/auth/ProfileComplete";
import Profile from "./pages/Profile";
import UploadVideo from "./pages/UploadVideo";
import SelectAccount from "./components/features/auth/SelectAccount";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import { useUser } from "./components/hooks/useUser";
import EditProfile from "./pages/EditProfile";
import CreatorProfile from "./pages/CreatorProfile";

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/Signup" element={<AuthSignup />} />
        <Route path="/select" element={<SelectAccount />} />
        <Route path="/verify" element={<VerifyEmail />} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/complete-profile" element={<ProfileComplete />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {user?.data?.type === "creator" && (
            <Route path="/upload" element={<UploadVideo />} />
          )}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<CreatorProfile />} />
        </Route>

        {/* Route */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
