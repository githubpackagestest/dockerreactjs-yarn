import * as React from "react";

function SvgBluecircle(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30 30-13.432 30-30S48.568 2 32 2"
        fill="#1e88e5"
      />
    </svg>
  );
}

export default SvgBluecircle;
