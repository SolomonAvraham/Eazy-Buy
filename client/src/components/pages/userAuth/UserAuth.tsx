import React, { useState } from "react";
import Button from "../../features/button/Button";

export default function UserAuth() {
  return (
    <>
      <Login />
      <SignUp />
    </>
  );
}

export function Login() {
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
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              שם משתמש
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="סיסמא"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              הכנס
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// type SignUpProps = {
//   onSignUp: (username: string, password: string) => void;
// };

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // onSignUp(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder=" שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              סיסמא
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="סיסמא"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
