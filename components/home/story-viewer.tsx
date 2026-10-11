"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { CERTIFICATE_URL, storyReel } from "@/lib/story-media";
import { cn } from "@/lib/utils";

const IMAGE_DURATION_MS = 5000;

const StoryContext = createContext<(index: number) => void>(() => {});

export function StoryProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <StoryContext.Provider value={setIndex}>
      {children}
      {index !== null && (
        // Keyed per story so progress and timers start fresh on every slide.
        <StoryViewer key={index} index={index} onChange={setIndex} onClose={() => setIndex(null)} />
      )}
    </StoryContext.Provider>
  );
}

// Wraps any element so that clicking it opens the viewer at a given story.
export function StoryTrigger({
  storyId,
  className,
  children,
  label,
}: {
  storyId: string;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const open = useContext(StoryContext);
  const index = Math.max(
    0,
    storyReel.findIndex((item) => item.id === storyId),
  );

  return (
    <button
      type="button"
      onClick={() => open(index)}
      className={cn("cursor-pointer text-left", className)}
      aria-label={label ?? `Open story: ${storyReel[index].caption}`}
    >
      {children}
    </button>
  );
}

function StoryViewer({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const item = storyReel[index];
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Time already shown for the current photo, kept across hold-to-pause.
  const elapsed = useRef(0);
  const pressedAt = useRef(0);

  // A long press pauses; only a quick tap should navigate.
  const tap = (action: () => void) => () => {
    if (performance.now() - pressedAt.current < 250) action();
  };

  const next = useCallback(() => {
    if (index < storyReel.length - 1) onChange(index + 1);
    else onClose();
  }, [index, onChange, onClose]);

  const prev = useCallback(() => {
    if (index > 0) onChange(index - 1);
  }, [index, onChange]);

  // Timed progress for photos; videos report their own progress via timeupdate.
  useEffect(() => {
    if (item.kind !== "image" || held) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const value = elapsed.current / IMAGE_DURATION_MS;
      if (value >= 1) {
        next();
        return;
      }
      setProgress(value);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [item.kind, held, next, index]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (held) video.pause();
    else video.play().catch(() => {});
  }, [held, index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [next, prev, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Thouryathrikam story highlight"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
    >
      {/* Blurred backdrop of the current story fills the empty sides on wide screens */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <Image
          src={item.kind === "image" ? item.src : item.poster}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover blur-3xl"
        />
      </div>

      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white transition hover:bg-white/15 disabled:opacity-20 md:block"
        aria-label="Previous story"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white transition hover:bg-white/15 md:block"
        aria-label="Next story"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="relative h-full w-full overflow-hidden bg-black md:h-[92vh] md:w-auto md:aspect-[9/16] md:rounded-2xl md:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
        {item.kind === "image" ? (
          <Image
            key={item.id}
            src={item.src}
            alt={item.caption}
            fill
            sizes="(min-width: 768px) 52vh, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <video
            key={item.id}
            ref={videoRef}
            src={item.src}
            poster={item.poster.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            onEnded={next}
          />
        )}

        {/* Progress bars */}
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1 bg-gradient-to-b from-black/60 to-transparent px-3 pb-8 pt-3">
          {storyReel.map((story, i) => (
            <span key={story.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <span
                className="block h-full bg-white"
                style={{ width: `${i < index ? 100 : i === index ? progress * 100 : 0}%` }}
              />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 top-6 z-20 flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-[#f2a33a] via-[#e2552b] to-[#ff2e88] p-[2px]">
              <span className="grid h-full w-full place-items-center rounded-full bg-black text-[10px] font-bold text-[#f2a33a]">
                T
              </span>
            </span>
            <span className="text-sm font-semibold text-white">thouryathrikam_gecw</span>
            <span className="text-xs text-white/60">
              {index + 1}/{storyReel.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white transition hover:bg-white/15"
            aria-label="Close stories"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tap zones: left third goes back, the rest goes forward; holding pauses */}
        <div
          className="absolute inset-0 z-10 flex"
          onPointerDown={() => {
            pressedAt.current = performance.now();
            setHeld(true);
          }}
          onPointerUp={() => setHeld(false)}
          onPointerLeave={() => setHeld(false)}
        >
          <button type="button" className="h-full w-1/3" onClick={tap(prev)} aria-label="Previous story" tabIndex={-1} />
          <button type="button" className="h-full w-2/3" onClick={tap(next)} aria-label="Next story" tabIndex={-1} />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-6 pt-24">
          <p className="font-[family-name:var(--font-instrument)] text-2xl italic leading-tight text-white">
            {item.caption}
          </p>
          <a
            href={CERTIFICATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#f2a33a] px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-[#ffc46b]"
          >
            <Award className="h-3.5 w-3.5" />
            Certificate
          </a>
        </div>
      </div>
    </div>
  );
}
