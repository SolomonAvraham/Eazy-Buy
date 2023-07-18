import * as z from "zod";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "../../../services/userService";

export default function SignUp(): JSX.Element {
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
    } catch (error: unknown) {
      const typedError = error as z.ZodError;
      return typedError?.formErrors?.fieldErrors;
    }
  };

  type FormValues = {
    fullName: string;
    email: string;
    password: string;
    address: string;
    [key: string]: string;
  };

 

  type SignUpError = {
    message?: string | undefined;
  };

  const signUpMutation = useMutation(userSignUp, {
    onSuccess: () => {
      return navigateToTopPage("/login");
    },
    onError: (date: SignUpError) => {
      signUpMutation.error = date;
    },
  });

  const formik = useFormik<FormValues>({
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

  type FormFields = {
    label: string;
    name: string;
    type: string;
  };

  if (signUpMutation.isLoading)
    return (
      <div className=" flex h-screen items-center justify-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" min-h-screen p-10 md:p-0  md:py-16 "
    >
      <div className=" mx-auto flex h-screen flex-col items-center justify-center gap-5 rounded-xl border-2 border-black   border-opacity-10 bg-gray-100 shadow-xl md:h-fit md:w-1/2 md:p-5">
        <h1 className=" pt-4 text-6xl">הירשמות</h1>{" "}
        <hr className=" h-1 w-1/2 rounded-2xl bg-black bg-opacity-5" />
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" mx-auto  drop-shadow-2xl "
        />
        <p className=" text-3xl font-semibold ">Eazy Buy</p>
        {signUpMutation.isError && (
          <div className=" text-xl font-bold text-red-600">
            {signUpMutation.error.message}
          </div>
        )}
        {signUpMutation.isSuccess && (
          <h2 className=" text-xl font-bold">נרשמת בהצלחה !</h2>
        )}
        {formFields.map((formField: FormFields, index: number) => (
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
              <div key={index + 5}>{formik.errors[formField.name]}</div>
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
              className="  focus:shadow-outline w-80 rounded-lg border-2   border-sky-200 text-lg placeholder:text-center placeholder:text-gray-200 focus:outline-sky-600"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={signUpMutation.isLoading}
          className=" rounded-lg border-2 border-sky-800 bg-stone-900 p-3 px-5 text-slate-100 hover:bg-stone-600 hover:text-black"
        >
          {signUpMutation.isLoading ? "טוען..." : "הירשם"}
        </button>
        <div className=" font-bold">
          יש לך חשבון קיים?{" "}
          <span
            onClick={() => navigateToTopPage("/login")}
            className=" cursor-pointer text-sky-700 hover:text-sky-500"
          >
            התחבר!
          </span>
        </div>
      </div>
    </form>
  );
}
