"use client";
import { useEffect } from "react";
export function HeaderOffset() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  return null;
}
