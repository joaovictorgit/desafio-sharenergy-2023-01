import { Routes, Route } from "react-router-dom";
import CatScreen from "../pages/Cat/cat-screen";
import ClientScreen from "../pages/Client/client-screen";
import DogScreen from "../pages/Dog/dog-screen";
import HomeScreen from "../pages/Home/home-screen";
import LoginScreen from "../pages/Login/login-screen";

const Path = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/cat" element={<CatScreen />} />
        <Route path="/dog" element={<DogScreen />} />
        <Route path="/client" element={<ClientScreen />} />
      </Routes>
    </>
  );
};

export default Path;
