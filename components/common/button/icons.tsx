import * as React from "react";

export function HeartOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M12 21s-6.5-4.35-9.2-7.04C1.04 12.18 1 9.6 2.7 7.9a5 5 0 017.2 0l2.1 2.1 2.1-2.1a5 5 0 017.2 7.2C18.5 16.65 12 21 12 21z"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function HeartFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21s-6.5-4.35-9.2-7.04C1.04 12.18 1 9.6 2.7 7.9a5 5 0 017.2 0l2.1 2.1 2.1-2.1a5 5 0 017.2 7.2C18.5 16.65 12 21 12 21z" />
    </svg>
  );
}
export function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M10 14l-1 1a4 4 0 01-6-6l3-3a4 4 0 016 0"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 10l1-1a4 4 0 116 6l-3 3a4 4 0 01-6 0"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function KakaoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="8" fill="black" />
      <circle cx="9" cy="12" r="1.2" fill="white" />
      <circle cx="12" cy="12" r="1.2" fill="white" />
      <circle cx="15" cy="12" r="1.2" fill="white" />
    </svg>
  );
}
export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 10V8a2 2 0 012-2h2V3h-2a5 5 0 00-5 5v2H8v3h2v8h3v-8h2.2l.8-3H13z" />
    </svg>
  );
}

export function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M9 18l6-6-6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
