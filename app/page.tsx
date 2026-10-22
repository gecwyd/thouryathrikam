import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import logoNoBg from "@/public/logo-no-bg.webp";
import { AutoVideo } from "@/components/home/auto-video";
import { Burst, Polaroid, Ransom, ScribbleArrow, Star, Tape, tornPath } from "@/components/home/collage";
import { StoryProvider, StoryTrigger } from "@/components/home/story-viewer";
import { CERTIFICATE_URL, INSTAGRAM_URL, media, storyReel, type StoryItem } from "@/lib/story-media";
import { cn } from "@/lib/utils";

const PAPER = "#f1e9da";

function posterOf(item: StoryItem): StaticImageData {
  return item.kind === "image" ? item.src : item.poster;
}

function Still({ item, sizes, className }: { item: StoryItem; sizes: string; className?: string }) {
  if (item.kind === "video") {
    return <AutoVideo src={item.src} poster={item.poster} label={item.caption} className={className} />;
  }
  return <Image src={item.src} alt={item.caption} fill sizes={sizes} className={cn("object-cover", className)} />;
}

const triad = [
  { ml: "സംഗീതം", en: "Sangeetham", note: "music", item: media.vocalist, tilt: "-rotate-3", tape: "yellow" as const },
  { ml: "നൃത്തം", en: "Nritham", note: "dance", item: media.mohiniyattam, tilt: "rotate-2 md:translate-y-10", tape: "pink" as const },
  { ml: "നാട്യം", en: "Natyam", note: "theatre", item: media.inCharacter, tilt: "-rotate-1", tape: "clear" as const },
];

// Scrapbook wall: each photo gets its own way of being stuck down.
const wall: { item: StoryItem; style: "polaroid" | "taped" | "torn"; shape: string; tilt: string }[] = [
  { item: media.welcomeSign, style: "polaroid", shape: "aspect-[4/5]", tilt: "-rotate-2" },
  { item: media.confettiCrowd, style: "taped", shape: "aspect-[9/16]", tilt: "rotate-2" },
  { item: media.oppana, style: "polaroid", shape: "aspect-[3/4]", tilt: "rotate-3" },
  { item: media.campusAerial, style: "taped", shape: "aspect-[9/16]", tilt: "-rotate-2" },
  { item: media.duffmuttu, style: "torn", shape: "aspect-[4/5]", tilt: "-rotate-1" },
  { item: media.beforeCurtain, style: "polaroid", shape: "aspect-[3/4]", tilt: "-rotate-3" },
  { item: media.pyroNight, style: "taped", shape: "aspect-[4/5]", tilt: "rotate-1" },
  { item: media.anchors, style: "torn", shape: "aspect-square", tilt: "rotate-2" },
  { item: media.campusTrail, style: "polaroid", shape: "aspect-[4/5]", tilt: "rotate-2" },
  { item: media.mappilaArts, style: "taped", shape: "aspect-[4/5]", tilt: "-rotate-2" },
  { item: media.smokeStage, style: "torn", shape: "aspect-[3/4]", tilt: "rotate-1" },
];

const desk = [
  { href: "/student/login", label: "Student Login", note: "look up your entries", color: "bg-[#f7d774]", tilt: "-rotate-2" },
  { href: "/events/submit", label: "Submit Events", note: "for coordinators", color: "bg-[#b8e3c6]", tilt: "-rotate-1" },
  { href: "/volunteer", label: "Volunteer Call", note: "run the fest with us", color: "bg-[#ffb3d1]", tilt: "rotate-2" },
  { href: "/media", label: "Media Team", note: "shoot, edit, post", color: "bg-[#e6d4ff]", tilt: "rotate-1" },
];

const ticker = ["Sangeetham", "Nritham", "Natyam", "GEC Wayanad", "Certificates out now", "Thouryathrikam 2026"];

export default function Home() {
  return (
    <StoryProvider>
      <div className="relative min-h-screen overflow-x-hidden text-[#141010] selection:bg-[#ff2e88] selection:text-white" style={{ backgroundColor: PAPER }}>
        <div className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.16] mix-blend-multiply" aria-hidden />
        <div className="paper-lines pointer-events-none absolute inset-0" aria-hidden />

        {/* ───────────── Nav ───────────── */}
        <header className="relative z-40">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-12 w-12 -rotate-6 place-items-center bg-[#141010] p-1.5 shadow-md">
                <Image src={logoNoBg} alt="Thouryathrikam logo" className="h-full w-full object-contain" priority />
              </span>
              <span className="font-[family-name:var(--font-hand)] text-xl font-bold leading-none sm:text-2xl">
                GEC Wayanad
                <span className="block text-base font-medium text-[#141010]/60">arts fest &apos;26</span>
              </span>
            </Link>
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="#wall" className="hidden font-[family-name:var(--font-hand)] text-2xl underline decoration-[#ff2e88] decoration-wavy underline-offset-4 md:block">
                the wall
              </a>
              <a href="#desk" className="hidden font-[family-name:var(--font-hand)] text-2xl underline decoration-[#f29a2e] decoration-wavy underline-offset-4 md:block">
                fest desk
              </a>
              <a
                href={CERTIFICATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rotate-2 bg-[#141010] px-4 py-2.5 font-[family-name:var(--font-anton)] text-sm uppercase tracking-wider text-[#f7d774] shadow-[4px_4px_0_#ff2e88] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff2e88]"
              >
                Certificates ↗
              </a>
            </div>
          </nav>
        </header>

        {/* ───────────── Hero: title ───────────── */}
        <section className="relative z-30 mx-auto max-w-7xl px-4 pt-6 text-center sm:px-8 sm:pt-10">
          <p className="inline-block -rotate-2 bg-[#141010] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.3em] text-[#f3e9d8]">
            Annual Arts Festival · 2026
          </p>

          <h1 className="mt-6">
            <Ransom
              text="തൗര്യത്രികം"
              parts={["തൗ", "ര്യ", "ത്രി", "കം"]}
              script="malayalam"
              seed={31}
              className="gap-x-[0.14em] text-[clamp(3.2rem,12vw,9rem)]"
            />
          </h1>

          <div className="relative mx-auto mt-8 w-fit">
            <span
              className="block bg-[#141010] px-8 py-2 font-[family-name:var(--font-anton)] text-[clamp(1.3rem,3.6vw,2.4rem)] uppercase tracking-[0.18em] text-[#f29a2e] sm:px-12"
              style={{ clipPath: tornPath(3, { left: true, right: true }) }}
            >
              Thouryathrikam
            </span>
            <Tape className="-left-8 -top-3 -rotate-12" tone="pink" />
          </div>
        </section>

        {/* ───────────── Hero: collage ───────────── */}
        <section className="relative mx-auto mt-6 max-w-7xl px-4 sm:px-8" aria-label="Fest collage">
          <div className="relative grid grid-cols-6 grid-rows-[repeat(14,2.6rem)] gap-0 sm:grid-rows-[repeat(14,3.2rem)] lg:grid-cols-12 lg:grid-rows-[repeat(10,3.6rem)]">
            {/* pyro, torn */}
            <StoryTrigger
              storyId={media.pyroNight.id}
              className="relative col-span-3 col-start-1 row-span-6 row-start-1 -rotate-3 transition hover:z-30 hover:scale-[1.03] lg:col-span-3 lg:col-start-1 lg:row-span-7 lg:row-start-1"
            >
              <span className="absolute inset-0 overflow-hidden shadow-xl" style={{ clipPath: tornPath(11, { top: true, bottom: true, right: true }) }}>
                <Still item={media.pyroNight} sizes="(min-width: 1024px) 25vw, 50vw" />
              </span>
              <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-3" />
            </StoryTrigger>

            {/* welcome sign polaroid */}
            <StoryTrigger
              storyId={media.welcomeSign.id}
              className="relative z-10 hidden rotate-[5deg] transition hover:z-30 hover:scale-[1.03] lg:col-span-3 lg:col-start-3 lg:row-span-5 lg:row-start-6 lg:block"
            >
              <Polaroid caption="the welcome ✿" className="h-full">
                <Still item={media.welcomeSign} sizes="25vw" />
              </Polaroid>
              <Tape className="-right-6 -top-2 rotate-[30deg]" tone="clear" />
            </StoryTrigger>

            {/* main video, phone-story card */}
            <StoryTrigger
              storyId={media.djNight.id}
              className="relative z-20 col-span-4 col-start-3 row-span-9 row-start-3 -rotate-1 transition hover:scale-[1.02] lg:col-span-3 lg:col-start-6 lg:row-span-10 lg:row-start-1"
            >
              <span className="absolute inset-0 overflow-hidden rounded-[1.6rem] border-[6px] border-[#141010] bg-black shadow-[10px_14px_0_#ff2e88]">
                <Still item={media.djNight} sizes="(min-width: 1024px) 25vw, 66vw" />
                <span className="absolute inset-x-0 top-0 flex gap-1 p-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={cn("h-[3px] flex-1 rounded-full", i === 0 ? "bg-white" : "bg-white/35")} />
                  ))}
                </span>
                <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
                  <Play className="h-3 w-3 fill-white" /> tap to watch
                </span>
              </span>
            </StoryTrigger>

            {/* mohiniyattam polaroid */}
            <StoryTrigger
              storyId={media.mohiniyattam.id}
              className="relative z-10 col-span-3 col-start-1 row-span-6 row-start-8 rotate-[-6deg] transition hover:z-30 hover:scale-[1.03] lg:col-span-3 lg:col-start-9 lg:row-span-7 lg:row-start-1 lg:rotate-[6deg]"
            >
              <Polaroid caption="mohiniyattam" className="h-full">
                <Still item={media.mohiniyattam} sizes="(min-width: 1024px) 25vw, 50vw" />
              </Polaroid>
              <Tape className="-top-3 left-6 -rotate-6" tone="yellow" />
            </StoryTrigger>

            {/* oppana, taped */}
            <StoryTrigger
              storyId={media.oppana.id}
              className="relative col-span-3 col-start-4 row-span-5 row-start-10 rotate-3 transition hover:z-30 hover:scale-[1.03] lg:col-span-3 lg:col-start-10 lg:row-span-5 lg:row-start-6 lg:-rotate-3"
            >
              <span className="absolute inset-0 overflow-hidden border-4 border-white shadow-xl">
                <Still item={media.oppana} sizes="(min-width: 1024px) 25vw, 50vw" />
              </span>
              <Tape className="-left-5 -top-2 -rotate-[35deg]" tone="pink" />
              <Tape className="-bottom-2 -right-5 -rotate-[35deg]" tone="pink" />
            </StoryTrigger>

            {/* stickers & doodles */}
            <a
              href={CERTIFICATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -right-1 top-0 z-40 rotate-12 transition hover:rotate-0 hover:scale-110 lg:left-[38%] lg:right-auto lg:top-[62%]"
              aria-label="Get your certificate"
            >
              <Burst className="h-28 w-28 sm:h-36 sm:w-36" color="#f29a2e">
                <span className="block font-[family-name:var(--font-anton)] text-sm uppercase leading-none text-[#141010] sm:text-lg">
                  Certificates
                  <br />
                  are out!
                </span>
                <span className="mt-1 block font-[family-name:var(--font-hand)] text-base font-bold leading-none text-[#141010] sm:text-lg">grab yours ↗</span>
              </Burst>
            </a>

            <span className="pointer-events-none absolute left-[26%] top-[2%] z-30 hidden rotate-[-8deg] font-[family-name:var(--font-hand)] text-3xl font-bold text-[#e2361b] lg:block">
              we were here!
              <ScribbleArrow className="ml-10 h-14 w-20 text-[#e2361b]" />
            </span>
            <Star className="absolute right-[2%] top-[58%] z-30 hidden h-10 w-10 text-[#2a3fd6] lg:block" />
            <Star className="absolute left-[48%] top-[-2%] z-30 h-7 w-7 text-[#ff2e88]" />
            <span className="pointer-events-none absolute bottom-[3%] left-[52%] z-30 hidden rotate-[4deg] bg-[#fffdf7] px-3 py-1 font-mono text-[11px] uppercase tracking-widest shadow lg:block">
              ↳ tap any photo to open it
            </span>
          </div>

          <div className="relative z-30 mt-10 flex flex-wrap items-center justify-center gap-4 pb-6">
            <StoryTrigger
              storyId={storyReel[0].id}
              label="Watch the whole story highlight"
              className="-rotate-1 border-[3px] border-[#141010] bg-[#fffdf7] px-6 py-3 font-[family-name:var(--font-anton)] text-lg uppercase tracking-wider shadow-[5px_5px_0_#141010] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#141010]"
            >
              ▶ Watch the highlight
            </StoryTrigger>
            <a
              href={CERTIFICATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rotate-1 border-[3px] border-[#141010] bg-[#f29a2e] px-6 py-3 font-[family-name:var(--font-anton)] text-lg uppercase tracking-wider shadow-[5px_5px_0_#141010] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#141010]"
            >
              Get your certificate ↗
            </a>
          </div>
        </section>

        {/* ───────────── Ticker strip ───────────── */}
        <div className="relative z-20 my-10 -rotate-2 scale-105 overflow-hidden border-y-[3px] border-[#141010] bg-[#ff2e88] py-3 text-white shadow-lg" aria-hidden>
          <div className="marquee flex w-max gap-8 whitespace-nowrap font-[family-name:var(--font-anton)] text-2xl uppercase tracking-wide">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((word, i) => (
              <span key={i} className="flex items-center gap-8">
                {word}
                <span className="text-[#f7d774]">✶</span>
              </span>
            ))}
          </div>
        </div>

        {/* ───────────── Story stickers ───────────── */}
        <section aria-label="Story highlight" className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
          <p className="mb-5 font-[family-name:var(--font-hand)] text-3xl font-bold">
            tap a story <span className="text-[#ff2e88]">→</span>
          </p>
          <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:none] sm:-mx-8 sm:px-8">
            {storyReel.map((item, i) => (
              <StoryTrigger
                key={item.id}
                storyId={item.id}
                className={cn("group flex w-[84px] shrink-0 snap-start flex-col items-center gap-2", i % 2 ? "rotate-3" : "-rotate-3")}
              >
                <span className="rounded-full border-[3px] border-[#141010] bg-gradient-to-tr from-[#f29a2e] via-[#ff2e88] to-[#2a3fd6] p-[3px] transition group-hover:scale-110">
                  <span className="relative block h-[70px] w-[70px] overflow-hidden rounded-full border-[3px] border-[#fffdf7]">
                    <Image src={posterOf(item)} alt="" fill sizes="70px" className="object-cover" />
                  </span>
                </span>
                <span className="line-clamp-1 w-full text-center font-[family-name:var(--font-hand)] text-lg leading-none">
                  {item.caption.split(/[,—×]/)[0].toLowerCase()}
                </span>
              </StoryTrigger>
            ))}
          </div>
        </section>

        {/* ───────────── Triad ───────────── */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
          <div className="mb-14 text-center">
            <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-[0.95]">
              Three arts,{" "}
              <span className="inline-block -rotate-2 bg-[#141010] px-3 text-[#f7d774]">one name</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-[family-name:var(--font-hand)] text-2xl leading-snug text-[#141010]/80">
              Thouryathrikam is the old word for music, dance and drama performed together. This year our campus lived it.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {triad.map(({ ml, en, note, item, tilt, tape }) => (
              <StoryTrigger key={en} storyId={item.id} className={cn("relative block transition hover:rotate-0 hover:scale-[1.02]", tilt)}>
                <Polaroid caption={`${en} — ${note}`} className="aspect-[3/4]">
                  <Still item={item} sizes="(min-width: 768px) 33vw, 100vw" />
                </Polaroid>
                <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" tone={tape} />
                <span
                  className="absolute -bottom-5 -right-3 rotate-[-4deg] bg-[#141010] px-4 py-1.5 font-[family-name:var(--font-malayalam)] text-2xl font-extrabold text-[#f29a2e] shadow-lg sm:text-3xl"
                  style={{ clipPath: tornPath(ml.length * 7, { left: true, right: true }) }}
                >
                  {ml}
                </span>
              </StoryTrigger>
            ))}
          </div>
        </section>

        {/* ───────────── Certificate ticket ───────────── */}
        <section id="certificates" className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
          <a
            href={CERTIFICATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ticket group relative flex rotate-[-1.5deg] flex-col bg-[#f29a2e] text-[#141010] shadow-[0_30px_60px_-20px_rgba(40,20,5,0.55)] transition hover:rotate-0 md:flex-row"
          >
            <span className="relative block flex-1 p-8 sm:p-12">
              <span className="block font-mono text-xs uppercase tracking-[0.35em]">Admit one · Thouryathrikam 2026</span>
              <span className="mt-4 block font-[family-name:var(--font-anton)] text-[clamp(2.6rem,7vw,5.4rem)] uppercase leading-[0.92]">
                You were on
                <br />
                that stage.
              </span>
              <span className="mt-4 block font-[family-name:var(--font-hand)] text-3xl font-bold">now take the proof home ✶</span>
              <span className="mt-8 inline-flex items-center gap-2 border-[3px] border-[#141010] bg-[#141010] px-6 py-3 font-[family-name:var(--font-anton)] text-lg uppercase tracking-wider text-[#f7d774] transition group-hover:bg-[#fffdf7] group-hover:text-[#141010]">
                Download your certificate <ArrowUpRight className="h-5 w-5" />
              </span>
            </span>
            <span className="relative hidden w-px border-l-[3px] border-dashed border-[#141010]/40 md:block" aria-hidden />
            <span className="relative flex items-center justify-center p-6 md:w-72">
              <span className="relative block aspect-[3/4] w-44 rotate-[4deg] md:w-52">
                <Polaroid caption="certified ✓" className="h-full">
                  <Image src={posterOf(media.mohiniyattamMono)} alt="" fill sizes="220px" className="object-cover" />
                </Polaroid>
                <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" tone="clear" />
              </span>
            </span>
          </a>
        </section>

        {/* ───────────── After dark ───────────── */}
        <section className="relative mt-16 bg-[#141010] text-[#f3e9d8]" style={{ clipPath: tornPath(42, { top: true, bottom: true }) }}>
          <div className="mx-auto max-w-7xl px-4 py-28 sm:px-8 sm:py-36">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2.8rem,8vw,6.5rem)] uppercase leading-[0.9]">
                After <span className="text-[#ff2e88]">dark</span>
              </h2>
              <p className="max-w-sm font-[family-name:var(--font-hand)] text-3xl leading-tight text-[#f7d774]">
                when the sun went down, the volume went up ↘
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <StoryTrigger storyId={media.liveWide.id} className="relative block aspect-video -rotate-1 transition hover:rotate-0">
                <span className="absolute inset-0 overflow-hidden border-[6px] border-[#f3e9d8] shadow-[10px_10px_0_#ff2e88]">
                  <Still item={media.liveWide} sizes="(min-width: 1024px) 66vw, 100vw" />
                </span>
                <Tape className="-left-4 -top-3 -rotate-12" tone="yellow" />
                <span className="absolute -bottom-4 left-6 rotate-2 bg-[#ff2e88] px-3 py-1 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-white">
                  ● Live from the main stage
                </span>
              </StoryTrigger>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">
                <StoryTrigger storyId={media.decibelStage.id} className="relative block aspect-[9/16] rotate-2 transition hover:rotate-0 lg:aspect-[4/5]">
                  <span className="absolute inset-0 overflow-hidden border-4 border-[#f3e9d8]">
                    <Still item={media.decibelStage} sizes="(min-width: 1024px) 33vw, 50vw" />
                  </span>
                  <Tape className="-top-3 right-4 rotate-6" tone="pink" />
                  <span className="absolute -bottom-3 -left-2 -rotate-3 bg-[#f7d774] px-2 py-0.5 font-[family-name:var(--font-hand)] text-xl font-bold text-[#141010]">
                    SATHVA × DECIBEL
                  </span>
                </StoryTrigger>
                <StoryTrigger storyId={media.vocalist.id} className="relative block aspect-[9/16] -rotate-2 transition hover:rotate-0 lg:aspect-[4/5]">
                  <span className="absolute inset-0 overflow-hidden" style={{ clipPath: tornPath(77, { top: true, bottom: true, left: true }) }}>
                    <Still item={media.vocalist} sizes="(min-width: 1024px) 33vw, 50vw" />
                  </span>
                  <span className="absolute -bottom-3 right-2 rotate-2 bg-[#f3e9d8] px-2 py-0.5 font-[family-name:var(--font-hand)] text-xl font-bold text-[#141010]">
                    one mic, one voice
                  </span>
                </StoryTrigger>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Scrapbook wall ───────────── */}
        <section id="wall" className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-[0.92]">
              The <span className="inline-block rotate-2 bg-[#2a3fd6] px-3 text-white">wall</span>
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-hand)] text-2xl underline decoration-[#ff2e88] decoration-wavy underline-offset-4"
            >
              more on @thouryathrikam_gecw ↗
            </a>
          </div>

          <div className="columns-2 gap-6 md:columns-3 lg:columns-4 [&>*]:mb-8">
            {wall.map(({ item, style, shape, tilt }, i) => (
              <StoryTrigger
                key={item.id}
                storyId={item.id}
                className={cn("relative block w-full break-inside-avoid transition hover:z-10 hover:rotate-0 hover:scale-[1.04]", tilt)}
              >
                {style === "polaroid" && (
                  <Polaroid caption={item.caption.toLowerCase()} className={shape}>
                    <Still item={item} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </Polaroid>
                )}
                {style === "taped" && (
                  <span className={cn("relative block", shape)}>
                    <span className="absolute inset-0 overflow-hidden border-4 border-white shadow-lg">
                      <Still item={item} sizes="(min-width: 1024px) 25vw, 50vw" />
                    </span>
                    <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-2" tone={i % 3 === 0 ? "pink" : "yellow"} />
                  </span>
                )}
                {style === "torn" && (
                  <span className={cn("relative block", shape)}>
                    <span className="absolute inset-0 overflow-hidden shadow-lg" style={{ clipPath: tornPath(100 + i, { top: true, bottom: true, left: i % 2 === 0, right: i % 2 === 1 }) }}>
                      <Still item={item} sizes="(min-width: 1024px) 25vw, 50vw" />
                    </span>
                    <span className="absolute -bottom-3 left-3 -rotate-2 bg-[#fffdf7] px-2 py-0.5 font-[family-name:var(--font-hand)] text-lg font-bold leading-tight shadow">
                      {item.caption.toLowerCase()}
                    </span>
                  </span>
                )}
                {item.kind === "video" && (
                  <span className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#ff2e88]">
                    <Play className="h-3.5 w-3.5 fill-white text-white" />
                  </span>
                )}
              </StoryTrigger>
            ))}
          </div>
        </section>

        {/* ───────────── Fest desk: sticky notes ───────────── */}
        <section id="desk" className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
          <h2 className="mb-10 font-[family-name:var(--font-anton)] text-[clamp(2.4rem,6vw,4.6rem)] uppercase leading-none">
            Fest <span className="inline-block -rotate-2 bg-[#f7d774] px-3">desk</span>
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
            {desk.map(({ href, label, note, color, tilt }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex aspect-[4/3] flex-col justify-between p-4 shadow-[0_14px_24px_-12px_rgba(40,20,5,0.5)] transition hover:rotate-0 hover:scale-[1.04] sm:p-6",
                  color,
                  tilt,
                )}
              >
                <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#e2361b] shadow-[0_2px_2px_rgba(0,0,0,0.4)]" aria-hidden />
                <span className="mt-3 block font-[family-name:var(--font-anton)] text-xl uppercase leading-tight sm:text-3xl">{label}</span>
                <span className="flex items-end justify-between gap-2 font-[family-name:var(--font-hand)] text-lg leading-none sm:text-2xl">
                  {note}
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ───────────── Footer ───────────── */}
        <footer className="relative bg-[#141010] text-[#f3e9d8]" style={{ clipPath: tornPath(9, { top: true }) }}>
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-8">
            <p aria-hidden className="select-none text-center font-[family-name:var(--font-malayalam)] text-[clamp(2.8rem,14vw,11rem)] font-extrabold leading-none text-[#f29a2e]">
              തൗര്യത്രികം
            </p>
            <p className="mt-4 text-center font-[family-name:var(--font-hand)] text-3xl text-[#f3e9d8]/80">see you next year ✶</p>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-dashed border-[#f3e9d8]/25 pt-8 text-sm text-[#f3e9d8]/60">
              <div className="flex items-center gap-3">
                <Image src={logoNoBg} alt="" className="h-9 w-9 object-contain" />
                <span>
                  Thouryathrikam 2026 · Annual Arts Festival
                  <br />
                  Government Engineering College Wayanad, Thalappuzha
                </span>
              </div>
              <div className="flex flex-wrap gap-6">
                <a href={CERTIFICATE_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f29a2e]">
                  Certificates
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f29a2e]">
                  Instagram
                </a>
                <a href="https://gecw.ac.in" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f29a2e]">
                  gecw.ac.in
                </a>
              </div>
            </div>
            <p className="mt-6 text-xs text-[#f3e9d8]/40">Photos and films from the @thouryathrikam_gecw story highlight.</p>
          </div>
        </footer>
      </div>
    </StoryProvider>
  );
}
