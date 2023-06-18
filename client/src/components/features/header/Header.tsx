import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Header = () => {
  type UserState = {
    user: string;
    token: string;
  };
  const [userObj, setUserObj] = useState<UserState>({
    user: "",
    token: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userValue = Cookies.get("user");
    const tokenValue = Cookies.get("token");
    if (userValue && tokenValue) {
      const user = JSON.parse(userValue) as string;
      const token = JSON.parse(tokenValue) as string;
      setUserObj((prevUser) => ({
        ...prevUser,
        user: user,
        token: token,
      }));
    }
  }, []);

  console.log(userObj);

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
            <div
              onClick={() => navigate("/userAuth")}
              className=" text-white hover:text-slate-300 mt-3 text-sm"
            >
              {!userObj ? " התחבר / הירשם " : `שלום ${userObj.user?.fullName}`}
            </div>
          </div>
        </div>

        <div className=" flex items-center  gap-2 ">
          <h3
            onClick={() => navigate("/")}
            className="sm:hidden md:block cursor-pointer text-white hover:text-slate-300"
          >
            Eazy-Buy
          </h3>
          <img
            onClick={() => navigate("/")}
            className=" cursor-pointer w-12 drop-shadow-2xl bg-white hover:bg-slate-400 p-2 rounded-3xl"
            src="/icons/icon.png"
            alt="logo"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
