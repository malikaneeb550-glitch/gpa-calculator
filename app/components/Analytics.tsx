"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T6QFLW1EVW";

export default function Analytics(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (typeof w.gtag !== "function") return;
    // Send a config / page_view to GA4 for client-side navigation
    w.gtag("config", GA_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}
