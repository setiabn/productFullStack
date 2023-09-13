import {
  AiFillMoneyCollect,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../redux/sidebarReducer";

const Header = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.value);

  return (
    <header className="h-16 border-b flex items-center px-3 w-screen sm:w-full">
      <button onClick={() => dispatch(toggle())}>
        {isOpen ? (
          <AiOutlineMenuFold size={23} />
        ) : (
          <AiOutlineMenuUnfold size={23} />
        )}
      </button>
      <span className="flex-1 flex justify-center items-center">
        <AiFillMoneyCollect className="ml-4 text-green-700" size={32} />
        <span className="mx-4 text-2xl font-bold">Product Admin</span>
      </span>
    </header>
  );
};

export default Header;
