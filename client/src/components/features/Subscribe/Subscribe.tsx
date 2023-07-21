import { useState } from "react";

const Subscribe = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputValue) {
          return alert("אנא הזין את כתובת המייל שלך");
        }
        setInputValue("");
        return alert("הצטרפת למועדון Eazy-Buy !");
      }}
      className=" flex flex-col items-center justify-center bg-gray-200 px-10 py-10  text-center tracking-wide"
    >
      <h4 className=" text-xl ">הירשמו למועדון שלנו!</h4>
      <hr className=" w-1/2 bg-black bg-opacity-80" />
      <p className=" mt-2 font-semibold">
        הזינו כתובת דוא"ל כדי לקבל חדשות מובילות ודילים מעולים!!
      </p>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className=" mt-5 rounded-lg placeholder:text-center"
        placeholder='הזינו כתובת דוא"ל'
      />
      <button
        type="submit"
        className="  mt-3 rounded-lg  bg-black px-5  py-2 font-semibold text-white hover:bg-blue-900"
      >
        הירשם
      </button>
    </form>
  );
};

export default Subscribe;
