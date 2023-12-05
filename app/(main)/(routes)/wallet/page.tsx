import TransactionsList from "@/components/Transactions";
import * as React from "react";

// NOTE: TODO: make url like from localhost/wallet  to localhost/[...userId]/wallet or something like
// bg-[#f1f5f9] text-[#2c4e84]

const Wallet = () => (
  <div className="flex h-full wallet_font">
    <div className="w-1/3 p-4 flex flex-col  bg-[#201f64] gap-20">
      <div className="self-center mb-10">
        <h1 className="text-3xl wallet_md:text-5xl font-medium text-[#fff] flex-col">
          <span className="text-center">My</span> <span>Wallet</span>
        </h1>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="font-light text-2xl lg:text-4xl text-[#fff]">
          Balance
        </div>
        <div className="text-blue-400 font-bold text-xl wallet_md:text-3xl mt-1">
          $4,265.56
        </div>
      </div>
    </div>
    <div className="w-2/3 p-4 bg-[#fffcfcde]  overflow-y-auto">
      <div className="text-center text-3xl wallet_md:text-5xl text-[#02000096] mb-20">
        Transactions
      </div>
      {/* <div className="text-center text-[#00000065]">
        No Transactions yet ...
      </div> */}

      <TransactionsList />
    </div>
  </div>
);

export default Wallet;
