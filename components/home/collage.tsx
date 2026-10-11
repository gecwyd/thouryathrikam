import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Small seeded RNG so torn edges render the same on server and client.
function rng(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** clip-path polygon with ragged edges on the chosen sides, like paper torn by hand. */
export function tornPath(seed: number, sides: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean } = { top: true, bottom: true }) {
  const rand = rng(seed);
  const depth = 2.6;
  const pts: string[] = [];
  const edge = (from: [number, number], to: [number, number], ragged: boolean, inward: [number, number]) => {
    const steps = ragged ? 22 : 1;
    for (let i = 0; i < steps; i++) {
      const f = i / steps;
      const j = ragged && i > 0 ? rand() * depth : 0;
      const x = from[0] + (to[0] - from[0]) * f + inward[0] * j;
      const y = from[1] + (to[1] - from[1]) * f + inward[1] * j;
      pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
    }
  };
  edge([0, 0], [100, 0], !!sides.top, [0, 1]);
  edge([100, 0], [100, 100], !!sides.right, [-1, 0]);
  edge([100, 100], [0, 100], !!sides.bottom, [0, -1]);
  edge([0, 100], [0, 0], !!sides.left, [1, 0]);
  return `polygon(${pts.join(",")})`;
}

export function Tape({ className, tone = "yellow" }: { className?: string; tone?: "yellow" | "pink" | "clear" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-20 block h-7 w-24 shadow-sm",
        tone === "yellow" && "bg-[#f7d774]/75",
        tone === "pink" && "bg-[#ff7ab6]/70",
        tone === "clear" && "bg-white/45 backdrop-blur-[1px]",
        className,
      )}
      style={{ clipPath: "polygon(3% 0,97% 4%,100% 50%,96% 100%,2% 96%,0 50%)" }}
    />
  );
}

export function Polaroid({
  children,
  caption,
  className,
  style,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn("relative block bg-[#fffdf7] p-2.5 pb-0 shadow-[0_18px_40px_-14px_rgba(40,20,5,0.55)] sm:p-3 sm:pb-0", className)}
      style={style}
    >
      <span className="relative block h-[calc(100%-3.25rem)] overflow-hidden bg-black sm:h-[calc(100%-3.75rem)]">{children}</span>
      {caption && (
        <span className="flex h-[3.25rem] items-center justify-center px-2 text-center font-[family-name:var(--font-hand)] text-xl leading-none text-[#1d140d] sm:h-[3.75rem] sm:text-2xl">
          {caption}
        </span>
      )}
    </span>
  );
}

const ransomStyles: { box: string; text: string }[] = [
  { box: "bg-[#141010]", text: "font-[family-name:var(--font-anton)] text-[#f3e9d8]" },
  { box: "bg-[#f29a2e]", text: "font-[family-name:var(--font-instrument)] italic text-[#141010]" },
  { box: "bg-[#fffdf7]", text: "font-[family-name:var(--font-anton)] text-[#e2361b]" },
  { box: "bg-[#ff2e88]", text: "font-mono font-bold text-white" },
  { box: "bg-[#f7d774]", text: "font-[family-name:var(--font-instrument)] text-[#141010]" },
  { box: "bg-[#1f6b48]", text: "font-[family-name:var(--font-anton)] text-[#f7d774]" },
  { box: "bg-[#fffdf7] border-2 border-[#141010]", text: "font-[family-name:var(--font-hand)] font-bold text-[#141010]" },
  { box: "bg-[#2a3fd6]", text: "font-[family-name:var(--font-anton)] text-white" },
];

/**
 * Letters cut from different magazines, glued in a row.
 * Pass `parts` for scripts like Malayalam, where conjuncts must stay on one scrap.
 */
export function Ransom({
  text,
  parts,
  seed = 7,
  className,
  script = "latin",
}: {
  text: string;
  parts?: string[];
  seed?: number;
  className?: string;
  script?: "latin" | "malayalam";
}) {
  const rand = rng(seed);
  return (
    <span className={cn("inline-flex flex-wrap items-center justify-center gap-x-[0.08em] gap-y-[0.12em]", className)} aria-label={text}>
      {(parts ?? [...text]).map((ch, i) => {
        const picked = ransomStyles[Math.floor(rand() * ransomStyles.length)];
        // Display fonts here are Latin-only, so Malayalam keeps the colours but uses its own face.
        const style =
          script === "malayalam"
            ? { box: picked.box, text: cn(picked.text, "font-[family-name:var(--font-malayalam)] font-extrabold not-italic") }
            : picked;
        const rot = (rand() - 0.5) * 14;
        const lift = (rand() - 0.5) * 0.18;
        return (
          <span
            key={i}
            aria-hidden
            className={cn(
              "inline-block px-[0.12em] pb-[0.04em] pt-[0.06em] leading-[0.95] shadow-[0_3px_0_rgba(20,16,16,0.18)]",
              script === "malayalam" && "px-[0.16em] pb-[0.1em] pt-[0.02em] leading-[1.3]",
              style.box,
            )}
            style={{ transform: `rotate(${rot.toFixed(1)}deg) translateY(${lift.toFixed(2)}em)` }}
          >
            <span className={style.text}>{ch}</span>
          </span>
        );
      })}
    </span>
  );
}

/** Starburst sticker. */
export function Burst({ className, children, color = "#ff2e88" }: { className?: string; children: ReactNode; color?: string }) {
  const points = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2;
    const r = i % 2 === 0 ? 50 : 41;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <span className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]" aria-hidden>
        <polygon points={points} fill={color} />
      </svg>
      <span className="relative text-center">{children}</span>
    </span>
  );
}

export function ScribbleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={cn("pointer-events-none", className)} aria-hidden>
      <path d="M6 14 C 40 4, 86 18, 98 58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M84 52 L 99 62 L 106 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScribbleCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" fill="none" preserveAspectRatio="none" className={cn("pointer-events-none", className)} aria-hidden>
      <path
        d="M30 20 C 80 2, 170 6, 190 40 C 205 70, 120 88, 60 82 C 10 77, 2 50, 22 30 C 40 14, 90 8, 120 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("pointer-events-none", className)} aria-hidden>
      <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="currentColor" />
    </svg>
  );
}
