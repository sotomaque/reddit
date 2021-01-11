import React from 'react';

export function SvgArrowUp({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 11l7-7 7 7M5 19l7-7 7 7" />
    </svg>
  );
}
