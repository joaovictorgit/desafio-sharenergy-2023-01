import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Menu from "../../components/Menu/menu";
import "./cat-style.css";
import https from "https";

const CatScreen = () => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState();

  const submitImage = (e: any) => {
    getImage();
    setStatus("");
    e.preventDefault();
  };

  const getImage = () => {
    try {
      fetch(`https://http.cat/${status}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Access-Control-Allow-Origin": `https://http.cat/`,
        },
      }).then((res: any) => {
        //setImage(res.data);
        console.log(res.data);
        //document.getElementsByClassName("image-cat");
      });
    } catch (error: unknown) {
      console.log(error);
    }
    /*
    var invocation = new XMLHttpRequest();
    var url = "https://http.cat/100";
    if (invocation) {
      invocation.open("GET", url, true);
      invocation.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log("foi");
        }
      };
      invocation.send();
    }*/
  };

  return (
    <div className="container-cat">
      <Menu />
      <div className="container-body-cat">
        <h1>Enter status code</h1>
        {image ? <h1>OI</h1> : null}
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
