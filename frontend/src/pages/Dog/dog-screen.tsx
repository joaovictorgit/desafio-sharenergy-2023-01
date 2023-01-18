import axios from "axios";
import { useState } from "react";
import Menu from "../../components/Menu/menu";
import "./dog-style.css";

const DogScreen = () => {
  const [image, setImage]: any = useState();
  const [video, setVideo] = useState(false);

  const submitImage = (e: any) => {
    getImage();
    e.preventDefault();
  };

  const getImage = () => {
    try {
      axios({
        method: "get",
        url: `https://random.dog/`,
        withCredentials: false,
        params: {
          access_token: "searchDog",
        },
      }).then((res: any) => {
        if (video === true) {
          setVideo(false);
        }
        let text: string = res.data;
        let position = text.search(`id="dog-img"`);
        let aux: string = "";
        for (let i = position; text[i] !== "/"; i++) {
          aux += text[i];
        }
        let res_aux = aux.split(" ");
        let source_image = "";
        if (res_aux.length === 3) {
          for (let i = 5; res_aux[1][i] !== `"`; i++) {
            source_image += res_aux[1][i];
          }
          setImage(source_image);
        } else {
          for (let i = 5; res_aux[28][i] !== `"`; i++) {
            source_image += res_aux[28][i];
          }
          setImage(source_image);
          setVideo(true);
        }
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="container-dog">
      <Menu />
      <div className="container-body-dog">
        <h1>Dog</h1>
        {image && video === false ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            width="200px"
            height="400px"
            id="dog-img"
            src={`https://random.dog/${image}`}
          />
        ) : (
          <video width="200px" height="400px" autoPlay={true}>
            <source src={`https://random.dog/${image}`} />
          </video>
        )}
        <form onSubmit={submitImage} className="form-dog">
          <button>Refresh</button>
        </form>
      </div>
    </div>
  );
};

export default DogScreen;
