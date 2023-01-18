import { useState } from "react";
import Menu from "../../components/Menu/menu";
import "./cat-style.css";

const CatScreen = () => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");

  const submitImage = (e: any) => {
    e.preventDefault();
    setImage(`https://http.cat/${status}`);
  };

  return (
    <div className="container-cat">
      <Menu />
      <div className="container-body-cat">
        <h1>Enter status code</h1>

        {image ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img className="cat-img" src={image} />
        ) : null}
        <form onSubmit={submitImage} className="form-cat">
          <input
            type="text"
            placeholder="status code"
            onChange={(e: any) => setStatus(e.target.value)}
          />
          <button>Buscar</button>
        </form>
      </div>
    </div>
  );
};

export default CatScreen;
