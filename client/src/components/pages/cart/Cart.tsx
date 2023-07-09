import { useMutation, useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import Table from "../../features/table/Table";
import {
  deleteProductFromCart,
  purchaseProducts,
} from "../../../services/productsService";
import { useState } from "react";
import Cookies from "js-cookie";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { data, isError, isLoading, refetch } = useQuery(["user"]);

  const cart = data?.user.cart[0] ? data.user.cart : null;

  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>("");

  const deleteFromCart = useMutation(deleteProductFromCart);
  const purchaseFromCart = useMutation(purchaseProducts);

  const purchaseHandler = () => {
    const products = cart?.map((product) => {
      
      return {
        price: product.product.default_price,
        name: product.product.name,
        quantity: 1,
        amount: product.product.amount,
       
      };
    });
    purchaseFromCart.mutateAsync(products);
  };

  const handleRemove = async (id: string) => {
    setSelectedId(id);
    if (selectedId !== "") {
      const userValue = Cookies.get("user") as string;
      const userId: string = JSON.parse(userValue);

      const productId: string = selectedId;
      deleteFromCart.mutateAsync({ userId, productId });
    }
  };

  if (purchaseFromCart.isSuccess) {
    console.log(purchaseFromCart);
    window.location.href = purchaseFromCart.data.redirectUrl;
  }

  if (deleteFromCart.isSuccess) {
    refetch();
  }

  if (deleteFromCart.isError) {
    return (
      <div className="flex h-screen items-center justify-center text-6xl">
        <h1>תקלה! אנא נסה שנית.</h1>
      </div>
    );
  }

  return (
    <div className="flex    flex-col items-center justify-center bg-gray-200 py-10 ">
      {isError && (
        <div className=" flex h-screen items-center justify-center">
          <h1 className=" text-5xl">תקלה, אנא נסה שוב או מאוחר יותר...</h1>
        </div>
      )}
      <div className="  p-5   ">
        {deleteFromCart.isLoading ||
          (purchaseFromCart.isLoading && (
            <div className=" flex h-screen items-center justify-center">
              <ScaleLoader color="#657c78" height={30} width={30} />
            </div>
          ))}
        {cart ? (
          <div className=" flex flex-col items-center">
            <div className="pb-5 text-5xl">
              <FaShoppingCart />
            </div>
            <Table data={cart} onRemove={handleRemove} />
            <button
              onClick={purchaseHandler}
              className=" mt-6 rounded-2xl bg-[#000] px-5 py-2 text-lg font-bold text-white hover:bg-amber-500 hover:shadow-2xl"
            >
              רכישה
            </button>
          </div>
        ) : (
          <div className=" flex h-screen flex-col items-center justify-center text-center ">
            {isLoading ? (
              <div className=" flex h-screen items-center justify-center">
                <ScaleLoader color="#657c78" height={30} width={30} />
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
