import { Routes, Route } from "react-router-dom";
import HomeScreen from "../pages/Home/home-screen";
import LoginScreen from "../pages/Login/login-screen";

const Path = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </>
  );
};

export default Path;
