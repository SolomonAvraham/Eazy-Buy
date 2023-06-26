import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/productsService";
import ScaleLoader from "react-spinners/ScaleLoader";
import Card from "../../features/card/Card";

export default function Products() {
  const { data, isLoading, isError } = useQuery(["products"], getProducts);
  console.log("🚀 ~ file: Products.tsx:8 ~ Products ~ data:", data)

  return (
    <div className="bg-gray-200  flex flex-col items-center justify-center py-10 ">
      <h1 className=" text-8xl py-5">מוצרים</h1>
      {isLoading && (
        <div className=" h-screen flex justify-center items-center">
          <ScaleLoader color="#657c78" height={30} width={30} />
        </div>
      )}
      <div className="grid grid-row-5  grid-cols-3 gap-10  p-10   ">
        {data &&
          data.map((product, index) => {
            if (product) {
              return (
                <Card
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
