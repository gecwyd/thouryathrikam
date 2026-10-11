"use client";

import { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type AutoVideoProps = {
  src: string;
  poster: StaticImageData;
  className?: string;
  label: string;
};

// Muted looping clip that only plays while on screen, and stays a still for reduced-motion users.
export function AutoVideo({ src, poster, className, label }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster.src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
