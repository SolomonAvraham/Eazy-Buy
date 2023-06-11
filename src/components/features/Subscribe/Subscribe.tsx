import Button from '../button/Button';

const Subscribe = () => {
    return (
        <div className='text-center bg-wh-10 px-5 py-10'>
            <h4 className='font-semibold text-base'>הירשמו למועדון שלנו</h4>
            <p className='text-wh-500 my-3 w-5/6 mx-auto'>
                הזינו כתובת דוא"ל כדי לקבל חדשות מובילות ודילים מעולים!!
            </p>
            <input className='text-center w-5/6 min-w-[100px] px-5 py-2 border-2'
                placeholder='הזינו כתובת דוא"ל'
            />
            <Button className=' text-wh-10 font-semibold w-5/6 min-w-[100px] px-5 py-2 mt-3'>הירשם</Button>
        </div>
    )
};

export default Subscribe