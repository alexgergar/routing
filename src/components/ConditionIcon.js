import React from "react";

const ConditionIcon = () => {
  return (
    <svg
      xmlns="htpp://ww.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7D7D7D"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="4" r="2.5"></circle>
      <path d="M 12 7.5 V17.5" />
      <circle cx="4" cy="20" r="2.5"></circle>
      <circle cx="12" cy="20" r="2.5"></circle>
      <circle cx="20" cy="20" r="2.5"></circle>
      <path d="M 4 17.5 Q4 12 8 12 H16 Q20 12 20 17.5"></path>
    </svg>
  );
};

export default ConditionIcon;
