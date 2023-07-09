import Card from "../../features/card/Card";
import Button from "../../features/button/Button";
import Subscribe from "../../features/Subscribe/Subscribe";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/productsService";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { data, isLoading, isError } = useQuery(["products"], getProducts);
  const navigate = useNavigate();

  const ShowProductById = (id: string) => {
    if (id) {
      navigate(`/product/${id}`);

      return;
    }
  };

  return (
    <div className="flex  flex-col gap-10 bg-gray-200 ">
      <section className=" relative -z-0 flex flex-col items-center justify-center px-4 py-8 text-center">
        <h2 className=" text-2xl font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  md:w-fit md:text-6xl">
          ברוכים הבאים ל-Eazy Buy!
        </h2>
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" rounded-3xl bg-white  px-5 py-5  shadow-xl"
        />
        <img
          src="/home/main.png"
          alt="main pic"
          className=" object-fit absolute -z-10  p-10 opacity-70 drop-shadow-2xl md:top-6"
        />
        <p className="font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  md:w-fit md:text-5xl ">
          גלו עולם של מוצרים חשמליים בקרבתכם.
        </p>
        <p className="mt-4 font-medium text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  md:w-fit md:text-3xl">
          ב-Eazy Buy אנחנו מציעים מגוון רחב של מוצרים חשמליים מתקדמים לשדרג את
          חיי היומיום שלכם. ממכשירי בית חכם עד גאדג'טים ידידותיים לסביבה, יש לנו
          את כל מה שאתם צריכים כדי לפשט ולחשמל את העולם שלכם.
        </p>
        <Button
          onClick={() => navigate("/products")}
          className="mt-8 rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          גלו עכשיו
        </Button>
      </section>

      <section className=" p-16 ">
        <h1 className=" py-10 text-center text-4xl  font-medium text-black  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] md:text-6xl ">
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
        <div className=" gird grid-cols-2 grid-rows-2 px-10">
          {data &&
            data.map((product, index) => {
              if (product && index < 4) {
                return (
                  <Card
                    onClick={() => ShowProductById(product.product.id)}
                    title={product.product.name}
                    image={product.product.images[0]}
                    price={product.unit_amount / 1}
                    info={product.product.description}
                    key={index}
                  />
                );
              }
            })}
        </div>
      </section>
      <Subscribe />
    </div>
  );
}
