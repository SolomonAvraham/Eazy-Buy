import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import * as z from "zod";
import { userLogin } from "../../../services/userService";

export default function Login() {
  type FormValues = {
    email: string;
    password: string;
    [key: string]: string;
  };

  type FormFields = {
    label: string;
    name: string;
    type: string;
  };

  const navigate = useNavigate();
  const navigateToTopPage = (path: string) => {
    navigate(path);
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const queryClient = useQueryClient();

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
    } catch (errors: any) {
      return errors.formErrors.fieldErrors;
    }
  };

  const loginMutation = useMutation(userLogin, {
    onSuccess: (data) => {
      Cookies.set("user", JSON.stringify(data.user._id));
      Cookies.set("token", JSON.stringify(data.token));
      queryClient.invalidateQueries(["user"]);

      return navigateToTopPage("/");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  const formFields: FormFields[] = [
    { label: "אימייל", name: "email", type: "email" },
    { label: "סיסמה", name: "password", type: "password" },
  ];

  if (loginMutation.isLoading) {
    return (
      <div className=" flex h-screen items-center justify-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="   md:py-16  ">
      <div className="  mx-auto flex h-screen flex-col items-center justify-center gap-5 rounded-xl border-2 border-black   border-opacity-10 bg-gray-100 shadow-xl md:h-fit md:w-1/2 md:p-5">
        <h1 className=" pt-4 text-6xl">התחברות</h1>{" "}
        <hr className=" h-1 w-1/2 rounded-2xl bg-black bg-opacity-5" />
        <img
          src="/icons/icon.png"
          alt="icon"
          className=" mx-auto  drop-shadow-2xl "
        />
        <p className=" text-2xl font-semibold ">Eazy Buy</p>
        {loginMutation.isError && (
          <div className=" text-xl font-bold text-red-600">
            {loginMutation.error && loginMutation.error?.message || ""}
          </div>
        )}
        {formFields.map((formField, index: number) => (
          <div
            key={formField.label}
            className=" flex flex-col items-center justify-center gap-2"
          >
            <label htmlFor={formField.name} key={formField.name}>
              {formField.label}
            </label>
            {formik.touched[formField.name] && formik.errors[formField.name] ? (
              <div key={String(formik.touched[formField.name])}>
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
              className="focus:shadow-outline w-80 rounded-lg border-2 border-sky-200 p-1 text-lg placeholder:text-center placeholder:text-gray-200 focus:outline-sky-600"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className=" rounded-lg border-2 border-sky-800 bg-stone-900 p-3 px-5 text-slate-100 hover:bg-stone-600 hover:text-black"
        >
          התחבר
        </button>
        <div className=" font-bold">
          אין לך עוד חשבון?{" "}
          <span
            onClick={() => navigateToTopPage("/signup")}
            className=" cursor-pointer text-sky-700 hover:text-sky-500"
          >
            הירשם!
          </span>
        </div>
      </div>
    </form>
  );
}
