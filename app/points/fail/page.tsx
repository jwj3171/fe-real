"use client";

import { useEffect } from "react";

export default function FailPage() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code") || "";
    const message = url.searchParams.get("message") || "";

    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: "toss:fail", code, message }, "*");
      window.close();
      return;
    }
    const qs = new URLSearchParams({ status: "fail", code, message });
    window.location.replace(`/points/charge?${qs.toString()}`);
  }, []);

  return null;
}
