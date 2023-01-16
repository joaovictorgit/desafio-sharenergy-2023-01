import { useEffect, useState } from "react";
import FormClient from "../../components/FormClient/form-client";
import ListClients from "../../components/ListClients/list-clients";
import Menu from "../../components/Menu/menu";
import api from "../../service/api";
import "./client-style.css";

const ClientScreen = () => {
  const [clients, setClients] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const tokenUser = JSON.parse(localStorage.getItem("@token") || "");

  const getAllClients = () => {
    try {
      api
        .get("/clients", {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((response: any) => {
          setClients(response.data);
        });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteClient = (id: string) => {
    try {
      api
        .delete(`/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res: any) => {
          getAllClients();
        });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container-client">
      <Menu />
      <div className="container-body-client">
        <FormClient getAllClients={getAllClients} />
        <div className="container-list-clients">
          <ListClients
            clients={clients}
            deleteClient={deleteClient}
            openModal={openModal}
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
            getAllClients={getAllClients}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientScreen;
