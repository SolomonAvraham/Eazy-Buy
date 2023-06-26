import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/userService";
import Cookies from "js-cookie";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  type User = {
    _id: string;
  };

  const navigate = useNavigate();

  const getUser = () => {
    const userValue = Cookies.get("user");
    if (userValue) {
      const userId = JSON.parse(userValue) as User;
      return getUserById(userId._id);
    } else {
      throw new Error();
    }
  };

  const { data, isLoading, error } = useQuery(["getUserById"], getUser, {
    staleTime: 60000,
  });

  if (isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  if (error)
    return (
      <div className=" flex flex-col items-center justify-center text-center h-screen ">
        <h1 className="mt-10  text-7xl">משתמש לא מחובר למערכת !</h1>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 p-3 border-2 border-sky-800 rounded-lg bg-stone-900 text-slate-100 hover:bg-stone-600 hover:text-black px-5"
        >
          להתחברות לחץ כאן
        </button>
      </div>
    );

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center mt-10">
        {data && (
          <>
            <h1 className="text-5xl text-red-700 mb-8">שלום, {data.fullName}.</h1>
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h2 className="text-2xl mb-4">פרטים משתמש</h2>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="flex items-center">
                  <span className="font-bold mr-2">שם מלא:</span>
                  {data.fullName}
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">אימייל:</span>
                  {data.email}
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">כתובת:</span>
                  {data.address}
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">משתמש נוצר בתאריך:</span>
                  {data.createdAt}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-4xl mb-4">עגלה</h2>
              {/*קומפוננטה של CART*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
