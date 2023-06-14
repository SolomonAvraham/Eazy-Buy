import { create } from "zustand";

const products: Product[] = [
  {
    image: "https://img.ksp.co.il/item/191322/b_1.jpg?v=1644474530",
    title: "מוצר 1",
    price: 49.99,
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "https://img.ksp.co.il/item/191322/b_1.jpg?v=1644474530",

    title: "מוצר 2",
    price: 79.99,
    info: "Nulla sollicitudin est et neque viverra, eget condimentum sem pretium.",
  },
  {
    image: "https://img.ksp.co.il/item/191322/b_1.jpg?v=1644474530",

    title: "מוצר 3",
    price: 129.99,
    info: "Duis feugiat dui non consequat aliquam. Proin et mauris felis.",
  },
  {
    image: "https://img.ksp.co.il/item/191322/b_1.jpg?v=1644474530",

    title: "מוצר 4",
    price: 299.99,
    info: "Vestibulum malesuada mauris a leo luctus, sed ullamcorper urna gravida.",
  },
];

// Define the product type
type Product = {
  image: string;
  title: string;
  price: number;
  info: string;
};

// Define the store type
type ProductStore = {
  products: Product[];
};

// Create the store using Zustand
export const useProductStore = create<ProductStore>(() => ({
  products: products,
}));
