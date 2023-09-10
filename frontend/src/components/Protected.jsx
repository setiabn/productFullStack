import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user?.role !== "admin") <Navigate to={"/dashboard"} />;

  return children;
};

export default Protected;
