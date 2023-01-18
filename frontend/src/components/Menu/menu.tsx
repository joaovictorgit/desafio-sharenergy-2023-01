import { useNavigate } from "react-router-dom";
import "./menu-style.css";

const Menu = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default Menu;
