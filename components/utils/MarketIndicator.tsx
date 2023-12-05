import React from "react";

interface SvgProps {
  marketStatus?: string;
  upText?: string;
  downText?: string;
}
// { marketStatus, upText }: SvgProps

export function UpIndicator({ marketStatus, upText }: SvgProps) {
  // @ts-ignore
  const text_up_style = {
    fill: "#BDC2C4",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
    fontSize: "20px",
  };

  // @ts-ignore
  const prices = {
    fill: "#7b6ba7",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "800",
    fontSize: "12px",
  };

  // @ts-ignore
  const payout = {
    fill: "#7b6ba7",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "13px",
    fontWeight: "200",
  };

  return (
    // <svg fill={marketStatus === "up" ? "green" : "neutralColor"}>
    //   {/* SVG for market going up */}
    //   <text
    //     x="50%"
    //     y="50%"
    //     textAnchor="middle"
    //     fill="white"
    //     fontSize="20px"
    //     fontFamily="Verdana"
    //     dy=".3em"
    //   >
    //     {upText}
    //   </text>
    // </svg>

    <svg
      height="65px"
      width="240px"
      viewBox="0 0 240 65"
      color="text"
      xmlns="http://www.w3.org/2000/svg"
      className="sc-bcPKhP cvmRst"
    >
      <g filter="url(#filter0_i)">
        <path
          d="M10.0001 49.2757L10.0003 64H234L234 49.2753C234 42.5136 229.749 36.4819 223.381 34.2077L138.48 3.8859C127.823 0.0796983 116.177 0.0796931 105.519 3.8859L20.6188 34.2076C14.2508 36.4819 10.0001 42.5138 10.0001 49.2757Z"
          fill="#eff4f5"
        ></path>{" "}
        <text
          x="50%"
          y="38%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={text_up_style}
        >
          UP
        </text>
        <text
          x="40%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={prices}
        >
          2.15x
        </text>{" "}
        <text
          x="58%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={payout}
        >
          Payout
        </text>{" "}
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="10.0001"
          y="1.03125"
          width="224"
          height="62.9688"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
          ></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
// { marketStatus, downText }: SvgProps

export function DownIndicator({ marketStatus, downText }: SvgProps) {
  // @ts-ignore
  const text_up_style = {
    fill: "#white",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
  };

  // @ts-ignore
  const prices = {
    fill: "white",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "800",
    fontSize: "12px",
  };

  // @ts-ignore
  const payout = {
    fill: "white",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "13px",
    fontWeight: "200",
  };

  return (
    // <svg fill={marketStatus === "down" ? "purple" : "neutralColor"}>
    //   {/* SVG for market going down */}
    //   <text
    //     x="50%"
    //     y="50%"
    //     textAnchor="middle"
    //     fill="white"
    //     fontSize="20px"
    //     fontFamily="Verdana"
    //     dy=".3em"
    //   >
    //     {downText}
    //   </text>
    // </svg>

    <svg
      height="65px"
      width="240px"
      viewBox="0 0 240 65"
      color="text"
      xmlns="http://www.w3.org/2000/svg"
      className="sc-bcPKhP cvmRst"
    >
      <g filter="url(#filter0_i)">
        <path
          d="M10.0001 15.7243L10.0003 1H234L234 15.7247C234 22.4864 229.749 28.5181 223.381 30.7923L138.48 61.1141C127.823 64.9203 116.177 64.9203 105.519 61.1141L20.6188 30.7924C14.2508 28.5181 10.0001 22.4862 10.0001 15.7243Z"
          fill="#ef449c"
        ></path>{" "}
        <text
          x="40%"
          y="30%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={prices}
        >
          {" "}
          8.17x{" "}
        </text>{" "}
        <text
          x="58%"
          y="30%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={payout}
        >
          Payout
        </text>
        <text
          x="50%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={text_up_style}
        >
          DOWN
        </text>
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="10.0001"
          y="1"
          width="224"
          height="62.9688"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
          ></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

function MarketIndicator({ marketStatus, upText, downText }: SvgProps) {
  if (marketStatus === "1") {
    return <UpIndicator marketStatus={marketStatus} upText={upText} />;
  } else if (marketStatus === "-1") {
    return <DownIndicator marketStatus={marketStatus} downText={downText} />;
  } else {
    return null; // or some default case
  }
}

export default MarketIndicator;
