import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById } from "../../../services/userService";

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

  const [isOpen, setIsOpen] = useState<IsOpenState>({ isOpen: false });

  const navigate = useNavigate();
  const navigateToTopPage = (path: string) => {
    navigate(path);
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const queryClient = useQueryClient();

  const userLogin = async () => {
    const userValue = Cookies.get("user");
    const tokenValue = Cookies.get("token");
    if (userValue && tokenValue) {
      const userId = JSON.parse(userValue) as string;
      const token = JSON.parse(tokenValue) as string;
      const user = await getUserById(userId);
      setUserObj((prevUser) => ({
        ...prevUser,
        user: user,
        token: token,
      }));

      return { user, token };
    }
    return null;
  };

  const { data } = useQuery(["user"], userLogin);

  const cart = data?.user?.cart ?? null;

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

      queryClient.invalidateQueries(["user"]);
    }
  };

  const lastPath = window.location.href.split("/").pop();

  return (
    <header className="sticky top-0 z-50 rounded-e-full bg-black shadow-xl">
      <nav className="flex items-center justify-between px-7 py-2">
        <div className="flex justify-evenly gap-4 text-4xl md:gap-2 md:text-4xl">
          <div
            onClick={() => navigateToTopPage("/cart")}
            className={`${
              !userObj.user?.cart
                ? "cursor-pointer text-white hover:text-slate-300"
                : "cursor-pointer text-amber-300 hover:text-amber-200"
            }`}
          >
            {cart && (
              <div
                className={`${
                  cart.length
                    ? "absolute right-4 top-6 h-5 w-5 animate-bounce rounded-2xl bg-black outline-dotted outline-1 outline-white"
                    : "absolute right-4 top-6 h-5 w-5 rounded-2xl bg-black outline-dotted outline-1 outline-white"
                }`}
              >
                <div className="text-center text-sm font-thin text-white">
                  {cart.length}
                </div>
              </div>
            )}
            <FaShoppingCart />
          </div>
          <div className="flex gap-2">
            <span
              onClick={() => setIsOpen((prev) => ({ isOpen: !prev.isOpen }))}
              className={`${
                !userObj.user?.fullName
                  ? "cursor-pointer text-white hover:text-slate-300"
                  : "cursor-pointer text-amber-300 hover:text-amber-200"
              } ${isOpen.isOpen && "scale-125 text-amber-200"}`}
            >
              <FaUserCircle />
            </span>
            <div className="text-sm text-white md:mt-3">
              {userObj.user && (
                <span className="hidden cursor-default font-thin md:block">
                  שלום, {userObj.user?.fullName}.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h3
            onClick={() => navigateToTopPage("/")}
            className="font-one cursor-pointer text-white hover:text-slate-300 sm:hidden md:block"
          >
            Eazy-Buy
          </h3>
          <img
            onClick={() => navigateToTopPage("/")}
            className="w-12 cursor-pointer rounded-3xl bg-white p-2 drop-shadow-2xl hover:bg-slate-400"
            src="/icons/icon.png"
            alt="logo"
          />
        </div>
      </nav>
      {!userObj.user ? (
        <div
          className={
            !isOpen.isOpen
              ? "max-h-0"
              : "top-18 absolute flex h-96 w-full flex-col items-center justify-center gap-5 border-2 border-black border-opacity-10 bg-slate-300 transition-all delay-75 duration-150 ease-in-out md:right-1 md:h-fit md:w-72 md:rounded-b-2xl md:p-10"
          }
        >
          {isOpen.isOpen && (
            <>
              <div className="text-sm md:mt-3">
                {!userObj.user && (
                  <div className="flex flex-col gap-5 p-1 text-2xl tracking-widest md:mt-1 md:p-0 md:text-xs">
                    {[
                      { route: "/login", name: "התחבר" },
                      { route: "/signup", name: "הירשם" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          navigateToTopPage(item.route);
                          setIsOpen((prev) => ({ isOpen: false }));
                        }}
                        className="cursor-pointer text-xl font-bold hover:text-slate-600"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className={
            !isOpen.isOpen
              ? "max-h-0"
              : "top-18 absolute flex h-96 w-full flex-col items-center justify-center gap-5 border-2 border-black border-opacity-10 bg-slate-300 transition-all delay-75 duration-150 ease-in-out md:right-1 md:h-fit md:w-72 md:rounded-b-2xl md:p-10"
          }
        >
          {isOpen.isOpen && (
            <>
              <span className="block text-center cursor-default text-3xl font-bold md:hidden">
                שלום, {userObj.user?.fullName}.
                <hr className="mt-2 h-1 bg-black bg-opacity-10" />
              </span>
              {[
                { route: "/userProfile", name: "פרופיל" },
                { onclick: userSignOut, name: "יציאה" },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={
                    item.onclick
                      ? () => {
                          item.onclick();
                          setIsOpen((prev) => ({ isOpen: false }));
                        }
                      : () => {
                          navigateToTopPage(item.route);
                          setIsOpen((prev) => ({ isOpen: false }));
                        }
                  }
                  className="mt-5 cursor-pointer text-4xl font-bold hover:text-slate-600 md:text-xl"
                >
                  {item.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}
      <div className="absolute left-16 right-16 top-16 -z-10 flex justify-center md:left-28 md:right-28 md:gap-1">
        {[
          { route: "products", name: "מוצרים" },
          { route: "about", name: "קצת עלינו" },
          { route: "contact", name: "צור קשר" },
        ].map((element) => (
          <div
            key={element.name}
            onClick={() => navigateToTopPage(`/${element.route}`)}
            className={`${
              lastPath === element.route &&
              "bg-slate-400 hover:text-slate-900"
            } cursor-pointer rounded-b-3xl border-b-2 border-black bg-black px-3 py-3 text-lg font-semibold text-white hover:text-slate-400 md:px-5 md:py-2`}
          >
            {element.name}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
