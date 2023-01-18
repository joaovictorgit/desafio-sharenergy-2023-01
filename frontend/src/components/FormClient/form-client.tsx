import { useRef, useState } from "react";
import api from "../../service/api";

const FormClient = (props: any) => {
  const { getAllClients } = props;
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [numberHouse, setNumberHouse] = useState("");

  const tokenUser = JSON.parse(localStorage.getItem("@token") || "");

  const addClient = (e: any) => {
    e.preventDefault();
    try {
      api
        .post(
          "/clients",
          {
            name,
            email,
            phone,
            address: {
              number: parseInt(numberHouse),
              district,
              city,
            },
            cpf,
          },
          {
            headers: {
              Authorization: `Bearer ${tokenUser}`,
            },
          }
        )
        .then((response: any) => {
          setName("");
          setEmail("");
          setPhone("");
          setCity("");
          setDistrict("");
          setNumberHouse("");
          setCpf("");
          getAllClients();
        });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="container-form-client">
      <h2>Add new Client</h2>
      <form onSubmit={addClient} ref={formRef}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          placeholder="Name Client"
          onChange={(e: any) => setName(e.target.value)}
        />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          placeholder="teste@example.com"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <label>Phone: </label>
        <input
          type="text"
          value={phone}
          placeholder="(00) 00000-0000"
          onChange={(e: any) => setPhone(e.target.value)}
        />
        <label>Address: </label>
        <div className="address">
          <input
            type="text"
            className="disctrit"
            placeholder="Street example"
            value={district}
            onChange={(e: any) => setDistrict(e.target.value)}
          />
          <input
            type="text"
            className="number"
            placeholder="nº"
            value={numberHouse}
            onChange={(e: any) => setNumberHouse(e.target.value)}
          />
        </div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          placeholder="Fortaleza"
          onChange={(e: any) => setCity(e.target.value)}
        />
        <label>CPF: </label>
        <input
          type="text"
          value={cpf}
          placeholder="000.000.000-00"
          onChange={(e: any) => setCpf(e.target.value)}
        />
        <button>Add Client</button>
      </form>
    </div>
  );
};

export default FormClient;
