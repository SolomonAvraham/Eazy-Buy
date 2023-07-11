
const MyCancelCompo = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-red-100 text-red-700 px-6 py-8 rounded-lg">
      <span className="text-5xl text-red-700 mb-4">X</span>
      <h3 className="text-3xl font-semibold text-center mb-2">התשלום נכשל...</h3>
      <p className="text-lg text-center">
        מצטערים, אך התשלום שלך לא הצליח. אנא בדוק את פרטי התשלום שלך ונסה שוב.
      </p>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          אם אתה ממשיך להתמודד עם בעיות, אנא צור קשר עם צוות התמיכה שלנו במספר
          <a href="tel:+123456789" className="ml-1 underline">+123456789</a>.
        </p>
      </div>
    </div>





  );
};



const Cancel = () => {
  return (
    <>
      <MyCancelCompo />
      {console.log('cancel')}
    </>
  )

}

export default Cancel