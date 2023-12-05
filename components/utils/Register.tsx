"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "module";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Login from "./Login";
import Loader from "../ui/Loader";

export default function Register() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { name, email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Collect form data
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      // Combine first name and last name into a single name field
      data.name = data.firstName + " " + data.lastName;
      delete data.firstName;
      delete data.lastName;

      // Rename email address field to match User schema
      // data.email = data.emailAddress;
      // delete data.emailAddress;

      // Send POST request to your server

      const res = await fetch("/api/auth/users", {
        method: "POST",
        body: JSON.stringify(userInfo),
      }).then((res) => res.json());

      console.log(res);
      console.log("Response = ", !!res.user);

      // If the signup was successful, sign the user in
      if (!!res.user) {
        await signIn("credentials", {
          callbackUrl: `${window.location.origin}`,
          email: userInfo.email,
          password: userInfo.password,
        });
      }
    } catch (error) {
      return <div>ERRORRRRRR</div>;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-[9999px]">
            <Loader />
          </div>
        )}
        {showLogin ? (
          <Login />
        ) : (
          <div className="lg:m-5">
            <div className="relative border border-gray-100 space-y-5 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-md lg:p-10">
              <form onSubmit={handleRegister}>
                <h1 className="mb-6 text-xl font-bold lg:text-3xl">
                  Create your Account
                </h1>

                <div className="grid gap-3 md:grid-cols-2 mb-8">
                  <div>
                    <label className="ml-2"> First Name </label>
                    <input
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="mt-2 h-12 w-full px-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray"
                    />
                  </div>
                  <div>
                    <label className="ml-2"> Last Name </label>
                    <input
                      name="lname"
                      type="text"
                      // value={lname}
                      onChange={handleChange}
                      placeholder="Last  Name"
                      className="mt-2 h-12 w-full  px-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray"
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label className="ml-2"> Username </label>
                  <input
                    name="username"
                    type="text"
                    onChange={handleChange}
                    placeholder="Username"
                    className="mt-2 h-12 w-full   px-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray"
                  />
                </div>
                <div className="mb-8">
                  <label className="ml-2"> Email Address </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Info@example.com"
                    className="mt-2 h-12 w-full   px-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray"
                  />
                </div>
                <div className="mb-8">
                  <label className="ml-2"> Password </label>
                  <input
                    name="password"
                    type="password"
                    value={password} // YOU NEED TO DECLARE some more in const {name,email,.....} = userIndo
                    onChange={handleChange}
                    placeholder="****************"
                    className="mt-2 h-12 w-full  px-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray"
                  />
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {/* <div> */}
                  {/* <label className=""> Gender </label>
            <div className="relative w-56 mt-2  rounded-lg">
            <input
            className="peer hidden"
            type="checkbox"
            name="select-1"
            id="select-1"
            />
            <label
            htmlFor="select-1"
            className="flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring"
            >
            Select Option{" "}
            </label>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                  />
                  </svg>
                  <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                  <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                  Male
                  </li>
                  <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                  Female
                  </li>
                  <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                  Other
                  </li>
                  </ul>
                  </div>
                </div> */}
                  <div>
                    <label className="ml-2">
                      {" "}
                      Phone:{" "}
                      <span className="text-sm text-gray-400">
                        (optional)
                      </span>{" "}
                    </label>
                    <input
                      name="phoneNumber"
                      type="text"
                      placeholder="+543 5445 0543"
                      onChange={handleChange}
                      className="mt-2 h-12 w-full  px-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray"
                    />
                  </div>
                </div>
                {/* <div className="checkbox">
          <input type="checkbox" id="chekcbox1" defaultChecked="" />
          <label htmlFor="checkbox1">
          I agree to the{" "}
          <a href="#" target="_blank" className="text-blue-600">
          {" "}
          Terms and Conditions{" "}
          </a>{" "}
          </label>
        </div> */}
                <div>
                  <button
                    type="submit"
                    className="mt-10 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
                  >
                    Get Started
                  </button>
                </div>
                <div className="divider font-medium text-sm mt-8">
                  Or continue with
                </div>
              </form>
              <button
                className="justify-center items-center w-full hover:bg-gray-100 border border-gray-200 transition-all ease-in-out delay-50 py-[10px] px-6 rounded-lg text-sm font-medium login_font flex gap-4 mt-10"
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
                Already have an account?{" "}
                <button
                  className="text-indigo-700 font-medium"
                  onClick={() => setShowLogin(true)}
                >
                  Signin
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
