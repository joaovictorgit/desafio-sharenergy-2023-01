import { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./login-style.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkedBox, setCheckedBox] = useState(false);
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  let usernameStorage: any = "";
  let passwordStorage: any = "";
  let checkedStorage: any = "";

  if (localStorage.getItem("@username") !== null) {
    usernameStorage = JSON.parse(localStorage.getItem("@username") || "");
    passwordStorage = JSON.parse(localStorage.getItem("@password") || "");
    checkedStorage = JSON.parse(localStorage.getItem("@checkbox") || "");
  }

  const logar = (e: any): void => {
    e.preventDefault();
    try {
      api
        .post("/users/login", {
          username: usernameStorage !== "" ? usernameStorage : username,
          password: passwordStorage !== "" ? passwordStorage : password,
        })
        .then((response: AxiosResponse) => {
          if (checkedBox) {
            localStorage.setItem("@username", JSON.stringify(username));
            localStorage.setItem("@password", JSON.stringify(password));
            localStorage.setItem("@checkbox", JSON.stringify(checkedBox));
          }
          localStorage.setItem("@token", JSON.stringify(response.data.token));
          navigate("/home");
        });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const onChangeData = (e: any, type: String) => {
    if (type === "username") {
      setUsername(e.target.value);
    }
    if (type === "password") {
      setPassword(e.target.value);
    }
    if (type === "remember") {
      setCheckedBox(true);
    }
  };

  return (
    <div className="container-login">
      <div className="title-store">
        <h1>Login</h1>
      </div>
      <form onSubmit={logar} ref={formRef} className="container-form">
        <div className="itens">
          <label>Username</label>
          <input
            type="text"
            className="textInput"
            value={
              localStorage.getItem("@username") === null
                ? username
                : usernameStorage
            }
            placeholder="Enter your username"
            onChange={(e: any) => onChangeData(e, "username")}
          />
        </div>
        <div className="itens">
          <label>Password</label>
          <input
            type="password"
            value={
              localStorage.getItem("@password") === null
                ? password
                : passwordStorage
            }
            placeholder="Enter your password"
            className="textInput"
            onChange={(e: any) => onChangeData(e, "password")}
          />
        </div>
        <div className="itens">
          <div className="item-check">
            <input
              type="checkbox"
              id="remember"
              name="Remember me"
              checked={checkedStorage ? checkedStorage !== "" : checkedBox}
              onChange={(e: any) => onChangeData(e, "remember")}
            />
            <label className="remember">Remember me</label>
          </div>
        </div>
        <div className="item-button">
          <button className="btn-login">Logar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
