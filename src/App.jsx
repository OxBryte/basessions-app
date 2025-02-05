import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/Auth";
import Layout from "./components/layouts/layout";
import Home from "./pages/Home";
import ProfileComplete from "./components/features/auth/ProfileComplete";
import Profile from "./pages/Profile";
import UploadVideo from "./components/features/UploadVideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/finish" element={<ProfileComplete />} />
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
