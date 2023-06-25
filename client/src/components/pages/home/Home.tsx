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
  return (
    <div className="bg-gray-200  flex flex-col gap-10 ">
      <section className=" relative -z-0 flex flex-col items-center justify-center text-center px-4 py-8">
        <h2 className=" text-2xl font-medium md:w-fit md:text-6xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ברוכים הבאים ל-Eazy Buy!
        </h2>
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" bg-white rounded-3xl  px-5 py-5  shadow-xl"
        />
        <img
          src="/home/main.png"
          alt="main pic"
          className=" absolute md:top-6 -z-10  drop-shadow-2xl object-fit p-10 opacity-70"
        />
        <p className="font-medium md:w-fit md:text-5xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
          גלו עולם של מוצרים חשמליים בקרבתכם.
        </p>
        <p className="mt-4 font-medium md:w-fit md:text-3xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ב-Eazy Buy אנחנו מציעים מגוון רחב של מוצרים חשמליים מתקדמים לשדרג את
          חיי היומיום שלכם. ממכשירי בית חכם עד גאדג'טים ידידותיים לסביבה, יש לנו
          את כל מה שאתם צריכים כדי לפשט ולחשמל את העולם שלכם.
        </p>
        <Button
          onClick={() => navigate("/products")}
          className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-600 transition-colors"
        >
          גלו עכשיו
        </Button>
      </section>

      <section className=" p-16 ">
        <h1 className=" text-center py-10 font-medium  text-4xl md:text-6xl  text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] ">
          מוצרים מובילים
        </h1>
        {isLoading && (
          <div className=" h-screen flex justify-center items-center">
            <ScaleLoader color="#657c78" height={30} width={30} />
          </div>
        )}
        <div className=" px-10">
            {data &&
          data.map((product, index) => {
            if (product && index < 4) {
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
     
      </section>
      <Subscribe />
    </div>
  );
}
