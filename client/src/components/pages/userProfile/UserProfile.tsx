import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../services/userService";
import Cookies from "js-cookie";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link } from "react-router-dom";

export default function UserProfile() {
  type User = {
    _id: string;
  };

  const getUser = () => {
    const userValue = Cookies.get("user");
    if (userValue) {
      const userId = JSON.parse(userValue) as User;
      return getUserById(userId._id);
    }
    return null;
  };

  const { data, isError, isSuccess, isLoading } = useQuery(
    ["getUserById"],
    getUser,
    { staleTime: 60000 }
  );

  if (isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  return (
    <div className="h-screen">
      {!data ? (
        <div className=" flex flex-col items-center justify-center text-center ">
          <h1 className="mt-10  text-7xl">משתמש לא מחובר למערכת !</h1>
          <h4 className=" mt-10  font-bold text-xl hover:text-slate-400">
            <Link to="/login">לחץ כאן להתחברות</Link>
          </h4>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className=" py-5 text-7xl bg-red-100">שלום, {data.fullName} .</h1>
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
        </div>
      )}
    </div>
  );
}
