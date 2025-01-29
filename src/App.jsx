import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLogin from "./pages/Auth";
import Layout from "./components/layouts/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AuthLogin />} />
        </Route>
        {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
