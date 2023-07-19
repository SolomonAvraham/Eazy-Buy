import Card from "../../features/card/Card";
import Subscribe from "../../features/Subscribe/Subscribe";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  addProductToCart,
  getProducts,
  deleteProductFromCart,
} from "../../../services/productsService";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Home() {
  const { data, isLoading, isError } = useQuery(["products"], getProducts);
  const navigate = useNavigate();
  const navigateToTopPage = (path: string) => {
    navigate(path);
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  type Cart = {
    user: {
      cart: string[] & {
        id: string;
      };
    };
  };

  const user: UseQueryResult<Cart> = useQuery(["user"]);
  const queryClient = useQueryClient();

  const addToCart = useMutation(addProductToCart, {
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const cart = (product: string[]) => {
    const userValue = Cookies.get("user");

    if (!userValue) return alert("חייב להירשם לאתר כדי להוסיף מוצרים לעגלה.");

    const user: string = JSON.parse(userValue);

    return addToCart.mutate({ userId: user, product: product });
  };

  const ShowProductById = (id: string) => {
    if (id) {
      navigateToTopPage(`/product/${id}`);
      return;
    }
  };

  type Prod = {
    id: string;
  };

  const removeBtn = (product: Prod) => {
    const cart = user.data?.user.cart[0] ? user.data?.user.cart : null; //Property 'user' does not exist on type '{}'.ts(2339)

    const productExist = cart?.find((prod: any) => prod.id === product.id);

    if (!productExist) return true;
    return false;
  };

  const deleteFromCart = useMutation(deleteProductFromCart, {
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
  });

  type ProductId = {
    product: string[] & {
      id: string;
    };
  };

  const handleRemove = (product: ProductId) => {
    const userValue = Cookies.get("user") as string;
    const userId: string = JSON.parse(userValue);

    if (userId) {
      const productId: ProductId | string = product.product.id;
      return deleteFromCart.mutate({ userId, productId });
    } else {
      alert("תקלה , אנא נסו שוב.");
    }
  };

  return (
    <div className="flex  flex-col   bg-gray-200 ">
      <section className="   relative -z-0 mt-16 flex h-screen flex-col items-center justify-center px-4 py-8 text-center">
        <h2 className=" text-2xl font-medium text-slate-900 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.9)]  md:w-fit md:text-6xl">
          ברוכים הבאים ל - Eazy Buy!
        </h2>{" "}
        <p className="font-medium text-slate-900 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.9)]  md:text-4xl ">
          גלו עולם של מוצרים חשמליים בקרבתכם.
        </p>
        <img
          src="/icons/icon.png"
          alt="icon"
          className="mt-5 rounded-3xl bg-white  px-5 py-5  shadow-xl"
        />
        <img
          src="/home/main.png"
          alt="main pic"
          className=" object-fit absolute -z-10  p-10 opacity-40 drop-shadow-2xl md:top-6"
        />
        <p className="mt-4 font-medium  tracking-wide text-white drop-shadow-[0_2.77px_1.2px_rgba(0,0,0,0.9)] md:w-5/6   md:text-3xl">
          ב-Eazy Buy אנחנו מציעים מגוון רחב של מוצרים חשמליים מתקדמים לשדרג את
          חיי היומיום שלכם. ממכשירי בית חכם עד גאדג'טים ידידותיים לסביבה, יש לנו
          את כל מה שאתם צריכים כדי לפשט ולחשמל את העולם שלכם.
        </p>
        <button
          onClick={() => navigateToTopPage("/products")}
          className="mt-8 cursor-pointer rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          גלו עכשיו
        </button>
      </section>

      <section className=" min-h-screen ">
        <h1 className=" animate-bounce  bg-gray-400 bg-opacity-10 py-1  text-center text-4xl  font-medium text-white  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] md:text-5xl ">
          מוצרים מובילים
        </h1>
        {isLoading && (
          <div className=" flex h-screen items-center justify-center">
            <ScaleLoader color="#657c78" height={30} width={30} />
          </div>
        )}
        {isError && (
          <div className=" flex h-screen items-center justify-center">
            <h1 className=" text-5xl">תקלה, אנא נסה שוב או מאוחר יותר...</h1>
          </div>
        )}
        <div className=" grid gap-5   p-16 pb-10 md:grid-cols-3 ">
          {data &&
            data.map((product: any, index: number) => {
              if (product && index < 6) {
                return (
                  <Card
                    onClick={() => ShowProductById(product.product.id)}
                    cart={() => cart(product)}
                    title={product.product.name}
                    image={product.product.images[0]}
                    price={product.unit_amount / 100}
                    info={product.product.description}
                    key={index}
                    removeBtn={removeBtn(product)}
                    removeFromCart={() => handleRemove(product)}
                  />
                );
              }
            })}
        </div>
      </section>
      <div className=" mt-10 h-5 bg-gray-400 bg-opacity-5  shadow-sm "></div>
      <Subscribe />
      <div className=" mb-10 h-5 bg-gray-400 bg-opacity-5 shadow-sm "></div>
    </div>
  );
}
