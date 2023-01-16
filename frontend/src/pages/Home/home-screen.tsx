import "./home-style.css";
import Pagination from "../../components/Pagination/pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { USERS_PER_PAGE } from "../../utils/constants";
import List from "../../components/List/list";
import Search from "../../components/SearchBar/search";
import User from "../../components/User/user";
import Menu from "../../components/Menu/menu";

const HomeScreen = (props: any) => {
  const totalUsersSearch = 40;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState<any>();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://randomuser.me/api/?page=1&results=${totalUsersSearch}`)
      .then((response: any) => {
        const res = response.data.results;
        setUsers(res);
        setTotalPages(Math.ceil(res.length / USERS_PER_PAGE));
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (e: any) => {
    e.preventDefault();
    const res = users.find(
      (user: any) =>
        user.email === search ||
        user.name.first === search ||
        user.name.last === search ||
        user.name.first + " " + user.name.last === search ||
        user.login.username === search
    );
    setUserSearch(res);
  };

  const handleClick = (value: number) => {
    setPage(value);
  };

  return (
    <div className="container-home">
      <Menu />
      <div className="container-body">
        <h1>User List</h1>
        <div className="container-header-body">
          <Search setSearch={setSearch} onSearch={onSearch} />
        </div>
        <div className="container-search-user">
          {userSearch ? <User {...userSearch} /> : null}
        </div>
        <div className="container-list">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <React.Fragment>
              <List users={users} page={page} />
              <Pagination
                totalPages={totalPages}
                handleClick={handleClick}
                page={page}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
