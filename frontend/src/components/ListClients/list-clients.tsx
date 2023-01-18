import { AiFillDelete } from "react-icons/ai";

import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import "./list-clients-style.css";
import "./form-modal-style.css";
import api from "../../service/api";
import { useRef, useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ListClients = (props: any) => {
  const {
    clients,
    deleteClient,
    openModal,
    closeModal,
    modalIsOpen,
    getAllClients,
  } = props;
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [id, setId] = useState();
  const [nameUp, setNameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [phoneUp, setPhoneUp] = useState("");
  const [cpfUp, setCpfUp] = useState("");
  const [cityUp, setCityUp] = useState("");
  const [districtUp, setDistrictUp] = useState("");
  const [numberHouseUp, setNumberHouseUp] = useState("");

  const tokenUser = JSON.parse(localStorage.getItem("@token") || "");

  const getClient = async (nameClient: string) => {
    try {
      await api
        .get(`/clients/${nameClient}`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((response: any) => {
          setId(response.data._id);
          setNameUp(response.data.name);
          setEmailUp(response.data.email);
          setCpfUp(response.data.cpf);
          setPhoneUp(response.data.phone);
          setCityUp(response.data.address.city);
          setNumberHouseUp(response.data.address.number);
          setDistrictUp(response.data.address.district);
        });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const updateClient = (e: any) => {
    e.preventDefault();
    try {
      //console.log(typeof client.name);
      api
        .patch(
          `/clients/${id}`,
          {
            name: nameUp,
            email: emailUp,
            phone: phoneUp,
            address: {
              number: parseInt(numberHouseUp),
              district: districtUp,
              city: cityUp,
            },
            cpfUp,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenUser}`,
            },
          }
        )
        .then((response: any) => {
          getAllClients();
          closeModal();
        });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-list-clients">
        <h2>List Clients</h2>
        <div className="container-itens-clients">
          {clients.map((client: any) => (
            <div key={client._id}>
              <div className="item-client">
                <div className="item-personal">
                  <strong
                    onClick={() => {
                      getClient(client.name);
                      //store.dispatch({ type: "ADD-CLIENT", client: client });
                      openModal(true);
                    }}
                  >
                    {client.name}
                  </strong>
                  <label>{client.email}</label>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => deleteClient(client._id)}
                >
                  <AiFillDelete size={15} color="red" className="icon-delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AiFillCloseCircle
            size={15}
            onClick={() => {
              closeModal();
            }}
            className="icon-close"
          />
          <div className="container-form-modal">
            <h2>Client</h2>
            <form className="form-modal" onSubmit={updateClient} ref={formRef}>
              <label>Name: </label>
              <input
                type="text"
                value={nameUp}
                placeholder="Name Client"
                onChange={(e: any) => setNameUp(e.target.value)}
              />
              <label>Email: </label>
              <input
                type="email"
                value={emailUp}
                placeholder="teste@example.com"
                onChange={(e: any) => setEmailUp(e.target.value)}
              />
              <label>Phone: </label>
              <input
                type="text"
                value={phoneUp}
                placeholder="(00) 00000-0000"
                onChange={(e: any) => setPhoneUp(e.target.value)}
              />
              <label>Address: </label>
              <div className="address">
                <input
                  type="text"
                  className="disctrit"
                  placeholder="Street example"
                  value={districtUp}
                  onChange={(e: any) => setDistrictUp(e.target.value)}
                />
                <input
                  type="text"
                  className="number"
                  placeholder="nº"
                  value={numberHouseUp}
                  onChange={(e: any) => setNumberHouseUp(e.target.value)}
                />
              </div>
              <label>City:</label>
              <input
                type="text"
                value={cityUp}
                placeholder="Fortaleza"
                onChange={(e: any) => setCityUp(e.target.value)}
              />
              <label>CPF: </label>
              <input
                type="text"
                value={cpfUp}
                placeholder="000.000.000-00"
                onChange={(e: any) => setCpfUp(e.target.value)}
              />
              <button>Update data Client</button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ListClients;
