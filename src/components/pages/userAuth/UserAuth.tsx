import React, { useState } from "react";
import Button from "../../features/button/Button";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

export default function UserAuth() {
  return (
    <>
      {/* <Login /> */}
      <SignUp />
    </>
  );
}

export function Login() {
  const navigate = useNavigate();

  type User = {
    username: string;
    password: string;
  };
  type UserError = {
    usernameError: any;
    passwordError: any;
  };
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [errors, setErrors] = useState<UserError>({
    usernameError: "",
    passwordError: "",
  });

  const userSchema = z.object({
    username: z.string().min(3, "מינימום 3 תווים").max(10, "שם משתמש ארוך מדי"),
    password: z.string().min(8, "מינימום 8 תווים"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = userSchema.safeParse(user);

    if (!result.success) {
      return setErrors({
        usernameError: result.error.format().username?._errors,
        passwordError: result.error.format().password?._errors,
      });
    }
    return navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs text-center">
        <h1 className=" text-center py-3 text-5xl">התחברות</h1>
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" mx-auto  drop-shadow-2xl py-5"
        />
        <h3 className=" text-3xl py-5">Eazy Buy</h3>
        <form
          onSubmit={handelSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              שם משתמש
            </label>
            {errors.usernameError && (
              <h2 className="pb-2 font-semibold text-[red]">
                {errors.usernameError}
              </h2>
            )}

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
              id="username"
              required
              type="text"
              value={user.username}
              onChange={handleInputChange}
              placeholder=" שם משתמש"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              סיסמא
            </label>
            {errors.passwordError && (
              <h2 className="pb-2 font-semibold text-[red]">
                {errors.passwordError}
              </h2>
            )}
            <input
              className="focus:outline-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              required
              placeholder="סיסמא"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              הכנס
            </Button>
            <h3 className=" mt-5">
              אין לך חשבון?{" "}
              <a className=" text-blue-500 hover:text-black" href="/">
                הירשם
              </a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SignUp() {
  const navigate = useNavigate();

  type User = {
    username: string;
    password: string;
    rePassword: string;
  };

  type UserError = {
    usernameError: any;
    passwordError: any;
    rePasswordError: any;
  };

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState<UserError>({
    usernameError: "",
    passwordError: "",
    rePasswordError: "",
  });

  const userSchema = z.object({
    username: z.string().min(3, "מינימום 3 תווים").max(10, "שם משתמש ארוך מדי"),
    password: z.string().min(8, "מינימום 8 תווים"),
    rePassword: z.string().min(8, "מינימום 8 תווים"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = userSchema.safeParse(user);

    if (!result.success) {
      return setErrors({
        usernameError: result.error.format().username?._errors,
        passwordError: result.error.format().password?._errors,
        rePasswordError: result.error.format().rePassword?._errors,
      });
    }
    if (user.password === user.rePassword) {
      return navigate("/");
    } else {
      return setErrors({
        usernameError: "",
        passwordError: "",
        rePasswordError: "סיסמא לא תואמת",
      });
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 text-center h-screen    ">
      <div className="w-full max-w-xs">
        <h1 className=" text-center py-3 text-5xl">הירשמות</h1>
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" mx-auto  drop-shadow-2xl py-5"
        />
        <h3 className=" text-3xl py-5">Eazy Buy</h3>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              שם משתמש
            </label>
            {errors.usernameError && (
              <h2 className="pb-2 font-semibold text-[red]">
                {errors.usernameError}
              </h2>
            )}
            <input
              className="focus:outline-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              required
              placeholder=" שם משתמש"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              סיסמא
            </label>
            {errors.passwordError && (
              <h2 className="pb-2 font-semibold text-[red]">
                {errors.passwordError}
              </h2>
            )}
            <input
              className="focus:outline-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              required
              placeholder="סיסמא"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rePassword"
            >
              חזור על הסיסמא
            </label>
            {errors.rePasswordError && (
              <h2 className="pb-2 font-semibold text-[red]">
                {errors.rePasswordError}
              </h2>
            )}
            <input
              className="focus:outline-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rePassword"
              required
              type="password"
              placeholder=" חזור על הסיסמא"
              value={user.rePassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-center ">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSignUp}
            >
              הירשם
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
