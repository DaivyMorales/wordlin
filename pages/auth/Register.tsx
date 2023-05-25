import { HiKey } from "react-icons/hi";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Signin() {
  const [error, setError] = useState("");

  const router = useRouter();

  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

  const formik = useFormik({
    initialValues: {
      email: String,
      name: String,
      password: String,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      resetForm();
      const response = await axios.post(
        "http://localhost:3000/api/user",
        values
      );
      console.log(response);

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl ?? "/",
        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
      }
      if (result?.ok) {
        router.push(callbackUrl);
      }
    },
  });

  return (
    <div className="w-screen  h-screen first-letter: flex justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex w-full flex-col gap-1 justify-start items-start">
          <div className="flex gap-2 justify-center items-center">
            <div className="bg-[#BAFFBD] rounded-full p-2">
              <HiKey color="#01B109" />
            </div>
            <h3>Sign up</h3>
          </div>
          <p>
            Become a member - you’ll enjoy <br /> exclusive deals, offers,
            invites and <br />
            rewards
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                onChange={formik.handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                placeholder="Jhon Diaz"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Create a password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Become a user</button>
          </div>
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/auth/SignIn" className="text-blue-600 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
