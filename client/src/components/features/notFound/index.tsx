import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-blue-100 text-blue-700 px-6 py-8 rounded-lg">
            <svg className="w-16 h-16 text-blue-700 mb-4 not-found-animation" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-7a1 1 0 011-1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM10 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <h3 className="text-3xl font-semibold text-center mb-2 not-found-animation">אופס...</h3>
            <p className="text-lg text-center not-found-animation">
                הדף שאתם מחפשים לא קיים במערכת. בדקו שהכתובת שאתם מחפשים הינה נכונה.
            </p>
            <div className="mt-4 text-sm text-gray-600 not-found-animation">
                <p>
                    אם אתם מאמינים שהכתובת נכונה ויש טעות מוזמנים לפנות אלינו במספר
                    <a href="tel:+123456789" className="ml-1 underline">+123456789</a>.
                    או שתפנו אלינו דרך הבוט ממש בתחתית הדף
                </p>
            </div>
        </div>
    );
};

export default NotFound;
