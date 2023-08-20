import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Favourite from "./pages/Favourite";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const storedLogin = localStorage.getItem("userLogin");
  const initialLoginState = storedLogin ? JSON.parse(storedLogin) : null;
  const [isLogin, setIsLogin] = useState(initialLoginState);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <HomePage
              isLogin={isLogin}
              search={search}
              setSearch={setSearch}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/favourite"
          element={
            <Favourite
              search={search}
              setSearch={setSearch}
              loading={loading}
              setLoading={setLoading}
              isLogin={isLogin}
            />
          }
        />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
