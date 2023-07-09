import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/userService";
import Cookies from "js-cookie";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
import Card from "../../features/card/Card";

export default function UserProfile() {
  const navigate = useNavigate();

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
        {data && (
          <>
            <h1 className="mb-8 text-5xl text-red-700">
              שלום, {data.fullName}.
            </h1>
            <div className="rounded-xl bg-white p-6 shadow-xl">
              <h2 className=" mb-4 text-center text-2xl">פרטים משתמש</h2>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="flex items-center">
                  <span className="mr-2 font-bold">שם מלא:</span>
                  {data.fullName}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-bold">אימייל:</span>
                  {data.email}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-bold">כתובת:</span>
                  {data.address}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-bold">משתמש נוצר בתאריך:</span>
                  {data.createdAt}
                </div>
              </div>
            </div>

            <h2 className=" mt-24 text-4xl">עגלה</h2>
            <div className=" grid  grid-cols-2 gap-5 p-10 ">
              {data ? (
                data.cart.map((product, index: number) => {
                  if (product) {
                    return (
                      <Card
                        // onClick={() => ShowProductById(product.product.id)}
                        // cart={() => cart(product.product)}
                        title={product.product.name}
                        image={product.product.images[0]}
                        price={product.unit_amount}
                        info={product.product.description}
                        key={index}
                      />
                    );
                  }
                })
              ) : (
                <div>gshsdghdsghdsgh</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
