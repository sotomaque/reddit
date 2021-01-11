import React from 'react';

export function SvgArrowDown({ className = '' }) {
  function handleClick() {
    console.log('downvote clicked');
  }

  return (
    <div onClick={handleClick}>
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
      </svg>
    </div>
  );
}
