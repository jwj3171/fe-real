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

export function LikeActiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function ShareClipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}

export function ShareKakaoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.5 1.5 4.7 3.8 6.1L5 21l4.5-2.5c.8.1 1.6.2 2.5.2 5.52 0 10-3.48 10-7.5S17.52 3 12 3z" />
    </svg>
  );
}

export function ShareFacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
