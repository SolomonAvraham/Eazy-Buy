import { create } from "zustand";
import Cookies from "js-cookie";

type SignInProps = {
  email: string;
  password: string;
};

const userStore = create((set) => ({
  user: null,
  token: null,
  error: null,
  isLoading: false,
  showUserAuth: false,
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

        Cookies.set("user", JSON.stringify(user.user));
        Cookies.set("token", JSON.stringify(user.token));
        return set({ isLoading: false });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
    return set({ isLoading: false });
  },
  signOut: () => {
    set({ isLoading: true });
    set({ user: null });
    set({ token: null });
    Cookies.remove("user");
    Cookies.remove("token");
    set({ isLoading: false });
    return;
  },
  getUserById: () => {
    return userStore.getState().user;
  },
  getUserByIdAuthPage: (userPage: boolean) => {
    set({ showUserAuth: userPage });
    return userStore.getState().showUserAuth;
  },
}));

export default userStore;
