import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const ActionButton = ({ id }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-6">
      <button onClick={() => console.log(id)}>
        <AiOutlineEdit size={20} className="text-blue-800" />
      </button>
      <button onClick={() => console.log(id)}>
        <AiOutlineDelete size={20} className="text-red-600" />
      </button>
    </div>
  );
};

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((resp) => {
        setUsers(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const headers = ["#", "Nama", "Role", "Aksi"];
  const rows = users.map((user, i) => [
    i + 1,
    user.name,
    user.role,
    <ActionButton key={i} id={user.uuid} />,
  ]);

  return (
    <div className="flex-1 mx-4 my-4 md:m-12 rounded bg-white px-4 py-4 md:px-12 md:py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl mb-4">Daftar User</h1>
        <div className="w-full sm:w-fit">
          <button className="ms-auto bg-green-700 hover:bg-green-600 text-white px-4 py-2 flex items-center gap-2">
            <AiOutlinePlus />
            <span>Tambah</span>
          </button>
        </div>
      </div>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default UserPage;
