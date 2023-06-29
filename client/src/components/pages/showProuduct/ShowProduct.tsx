import { useParams } from "react-router-dom";
import Card from "../../features/card/Card";
import { getProductById } from "../../../services/productsService";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function ShowProduct() {
  const { id } = useParams<string>();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["productById"], {
    queryFn: () => getProductById(id),
  });

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
            />
          )}
        </div>
      </div>
    </>
  );
}
