type UserLogin = {
  password: string;
  email: string;
};

type UserSignUp = {
  fullName: string;
  email: string;
  password: string;
  address: string;
};

export const userLogin = async (data: UserLogin) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/client/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/client/login`,
      {
        method: "POST",
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

export const userSignUp = async (data: UserSignUp) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/client/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/client/register`,
      {
        method: "POST",
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

export const getUserById = async (id: string) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/client/user/${id}`);
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/client/user/${id}`
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

export const addToCart = async (productId: string, id: string) => {
  try {
<<<<<<< HEAD
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/stripe/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        product: productId,
      }),
    });
=======
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/stripe/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          product: productId,
        }),
      }
    );
>>>>>>> e9e02a9ecad1dc85b5a296c8ff0241c46b831b43
    if (response.ok) {
      const responseData = await response.json();
      return responseData.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "ההוספה נכשלה");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeAndAdd = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/client/removeCart/${id}`
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
