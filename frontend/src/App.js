import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {user && <SearchBar onSearch={setSearchQuery} />}
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home searchQuery={searchQuery} /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
