"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Register from "./Register";
import Loader from "../ui/Loader";

export default function Login() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // for preventing default redirect and also to render error message coming from our backend
      });

      // if (res?.error) return setError(res.error);
      if (res?.error) {
        return setError(res.error);
      } else {
        window.location.reload(); // Refresh the page after successful sign-in
      }
      // router.replace("/");
      console.log(res);
    } catch (error) {
      <div>ERRORRRRRRRRR</div>;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <Loader />
          </div>
        )}

        {showRegister ? (
          <Register />
        ) : (
          <div className="bg-[#f9fafb] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  items-center">
            <div className="bg-[#ffffff] w-[500px] p-[2px] pb-[40px] pt-[20px] shadow-md shadow-gray-200 rounded-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 mb-8"
                  action="#"
                  method="POST"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold align-middle text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="pb-2">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>

                  <div className="divider font-medium text-sm">
                    Or continue with
                  </div>
                </form>
                <button
                  className="justify-center items-center w-full hover:bg-gray-100 border border-gray-200 transition-all ease-in-out delay-50 py-[10px] px-6 rounded-lg text-sm font-medium login_font flex gap-4"
                  onClick={() => signIn("google")}
                >
                  <Image
                    src="/google.svg"
                    width={20}
                    height={20}
                    alt="google_logo"
                  />
                  <span className="text-black">Sign in with Google</span>{" "}
                </button>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button
                    className="text-indigo-700 font-medium"
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </button>
                </p>

                {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Start a 14 day free trial
              </a>
            </p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
