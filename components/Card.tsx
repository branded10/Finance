"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRef } from "react";

import SwiperCore, {
  Navigation,
  Pagination,
  FreeMode,
  Scrollbar,
  A11y,
  Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import MarketIndicator from "./utils/MarketIndicator";

// Install the modules
// SwiperCore.use([Navigation, Pagination, Mousewheel]);

interface CardProps {
  icon?: any;
  liveText?: string;
  txtColor?: string;
  borderColor?: string;
  innerBorderColor?: string;
  navColor?: string;
  cardNumber?: string;
  lastPrice?: string;
  priceChange?: string;
  lockedPrice?: string;
  prizePool?: string;
  opacityClass?: string;
  pay1?: string;
  pay2?: string;
  isOpaque?: boolean;
  isFourth?: boolean;
  isFifth?: boolean;
  isThird?: boolean;
  handleFlip?: () => void;
  buttonClicked?: string;
  setButtonClicked?: string;
  handleUpClick?: () => void;
  handleDownClick?: () => void;
}

interface FlipCardProps extends CardProps {
  card: CardProps;
  icon: any;
  isOpaque: boolean;
  isFourth: boolean;
  isFifth: boolean;
  isThird: boolean;
}

const FrontCard = ({
  pay1,
  pay2,
  liveText,
  txtColor,
  borderColor,
  innerBorderColor,
  cardNumber,
  prizePool,
  isFourth,
  isOpaque,
  icon,
  handleFlip,
  handleUpClick,
  handleDownClick,
}: CardProps) => {
  return (
    <div
      className={`shadow-sm shadow-gray-300 w-[320px]  bg-white rounded-[30px]  border-b-[6px] border-gray-200 ${
        isOpaque && "opacity-50"
      }`}
      // style={{ borderColor: borderColor }}
    >
      <div
        className={`flex justify-between items-center px-4 py-2 ${
          isFourth && "bg-[#ffffff] border-gray-200 shadow-md shadow-gray-200"
        }  rounded-t-[30px] overflow-hidden `}
      >
        <div className="flex items-center">
          <div>
            <Image src={icon} width={20} height={20} alt="play" className="" />
          </div>
          <div
            className={`ml-1 font-extrabold text-sm`}
            style={{ color: txtColor }}
          >
            {liveText}
          </div>
        </div>

        <div className={`text-black font-medium`}>{cardNumber}</div>
      </div>
      {/* bg-[#e9e6ef] h-2.5 dark:bg-[#e9e6ef] */}

      <div className={`flex flex-col justify-center items-center mt-4`}>
        <div className={`-mb-[2px]`}>
          <Image src="card_up_white.svg" width={250} height={380} alt="image" />
        </div>

        {/* middle part of the card */}
        <div
          className={`flex flex-col p-4 rounded-2xl border-[2.5px] w-[285px] ${
            isFourth ? "h-[171px]" : ""
          } bg-white`}
          style={{ borderColor: innerBorderColor }}
        >
          {!isFourth && (
            <div className={`font-extrabold text-xs text-[#7b6ba7] mb-[8px]`}>
              LAST PRICE
            </div>
          )}

          <div className="flex justify-between items-center font-extrabold text-md text-[#280D5F]">
            <div>Prize Pool:</div>
            <div>8.5143 BNB</div>
          </div>

          <div className="text-white font-extrabold flex flex-col justify-center items-center mt-4 gap-[5px]">
            <div
              className="relative active:top-[3px] bg-[#31D0AA] cursor-pointer hover:opacity-50 active:shadow-none p-1 w-[250px] py-3 rounded-2xl shadow-sm shadow-black text-center text-md"
              onClick={handleUpClick}
            >
              Enter UP
            </div>
            <div
              className="relative bg-[#ED4B9E] active:top-[3px] cursor-pointer hover:opacity-50 active:shadow-none p-1 w-[250px] py-3 rounded-2xl shadow-sm shadow-black text-center text-md"
              onClick={handleDownClick}
            >
              Enter Down
            </div>
          </div>
        </div>

        <div className={`-mt-[2px]`}>
          <Image
            src="card_down_pink.svg"
            width={250}
            height={380}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

const BackCard = ({
  pay1,
  pay2,
  liveText,
  txtColor,
  borderColor,
  innerBorderColor,
  cardNumber,
  prizePool,
  isFourth,
  isOpaque,
  icon,
  handleFlip,
  buttonClicked,
  setButtonClicked,
}: CardProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    const decimalPointIndex = inputValue.indexOf(".");
    if (decimalPointIndex !== -1) {
      // if there is a decimal point
      const integerPart = inputValue.substring(0, decimalPointIndex);
      const decimalPart = inputValue.substring(decimalPointIndex + 1);
      if (
        !isNaN(inputValue) &&
        integerPart.length <= 10 &&
        decimalPart.length <= 4
      ) {
        setValue(inputValue);
      }
    } else {
      // if there is no decimal point
      if (!isNaN(inputValue) && inputValue.length <= 10) {
        setValue(inputValue);
      }
    }
  };

  return (
    <div
      className={`w-[320px] h-[410px] -mt-[20px] bg-white rounded-[30px] border-[2px] border-b-[5px] border-red-500 ${
        isOpaque && "opacity-50"
      }`}
      style={{ borderColor: borderColor }}
    >
      <div
        className={`flex justify-between items-center px-4 py-4 ${
          isFourth && "bg-[#ebeff4]"
        }  rounded-t-[30px] overflow-hidden `}
      >
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={handleFlip}>
            <Image src={"./left_arrow.svg"} width={20} height={20} alt="play" />
          </div>
          <div
            className={`ml-1 font-extrabold text-sm`}
            style={{ color: "#280d5f" }}
          >
            Set Position
          </div>
        </div>

        <div
          onClick={() =>
            setButtonClicked(buttonClicked === "up" ? "down" : "up")
          }
          className={`cursor-pointer flex ${
            buttonClicked === "up" ? "bg-[#31d0aa]" : "bg-[#ed4b9e]"
          } rounded-md p-1 px-2 text-white text-xs justify-center items-center`}
        >
          <Image
            src={"./up_arrow.svg"}
            width={20}
            height={20}
            alt="up_arrow"
            className={`${buttonClicked === "down" ? "rotate-180" : ""}`}
          />
          <p className="">{buttonClicked === "up" ? "Up" : "Down"}</p>
        </div>
      </div>
      {/* bg-[#e9e6ef] h-2.5 dark:bg-[#e9e6ef] */}

      <div className="flex flex-col">
        <div className="flex justify-between items-center py-2 pt-6 px-8 text-xs">
          <div className="text-[#8377b0] font-semibold">Commit:</div>
          <div className="flex justify-center items-center gap-1">
            <Image src={"bnb_logo.svg"} width={20} height={20} alt="bnb_logo" />
            <p className="text-[#3f2770] font-extrabold">BNB</p>
          </div>
        </div>

        <div className="self-center">
          <input
            type="text"
            // pattern="^\d{1,10}$"
            // inputMode="decimal"
            placeholder="0.0"
            value={value}
            onChange={handleChange}
            className="px-4 py-4 w-64 text-black bg-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-0"
            style={{ textAlign: "right" }}
          />
        </div>
      </div>
    </div>
  );
};

const FlipCard = ({ card, icon, isOpaque, isFourth }: FlipCardProps) => {
  const [isFlipped, setFlipped] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleUpClick = () => {
    setButtonClicked("up");
    setFlipped(!isFlipped);
  };

  const handleDownClick = () => {
    setButtonClicked("down");
    setFlipped(!isFlipped);
  };

  return (
    <div className="container">
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="card-content">
              {FrontCard({
                ...card,
                icon,
                isFourth,
                isOpaque,
                handleFlip,
                handleUpClick,
                handleDownClick,
              })}
            </div>
            {/* <button className="flip-button" onClick={handleFlip}>
              Flip
            </button> */}
          </div>
          <div className="flip-card-back">
            <div className="card-content">
              {BackCard({
                ...card,
                icon,
                isFourth,
                isOpaque,
                handleFlip,
                buttonClicked,
                setButtonClicked,
              })}
            </div>
            {/* <button className="flip-button" onClick={handleFlip}>
              Flip
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({
  liveText,
  txtColor,
  borderColor,
  innerBorderColor,
  navColor,
  cardNumber,
  lastPrice,
  priceChange,
  lockedPrice,
  prizePool,
  opacityClass,
  icon,
  pay1,
  pay2,
  isOpaque,
  isFourth,
  isFifth,
  isThird,
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`w-[320px] ${isFifth ? "h-[305px] mt-10" : "h-[372px]"} ${
        isThird ? "h-[372px]" : ""
      } bg-white rounded-[30px] border-[2px] border-b-[5px] ${
        isOpaque && "opacity-50 hover:opacity-100"
      }`}
      style={{ borderColor: borderColor }}
    >
      <div
        className={`flex justify-between items-center px-4 py-2 ${
          isFourth && "bg-[#7645D9]"
        } ${isFifth && "bg-[#E7E3EB]"} rounded-t-[30px] overflow-hidden ${
          !isThird && !isFifth && "bg-[#d9d9e8]"
        } `}
      >
        <div className="flex items-center">
          <div>
            <Image src={icon} width={20} height={20} alt="play" />
          </div>
          <div
            className={`ml-1 font-extrabold text-sm`}
            style={{ color: txtColor }}
          >
            {liveText}
          </div>
        </div>

        <div
          className={`text-[#000000] ${
            isOpaque && "text-[#c1c7d5]"
          } font-medium`}
        >
          {cardNumber}
        </div>
      </div>
      {/* bg-[#e9e6ef] h-2.5 dark:bg-[#e9e6ef] */}
      {isThird && (
        <div className={`w-full bg-[#e9e6ef] h-2.5 dark:bg-[#e9e6ef]`}>
          <div className={`bg-[#7836d3] h-2.5`} style={{ width: "45%" }}></div>
        </div>
      )}

      <div className={`flex flex-col justify-center items-center mt-4`}>
        {!isFifth && (
          <div className={`-mb-[2px]`}>
            {/* <Image
              src="card_up_white.svg"
              width={250}
              height={380}
              alt="image"
            /> */}

            {MarketIndicator({
              marketStatus: "1",
              upText: "up",
              downText: "",
            })}
          </div>
        )}
        {isFifth && (
          <div className={`-mb-[2px]`}>
            {/* <Image
              src="card_up_last.svg"
              width={250}
              height={380}
              alt="image"
            /> */}

            {MarketIndicator({
              marketStatus: "1",
              upText: "up",
              downText: "",
            })}
          </div>
        )}

        {/* middle part of the card */}
        <div
          className={`flex flex-col p-4 rounded-2xl border-[2.5px] w-[285px] ${
            isFifth ? "h-[95px]" : "h-[155px]"
          } ${isFourth ? "h-[171px]" : ""} bg-white`}
          style={{ borderColor: innerBorderColor }}
        >
          {!isFourth && !isFifth && (
            <div className={`font-extrabold text-xs text-[#7b6ba7] mb-[8px]`}>
              LAST PRICE
            </div>
          )}
          {!isFourth && !isFifth && (
            <div className={`flex justify-between items-center mb-6`}>
              <div
                className={`font-bold text-xl text-[#ef449c] underline_dotted`}
              >
                {lastPrice}
              </div>
              <div
                className={`flex justify-center items-center bg-[#ef449c] py-[5px] px-2 rounded-md gap-2`}
              >
                <Image
                  src="card_down_arrow.svg"
                  width={20}
                  height={20}
                  alt="arrow"
                />
                <p className={`text-white text-sm font-medium`}>
                  {priceChange}
                </p>
              </div>
            </div>
          )}
          {!isFourth && !isFifth && (
            <div
              className={`flex justify-between items-center font-semibold text-xs text-[#280d5f] mb-1`}
            >
              <div>Locked Price:</div>
              <div>{lockedPrice}</div>
            </div>
          )}
          {!isFifth && (
            <div className="flex justify-between items-center font-extrabold text-md text-[#280D5F]">
              <div>Prize Pool:</div>
              <div>8.5143 BNB</div>
            </div>
          )}
          {/* {isFourth && (
              <div className="text-white font-extrabold flex flex-col justify-center items-center mt-4 gap-1">
                <div className="bg-[#31D0AA] p-1 w-[250px] py-3 rounded-2xl shadow-sm shadow-black text-center text-md">
                  Enter UP
                  </div>
                <div className="bg-[#ED4B9E] p-1 w-[250px] py-3 rounded-2xl shadow-sm shadow-black text-center text-md">
                  Enter Down
                  </div>
                  </div>
                )} */}

          {isFourth && (
            <div className="text-white font-extrabold flex flex-col justify-center items-center mt-4 gap-1">
              <div
                className="bg-[#31D0AA] p-1 w-[250px] py-3 rounded-2xl shadow-sm shadow-black text-center text-md"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                Enter UP
              </div>
              <div
                className="bg-[#ED4B9E] p-1 w-[250px] py-3 rounded-2xl shadow-sm shadow-black text-center text-md"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                Enter Down
              </div>
            </div>
          )}

          {isFifth && (
            <div className="flex flex-col gap-3 text-[#280D5F] justify-center items-center">
              <div className="text-md font-bold">Entry starts</div>
              <div className="text-2xl font-extrabold">~00:38</div>
            </div>
          )}
        </div>
        {!isFifth && (
          <div className={`-mt-[2px]`}>
            <Image
              src="card_down_pink.svg"
              width={250}
              height={380}
              alt="image"
            />
          </div>
        )}

        {isFifth && (
          <div className={`-mt-[2px]`}>
            <Image
              src="card_down_last.svg"
              width={250}
              height={380}
              alt="image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const cardsData = [
  {
    pay1: "1.94x",
    pay2: "2.06x",
    liveText: "Expired",
    txtColor: "#bdc3ce",
    borderColor: "#cfd3da",
    innerBorderColor: "#ef449c",
    navColor: "#d9d9e8",
    cardNumber: "#218484",
    lastPrice: "$227.5332",
    priceChange: "$-0.1066",
    lockedPrice: "$228.9464",
    prizePool: "8.5143BNB",
  },
  {
    pay1: "1.94x",
    pay2: "2.06x",
    liveText: "Expired",
    txtColor: "#bdc3ce",
    borderColor: "#cfd3da",
    innerBorderColor: "#ef449c",
    navColor: "#d9d9e8",
    cardNumber: "#218484",
    lastPrice: "$227.5332",
    priceChange: "$-0.1066",
    lockedPrice: "$228.9464",
    prizePool: "8.5143BNB",
  },

  {
    pay1: "1.76x",
    pay2: "2.32x",
    liveText: "Expired",
    txtColor: "#bdc3ce",
    borderColor: "#cfd3da",
    innerBorderColor: "#ef449c",
    navColor: "#d9d9e8",
    cardNumber: "#218485",
    lastPrice: "$228.9533",
    priceChange: "$-0.5791",
    lockedPrice: "$228.9473",
    prizePool: "8.5143BNB",
  },
  {
    pay1: "2.15x",
    pay2: "1.87x",
    liveText: "LIVE",
    txtColor: "",
    borderColor: "",
    innerBorderColor: "#ef449c",
    cardNumber: "#218486",
    lastPrice: "$225.8452",
    priceChange: "$-0.4141",
    lockedPrice: "$225.4332",
    prizePool: "8.5143BNB",
  },
  {
    pay1: "1.35x",
    pay2: "3.84x",
    liveText: "Next",
    txtColor: "#000",
    borderColor: "#cfd3da",
    innerBorderColor: "#82c7ea",
    cardNumber: "#218487",
    prizePool: "2.3760BNB",
  },
  {
    liveText: "Later",
    txtColor: "#000",
    borderColor: "#cfd3da",
    innerBorderColor: "#cfd3da",
    cardNumber: "#218488",
  },
  {
    liveText: "Later",
    txtColor: "#000",
    borderColor: "#cfd3da",
    innerBorderColor: "#cfd3da",
    cardNumber: "#218488",
  },
];

export default function Cards() {
  const [slidesPerView, setSlidesPerView] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(0);
  const [initialSlide, setInitialSlide] = useState(0);

  const swiperRef = useRef(null);

  const liveTextIconMap = {
    LIVE: "cardplay.svg",
    Expired: "expired.svg",
    Next: "nextPlay.svg",
    Later: "timer.svg",
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const zoomLevel = window.devicePixelRatio;

      // if (windowWidth >= 640 && zoomLevel > 1.25) {
      //   setSlidesPerView(5);
      //   setSpaceBetween(30);
      //   setInitialSlide(5);
      // } else if (windowWidth >= 480 && zoomLevel > 0.75) {
      //   setSlidesPerView(5.5);
      //   setSpaceBetween(1);
      //   setInitialSlide(3);
      // } else {
      //   setSlidesPerView(15);
      //   setSpaceBetween(8);
      //   setInitialSlide(10);
      // }
      if (windowWidth >= 1629) {
        setSlidesPerView(5);
        setSpaceBetween(5);
        setInitialSlide(3);
      } else if (windowWidth >= 1200) {
        setSlidesPerView(5);
        setSpaceBetween(5);
        setInitialSlide(3);
      } else if (windowWidth >= 1024) {
        setSlidesPerView(2.5);
        setSpaceBetween(1);
        // setInitialSlide(3);
      } else if (windowWidth >= 845) {
        setSlidesPerView(2.1);
        setSpaceBetween(1);
        // setInitialSlide(3);
      } else if (windowWidth >= 640) {
        setSlidesPerView(1.9);
        setSpaceBetween(1);
        // setInitialSlide(3);
      } else if (windowWidth >= 200) {
        setSlidesPerView(0.6);
        setSpaceBetween(1);
        // setInitialSlide(3);
      } else {
        setSlidesPerView(0.6);
        setSpaceBetween(8);
        // setInitialSlide(10);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially to set the state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      mousewheel={{
        forceToAxis: true, // Only scroll in one direction
        invert: true, // Invert the mouse wheel direction
        sensitivity: 0.5, // Reduce the sensitivity of the mouse wheel
        eventsTarget: ".swiper-container", // Detect mouse wheel events on the swiper container
      }}
      style={{ width: "100%", height: "400px", paddingTop: "10px" }}
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      centeredSlides={true}
      // slidesPerView={slidesPerView}
      // spaceBetween={spaceBetween}
      // initialSlide={initialSlide}
      slidesPerView={5}
      spaceBetween={5}
      initialSlide={3}
      // navigation
      // centeredSlidesBounds={true}
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // bg-gray-950
      onSwiper={(swiper) => console.log(swiper)}
      // onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={() => console.log("slide change")}
      className="w-full flex  gap-10"
    >
      <SwiperSlide></SwiperSlide>
      {/* <SwiperSlide></SwiperSlide> */}
      {/* <SwiperSlide></SwiperSlide> */}

      {cardsData.map((card, index) => {
        const iconPath =
          liveTextIconMap[card.liveText as keyof typeof liveTextIconMap];

        const isThirdCard = index === 3;
        const isFourthCard = index === 4;
        const isFifthCard = index === 5 || index === 6;

        if (index === 4) {
          return (
            <SwiperSlide
              key={index}
              style={{ width: "calc(100% / 5 - 1rem)", margin: "0.5rem" }}
            >
              <div className="card">
                <FlipCard
                  key={index}
                  card={card}
                  icon={iconPath}
                  isOpaque={index < 3}
                  isFourth={isFourthCard}
                  isFifth={isFifthCard}
                  isThird={isThirdCard}
                />
              </div>
            </SwiperSlide>
          );
        } else {
          return (
            <SwiperSlide key={index}>
              <div className="card gap-10">
                <Card
                  key={index}
                  {...card}
                  icon={iconPath}
                  isOpaque={index < 3}
                  isFourth={isFourthCard}
                  isFifth={isFifthCard}
                  isThird={isThirdCard}
                />
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
}
