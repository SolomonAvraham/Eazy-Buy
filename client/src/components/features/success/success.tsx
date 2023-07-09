import React from 'react'


const Success = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-green-100 text-green-700 px-6 py-8 rounded-lg">
      <svg className="w-16 h-16 text-green-700 mb-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.828 14.586l-3.829-3.828L6.243 9 8 10.757l5.586-5.586L15.172 5l-7 7z" clipRule="evenodd" />
      </svg>
      <h3 className="text-3xl font-semibold text-center mb-2">Payment Successful</h3>
      <p className="text-lg text-center">
        Congratulations! Your payment was successfully processed. Thank you for your purchase.
      </p>
    </div>
  );
};


export default Success