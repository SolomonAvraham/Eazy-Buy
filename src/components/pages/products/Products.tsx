import { useProductStore } from "../../../store/store";
import Card from "../../features/card/Card";

export default function Products() {
  const { products } = useProductStore();

  return (
    <div className="bg-gray-200  flex flex-col items-center justify-center py-10 ">
      <h1 className=" text-8xl py-5">מוצרים</h1>
      <div className="flex flex-wrap  p-10">
        {products.map((products, index) => (
          <Card
            title={products.title}
            image={products.image}
            price={products.price}
            info={products.info}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
