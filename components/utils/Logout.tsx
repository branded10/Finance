"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

export default function SignOutButton() {
  return (
    <div
      className="absolute top-6 font-bold hover:opacity-75 right-[16px] rounded-md w-[100px] p-2 text-center text-white border-0 cursor-pointer"
      onClick={() => signOut()}
    >
      {/* <button>Sign Out</button> */}
      <Image src="/log-out.png" width={22} height={22} alt="SignOut" />
    </div>
  );
}
