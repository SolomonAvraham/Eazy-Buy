import React from "react";

interface CardProps {
  image: string;
  title: string;
  price: number;
  info: string;
}

const Card: React.FC<CardProps> = ({ image, title, price, info }) => {
  return (
    <div className=" bg-white grid md:grid-cols-2 md:grid-rows-1 rounded-lg shadow-md px-5 py-6 mt-5">
      <img
        src={image}
        alt={title}
        className="w-96  h-52 object-contain mb-4 "
      />
      <div className="flex flex-col justify-between p-5 ">
        <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
        <p className="text-sm text-gray-500 mb-2 text-center">{info}</p>
        <p className="text-gray-500 mb-2 "> ₪ {price}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">
          הוסף לעגלה
        </button>
      </div>
    </div>
  );
};

export default Card;
