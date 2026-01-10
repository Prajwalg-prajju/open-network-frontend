import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import PublicProfile from "./pages/PublicProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />                {/* Home page */}
        <Route path="/u/:userId" element={<PublicProfile />} /> {/* Profile page */}
        <Route path="*" element={<div>Page Not Found</div>} /> {/* Fallback */}
      </Routes>
    </BrowserRouter>
  );
}
