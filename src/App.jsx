import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLogin, AuthSignup } from "./pages/Auth";
import Layout from "./components/layouts/layout";
import Home from "./pages/Home";
import ProfileComplete from "./components/features/auth/ProfileComplete";
import Profile from "./pages/Profile";
import UploadVideo from "./components/features/UploadVideo";
import SelectAccount from "./components/features/auth/SelectAccount";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/Signup" element={<AuthSignup />} />
          <Route path="/select" element={<SelectAccount />} />
          <Route path="/verify" element={<VerifyEmail />} />
        </Route>
          <Route path="/complete-profile" element={<ProfileComplete />} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/profile" element={<Profile />} />
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
