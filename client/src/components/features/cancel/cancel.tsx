
const MyCancelCompo = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent text-black-700 px-6 py-8 rounded-lg">
      <h3 className="text-3xl font-semibold text-center mb-2">Payment Cancelled</h3>
      <p className="text-lg text-center">
        We're sorry, but your payment was not successful. Please check your payment information and try again.
      </p>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          If you continue to experience issues, please contact our support team at
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