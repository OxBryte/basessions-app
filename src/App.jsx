import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLogin, AuthSignup } from "./pages/Auth";
import Layout, { ProfileLayout } from "./components/layouts/layout";
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
import WatchVideo from "./pages/WatchVideo";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notification";
import Wallet from "./components/features/profile/Wallet";
import WalletSettings from "./components/features/profile/WalletSettings";

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
          <Route element={<ProfileLayout />}>
          <Route path="/wallet" element={<Wallet />} />
          </Route>
          <Route path="/:id" element={<WatchVideo />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/wallet" element={<WalletSettings />} />
          <Route path="/notifications" element={<Notifications />} />
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
