import { AiFillDelete } from "react-icons/ai";
import FormModal from "../FormModal/form-modal";
import { store } from "../../store/store";
import "./list-clients-style.css";

const ListClients = (props: any) => {
  const {
    clients,
    deleteClient,
    openModal,
    closeModal,
    modalIsOpen,
    getAllClients,
  } = props;

  return (
    <>
      <div className="container-list-clients">
        <h2>List Clients</h2>
        <div className="container-itens-clients">
          {clients.map((client: any) => (
            <div className="item-client" key={client._id}>
              <div className="item-personal">
                <strong
                  onClick={() => {
                    store.dispatch({ type: "ADD-NAME", name: client.name });
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
          ))}
        </div>
      </div>
      <FormModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        getAllClients={getAllClients}
      />
    </>
  );
};

export default ListClients;
