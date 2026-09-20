import Image from "next/image";
import Link from "next/link";
import bgArt from "@/public/bg-art.webp";
import logoNoBg from "@/public/logo-no-bg.webp";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#070504] text-[#ebd4b3] select-none p-5 sm:p-8 md:p-10 font-[family-name:var(--font-geist-mono)]">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgArt}
          alt="Classical Art Background"
          fill
          priority
          className="object-cover opacity-[0.38] mix-blend-luminosity brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-[#070504]/70 to-[#070504]/90" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-[#070504]/50 to-[#070504]" />
      </div>

      {/* Outer Border Accents (Corner Ticks) */}
      <div className="pointer-events-none absolute inset-4 sm:inset-6 z-20 border border-amber-800/20">
        <span className="absolute -top-1 -left-1 w-2 h-2 bg-amber-500/80" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500/80" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-500/80" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-500/80" />
      </div>

      {/* Top Bar: College Heading & Top-Right Logo */}
      <header className="relative z-10 flex items-start justify-between w-full pt-1 px-1 sm:px-3">
        <div className="space-y-0.5">
          <p className="text-[9px] sm:text-[11px] tracking-[0.32em] uppercase text-amber-500/80 font-medium">
            GOVERNMENT ENGINEERING COLLEGE
          </p>
          <p className="text-[8px] sm:text-[10px] tracking-[0.28em] uppercase text-amber-700/80 font-light">
            WAYANAD, KERALA
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Image
              src={logoNoBg}
              alt="Thouryathrikam Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Center Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center my-auto py-6">
        {/* Subtitle */}
        <p className="text-[10px] sm:text-xs tracking-[0.6em] uppercase text-amber-500/70 font-light mb-2 sm:mb-3">
          ANNUAL ARTS FESTIVAL
        </p>

        {/* Main Massive Title */}
        <h1 className="w-full text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black uppercase font-[family-name:var(--font-outfit)] tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d8] via-[#e2b76e] to-[#804e17] drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] leading-none select-none">
          THOURYATHRIKAM
        </h1>

        {/* Coming Soon Ticket Badge */}
        <div className="mt-8 sm:mt-12 px-7 py-3 rounded border border-amber-700/30 bg-[#120a05]/70 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center">
          <span className="text-[10px] sm:text-xs tracking-[0.45em] uppercase text-amber-400/90 font-medium">
            COMING SOON
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase text-amber-700/90 mt-0.5">
            ADMIT ONE
          </span>
        </div>
      </main>

      {/* Bottom Bar: Category Tags, Action Pills, and Social Tag */}
      <footer className="relative z-10 flex flex-col gap-4 pt-4 px-1 sm:px-3">
        {/* Triad Tagline */}
        <p className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-amber-600/80">
          SANGEETHAM <span className="opacity-40">·</span> NRITHAM <span className="opacity-40">·</span> NATYAM
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Action Links */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <Link
              href="/register"
              className="px-4 sm:px-5 py-1.5 rounded-full border border-amber-900/50 bg-[#140b06]/80 hover:bg-amber-950/60 hover:border-amber-600/70 text-amber-300/90 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Student Registration
            </Link>

            <Link
              href="/events/submit"
              className="px-4 sm:px-5 py-1.5 rounded-full border border-amber-900/50 bg-[#140b06]/80 hover:bg-amber-950/60 hover:border-amber-600/70 text-amber-300/90 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Submit Events
            </Link>

            <Link
              href="/volunteers"
              className="px-4 sm:px-5 py-1.5 rounded-full border border-amber-900/50 bg-[#140b06]/80 hover:bg-amber-950/60 hover:border-amber-600/70 text-amber-300/90 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Volunteer Call
            </Link>

            <Link
              href="/media"
              className="px-4 sm:px-5 py-1.5 rounded-full border border-amber-900/50 bg-[#140b06]/80 hover:bg-amber-950/60 hover:border-amber-600/70 text-amber-300/90 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Join Media Team
            </Link>
          </div>

          {/* Social Handle */}
          <a
            href="https://instagram.com/thouryathrikam_gecw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] text-amber-600/80 hover:text-amber-400 transition-colors uppercase flex items-center gap-1.5"
          >
            <span>@thouryathrikam_gecw</span>
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}