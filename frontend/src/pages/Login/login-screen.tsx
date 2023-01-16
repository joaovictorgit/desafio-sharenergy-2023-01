import axios, { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./login-style.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  localStorage.setItem("@name", JSON.stringify(""));

  const logar = (e: any): void => {
    e.preventDefault();
    try {
      api
        .post("/users/login", {
          username: username,
          password: password,
        })
        .then((response: AxiosResponse) => {
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
            placeholder="Enter your username"
            onChange={(e: any) => onChangeData(e, "username")}
          />
        </div>
        <div className="itens">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="textInput"
            onChange={(e: any) => onChangeData(e, "password")}
          />
        </div>
        <div className="itens">
          <div className="item-check">
            <input type="checkbox" name="Remember me" />
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
