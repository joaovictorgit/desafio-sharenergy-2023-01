import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import "./menu-style.css";

const Menu = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("@token", "");
    navigate("/");
  };

  return (
    <div className="container-header">
      <div className="container-menu">
        <div className="item-menu" onClick={() => navigate("/home")}>
          <label>Home</label>
        </div>
        <div className="item-menu" onClick={() => navigate("/cat")}>
          <label>Cat</label>
        </div>
        <div className="item-menu" onClick={() => navigate("/dog")}>
          <label>Dog</label>
        </div>
        <div className="item-menu" onClick={() => navigate("/client")}>
          <label>Client</label>
        </div>
      </div>
      <div className="icon-logout">
        <AiOutlineLogout size={20} className="logout" onClick={logout} />
      </div>
    </div>
  );
};

export default Menu;
