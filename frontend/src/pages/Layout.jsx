import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getMe } from "../redux/authReducer";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    // dispatch(reset());
    dispatch(getMe());
    if (!user) navigate("/login");
  }, [dispatch, user, navigate]);

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="overflow-x-hidden flex flex-col w-screen sm:w-full">
        <Header />
        <div className="bg-slate-50 flex-1 flex w-screen sm:w-full">
          <main className="flex-1 rounded-lg bg-white mx-4 my-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
