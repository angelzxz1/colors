import { useRef } from "react";

type props = {
  intensity: string;
  hex: string;
  color: string;
};

const Color = ({ intensity, hex, color }: props) => {
  const reference = useRef();
  return (
    <div
      ref={reference}
      style={{
        background: hex,
        height: "100px",
        width: "100px",
        color: parseInt(intensity) < 500 ? "black" : "white",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.1rem",
        borderRadius: "100px",
        transition: "all 350ms ease ",
        cursor: "pointer",
      }}
      onMouseEnter={function (e) {
        reference.current.style.borderRadius = "5px";
        reference.current.style.boxShadow = "0 0 10px white";
      }}
      onMouseLeave={function (e) {
        reference.current.style.borderRadius = "100px";
        reference.current.style.boxShadow = "";
      }}
    ></div>
  );
};

export default Color;

// {`${color} ${intensity}: ${hex.toUpperCase()}`}
