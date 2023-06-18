import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-black sticky top-0 z-50 shadow-xl ">
      <nav className=" flex items-center justify-between px-7 py-2">
        <div className="flex justify-evenly gap-4 md:gap-2 text-4xl md:text-3xl">
          <div className="text-white hover:text-slate-300 cursor-pointer">
            <FaShoppingCart />
          </div>
          <div className="flex gap-2  cursor-pointer">
            <span className="  text-white hover:text-slate-300 ">
              <FaUserCircle />
            </span>
            <span className=" text-white hover:text-slate-300 mt-3 text-sm">
התחבר / הירשם            </span>
          </div>
        </div>

        <div className=" flex items-center  gap-2 ">
          <h3 className="sm:hidden md:block cursor-pointer text-white hover:text-slate-300">
            <a href="/"> Eazy-Buy</a>
          </h3>
          <a href="/">
            <img
              className=" cursor-pointer w-12 drop-shadow-2xl bg-white hover:bg-slate-400 p-2 rounded-3xl"
              src="/icons/icon.png"
              alt="logo"
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
