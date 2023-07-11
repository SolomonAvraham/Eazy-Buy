export const getProducts = async () => {
  try {
    const response = await fetch(`http://localhost:5001/api/stripe/products`);
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
      `http://localhost:5001/api/stripe/productById/${id}`
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

export const addProductToCart = async (user: string[]) => {
  try {
    const response = await fetch(`http://localhost:5001/api/stripe/update`, {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const response = await fetch(`http://localhost:5001/api/stripe/delete`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const response = await fetch(`http://localhost:5001/api/stripe/checkout`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
