import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex items-center justify-center">
      <p className="text-2xl">Selamat datang,</p>
      <p className="ml-2 text-2xl font-bold">{user.name}</p>
    </div>
  );
};

export default Dashboard;
