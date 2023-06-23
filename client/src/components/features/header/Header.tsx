import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import userStore from "../../../store/userStore";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";

const Header = () => {
  type UserState = {
    user: string;
    token: string;
  };

  type IsOpenState = {
    isOpen: boolean;
  };

  const [userObj, setUserObj] = useState<UserState>({
    user: "",
    token: "",
  });

  const [isOpen, setIsOpen] = useState<IsOpenState>(false);

  const navigate = useNavigate();

  const loginQuery = useQuery<UserState[], Error>({
    queryKey: ["user"],
    queryFn: () => {
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
        return userObj;
      }
      return null;
    },
  }); 

  const userSignOut = () => {
    const userValue = Cookies.get("user");
    if (userValue) {
      setUserObj((prevUser) => ({
        ...prevUser,
        user: "",
        token: "",
      }));
      Cookies.remove("user");
      Cookies.remove("token");
    }
  };

  return (
    <header className="bg-black sticky top-0 z-50 shadow-xl ">
      <nav className=" flex items-center justify-between px-7 py-2">
        <div className="flex justify-evenly gap-4 md:gap-2 text-4xl md:text-3xl">
          <div className="text-white hover:text-slate-300 cursor-pointer">
            <FaShoppingCart />
          </div>
          <div className="flex gap-2 ">
            <span
              onClick={() => setIsOpen((isOpen: IsOpenState) => !isOpen)}
              className={`${
                !userObj.user?.fullName
                  ? " text-white hover:text-slate-300  cursor-pointer"
                  : " text-amber-300 hover:text-amber-200  cursor-pointer"
              } `}
            >
              <FaUserCircle />
            </span>
            <div className=" text-white md:mt-3 text-sm">
              {!userObj.user ? (
                <div className=" text-2xl p-1 md:p-0  tracking-widest md:text-xs md:mt-1">
                  <span
                    onClick={() => {
                      navigate("/login");
                    }}
                    className=" font-bold hover:text-slate-300 cursor-pointer"
                  >
                    התחבר
                  </span>{" "}
                  /{" "}
                  <span
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className=" font-bold hover:text-slate-300 cursor-pointer"
                  >
                    הירשם
                  </span>
                </div>
              ) : loginQuery.isLoading ? (
                <div className=" h-screen flex justify-center items-center">
                  <ScaleLoader color="#657c78" height={10} width={5} />
                </div>
              ) : (
                <span className=" font-thin cursor-default">
                  שלום, {userObj.user?.fullName}.
                </span>
              )}
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
      {userObj.user && (
        <div
          className={
            !isOpen
              ? " hidden"
              : "flex flex-col items-center justify-center gap-5 w-full h-96  absolute top-18 md:right-1 md:h-fit md:p-10 md:w-72 md:rounded-b-2xl bg-slate-300 border-2 border-black border-opacity-10"
          }
        >
          {userObj.user && (
            <>
              <div
                onClick={() => {
                  navigate("/userProfile");
                  setIsOpen(false);
                }}
                className=" cursor-pointer font-bold text-4xl hover:bg-black hover:w-72 text-center  p-1 hover:text-white"
              >
                פרופיל
              </div>
              <div
                className=" text-2xl font-bold cursor-pointer hover:text-white"
                onClick={userSignOut}
              >
                יציאה
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
