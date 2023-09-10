import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getMe } from "../redux/authReducer";

const Layout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar isOpen={true} />
        <main className="flex-1 bg-slate-50 p-2 flex justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
