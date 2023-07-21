import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Contact: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
 
    console.log(values);
    resetForm();
  };

  const validateForm = (values: any) => {
    const errors: { [key: string]: string } = {};

    if (!values.name) {
      errors.name = "שדה חובה";
    }

    if (!values.email) {
      errors.email = "שדה חובה";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'כתובת דוא"ל לא חוקית';
    }

    if (!values.message) {
      errors.message = "שדה חובה";
    }

    return errors;
  };

  type FormField = {
    name: string;
    type: string;
    placeholder: string;
    rows?: number;
    as?: string;
  };

  const formField: FormField[] = [
    {
      name: "שם מלא :",
      type: "text",
      placeholder: "שם מלא ",
    },
    {
      name: '  כתובת  דוא"ל: ',
      type: "email",
      placeholder: ' כתובת דוא"ל ',
    },
    {
      name: " הודעה: ",
      type: "message",
      placeholder: "הודעה ",
      rows: 3,
      as: "textarea",
    },
  ];
  return (
    <>
      <div className="   min-h-screen bg-slate-200 p-10  ">
        <div className="  mb-24 mt-24 flex flex-col items-center justify-center rounded-2xl bg-slate-200 shadow-2xl">
          <h1 className=" mt-5 text-3xl md:text-6xl">Eazy-Buy</h1>
          <hr className="mt-3 h-1 w-1/3 bg-gray-500 bg-opacity-10" />
          <h2 className=" mt-3 text-xl font-bold ">צור קשר</h2>
          <hr className="h-1 w-1/6 bg-gray-500 bg-opacity-10" />

          <p className=" p-10 text-center font-bold tracking-wider">
            שמחים שביקרתם באתר "איזי-ביי"! אנחנו ממש רוצים לשמוע מכם ולעזור בכל
            שאלה או בעיה שיש לכם. להלן פרטי התקשורת שלנו: כתובת: 123 רחוב
            הקניון, תל אביב, ישראל טלפון: +972-123-456789 דוא"ל:
            info@eazy-buy.com נשמח לספק לכם מענה מהיר ואדיב לכל שאלה, בקשה או
            בעיה שתצטרכו עזרה בה. אנו זמינים בימים ראשון עד חמישי בין השעות 9:00
            ל-17:00. בנוסף, אם יש לכם הצעות, ביקורות או משוב שתרצו לשתף איתנו,
            אנחנו תמיד פתוחים לשמוע. אנו ערים להערותיכם ומשובכם ונשתדל לשפר
            ולהתפתח כפי שאתם צריכים. אתם יכולים גם ליצור איתנו קשר באמצעות הטופס
            הבא:
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
          >
            <Form className=" grid place-items-baseline  py-5 text-center font-semibold placeholder:text-center">
              {formField.map((elements, index) => (
                <div key={elements.name + 1}>
                  <label key={index} htmlFor={elements.name}>
                    {elements.name}
                  </label>
                  <ErrorMessage
                    key={elements.type}
                    name={elements.type}
                    component="div"
                    className="error-message text-red-600"
                  />
                  <Field
                    
                    key={elements.name}
                    type={elements.type}
                    id={elements.type}
                    name={elements.type}
                    placeholder={elements.placeholder}
                    rows={elements.rows}
                    as={elements.as}
                  />
                </div>
              ))}

              <button
                className=" mx-auto mt-10 rounded-xl bg-gray-600 px-10 py-5 text-white hover:bg-gray-500"
                type="submit"
              >
                שלח
              </button>
            </Form>
          </Formik>
          <img src="/icons/icon.png" alt="icon" className="  mb-5 mt-10 " />
        </div>
      </div>
    </>
  );
};

export default Contact;
