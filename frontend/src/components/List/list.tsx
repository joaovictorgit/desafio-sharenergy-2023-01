import React from "react";
import { USERS_PER_PAGE } from "../../utils/constants";
import User from "../User/user";
import "./list-style.css";

const List = (props: any) => {
  const { users, page } = props;
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const selectedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <React.Fragment>
      <div className="container-users">
        {selectedUsers.map((user: any, index: number) => (
          <User key={index} {...user} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default List;
