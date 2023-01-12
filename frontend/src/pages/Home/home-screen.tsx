import "./home-style.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/pagination";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="container-home">
      <div className="container-header">
        <h1>Home</h1>
        <div className="container-menu">
          <div className="item-menu" onClick={() => navigate("/home")}>
            <label>Home</label>
          </div>
          <div className="item-menu">
            <label>Cat</label>
          </div>
          <div className="item-menu">
            <label>Dog</label>
          </div>
          <div className="item-menu">
            <label>Client</label>
          </div>
        </div>
      </div>
      <div className="container-body">
        <div className="container-list">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
