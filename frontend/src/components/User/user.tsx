import React from "react";
import "./user-style.css";
const User = (props: any) => {
  const { name, picture, email, login, registered } = props;
  const { first, last } = name;
  const { large } = picture;
  const { username } = login;
  const { age } = registered;
  // a foto do usuário, nome completo, email, username e idade.
  return (
    <div className="user">
      <div className="container-image">
        <img src={large} alt={first} />
      </div>
      <div className="container-info">
        <div className="item">
          <strong>{first + " " + last} </strong>
        </div>
        <div className="item">
          <label>Idae: {age}</label>
        </div>
        <div className="item">
          <label>Username: {username}</label>
        </div>
        <div className="item">
          <label>Contato: {email}</label>
        </div>
      </div>
    </div>
  );
};

export default User;
