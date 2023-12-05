// "use client";

// import { useState } from "react";

// export default function Dialog() {
//   const [balance, setBalance] = useState(0);

//   const handleAdd = () => {
//     setBalance((prevBalance) => prevBalance + 1000);
//   };

//   const handleSubtract = () => {
//     setBalance((prevBalance) => prevBalance - 1000);
//   };

//   return (
//     <dialog id="my_modal_3" className="modal">
//       <div className="modal-box">
//         <form method="dialog">
//           <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//             ✕
//           </button>
//         </form>
//         <h3 className="font-bold text-lg">Wallet Balance: {balance}</h3>
//         <p className="py-4">
//           <button
//             className="btn btn-primary mr-2 bg-rose-500 border-none hover:bg-rose-600"
//             onClick={handleSubtract}
//           >
//             -
//           </button>
//           <button className="btn btn-primary ml-2" onClick={handleAdd}>
//             +
//           </button>
//         </p>
//       </div>
//     </dialog>
//   );
// }

"use client";

import { useState } from "react";

export default function Dialog() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    setBalance((prevBalance) => prevBalance + 1000);
  };

  const handleSubtract = () => {
    if (balance >= 1000) {
      setBalance((prevBalance) => prevBalance - 1000);
    }
  };

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const number = parseInt(amount);
    if (!isNaN(number) && number >= 0) {
      setBalance((prevBalance) => prevBalance + number);
    }
    setAmount("");
  };

  const handleWithdrawMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const number = parseInt(amount);
    if (!isNaN(number) && number >= 0 && balance >= number) {
      setBalance((prevBalance) => prevBalance - number);
    }
    setAmount("");
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Wallet Balance: ₹{balance}</h3>
        <p className="py-4">
          <button
            className="btn btn-primary mr-2 bg-rose-500 border-none hover:bg-rose-600 px-5"
            onClick={handleSubtract}
          >
            -
          </button>
          <button className="btn btn-primary ml-2 px-5" onClick={handleAdd}>
            +
          </button>
        </p>
        <form
          className="flex flex-col items-center justify-center space-y-4"
          onSubmit={handleAddMoney}
        >
          <input
            type="text"
            className="input input-bordered"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex space-x-4">
            <button className="btn btn-primary text-white" type="submit">
              Add Money
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={handleWithdrawMoney}
            >
              Withdraw Money
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
