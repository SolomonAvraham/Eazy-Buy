import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/userService";
import Cookies from "js-cookie";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
import Card from "../../features/card/Card";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

type UserCard = {
  name: string;
  email: string;
  address: string;
  userCreated: string;
};

const UserDetails = ({ name, email, address, userCreated }: UserCard) => {
  return (
    <>
      <h1 className="mb-8 text-5xl text-black">שלום, {name} .</h1>
      <div className="rounded-xl bg-white p-6 shadow-xl">
        <div className=" flex items-center justify-center text-8xl">
          <FaUserCircle />
        </div>
        <h2 className="mt-3  text-center text-3xl">פרטים משתמש</h2>
        <hr className="mx-auto mb-4  w-1/2 bg-black opacity-50" />
        <div className="grid grid-cols-2 gap-4 text-lg font-semibold">
          <div> שם מלא : {name}</div>
          <div>אימייל : {email}</div>
          <div> כתובת : {address}</div>
          <div> משתמש נוצר בתאריך : {userCreated}</div>
        </div>
      </div>
    </>
  );
};

export default function UserProfile() {
  const navigate = useNavigate();

  const navigateToTopPage = (path: string) => {
    navigate(path);
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getUser = () => {
    const userValue = Cookies.get("user");
    if (userValue) {
      const userId = JSON.parse(userValue) as string;
      return getUserById(userId);
    } else {
      throw new Error();
    }
  };

  const { data, isLoading, error } = useQuery(["getUserById"], getUser);

  const cart = data?.cart[0] ? data.cart : null;
  const lastPurchased = data?.productsPurchased[0]
    ? data.productsPurchased
    : null;

  if (isLoading)
    return (
      <div className=" flex h-screen items-center justify-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  if (error)
    return (
      <div className=" flex h-screen flex-col items-center justify-center text-center ">
        <h1 className="mt-10  text-7xl">משתמש לא מחובר למערכת !</h1>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-lg border-2 border-sky-800 bg-stone-900 p-3 px-5 text-slate-100 hover:bg-stone-600 hover:text-black"
        >
          להתחברות לחץ כאן
        </button>
      </div>
    );

  return (
    <div className="min-h-screen   bg-gray-100">
      <div className="  mt-24 flex flex-col items-center justify-center">
        <UserDetails
          name={data.fullName}
          email={data.email}
          address={data.address}
          userCreated={data.createdAt}
        />
        <h2
          className={`${
            cart
              ? "mt-16  flex items-center gap-10 rounded-2xl bg-gray-600 bg-opacity-10 px-10  py-1 text-center  text-4xl font-medium  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] md:text-6xl"
              : "hidden"
          }`}
        >
          עגלה
          <div className="py-8 text-5xl">
            <FaShoppingCart />
          </div>
        </h2>
        <div className="grid grid-cols-3 gap-10  p-10 pb-24">
          {cart?.map((product: any, index: number) => {
            return (
              <Card
                // onClick={() => ShowProductById(product.product.id)}
                // cart={() => cart(product.product)}
                title={product.product.name}
                image={product.product.images[0]}
                price={product.unit_amount / 100}
                info={product.product.description}
                key={index}
              />
            );
          })}
        </div>
        {!cart && (
          <div className=" flex flex-col items-center justify-center py-16  ">
            <h1 className="mt-10  text-3xl">
              העגלה שלך ריקה, לרשימת המוצרים שלנו
              <button
                onClick={() => navigate("/products")}
                className="mr-6 rounded-lg border-2 border-sky-800 bg-stone-900 p-1 px-5 text-slate-100 hover:bg-stone-600 hover:text-black"
              >
                לחץ כאן!
              </button>
            </h1>
            <div className="py-8 text-5xl">
              <FaShoppingCart />
            </div>
          </div>
        )}

        <h2
          className={`${
            lastPurchased
              ? "  flex items-center gap-10 rounded-2xl bg-gray-600 bg-opacity-10 px-10  py-1 text-center  text-4xl font-medium  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] md:text-4xl"
              : "hidden"
          }`}
        >
          פרטים שנכרשו{" "}
          <div className="py-5 text-5xl">
            <FaShoppingCart />
          </div>
        </h2>
        <div className="grid grid-cols-3 gap-10   p-5 pb-24">
          {lastPurchased?.map((product: any, index: number) => {
            return (
              <Card
                // onClick={() => ShowProductById(product.product.id)}
                // cart={() => cart(product.product)}
                title={product.product.name}
                image={product.product.images[0]}
                price={product.unit_amount / 100}
                info={product.product.description}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className=" flex justify-center py-24 text-9xl ">
        <img
          onClick={() => navigateToTopPage("/")}
          className=" w-24  cursor-pointer rounded-full bg-white p-5 drop-shadow-2xl hover:bg-slate-400"
          src="/icons/icon.png"
          alt="logo"
        />
      </div>
    </div>
  );
}
