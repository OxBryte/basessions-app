import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/Auth";
import Layout from "./components/layouts/layout";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login/" element={<AuthLogin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
