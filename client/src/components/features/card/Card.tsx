interface CardProps {
  image: string;
  title: string;
  price: number;
  info: string;
  onClick?: () => void;
  cart?: () => void;
  removeFromCart?: () => void;
  removeAddBtn?: boolean;
  removeBtn?:  boolean;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  price,
  info,
  onClick,
  cart,
  removeFromCart,
  removeAddBtn,
  removeBtn,
}) => {
  return (
    <div className="  rounded-2xl bg-white shadow-xl ">
      <div className="flex flex-col items-center justify-center  px-5 py-6">
        <div className="ff">
          <img
            onClick={onClick}
            src={image}
            alt={title}
            className="mx-auto mb-4 max-h-48 w-1/2 cursor-pointer rounded-md"
          />
        </div>
        <div className=" ">
          <h2
            onClick={onClick}
            className="mb-2 cursor-pointer text-center text-xl font-semibold"
          >
            {title}
          </h2>
          <p
            onClick={onClick}
            className="mb-2 cursor-pointer text-center text-sm font-semibold text-gray-500"
          >
            {info}
          </p>
          <p className="mb-2 text-center font-bold text-gray-900 ">
            {" "}
            ₪ {price.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-5 ">
          <button
            onClick={removeFromCart}
            className={` ${
              removeBtn && " hidden"
            } "mt-3 rounded-lg  bg-[#E30000] px-5  py-2 font-semibold text-white hover:bg-black `}
          >
            הסר
          </button>{" "}
          <button
            onClick={cart}
            className={` ${
              removeAddBtn && " hidden"
            } "mt-3 rounded-lg  bg-black px-5  py-2 font-semibold text-white hover:bg-blue-900 `}
          >
            הוסף לעגלה
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
