import SocialLinks from '../SocialLinks/SocialLinks';
import Shopping from '../../../assets/shopping.webp'

const Header = () => {
    return (
        <header className="mb-5">
            <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4 ">
                <div className="hidden sm:block">
                    <SocialLinks />
                </div>
                <div>
                    <p>התחברות</p>
                </div>
            </nav>
            <div className="flex justify-between gap-8 mt-5 mb-4 mx-10">
                <div className="basis-2/3 md:mt-3">
                    <h1 className="font-bold text-3xl md:text-4xl text-wh-500">50% מבצע על ללקוחות רשומים</h1>
                    <p className="text-sm mt-3">
                        המצבע הנ"ל החל מהתאריך 11/6/2023 ועד לתאריך 11/9/2023
                    </p>
                </div>
                {/* Temporary.. need to be switch to another pic !! */}
                <div className="basis-full relative w-auto h-32 bg-wh-500">
                    <img src={Shopping} alt="" className="w-full h-full object-cover" />
                </div>
                {/* ------- */}
            </div>
            <hr className="border-1 mx-10" />
        </header>
    );
}

export default Header