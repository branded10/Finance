"use client";
import { useState, useEffect } from "react";

import Image from "next/image";

const StatusIcons = () => {
  const [isLarge, setIsLarge] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setMinutes(5);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  useEffect(() => {
    // Run on initial render
    setIsLarge(window.innerWidth > 968);

    // Set up event listener
    const handleResize = () => {
      setIsLarge(window.innerWidth > 968);
    };
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full min-w-[100px] -mt-52 flex nav_sm:flex-row flex-col justify-end items-center">
      {/* 3rd component */}
      <div className="w-full nav_sm:w-[250px] nav_lg:w-[390px] flex justify-center items-center">
        <div className="flex nav_md:flex-row p-5 flex-row-reverse items-center">
          <div className="relative nav_md:mr-3 -mr-1 ml-2">
            <div className="bg-[#ffffff] shadow-md shadow-gray-200 rounded-lg rounded-bl-3xl nav_lg:rounded-full flex nav_lg:flex-row flex-col  justify-center items-center px-2 nav_lg:py-1 pr-[30px] nav_lg:pr-[65px] nav_lg:gap-2 mr-4">
              <div className="nav_lg:text-lg text-sm text-[#7836d3] font-extrabold">
                <span className="countdown font-mono text-2xl">
                  <span
                    style={{ "--value": minutes } as React.CSSProperties}
                  ></span>
                  :
                  <span
                    style={{ "--value": seconds } as React.CSSProperties}
                  ></span>
                </span>
              </div>
              <div className="font-medium text-xs ">5m</div>
            </div>
            {/* right-7 top-[341px] */}
            <div className="absolute  nav_lg:right-[5px] nav_lg:-top-[21px] -right-[5px] -top-[5px] ">
              <Image
                src="clock.svg"
                width={isLarge ? 70 : 50}
                height={isLarge ? 70 : 50}
                // width={70}
                // height={70}
                alt="clock"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusIcons;
