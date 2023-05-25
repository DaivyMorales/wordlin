import { signIn } from "next-auth/react";
import { HiKey } from "react-icons/hi";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signin() {
  const [Error, setError] = useState<string>();

  const router = useRouter();

  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

  const formik = useFormik({
    initialValues: {
      email: String,
      password: String,
    },
    onSubmit: async (values) => {
      console.log(values);
      console.log("Logging in");
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
            <h3>Log in</h3>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Log in</button>
          </div>
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/" className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
