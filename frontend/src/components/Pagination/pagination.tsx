import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import List from "../List/list";

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(8);

  const getDataApiRandom = async () => {
    try {
      setLoading(true);
      await axios
        .get("https://randomuser.me/api/?results=40")
        .then((response: any) => {
          setUsers(response.data.results);
          setLoading(false);
        });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataApiRandom();
  }, []);

  return (
    <div className="container-pagination">
      <h1 className="container-title">Lista de Usuários</h1>
      <List users={users} />
    </div>
  );
};

export default Pagination;
