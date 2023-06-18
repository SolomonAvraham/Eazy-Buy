import Stripe from 'stripe';


const getStripeProducts = async () => {
    const stripe = new Stripe(process.env.SECRET_KEY_STRIPE ?? '', {
        apiVersion: '2022-11-15'
    });
    const response = await stripe.prices.list({
        expand: ['data.product']
    });
    const prices = response.data
    return prices
}

const payment = () => {
    const products = getStripeProducts();
    console.log(products)
    return (
        <main className='p-4 flex flex-col'>
            <div className='max-w-[1000px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>

            </div>
        </main>
    )
}

export default payment