import {
  useMutation, 
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  addProductToCart,
  deleteProductFromCart,
  getProducts,
} from "../../../services/productsService";
import ScaleLoader from "react-spinners/ScaleLoader";
import Card from "../../features/card/Card";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Products() {
  const navigate = useNavigate();
  const navigateToTopPage = (path: string) => {
    navigate(path);
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const queryClient = useQueryClient();

  type Cart = {
    user: {
      cart: string[] & {
        id: string;
      };
    };
  };

  const { data, isLoading, isError } = useQuery(["products"], getProducts);
  const user: UseQueryResult<Cart> = useQuery(["user"]);

  

  const addToCart = useMutation(
    addProductToCart,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["user"]);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const ShowProductById = (id: string) => {
    if (id) {
      navigateToTopPage(`/product/${id}`);
      return;
    }
  };

  type Product = string[];
 
  const cart = (product: Product) => {
    const userValue = Cookies.get("user");

    if (!userValue) return alert("חייב להירשם לאתר כדי להוסיף מוצרים לעגלה.");

    const user:string []= JSON.parse(userValue);

    return addToCart.mutate({ userId: user, product: product });
  };

  type Prod = {
    id: string;
  };

  const removeBtn = (product: Prod) => {
    const cart = user.data?.user.cart[0] ? user.data?.user.cart : null;

    const productExist = cart?.find((prod: any) => prod.id === product.id);

    if (!productExist) return true;
    return false;
  };

  const deleteFromCart = useMutation(deleteProductFromCart, {
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
  });

  type ProductRemove = {
    product: {
      product: string[];
      id: string;
    };
  };

  const handleRemove = (product: ProductRemove) => {
    const userValue = Cookies.get("user") as string;
    const userId: string = JSON.parse(userValue);

    if (userId) {
      const productId = product.product.id;
      return deleteFromCart.mutate({ userId, productId });
    } else {
      alert("תקלה , אנא נסו שוב.");
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center bg-gray-200 py-10 ">
      <h1 className=" py-5 font-three text-8xl">מוצרים</h1>
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
      <div className="md:grid-row-5 grid gap-10 p-10  md:grid-cols-3   ">
        {data &&
          data.map((product: any, index: number) => {
            if (product) {
              return (
                <Card
                  onClick={() => ShowProductById(product.product.id)}
                  cart={() => cart(product)}
                  removeFromCart={() => handleRemove(product)}
                  title={product.product.name}
                  image={product.product.images[0]}
                  price={product.unit_amount / 100}
                  info={product.product.description}
                  key={index}
                  removeBtn={removeBtn(product)}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
