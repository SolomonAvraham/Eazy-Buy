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

const getEnvironment = () => {
  const isCloudDeployment = window.location.href.includes(
    "https://eazy-buy-now.netlify.app/"
  );

  return isCloudDeployment
    ? import.meta.env.VITE_BASE_URL
    : import.meta.env.VITE_LOCAL_URL;
};

export const userLogin = async (data: UserLogin) => {
  try {

    const response = await fetch(`${getEnvironment()}/client/login`, {
      method: "POST",
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

export const userSignUp = async (data: UserSignUp) => {
  try {
    const response = await fetch(`${getEnvironment()}/client/register`, {
      method: "POST",
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

export const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${getEnvironment()}/client/user/${id}`);
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

    const response = await fetch(`${getEnvironment()}/api/stripe/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        product: productId,
      }),
    });
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
    const response = await fetch(`${getEnvironment()}/client/removeCart/${id}`);
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
