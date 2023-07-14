import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import Table from "../../features/table/Table";
import {
  deleteProductFromCart,
  purchaseProducts,
} from "../../../services/productsService";
import Cookies from "js-cookie";
import { FaShoppingCart } from "react-icons/fa";
import {   useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { data, isError, isLoading } = useQuery(["user"]);

  const queryClient = useQueryClient();

  const cart = data?.user.cart[0] ? data?.user.cart : null;

  const navigate = useNavigate();

  const deleteFromCart = useMutation(deleteProductFromCart, {
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
  });

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

  const handleRemove = (id: string) => {
    if (id) {
      const userValue = Cookies.get("user") as string;
      const userId: string = JSON.parse(userValue);

      const productId: string = id;
      return deleteFromCart.mutate({ userId, productId });
    } else {
      alert("תקלה קטנה, אנא נסו שוב.");
    }
  };

  if (purchaseFromCart.isSuccess) {
    window.location.href = purchaseFromCart.data.redirectUrl;
  }

  if (deleteFromCart.isError) {
    return (
      <div className="flex h-screen items-center justify-center text-6xl">
        <h1>תקלה! אנא נסה שנית.</h1>
      </div>
    );
  }

  const cartPricesAfterDivide = cart?.map((price: number) => {
    console.log(price,"price")
    return price.unit_amount / 100;
  });
  const totalPrice = cartPricesAfterDivide?.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );

  return (
    <div className="flex  min-h-screen    flex-col items-center justify-center bg-gray-200 py-10 ">
      {isError && (
        <div className=" flex h-screen items-center justify-center">
          <h1 className=" text-5xl">תקלה, אנא נסה שוב או מאוחר יותר...</h1>
        </div>
      )}
      {purchaseFromCart.isLoading ? (
        <div className=" flex h-screen items-center justify-center">
          <ScaleLoader color="#657c78" height={30} width={30} />
        </div>
      ) : (
        <div className="  p-5   ">
          {cart ? (
            <div className=" flex flex-col items-center">
              <div className="py-20 text-5xl">
                <FaShoppingCart />
              </div>
              {deleteFromCart.isLoading ? (
                <div className=" flex h-screen items-center justify-center">
                  <ScaleLoader color="#657c78" height={30} width={30} />
                </div>
              ) : (
                <>
                  <Table
                    data={cart}
                    onRemove={handleRemove}
                    isRemoving={deleteFromCart.isLoading ? true : false}
                    num={0}
                  />
                  <div className="mt-16 flex flex-col gap-5  ">
                    <div className=" cursor-default rounded-2xl border border-black border-opacity-25 bg-gray-400 p-3 text-lg font-bold text-white shadow-2xl ">
                      סכום סופי :<span> {totalPrice.toLocaleString()} ₪</span>
                    </div>
                    <button
                      onClick={purchaseHandler}
                      className="rounded-2xl   bg-[#000] px-5 py-2 text-2xl font-bold text-white hover:bg-amber-500 hover:shadow-2xl"
                    >
                      רכישה
                    </button>
                  </div>
                </>
              )}
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
      )}
    </div>
  );
};

export default CartComponent;
