import { useParams } from "react-router-dom";
import Card from "../../features/card/Card";
import { addProductToCart, getProductById } from "../../../services/productsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import Cookies from "js-cookie";

 

export default function ShowProduct( ) {
  const { id } = useParams<string>();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["productById"], {
    queryFn: () => getProductById(id as string),
  });

  const queryClient = useQueryClient();

  const cart = (product: string[]) => {
    const userValue = Cookies.get("user");

    if (!userValue) return alert("חייב להירשם לאתר כדי להוסיף מוצרים לעגלה.");

    const user = JSON.parse(userValue) as string;
    // addProductToCart({user , product});
    queryClient.refetchQueries(["user"]);
    return;
  };

  return (
    <>
      <div className="flex  h-screen flex-col items-center justify-center bg-gray-200 py-10 ">
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
        <div className="flex  w-1/3 items-center justify-center">
          {product && (
            <Card
              title={product?.name}
              image={product?.images[0]}
              price={111}
              info={product?.description}
              cart={() => cart(product.product)}
              removeBtn={true}
              removeAddBtn={true}
 
            />
          )}
        </div>
      </div>
    </>
  );
}
