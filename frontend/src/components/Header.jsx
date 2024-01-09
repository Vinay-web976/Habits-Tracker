import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../config";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const [navItems, setNavItems] = useState(menuItems);
  const { userId, setUserId } = useContext(AuthContext);
  let currentPath = useLocation().pathname;

  useEffect(() => {
    handleActiveStatus(currentPath);
  }, []);
  const getNavClasses = (navItem) => {
    const inActiveClasses =
      "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
    const activeClasses =
      "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";
    return navItem.isActive ? activeClasses : inActiveClasses;
  };

  const handleActiveStatus = (href) => {
    let items = [...navItems];
    items.forEach((nav) => {
      if (href === nav.href) {
        nav.isActive = true;
      } else {
        nav.isActive = false;
      }
    });
    setNavItems(items);
  };

  const handleLogout = () => {
    sessionStorage.setItem("user-id", null);
    setUserId(null);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Habithub Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HabitHub
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map((item) => (
              <li key={item.name} onClick={() => handleActiveStatus(item.href)}>
                <Link to={item.href} className={getNavClasses(item)}>
                  {item.name}
                </Link>
              </li>
            ))}
            {userId && (
              <li
                className={getNavClasses({ isActive: false })}
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
