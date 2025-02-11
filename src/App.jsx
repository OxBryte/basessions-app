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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/Signup" element={<AuthSignup />} />
        <Route path="/select" element={<SelectAccount />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/complete-profile" element={<ProfileComplete />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
