"use client";
import { signIn } from "next-auth/react";
import { Quicksand } from "next/font/google";
import Image from "next/image"; // we need to config it in next.config.js,,, se Note.txt

import React from "react";

// bg-[#11a37f]
const Login = () => {
  return (
    <div
      className={`bg-[#11364b] h-screen flex flex-col items-center justify-center text-center login_font`}
    >
      <Image
        src="/rupee_img.png"
        width={500}
        height={500}
        alt="logo"
        className="-mt-48"
      />
      <button className="text-white font-bold text-3xl -mt-10 login_font">
        <span
          onClick={() => signIn("google")}
          className="bg-white text-green-500 rounded-2xl border-b-8 p-4 animate-pulse login_font mr-3"
        >
          Sign In
        </span>{" "}
        to use the App
      </button>
    </div>
  );
};

export default Login;
