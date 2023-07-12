import { useRef, useState } from "react";

interface CardProps {
  image: string;
  title: string;
  price: number;
  info: string;
  onClick?: () => void;
  cart?: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  price,
  info,
  onClick,
  cart,
}) => {
  // const [inputValue, setInputValue] = useState<number>(0);
  // const productAmount: number = useRef(0);
  // console.log(productAmount.current.value);

  return (
    <div className=" mt-5 grid rounded-lg bg-white px-5 py-6 shadow-md md:grid-cols-2 md:grid-rows-1 ">
      <img
        onClick={onClick}
        src={image}
        alt={title}
        className="mb-4  h-52 w-96 cursor-pointer object-contain"
      />
      <div className="flex flex-col justify-between p-5 ">
        <h2
          onClick={onClick}
          className="mb-2 cursor-pointer text-center text-xl font-semibold"
        >
          {title}
        </h2>
        <p
          onClick={onClick}
          className="mb-2 cursor-pointer text-center text-sm text-gray-500"
        >
          {info}
        </p>
        <p className="mb-2 text-center text-gray-900 ">
          {" "}
          ₪ {price.toLocaleString()}
        </p>
        {/* <div className="  flex items-center justify-center gap-5">
          <div
      
            className="cursor-default rounded-lg bg-black px-4 py-2 font-semibold text-white "
          >
            כמות
          </div>

          <input
            className=" rounded-lg border-2 border-black px-3 text-center text-xl"
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            max="5"
            step="1"
            ref={productAmount}
            onChange={(e) => e.target.value}
          />
        </div> */}
        <button
          onClick={cart}
          className="mt-3 rounded-lg bg-black px-4 py-2 font-semibold text-white hover:bg-blue-900"
        >
          הוסף לעגלה
        </button>
      </div>
    </div>
  );
};

export default Card;
