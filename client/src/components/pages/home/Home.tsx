import Card from "../../features/card/Card";
import Button from "../../features/button/Button";
import Subscribe from "../../features/Subscribe/Subscribe";
import { useProductStore } from "../../../store/productStore";

export default function Home() {
  const { products } = useProductStore();

  return (
    <div className="bg-gray-200  flex flex-col gap-10 ">
      <section className=" relative -z-0 flex flex-col items-center justify-center text-center px-4 py-8">
        <h2 className=" text-2xl font-medium md:w-fit md:text-6xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ברוכים הבאים ל-Eazy Buy!
        </h2>
        <img
          src="/icons/icon.png"
          alt="icon"
          className="  drop-shadow-2xl py-5"
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
        <Button className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-600 transition-colors">
          גלו עכשיו
        </Button>
      </section>

      <section className=" p-16 ">
        <h1 className=" text-center py-10 font-medium  text-4xl md:text-6xl  text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] ">
          מוצרים מובילים
        </h1>
        {products.map((products, index) => (
          <Card
            title={products.title}
            image={products.image}
            price={products.price}
            info={products.info}
            key={index}
          />
        ))}
      </section>
      <Subscribe />
    </div>
  );
}
