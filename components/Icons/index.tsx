import React from 'react';

/** 공통 SVG 래퍼: size, viewBox, className 등 공통 props 처리 */
function Icon({
  children,
  size = 16,
  viewBox = '0 0 16 16',
  className,
  ...rest
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function CircleIcon({ size = 20, strokeWidth = 2, ...rest }) {
  return (
    <Icon size={size} viewBox="0 0 20 20" {...rest}>
      <circle
        cx="10"
        cy="10"
        r="6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Icon>
  );
}

export function PlaneIcon({ size = 24, ...rest }) {
  return (
    <Icon size={size} viewBox="0 0 24 24" {...rest}>
      <path d="M21 16l-8-5-2-7-2 7-8 5 8-2 2 4 2-4 8 2z" fill="currentColor" />
    </Icon>
  );
}

export function ShareIcon({ size = 16, strokeWidth = 2, ...rest }) {
  return (
    <Icon size={size} viewBox="0 0 16 16" {...rest}>
      <path
        d="M8 14V3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4.5 6.5L8 3l3.5 3.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function TicketIcon({ size = 16, strokeWidth = 2, ...rest }) {
  return (
    <Icon size={size} viewBox="0 0 16 16" {...rest}>
      <rect
        x="2"
        y="4"
        width="12"
        height="8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M6 4v-2M10 4v-2M6 12v2M10 12v2"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Icon>
  );
}

export function CloudIcon({ size = 18, strokeWidth = 2, ...rest }) {
  return (
    <Icon size={size} viewBox="0 0 18 16" {...rest}>
      <path
        d="M4 12h12a4 4 0 00-8-4 4 4 0 00-4 4z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Icon>
  );
}

export function SunIcon({ size = 18, strokeWidth = 2, ...rest }) {
  return (
    <Icon size={size} viewBox="0 0 16 16" {...rest}>
      <circle
        cx="8"
        cy="8"
        r="4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M8 0v4M8 12v4M0 8h4M12 8h4M2.9 2.9l2.8 2.8M10.3 10.3l2.8 2.8M2.9 13.1l2.8-2.8M10.3 5.7l2.8-2.8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Icon>
  );
}
