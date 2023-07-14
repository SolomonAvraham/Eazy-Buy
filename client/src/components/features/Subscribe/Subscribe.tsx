const Subscribe = () => {
  return (
    <div className=" mx-auto mb-5 mt-5 hidden w-1/2 rounded-2xl  bg-wh-10 p-10 text-center shadow-2xl md:block">
      <h4 className="text-base font-semibold">הירשמו למועדון שלנו</h4>
      <p className="mx-auto my-3 w-5/6 text-wh-500">
        הזינו כתובת דוא"ל כדי לקבל חדשות מובילות ודילים מעולים!!
      </p>
      <input
        className="w-5/6 min-w-[100px] border-2 px-5 py-2 text-center"
        placeholder='הזינו כתובת דוא"ל'
      />
      <button className="   mt-3 w-5/6 min-w-[100px] px-5 py-2 font-semibold text-wh-10">
        הירשם
      </button>
    </div>
  );
};

export default Subscribe;
