const Footer = () => {
  return (
    <footer className="bg-wh-900 text-wh-50 py-2 px-10">
      <div className="justify-between mx-auto gap-1p sm:flex">
        {/* FIRST COLUMN */}
        <div className="mt-16 basis-1/2 sm:mt-0">
          <h4 className="font-bold">EAZY BUY</h4>
          <p className="my-5">
            בחנות שלנו תוכלו למצוא מגוון רחב של מוצרים דיגיטליים המתאימים לכל הצרכים. אנו מתמחים במכשירים חשמליים, טכנולוגיה מתקדמת ומוצרי בית חכם המעניקים לכם חווית שימוש מהנה ומתקדמת.
          </p>
          <p>© כל הזכויות שמורות</p>
        </div>
        {/* SECOND COLUMN */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">קישורים</h4>
          <p className="my-5">מדיה חברתית</p>
          <p className="my-5">לערוץ הדיסקורד שלנו</p>
          <p>הלקוח תמיד צודק</p>
        </div>
        {/* THIRD COLUMN */}
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-bold">ליצירת קשת</h4>
          <p className="my-5">תוכלו לפנות אלינו דרך המייל או להתקשר</p>
          <p>(333)425-6825</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer
