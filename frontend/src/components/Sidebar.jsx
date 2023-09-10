import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  AiOutlineBoxPlot,
  AiOutlineContacts,
  AiOutlineDashboard,
  AiOutlineLogout,
} from "react-icons/ai";

const menus = [
  {
    label: "User",
    submenus: [
      {
        label: "Dashboard",
        icon: <AiOutlineDashboard size={23} />,
        to: "/dashboard",
      },
      {
        label: "Produk",
        icon: <AiOutlineBoxPlot size={23} />,
        to: "/products",
      },
    ],
  },
  {
    label: "Admin",
    role: ["admin"],
    submenus: [
      { label: "User", icon: <AiOutlineContacts size={23} />, to: "/users" },
    ],
  },
];

const SubMenu = ({ submenu }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) => {
          const activeStyle = "bg-slate-50 border-t border-b";
          const style = `pl-6 py-2 flex items-center gap-3 pr-8 ${
            isActive ? activeStyle : "hover:bg-slate-100"
          }`;
          return style;
        }}
        to={submenu.to}
      >
        {submenu.icon}
        <span>{submenu.label}</span>
      </NavLink>
    </li>
  );
};

/**
 *
 * @param {object} props
 * @param {object} props.menu
 * @param {string} props.menu.label
 * @param {object[]} props.menu.submenus
 * @returns
 */
const Menu = ({ menu }) => {
  return (
    <li className="mb-8">
      <div className="pl-4 text-slate-400 pr-8">{menu.label}</div>
      <ul className="mb-2">
        {menu.submenus.map((submenu, i) => (
          <SubMenu submenu={submenu} key={i} />
        ))}
      </ul>
    </li>
  );
};

/**
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @returns
 */
const Sidebar = () => {
  const isOpen = useSelector((state) => state.sidebar.value);

  return (
    <aside
      className={`flex flex-col justify-between transition-all duration-300 pt-8 bg-white overflow-x-clip ${
        isOpen ? "w-40" : "w-0 text-transparent"
      }`}
    >
      <ul>
        {menus.map((menu, i) => (
          <Menu key={i} menu={menu} />
        ))}
      </ul>
      <button className="bg-slate-200 flex items-center h-10 mx-1 px-4 hover:bg-red-500 hover:text-white">
        <AiOutlineLogout size={23} />
        <span className="text-center w-full">Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;