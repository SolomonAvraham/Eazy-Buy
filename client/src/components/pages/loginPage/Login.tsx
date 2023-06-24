import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import * as z from "zod";
import { userLogin } from "../../../services/userService";

export default function Login() {
  const navigate = useNavigate();

  type User = {
    password: string;
    email: string;
  };

  const validationSchema = z.object({
    email: z.string().email("אימייל לא תקין").nonempty("אימייל חסר"),
    password: z
      .string()
      .min(6, "סיסמה חייבת להיות לפחות 6 תווים")
      .nonempty("סיסמה חסרה"),
  });

  const validate = (values: FormValues) => {
    try {
      validationSchema.parse(values);
    } catch (error:unknown) {
      return error.formErrors.fieldErrors;
    }
  };

  type FormValues = {
    email: string;
    password: string;
    formErrors: unknown;
  };

  const loginMutation = useMutation(userLogin);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  const formFields = [
    { label: "אימייל", name: "email", type: "email" },
    { label: "סיסמה", name: "password", type: "password" },
  ];

  if (loginMutation.isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  if (loginMutation.isSuccess) {
    Cookies.set("user", JSON.stringify(loginMutation.data.user));
    Cookies.set("token", JSON.stringify(loginMutation.data.token));

    return navigate("/");
  }

  return (
    <form onSubmit={formik.handleSubmit} className="   md:py-16  ">
      <div className="  flex flex-col items-center justify-center gap-5 border-black border-2 md:w-1/2 h-screen md:h-fit   bg-gray-100 mx-auto md:p-5 border-opacity-10 rounded-xl shadow-xl">
        <h1 className=" pt-4 text-6xl">התחברות</h1>{" "}
        <hr className=" bg-black h-1 w-1/2 bg-opacity-5 rounded-2xl" />
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" mx-auto  drop-shadow-2xl "
        />
        <p className=" font-semibold text-2xl ">Eazy Buy</p>
        {loginMutation.isError && (
          <div className=" font-bold text-xl text-red-600">
            {loginMutation.error?.message}
          </div>
        )}
        {formFields.map((formField, index) => (
          <div
            key={formField.label}
            className=" flex flex-col items-center justify-center gap-2"
          >
            <label htmlFor={formField.name} key={formField.name}>
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
              required
              className="text-lg placeholder:text-gray-200 placeholder:text-center w-80 p-1 border-2 border-sky-200 rounded-lg focus:outline-sky-600 focus:shadow-outline"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className=" p-3 border-2 border-sky-800 rounded-lg bg-stone-900 text-slate-100 hover:bg-stone-600 hover:text-black px-5"
        >
          התחבר
        </button>
        <div className=" font-bold">
          אין לך עוד חשבון?{" "}
          <span
            onClick={() => navigate("/signup")}
            className=" text-sky-700 hover:text-sky-500 cursor-pointer"
          >
            הירשם!
          </span>
        </div>
      </div>
    </form>
  );
}
