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
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center mt-10">
        {data && (
          <>
            <h1 className=" py-5 text-7xl bg-red-100">
              שלום, {data.fullName} .
            </h1>
            <div className=" text-center">
              <h1 className=" py-5 text-2xl bg-red-100">פרטים משתמש</h1>
              <div className="dd"> שם מלא : {data.fullName}</div>
              <div className="dd">אימייל : {data.email}</div>
              <div className="dd"> כתובת : {data.address}</div>
              <div className="dd"> משתמש נוצר בתאריך : {data.createdAt}</div>
            </div>
            <div className="ddd">
              <h1 className=" py-5 text-6xl bg-red-100">עגלה</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
