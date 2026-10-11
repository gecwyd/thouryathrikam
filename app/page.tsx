import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Play } from "lucide-react";
import logoNoBg from "@/public/logo-no-bg.webp";
import { AutoVideo } from "@/components/home/auto-video";
import { StoryProvider, StoryTrigger } from "@/components/home/story-viewer";
import { CERTIFICATE_URL, INSTAGRAM_URL, media, storyReel, type StoryItem } from "@/lib/story-media";
import { cn } from "@/lib/utils";

const triad = [
  {
    ml: "സംഗീതം",
    en: "Sangeetham",
    note: "Music — from Mappilapattu to the DECIBEL night.",
    item: media.vocalist,
  },
  {
    ml: "നൃത്തം",
    en: "Nritham",
    note: "Dance — Mohiniyattam, Oppana and everything between.",
    item: media.mohiniyattam,
  },
  {
    ml: "നാട്യം",
    en: "Natyam",
    note: "Theatre — paint, costume and the courage to step out.",
    item: media.inCharacter,
  },
];

const gallery: { item: StoryItem; shape: string }[] = [
  { item: media.welcomeSign, shape: "aspect-[3/4]" },
  { item: media.confettiCrowd, shape: "aspect-[9/16]" },
  { item: media.crew, shape: "aspect-square" },
  { item: media.oppana, shape: "aspect-[3/4]" },
  { item: media.campusAerial, shape: "aspect-[9/16]" },
  { item: media.duffmuttu, shape: "aspect-[4/5]" },
  { item: media.beforeCurtain, shape: "aspect-[9/16]" },
  { item: media.pyroNight, shape: "aspect-[4/5]" },
  { item: media.anchors, shape: "aspect-square" },
  { item: media.campusTrail, shape: "aspect-[3/4]" },
  { item: media.mappilaArts, shape: "aspect-[4/5]" },
  { item: media.smokeStage, shape: "aspect-[3/4]" },
];

const desk = [
  { href: "/student/login", label: "Student Login", note: "Look up your event entries" },
  { href: "/register", label: "Student Registration", note: "Event registrations" },
  { href: "/events/submit", label: "Submit Events", note: "For department coordinators" },
  { href: "/cse", label: "CSE Registration", note: "Department entries" },
  { href: "/volunteer", label: "Volunteer Call", note: "Run the fest with us" },
  { href: "/media", label: "Join Media Team", note: "Shoot, edit, post" },
];

const ticker = ["Sangeetham", "Nritham", "Natyam", "GEC Wayanad", "2026", "Thouryathrikam"];

function Still({ item, sizes, className }: { item: StoryItem; sizes: string; className?: string }) {
  if (item.kind === "video") {
    return <AutoVideo src={item.src} poster={item.poster} label={item.caption} className={className} />;
  }
  return (
    <Image
      src={item.src}
      alt={item.caption}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}

function CertificateButton({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <a
      href={CERTIFICATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full bg-[#f2a33a] font-semibold text-[#160b04] shadow-[0_10px_40px_-10px_rgba(242,163,58,0.7)] transition hover:bg-[#ffc46b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2a33a]",
        size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm",
        className,
      )}
    >
      <Award className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      Get your certificate
      <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function posterOf(item: StoryItem): StaticImageData {
  return item.kind === "image" ? item.src : item.poster;
}

export default function Home() {
  return (
    <StoryProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#0b0706] text-[#f3e9d8] selection:bg-[#f2a33a] selection:text-black">
        <div className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.06] mix-blend-overlay" aria-hidden />

        {/* ───────────── Nav ───────────── */}
        <header className="absolute inset-x-0 top-0 z-40">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logoNoBg} alt="Thouryathrikam logo" className="h-10 w-10 object-contain" priority />
              <span className="hidden text-[11px] uppercase leading-tight tracking-[0.28em] text-[#f3e9d8]/70 sm:block">
                Govt. Engineering College
                <br />
                <span className="text-[#f2a33a]">Wayanad</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-5">
              <a href="#desk" className="hidden text-xs uppercase tracking-[0.2em] text-[#f3e9d8]/70 transition hover:text-[#f3e9d8] md:block">
                Fest desk
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-xs uppercase tracking-[0.2em] text-[#f3e9d8]/70 transition hover:text-[#f3e9d8] md:block"
              >
                Instagram
              </a>
              <a
                href={CERTIFICATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#f2a33a]/50 bg-[#f2a33a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f2a33a] backdrop-blur transition hover:bg-[#f2a33a] hover:text-black"
              >
                Certificates
              </a>
            </div>
          </nav>
        </header>

        {/* ───────────── Hero ───────────── */}
        <section className="relative isolate flex min-h-svh items-center overflow-hidden pb-16 pt-28 lg:pb-10">
          <div className="absolute inset-0 -z-10">
            <Image
              src={posterOf(media.pyroNight)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover opacity-45 blur-2xl"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,#0b0706_70%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0706] to-transparent" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f3e9d8]/15 bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[#f3e9d8]/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff2e88]" />
                Annual Arts Festival · 2026
              </p>

              <h1>
                <span className="block font-[family-name:var(--font-malayalam)] text-[clamp(3rem,11vw,7.5rem)] font-extrabold leading-[1.15] text-transparent [background:linear-gradient(180deg,#fff3d6_10%,#f2a33a_55%,#c2410c_100%)] [background-clip:text]">
                  തൗര്യത്രികം
                </span>
                <span className="mt-2 block text-[clamp(1rem,2.4vw,1.5rem)] font-semibold uppercase tracking-[0.5em] text-[#f3e9d8]/85">
                  Thouryathrikam
                </span>
              </h1>

              <p className="mt-8 max-w-xl font-[family-name:var(--font-instrument)] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] text-[#f3e9d8]">
                Three arts. One stage. <em className="text-[#f2a33a]">Every one of us.</em>
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#f3e9d8]/65">
                Song, dance and theatre took over Government Engineering College Wayanad. The lights are off now,
                but the certificates are ready, and the stories are all here.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CertificateButton size="lg" />
                <StoryTrigger
                  storyId={storyReel[0].id}
                  label="Watch the story highlight"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#f3e9d8]/20 bg-white/5 px-6 py-4 text-base font-medium text-[#f3e9d8] backdrop-blur transition hover:border-[#f3e9d8]/40 hover:bg-white/10"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch the highlight
                </StoryTrigger>
              </div>
            </div>

            {/* Fanned story cards */}
            <div className="relative mx-auto h-[420px] w-full max-w-[460px] sm:h-[520px] lg:h-[600px]">
              <StoryTrigger
                storyId={media.mohiniyattam.id}
                className="absolute left-0 top-10 aspect-[9/16] w-[46%] -rotate-[8deg] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition duration-500 hover:-rotate-[4deg] hover:scale-[1.03]"
              >
                <Still item={media.mohiniyattam} sizes="220px" />
              </StoryTrigger>
              <StoryTrigger
                storyId={media.oppana.id}
                className="absolute right-0 top-14 aspect-[9/16] w-[46%] rotate-[8deg] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition duration-500 hover:rotate-[4deg] hover:scale-[1.03]"
              >
                <Still item={media.oppana} sizes="220px" />
              </StoryTrigger>
              <StoryTrigger
                storyId={media.djNight.id}
                className="absolute left-1/2 top-0 z-10 aspect-[9/16] w-[56%] -translate-x-1/2 overflow-hidden rounded-[1.4rem] border border-white/20 shadow-[0_40px_100px_-20px_rgba(255,46,136,0.45)] ring-2 ring-[#ff2e88]/40 transition duration-500 hover:scale-[1.02]"
              >
                <Still item={media.djNight} sizes="280px" />
                <span className="absolute inset-x-0 top-0 flex gap-1 p-2.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={cn("h-[3px] flex-1 rounded-full", i === 0 ? "bg-white" : "bg-white/35")} />
                  ))}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
                  ● Live
                </span>
              </StoryTrigger>
            </div>
          </div>
        </section>

        {/* ───────────── Story rings ───────────── */}
        <section aria-label="Story highlight" className="relative border-y border-[#f3e9d8]/10 bg-black/30">
          <div className="mx-auto max-w-7xl px-4 py-7 sm:px-8">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#f3e9d8]/50">Tap a story</p>
            <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8">
              {storyReel.map((item) => (
                <StoryTrigger key={item.id} storyId={item.id} className="group flex w-[76px] shrink-0 snap-start flex-col items-center gap-2">
                  <span className="rounded-full bg-gradient-to-tr from-[#f2a33a] via-[#e2552b] to-[#ff2e88] p-[2.5px] transition group-hover:scale-105">
                    <span className="relative block h-[68px] w-[68px] overflow-hidden rounded-full border-[3px] border-[#0b0706]">
                      <Image src={posterOf(item)} alt="" fill sizes="68px" className="object-cover" />
                    </span>
                  </span>
                  <span className="line-clamp-1 w-full text-center text-[11px] text-[#f3e9d8]/70">
                    {item.caption.split(/[,—]/)[0]}
                  </span>
                </StoryTrigger>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Ticker ───────────── */}
        <div className="overflow-hidden bg-[#f2a33a] py-3 text-[#160b04]" aria-hidden>
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-[0.35em]">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((word, i) => (
              <span key={i} className="flex items-center gap-10">
                {word}
                <span className="text-[#160b04]/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ───────────── Triad ───────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-[family-name:var(--font-instrument)] text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02]">
              Thouryathrikam means <em className="text-[#f2a33a]">the three arts</em>, together.
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#f3e9d8]/60">
              The classical idea of music, dance and drama performed as one. This year, our campus lived it.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {triad.map(({ ml, en, note, item }, i) => (
              <StoryTrigger
                key={en}
                storyId={item.id}
                className={cn(
                  "group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 md:aspect-[9/14]",
                  i === 1 && "md:translate-y-10",
                )}
              >
                <Still item={item} sizes="(min-width: 768px) 33vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-xs text-white/60">0{i + 1}</span>
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="block font-[family-name:var(--font-malayalam)] text-4xl font-semibold text-[#f2a33a]">{ml}</span>
                  <span className="mt-1 block text-sm uppercase tracking-[0.3em] text-white">{en}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-white/65">{note}</span>
                </span>
              </StoryTrigger>
            ))}
          </div>
        </section>

        {/* ───────────── Certificate band ───────────── */}
        <section id="certificates" className="px-4 sm:px-8">
          <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#f2a33a] text-[#160b04] md:grid-cols-[1.3fr_1fr]">
            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#160b04]/60">Certificates are live</p>
              <h2 className="mt-5 font-[family-name:var(--font-instrument)] text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.98]">
                You were on that stage.
                <br />
                <em>Take it home.</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#160b04]/75">
                Certificates for Thouryathrikam 2026 are ready. Head to the certificate portal to find and
                download yours.
              </p>
              <a
                href={CERTIFICATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#160b04] px-7 py-4 text-base font-semibold text-[#f3e9d8] transition hover:bg-black"
              >
                <Award className="h-5 w-5 text-[#f2a33a]" />
                Download certificate
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="relative min-h-[320px]">
              <Image
                src={posterOf(media.mohiniyattamMono)}
                alt={media.mohiniyattamMono.caption}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-0 bg-gradient-to-r from-[#f2a33a] via-[#f2a33a]/20 to-transparent max-md:bg-gradient-to-b" />
            </div>
          </div>
        </section>

        {/* ───────────── Night band ───────────── */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
            <StoryTrigger
              storyId={media.liveWide.id}
              className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 lg:aspect-auto"
            >
              <Still item={media.liveWide} sizes="(min-width: 1024px) 66vw, 100vw" />
              <span className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/20 to-transparent" />
              <span className="absolute bottom-0 left-0 p-6 sm:p-10">
                <span className="block text-[11px] uppercase tracking-[0.3em] text-[#ff2e88]">After dark</span>
                <span className="mt-3 block max-w-lg font-[family-name:var(--font-instrument)] text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02] text-white">
                  When the sun went down, <em className="text-[#f2a33a]">the volume went up.</em>
                </span>
              </span>
            </StoryTrigger>
            <StoryTrigger
              storyId={media.decibelStage.id}
              className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 max-lg:mx-auto max-lg:w-full max-lg:max-w-sm"
            >
              <Still item={media.decibelStage} sizes="(min-width: 1024px) 33vw, 100vw" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                <span className="block text-[11px] uppercase tracking-[0.3em] text-white/60">Live</span>
                <span className="mt-1 block text-xl font-semibold text-white">{media.decibelStage.caption}</span>
              </span>
            </StoryTrigger>
          </div>
        </section>

        {/* ───────────── Gallery ───────────── */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 sm:pb-32">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(2.2rem,5vw,4rem)] leading-none">
              From the <em className="text-[#f2a33a]">highlight</em>
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#f3e9d8]/70 transition hover:text-[#f3e9d8]"
            >
              @thouryathrikam_gecw <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {gallery.map(({ item, shape }) => (
              <StoryTrigger
                key={item.id}
                storyId={item.id}
                className={cn("group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10", shape)}
              >
                <Still item={item} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 text-sm text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100 max-md:text-xs">
                  {item.caption}
                </span>
                {item.kind === "video" && (
                  <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-black/50 backdrop-blur">
                    <Play className="h-3 w-3 fill-white text-white" />
                  </span>
                )}
              </StoryTrigger>
            ))}
          </div>
        </section>

        {/* ───────────── Fest desk ───────────── */}
        <section id="desk" className="border-t border-[#f3e9d8]/10 bg-[#120b07]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#f2a33a]">Fest desk</p>
                <h2 className="mt-3 font-[family-name:var(--font-instrument)] text-[clamp(2rem,4.5vw,3.4rem)] leading-none">
                  Everything else, <em>in one place.</em>
                </h2>
              </div>
              <CertificateButton />
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#f3e9d8]/10 bg-[#f3e9d8]/10 sm:grid-cols-2 lg:grid-cols-3">
              {desk.map(({ href, label, note }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between gap-4 bg-[#120b07] p-6 transition hover:bg-[#1c120b]"
                >
                  <span>
                    <span className="block text-lg font-medium text-[#f3e9d8]">{label}</span>
                    <span className="mt-1 block text-sm text-[#f3e9d8]/50">{note}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#f3e9d8]/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f2a33a]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Footer ───────────── */}
        <footer className="relative overflow-hidden px-4 pb-10 pt-20 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p
              aria-hidden
              className="select-none text-center font-[family-name:var(--font-malayalam)] text-[clamp(3rem,15vw,12rem)] font-extrabold leading-none text-[#f3e9d8]/[0.06]"
            >
              തൗര്യത്രികം
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[#f3e9d8]/10 pt-8 text-sm text-[#f3e9d8]/55">
              <div className="flex items-center gap-3">
                <Image src={logoNoBg} alt="" className="h-9 w-9 object-contain" />
                <span>
                  Thouryathrikam 2026 · Annual Arts Festival
                  <br />
                  Government Engineering College Wayanad, Thalappuzha
                </span>
              </div>
              <div className="flex flex-wrap gap-6">
                <a href={CERTIFICATE_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f2a33a]">
                  Certificates
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f2a33a]">
                  Instagram
                </a>
                <a href="https://gecw.ac.in" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f2a33a]">
                  gecw.ac.in
                </a>
              </div>
            </div>
            <p className="mt-6 text-xs text-[#f3e9d8]/35">Photos and films from the @thouryathrikam_gecw story highlight.</p>
          </div>
        </footer>
      </div>
    </StoryProvider>
  );
}
