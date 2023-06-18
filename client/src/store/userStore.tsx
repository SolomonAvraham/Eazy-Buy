import { create } from "zustand";
import Cookies from "js-cookie";

type SignInProps = {
  email: string;
  password: string;
};

const userStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  signIn: async (email: SignInProps, password: SignInProps) => {
    try {
      set({ isLoading: true });
      const response = await fetch("http://localhost:5001/client/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const user = await response.json();
        set({ user: user.user });
        set({ token: user.token });

        Cookies.set("user", JSON.parse(user));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
    return set({ isLoading: false });
  },
  signOut: () => {
    set({ user: null });
    //   Cookies.("user");
    //   Cookies.
  },
  getUser: () => {
    return userStore.getState().user;
  },
}));

 

export default userStore;
