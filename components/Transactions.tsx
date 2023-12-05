"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

// Dummy data for transactions
const transactions = [
  { id: 1, type: "credit", amount: 5000, date: new Date() },
  { id: 2, type: "debit", amount: 500, date: new Date() },
  { id: 3, type: "debit", amount: 2000, date: new Date() },
  { id: 4, type: "debit", amount: 3000, date: new Date() },
  { id: 5, type: "credit", amount: 4000, date: new Date() },
  { id: 6, type: "debit", amount: 2000, date: new Date() },
  { id: 7, type: "debit", amount: 2000, date: new Date() },
  { id: 8, type: "credit", amount: 2000, date: new Date() },
  { id: 9, type: "debit", amount: 2000, date: new Date() },
  { id: 10, type: "debit", amount: 2000, date: new Date() },
  { id: 11, type: "debit", amount: 2000, date: new Date() },
  { id: 12, type: "credit", amount: 2000, date: new Date() },
  { id: 14, type: "debit", amount: 2000, date: new Date() },
  { id: 15, type: "credit", amount: 2000, date: new Date() },
  { id: 16, type: "debit", amount: 2000, date: new Date() },
  { id: 17, type: "debit", amount: 2000, date: new Date() },
  { id: 18, type: "credit", amount: 2000, date: new Date() },
  { id: 19, type: "debit", amount: 2000, date: new Date() },
  { id: 20, type: "credit", amount: 2000, date: new Date() },
  { id: 21, type: "debit", amount: 2000, date: new Date() },
  { id: 22, type: "debit", amount: 2000, date: new Date() },
  { id: 23, type: "debit", amount: 2000, date: new Date() },
  { id: 24, type: "credit", amount: 2000, date: new Date() },
  { id: 26, type: "credit", amount: 2000, date: new Date() },
  { id: 27, type: "credit", amount: 2000, date: new Date() },
  { id: 28, type: "credit", amount: 2000, date: new Date() },
  { id: 29, type: "credit", amount: 2000, date: new Date() },
  { id: 30, type: "credit", amount: 2000, date: new Date() },
  { id: 31, type: "credit", amount: 7000, date: new Date() },
  { id: 32, type: "credit", amount: 1000, date: new Date() },
  // Add more transactions as needed
];

const TransactionsList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isScreenBig, setIsScreenBig] = React.useState(window.innerWidth > 800);
  const itemsPerPage = 13;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsScreenBig(window.innerWidth > 800);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // return (
  //   <>
  //     {transactions.length > 0 ? (
  //       transactions
  //         .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  //         .map((transaction) => (
  //           <div
  //             key={transaction.id}
  //             className="flex justify-between border-b border-gray-200 py-2"
  //           >
  //             <div className="flex gap-5">
  //               {transaction.type === "credit" ? (
  //                 <Image
  //                   src="/pluss_icon.png"
  //                   alt="Credit"
  //                   width={25}
  //                   height={20}
  //                 />
  //               ) : (
  //                 <Image
  //                   src="/minuss_icon.png"
  //                   alt="Debit"
  //                   width={25}
  //                   height={20}
  //                 />
  //               )}
  //               {transaction.type.charAt(0).toUpperCase() +
  //                 transaction.type.slice(1)}
  //               ed
  //             </div>

  //             <div className="text-gray-400 ">
  //               {transaction.date.toLocaleString()}
  //             </div>

  //             <div
  //               className={`${
  //                 transaction.type === "credit"
  //                   ? "text-[#49ca76]"
  //                   : "text-[#fb6565]"
  //               }`}
  //             >
  //               ${transaction.amount.toFixed(2)}
  //             </div>

  //             {/* <Link href={`/transaction/${transaction.id}`}>Details</Link> */}
  //             <div className="text-gray-500">
  //               {transaction.type === "debit" ? "Withdrawn" : "Deposited"}
  //             </div>
  //           </div>
  //         ))
  //     ) : (
  //       <div className="text-center text-[#00000065]">
  //         No Transactions yet ...
  //       </div>
  //     )}
  //     <div className="join mt-5">
  //       {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
  //         <input
  //           key={page}
  //           className="join-item btn btn-square"
  //           type="radio"
  //           name="options"
  //           aria-label={page.toString()}
  //           checked={page === currentPage}
  //           onChange={() => handleClick(page)}
  //         />
  //       ))}
  //     </div>
  //   </>
  // );
  return (
    <>
      {transactions.length > 0 ? (
        transactions
          .sort((a: any, b: any) => b.date - a.date)
          // .sort((a: any, b: any) => b.id - a.id) Dont use id, its not good idea
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-row justify-between border-b border-gray-200 py-2"
            >
              {isScreenBig ? (
                <>
                  {" "}
                  <div className="flex gap-5">
                    {transaction.type === "credit" ? (
                      <Image
                        src="/pluss_icon.png"
                        alt="Credit"
                        width={25}
                        height={20}
                      />
                    ) : (
                      <Image
                        src="/minuss_icon.png"
                        alt="Debit"
                        width={25}
                        height={20}
                      />
                    )}
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                    ed
                  </div>
                  <div className="text-gray-400 ">
                    {transaction.date.toLocaleString()}
                  </div>
                  <div
                    className={`${
                      transaction.type === "credit"
                        ? "text-[#49ca76]"
                        : "text-[#fb6565]"
                    }`}
                  >
                    ${transaction.amount.toFixed(2)}
                  </div>
                  {/* <Link href={`/transaction/${transaction.id}`}>Details</Link> */}
                  <div className="text-gray-500">
                    {transaction.type === "debit" ? "Withdrawn" : "Deposited"}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row gap-5 items-center">
                    <div>
                      {transaction.type === "credit" ? (
                        <Image
                          src="/pluss_icon.png"
                          alt="Credit"
                          width={25}
                          height={20}
                        />
                      ) : (
                        <Image
                          src="/minuss_icon.png"
                          alt="Debit"
                          width={25}
                          height={20}
                        />
                      )}
                    </div>
                    <div>
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                      ed
                      <div className="text-gray-400 ">
                        {transaction.date.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div
                      className={`${
                        transaction.type === "credit"
                          ? "text-[#49ca76]"
                          : "text-[#fb6565]"
                      }`}
                    >
                      ${transaction.amount.toFixed(2)}
                    </div>

                    <div className="text-gray-500">
                      {transaction.type === "debit" ? "Withdrawn" : "Deposited"}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
      ) : (
        <div className="text-center text-[#00000065]">
          No Transactions yet ...
        </div>
      )}
      <div className="join mt-5 shadow-md shadow-gray-400 text-white">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <input
            key={page}
            className="join-item btn btn-square bg-[#f2f2f2] border-none"
            type="radio"
            name="options"
            aria-label={page.toString()}
            checked={page === currentPage}
            onChange={() => handleClick(page)}
          />
        ))}
      </div>
    </>
  );
};

export default TransactionsList;
