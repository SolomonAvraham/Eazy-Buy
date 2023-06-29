import React from "react";

interface CardProps {
  image: string;
  title: string;
  price: number;
  info: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, price, info, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" mt-5 grid rounded-lg bg-white px-5 py-6 shadow-md md:grid-cols-2 md:grid-rows-1 "
    >
      <img
        src={image}
        alt={title}
        className="mb-4  h-52 w-96 cursor-pointer object-contain"
      />
      <div className="flex flex-col justify-between p-5 ">
        <h2 className="mb-2 cursor-pointer text-center text-xl font-semibold">
          {title}
        </h2>
        <p className="mb-2 cursor-pointer text-center text-sm text-gray-500">
          {info}
        </p>
        <p className="mb-2 text-gray-500 "> ₪ {price}</p>
        <button className="rounded-lg bg-black px-4 py-2 font-semibold text-white hover:bg-blue-900">
          הוסף לעגלה
        </button>
      </div>
    </div>
  );
};

export default Card;
