import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Table from "../components/Table";

const ActionButton = ({ id }) => {
  return (
    <button onClick={() => console.log(id)}>
      <AiOutlineEdit size={20} className="text-blue-800" />
    </button>
  );
};

const headers = ["#", "Nama", "Role", "Aksi"];
const rows = [
  ["1", "Admin 23", "admin", <ActionButton key={1} id={"klcsklncjkcs"} />],
  ["2", "Admin 23", "admin", <ActionButton key={2} id={"klcsklncjkcs"} />],
  ["1", "Admin 23", "admin", <ActionButton key={3} id={"klcsklncjkcs"} />],
  ["1", "Admin 23", "admin", <ActionButton key={4} id={"klcsklncjkcs"} />],
  ["1", "Admin 23", "admin", <ActionButton key={5} id={"klcsklncjkcs"} />],
];

const UserPage = () => {
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
