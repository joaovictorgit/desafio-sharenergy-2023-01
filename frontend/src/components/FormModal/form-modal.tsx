import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import "./form-modal-style.css";
import api from "../../service/api";
import { store } from "../../store/store";
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

const FormModal = (props: any) => {
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { closeModal, modalIsOpen, getAllClients } = props;
  const [client, setClient]: any = useState([]);
  const [id, setId] = useState("");
  const [nameUp, setNameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [phoneUp, setPhoneUp] = useState("");
  const [cpfUp, setCpfUp] = useState("");
  const [cityUp, setCityUp] = useState("");
  const [districtUp, setDistrictUp] = useState("");
  const [numberHouseUp, setNumberHouseUp] = useState("");
  console.log(store.getState().name);
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
          //console.log(response.data._id);
          setClient(response.data);
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

  useEffect(() => {
    let nameClient = store.getState().name;
    getClient(nameClient);
  }, []);

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
            store.dispatch({ type: "ADD-NAME", name: "" });
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
  );
};

export default FormModal;
