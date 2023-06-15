// import React from 'react';
// import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

// interface PaymentFormProps extends ReactStripeElements.InjectedStripeProps { }

// const PaymentForm: React.FC<PaymentFormProps> = ({ stripe }) => {
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (stripe) {
//       // Collect payment details from the form
//       const { token, error } = await stripe.createToken();

//       if (error) {
//         // Handle error
//         console.error(error);
//       } else {
//         // Send payment token to server
//         try {
//           const response = await fetch('/charge', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               token: token?.id,
//               amount: 100, // Example amount, adjust as needed
//               currency: 'ILS', // Example currency, adjust as needed
//             }),
//           });

//           const data = await response.json();

//           if (data.success) {
//             // Payment successful
//             console.log('Payment successful:', data.charge);
//           } else {
//             // Payment failed
//             console.log('Payment failed:', data.error);
//           }
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit">Pay</button>
//     </form>
//   );
// };

// export default injectStripe(PaymentForm);
