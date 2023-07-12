import * as z from "zod";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "../../../services/userService";

export default function SignUp() {
  const navigate = useNavigate();

  const navigateToTopPage = (path: string) => {
    navigate(path);
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validationSchema = z.object({
    fullName: z.string().min(4, "שם המכיל לפחות 4 תווים").nonempty("שם מלא"),
    email: z.string().email("אימייל לא תקין").nonempty("אימייל חסר"),
    password: z
      .string()
      .min(6, "סיסמה חייבת להיות לפחות 6 תווים")
      .nonempty("סיסמה חסרה"),
    address: z.string().nonempty("כתובת חסרה"),
  });

  const validate = (values: FormValues) => {
    try {
      validationSchema.parse(values);
    } catch (error) {
      return error?.formErrors.fieldErrors;
    }
  };

  type FormValues = {
    fullName: string;
    email: string;
    password: string;
    address: string;
  };

  const signUpMutation = useMutation(userSignUp);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      address: "",
    },

    validate,
    onSubmit: async (values) => {
      signUpMutation.mutate(values);
    },
  });

  const formFields = [
    { label: "שם מלא", name: "fullName", type: "text" },
    { label: "אימייל", name: "email", type: "email" },
    { label: "סיסמה", name: "password", type: "password" },
    { label: "כתובת", name: "address", type: "text" },
  ];

  if (signUpMutation.isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  if (signUpMutation.isSuccess) {
    return navigateToTopPage("/login");
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" min-h-screen p-10 md:p-0  md:py-16 "
    >
      <div className=" flex flex-col items-center justify-center gap-5 border-black border-2 md:w-1/2 h-screen md:h-fit   bg-gray-100 mx-auto md:p-5 border-opacity-10 rounded-xl shadow-xl">
        <h1 className=" pt-4 text-6xl">הירשמות</h1>{" "}
        <hr className=" bg-black h-1 w-1/2 bg-opacity-5 rounded-2xl" />
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" mx-auto  drop-shadow-2xl "
        />
        <p className=" font-semibold text-3xl ">Eazy Buy</p>
        {signUpMutation.isError && (
          <div className=" font-bold text-xl text-red-600">
            {signUpMutation.error?.message}
          </div>
        )}
        {signUpMutation.isSuccess && (
          <h2 className=" font-bold text-xl">נרשמת בהצלחה !</h2>
        )}
        {formFields.map((formField, index) => (
          <div
            key={formField.label}
            className=" flex flex-col items-center justify-center gap-2"
          >
            <label
              className=" text-lg font-semibold"
              htmlFor={formField.name}
              key={formField.name}
            >
              {formField.label}
            </label>
            {formik.touched[formField.name] && formik.errors[formField.name] ? (
              <div key={formik.touched[formField.name]}>
                {formik.errors[formField.name]}
              </div>
            ) : null}
            <input
              key={index}
              id={formField.name}
              name={formField.name}
              type={formField.type}
              onChange={formik.handleChange}
              value={formik.values[formField.name]}
              placeholder={formField.label}
              required
              className="  text-lg placeholder:text-gray-200 placeholder:text-center w-80   border-2 border-sky-200 rounded-lg focus:outline-sky-600 focus:shadow-outline"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={signUpMutation.isLoading}
          className=" p-3 border-2 border-sky-800 rounded-lg bg-stone-900 text-slate-100 hover:bg-stone-600 hover:text-black px-5"
        >
          {signUpMutation.isLoading ? "טוען..." : "הירשם"}
        </button>
        <div className=" font-bold">
          יש לך חשבון קיים?{" "}
          <span
            onClick={() => navigate("/login")}
            className=" text-sky-700 hover:text-sky-500 cursor-pointer"
          >
            התחבר!
          </span>
        </div>
      </div>
    </form>
  );
}
