export const getProducts = async () => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/stripe/products`);
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/stripe/products`
    );
>>>>>>> e9e02a9ecad1dc85b5a296c8ff0241c46b831b43
    if (response.ok) {
      const responseData = await response.json();

      return responseData;
    } else {
      const errorResponseData = await response.json();
      throw new Error(
        errorResponseData.message || "Failed to login. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/stripe/productById/${id}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorResponseData = await response.json();
      throw new Error(
        errorResponseData.message || "Failed to login. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type AddToCart = {
  userId?: string | string[];
  user?: string | string[];
  product: string[];
};

export const addProductToCart = async (user: AddToCart) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/stripe/update`, {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/stripe/update`,
      {
        method: "POST",
        body: JSON.stringify({ user }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
>>>>>>> e9e02a9ecad1dc85b5a296c8ff0241c46b831b43
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorResponseData = await response.json();
      throw new Error(
        errorResponseData.message || "Failed to login. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type DeleteProps = {
  userId: string;
  productId: string;
};

export const deleteProductFromCart = async (data: DeleteProps) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/stripe/delete`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/stripe/delete`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
>>>>>>> e9e02a9ecad1dc85b5a296c8ff0241c46b831b43
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorResponseData = await response.json();
      throw new Error(
        errorResponseData.message || "Failed to login. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const purchaseProducts = async (product: string[]) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/stripe/checkout`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/stripe/checkout`,
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
>>>>>>> e9e02a9ecad1dc85b5a296c8ff0241c46b831b43
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorResponseData = await response.json();
      throw new Error(
        errorResponseData.message || "Failed to login. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
