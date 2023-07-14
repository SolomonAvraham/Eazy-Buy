const Footer = () => {
  return (
    <footer className="   h-96 rounded-s-full    bg-black  p-10 shadow-2xl md:h-48">
      <div className="  grid place-items-center  gap-4 font-semibold md:grid-cols-3 md:justify-items-end">
        <div className="text-center text-white ">
          <h4 className=" ">ליצירת קשר</h4>
          <p className=" ">
            תוכלו לפנות אלינו דרך המייל EazyBuy@gmail.com, או להתקשר <br />{" "}
            050-5428743
          </p>
        </div>

        <div className=" text-center text-white   ">
          <h6 className=" ">EAZY-BUY</h6>
          <p className=" ">
            בחנות שלנו תוכלו למצוא מגוון רחב של מוצרים דיגיטליים המתאימים לכל
            הצרכים. אנו מתמחים במכשירים חשמליים, טכנולוגיה מתקדמת ומוצרי בית חכם
            המעניקים לכם חווית שימוש מהנה ומתקדמת.
          </p>
          <p className=" "> כל הזכויות שמורות © EAZY BUY </p>
        </div>

        <div className="w-1/12  md:w-1/6 cursor-default rounded-full bg-white p-1 md:p-3     ">
          <img className="   " src="/icons/icon.png" alt="logo" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
