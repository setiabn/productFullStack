import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getMe } from "../redux/authReducer";

const Layout = () => {
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-black opacity-40">
        Loading...
      </div>
    );

  if (isSuccess && !user) return <Navigate to={"/login"} />;

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
