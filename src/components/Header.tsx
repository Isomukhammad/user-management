import { Link } from "react-router-dom";

import { JSX } from "react";

import { useAuth } from "@/context.tsx";

const Header = (): JSX.Element => {
  const { currentUser, removeUser } = useAuth();

  return (
    <header className={"rounded-b-xl bg-white shadow"}>
      <div
        className={
          "container mx-auto flex flex-row items-center justify-between px-5 py-4"
        }
      >
        <ul className={"flex"}>
          <li className="mr-6">
            <Link
              to={"/login"}
              className="block py-2 font-medium text-blue-500 hover:text-blue-800"
            >
              Login
            </Link>
          </li>
          <li className="mr-6">
            <Link
              to={"/register"}
              className="block py-2 font-medium text-blue-500 hover:text-blue-800"
            >
              Register
            </Link>
          </li>
          <li className="mr-6">
            <Link
              to={"/"}
              className="block py-2 font-medium text-blue-500 hover:text-blue-800"
            >
              Users
            </Link>
          </li>
        </ul>
        {currentUser && (
          <button
            type={"button"}
            title={"Logout"}
            onClick={() => removeUser()}
            className={
              "rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 active:bg-blue-700"
            }
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
