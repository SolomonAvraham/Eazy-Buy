export default function Home() {
  return (
    <div className="bg-gray-200     relative -z-0 h-screen ">
      <section className="flex flex-col items-center justify-center text-center px-4 py-8">
        <h2 className=" text-2xl font-medium md:w-fit md:text-6xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ברוכים הבאים ל-Eazy Buy!
        </h2>
        <img
          src="/icons/icon.png"
          alt="icon"
          className="  drop-shadow-2xl py-5"
        />
        <img
          src="/home/main.png"
          alt="main pic"
          className=" absolute md:top-6 -z-10  drop-shadow-2xl object-fit p-10 opacity-70"
        />
        <p className="font-medium md:w-fit md:text-5xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
          גלו עולם של מוצרים חשמליים בקרבתכם.
        </p>
        <p className="mt-4 font-medium md:w-fit md:text-3xl  text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ב-Eazy Buy אנחנו מציעים מגוון רחב של מוצרים חשמליים מתקדמים לשדרג את
          חיי היומיום שלכם. ממכשירי בית חכם עד גאדג'טים ידידותיים לסביבה, יש לנו
          את כל מה שאתם צריכים כדי לפשט ולחשמל את העולם שלכם.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-600 transition-colors">
          גלו עכשיו
        </button>
      </section>
      <div className="fdgfdg h-52"></div>
      <section className="grid grid-cols-2 h-screen  p-10 ">
        <div className="mt-5">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum
            illum doloribus minima qui sunt eos aut non mollitia, ipsum deleniti
            omnis voluptatibus cupiditate expedita ipsam praesentium at
            architecto distinctio ex quibusdam! Quidem, nobis voluptate.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-600 transition-colors">
            BUY
          </button>
        </div>
        <div className="">
          <img
            src="https://img.ksp.co.il/item/234742/b_1.jpg?v=1668343739"
            alt="tv"
          />
        </div> 
        <div className="py-5">
          <img
            src="https://img.ksp.co.il/item/234742/b_1.jpg?v=1668343739"
            alt="tv"
          />
        </div>
        <div className="mt-5  ">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum
            illum doloribus minima qui sunt eos aut non mollitia, ipsum deleniti
            omnis voluptatibus cupiditate expedita ipsam praesentium at
            architecto distinctio ex quibusdam! Quidem, nobis voluptate.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-600 transition-colors">
            BUY
          </button>
        </div>
      </section>
    </div>
  );
}
