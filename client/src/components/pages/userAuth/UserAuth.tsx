import React, { useState, useEffect } from "react";
import Button from "../../features/button/Button";
import * as z from "zod";

import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useFormik } from "formik";
import { useMutation, QueryClient, QueryClientProvider } from "react-query";
import userStore from "../../../store/userStore";

const queryClient = new QueryClient();

export default function UserAuth() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Login />
        {/* <SignUp /> */}
      </QueryClientProvider>
    </>
  );
}

export function Login() {
  const signIn = userStore((state) => state.signIn);
  const user = userStore((state) => state.getUser());
  const navigate = useNavigate();
  const isLoadingLogin = userStore((state) => state.isLoading);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

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
    } catch (error) {
      return error.formErrors.fieldErrors;
    }
  };

  const submitForm = async (data: FormValues) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  type FormValues = {
    email: string;
    password: string;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const mutation = useMutation(submitForm);

  const formFields = [
    { label: "אימייל", name: "email", type: "email" },
    { label: "סיסמה", name: "password", type: "password" },
  ];

  if (isLoadingLogin)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader color="#657c78" height={30} width={30} />
      </div>
    );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex flex-col items-center justify-center gap-5 md:min-h-screen  py-16  "
    >
      <h1 className=" py-4 text-6xl">התחברות</h1>{" "}
      <img
        src="/icons/icon.png"
        alt="icon"
        className=" mx-auto  drop-shadow-2xl "
      />
      <p className=" font-semibold text-lg ">Eazy Buy</p>
      {mutation.isError && <div>Submission failed. Please try again.</div>}
      {mutation.isSuccess && <div>Form submitted successfully!</div>}
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
            className=" p-1 border-2 border-sky-200 rounded-lg focus:outline-sky-600 focus:shadow-outline"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={isLoadingLogin}
        className=" p-3 border-2 border-sky-800 rounded-lg bg-stone-900 text-slate-100 hover:bg-stone-600 hover:text-black px-5"
      >
        Submit
      </button>
    </form>
  );
}

export function SignUp() {
  const validationSchema = z.object({
    fullName: z.string().min(4, "שם המכיל לפחות 4 תווים").nonempty("שם מלא"),
    email: z.string().email("אימייל לא תקין").nonempty("אימייל חסר"),
    password: z
      .string()
      .min(6, "סיסמה חייבת להיות לפחות 6 תווים")
      .nonempty("סיסמה חסרה"),
    address: z.string().nonempty("כתובת חסרה"),
    role: z.string().nonempty("Role is required"),
  });

  const validate = (values: FormValues) => {
    try {
      validationSchema.parse(values);
    } catch (error) {
      return error.formErrors.fieldErrors;
    }
  };

  const submitForm = async (data: FormValues) => {
    try {
      const res = await fetch("http://localhost:5001/client/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await res.json().then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };

  type FormValues = {
    fullName: string;
    email: string;
    password: string;
    address: string;
    role: string;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      address: "",
      role: "",
    },

    validate,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const mutation = useMutation(submitForm);

  const formFields = [
    { label: "שם מלא", name: "fullName", type: "text" },
    { label: "אימייל", name: "email", type: "email" },
    { label: "סיסמה", name: "password", type: "password" },
    { label: "כתובת", name: "address", type: "text" },
    { label: "תפקיד", name: "role", type: "text" },
  ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex flex-col items-center justify-center gap-5 min-h-screen  py-16"
    >
      <h1 className=" py-4 text-8xl">הירשמות</h1>{" "}
      <img
        src="/icons/icon.png"
        alt="icon"
        className=" mx-auto  drop-shadow-2xl "
      />
      <p className=" font-semibold text-lg ">Eazy Buy</p>
      {mutation.isError && <div>Submission failed. Please try again.</div>}
      {mutation.isSuccess && <div>Form submitted successfully!</div>}
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
            className=" p-1 border-2 border-sky-200 rounded-lg focus:outline-sky-600 focus:shadow-outline"
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={mutation.isLoading}
        className=" p-3 border-2 border-sky-800 rounded-lg bg-stone-900 text-slate-100 hover:bg-stone-600 hover:text-black px-5"
      >
        {mutation.isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
