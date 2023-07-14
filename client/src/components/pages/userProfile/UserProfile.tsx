import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUserById } from "../../../services/userService";
import Cookies from "js-cookie";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
import Card from "../../features/card/Card";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { deleteProductFromCart } from "../../../services/productsService";

type UserCard = {
  name: string;
  email: string;
  address: string;
  userCreated: string;
};

const UserDetails = ({ name, email, address, userCreated }: UserCard) => {
  return (
    <>
      <h1 className="mb-8 text-center text-3xl text-black md:text-5xl">
        שלום, {name} .
      </h1>
      <div className="rounded-3xl bg-white p-6 shadow-xl md:rounded-xl">
        <div className=" flex items-center justify-center text-8xl">
          <FaUserCircle />
        </div>
        <h2 className="mt-3  text-center text-3xl">פרטי משתמש</h2>
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
  const queryClient = useQueryClient();
  const user = useQuery(["user"]);

  const cart = data?.cart[0] ? data.cart : null;
  const lastPurchased = data?.productsPurchased[0]
    ? data.productsPurchased
    : null;

  const removeBtn = (product: string[]) => {
    const cart = user.data?.user.cart[0] ? user.data?.user.cart : null;

    const productExist = cart?.find((prod) => prod.id === product.id);

    if (!productExist) return true;
    return false;
  };

  const deleteFromCart = useMutation(deleteProductFromCart, {
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
      queryClient.refetchQueries(["getUserById"]);
    },
  });

  const handleRemove = (product: string[]) => {
    const userValue = Cookies.get("user") as string;
    const userId: string = JSON.parse(userValue);
    // const cart = user.data?.user.cart[0] ? user.data?.user.cart : null;

    if (userId) {
      const productId: string = product?.product?.id;
      return deleteFromCart.mutate({ userId, productId });
    } else {
      alert("תקלה , אנא נסו שוב.");
    }
  };

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
      <div className=" mt-24 flex flex-col items-center justify-center px-2">
        <UserDetails
          name={data.fullName}
          email={data.email}
          address={data.address}
          userCreated={data.createdAt}
        />
        <h2
          className={`${
            cart
              ? "mt-16  flex items-center gap-10 rounded-2xl bg-gray-600 bg-opacity-10 px-5 text-center  text-3xl font-medium  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]  md:px-10 md:py-1 md:text-6xl"
              : "hidden"
          }`}
        >
          עגלה
          <div className="py-8 text-5xl">
            <FaShoppingCart />
          </div>
        </h2>
        {deleteFromCart.isLoading && (
          <div className=" flex h-screen items-center justify-center">
            <ScaleLoader color="#657c78" height={30} width={30} />
          </div>
        )}
        <div className="grid gap-10 p-10  pb-24 md:grid-cols-3">
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
                removeAddBtn={true}
                removeBtn={removeBtn(product)}
                removeFromCart={() => handleRemove(product)}
              />
            );
          })}
        </div>
        {!cart && (
          <div className=" flex flex-col items-center justify-center md:py-16  ">
            <h1 className="mt-10 text-center text-xl  md:text-3xl">
              העגלה שלך ריקה, לרשימת המוצרים שלנו
              <button
                onClick={() => navigate("/products")}
                className="rounded-lg border-2   border-sky-800 bg-stone-900 p-1 text-slate-100 hover:bg-stone-600 hover:text-black sm:mx-auto sm:mt-3 md:mr-6 md:px-5"
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
          מוצרים שנכרשו{" "}
          <div className="py-5 md:text-5xl">
            <FaShoppingCart />
          </div>
        </h2>
        <div className="grid gap-10 p-5   pb-24 md:grid-cols-3">
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
                removeAddBtn={true}
                removeBtn={true}
              />
            );
          })}
        </div>
      </div>
      <div className="md:w-6/6   mx-auto  mb-24  w-1/12 cursor-default rounded-full bg-white p-1   text-6xl md:p-3    ">
        <img
          onClick={() => navigateToTopPage("/")}
          src="/icons/icon.png"
          alt="logo"
        />
      </div>
    </div>
  );
}
