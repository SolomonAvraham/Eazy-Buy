import React from 'react'

type Props  = {};

const Header = (props: Props) => {
    return (
        <header className="mb-5">
            <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4 ">
                <div className="hidden sm:block">
                    social links
                </div>
                <div className="flex justify-between items-center gap-10">
                    <link href="/" />
                    <link href="/" />
                    <link href="/" />
                </div>
                <div>
                    <p>sign in</p>
                </div>
            </nav>
            <hr className="border-1 mx-10" />
        </header>
    );
}

export default Header