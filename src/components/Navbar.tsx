import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

interface ListItemProps {
  NavLink: string;
  children: React.ReactNode; // Definimos el tipo de children como React.ReactNode
}

const ListItem: React.FC<ListItemProps> = ({ children, NavLink }) => {
  return (
    <Link
      className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
      to={NavLink}
    >
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Router>
      <header
        className={`left-0 top-0 z-20 flex justify-center w-full items-center`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <a href="/#" className="block w-full py-5">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-full hidden dark:block"
                />
              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={` ${
                    open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                </button>
                <nav
                  id="navbarCollapse"
                  className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                    !open && "hidden"
                  } `}
                >
                  <ul className="block lg:flex">
                    <ListItem NavLink="/">Home</ListItem>
                    <ListItem NavLink="/products">Products</ListItem>
                    <ListItem NavLink="/categories">Categories</ListItem>
                  </ul>
                </nav>
              </div>
              <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                <a
                  href="/#"
                  className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
                >
                  Sign in
                </a>

                <a
                  href="/#"
                  className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Router>
  );
};

export default Navbar;
