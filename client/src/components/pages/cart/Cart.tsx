import { useQuery } from "@tanstack/react-query";

const CartComponent = () => {
  const { data, isLoading, isError } = useQuery(["products"], getProducts);

  const cartItems = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 15 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 3, name: "Product 3", price: 20 },
    // Add more cart items as needed
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-8 text-2xl font-semibold">מוצרים</h1>
      <div className="flex flex-wrap justify-center">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-64 p-4 m-4 border rounded-lg"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-500">${item.price}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartComponent;
