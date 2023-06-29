import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/productsService";
import ScaleLoader from "react-spinners/ScaleLoader";
import Card from "../../features/card/Card";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(["products"], getProducts);

  const ShowProductById = (id: string) => {
    if (id) {
      navigate(`/product/${id}`);
      return;
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center bg-gray-200 py-10 ">
      <h1 className=" py-5 text-8xl">מוצרים</h1>
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
      <div className="grid-row-5 grid  grid-cols-3 gap-10  p-10   ">
        {data &&
          data.map((product, index) => {
            if (product) {
              return (
                <Card
                  onClick={() => ShowProductById(product.product.id)}
                  title={product.product.name}
                  image={product.product.images[0]}
                  price={111}
                  info={product.product.description}
                  key={index}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
