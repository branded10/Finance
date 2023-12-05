// "use client";

// import * as React from "react";
// const Wallet = (props: any) => (
//   <div className="text-indigo-700 border border-gray-200 hover:bg-[#c2c2f1] transition-all ease-in-out delay-50 font-semibold p-2 px-7 py-2 text-2xl rounded-lg cursor-pointer absolute top-[0.80rem] right-[10.5rem]">
//     Wallet
//   </div>
// );
// export default Wallet;

import * as React from "react";
import Link from "next/link";

const Wallet = (props: any) => (
  <Link href="/wallet">
    <div className="wallet_font text-indigo-700 border border-gray-200 hover:bg-[#e4e4f8] transition-all ease-in-out delay-50 font-semibold p-2 px-7 py-2 text-2xl rounded-lg cursor-pointer absolute top-[0.80rem] right-[10.5rem]">
      Wallet
    </div>
  </Link>
);

export default Wallet;
