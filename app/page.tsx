import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080605] text-amber-50 selection:bg-amber-900/50">

      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-art.webp"
          alt="Classical Indian Art"
          fill
          className="object-cover opacity-[0.35] mix-blend-luminosity"
          priority
        />
        {/* Shadow gradients to create deep vignette and frame the content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080605] via-transparent to-[#080605]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080605] via-transparent to-[#080605]" />

        {/* Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* ── FINE ART GALLERY BORDER FRAME ── */}
      <div className="pointer-events-none absolute inset-3 md:inset-6 border border-amber-900/20 z-50">
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-700/80" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-700/80" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-700/80" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-700/80" />
      </div>

      {/* ── HEADER (Brand & Location) ── */}
      <header className="relative z-10 w-full p-6 md:p-12 flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <p className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-amber-500/80 font-[family-name:var(--font-geist-mono)]">
            Government Engineering College
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 font-[family-name:var(--font-geist-mono)]">
            Wayanad, Kerala
          </p>
        </div>

        {/* Elegant logo placement (Stamp style) */}
        <div className="relative w-20 h-20 md:w-32 md:h-32 drop-shadow-2xl hover:scale-105 transition-transform duration-700 cursor-default">
          <Image
            src="/logo-no-bg.webp"
            alt="Thouryathrikam Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </header>

      {/* ── MAIN SHOWCASE ── */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 w-full">

        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center text-center">

          {/* Subtitle / Category */}
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-8">
            <p className="text-[11px] md:text-sm tracking-[0.5em] md:tracking-[0.7em] uppercase text-amber-400/90 font-light font-[family-name:var(--font-geist-mono)]">
              Annual Arts Festival
            </p>
          </div>

          {/* Colossal Editorial Title */}
          <h1 className="text-[11vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-black uppercase font-[family-name:var(--font-outfit)] leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-900/60 pb-2 md:pb-6 drop-shadow-2xl">
            Thouryathrikam
          </h1>
        </div>

        {/* ── TICKET-STYLE COMING SOON BADGE ── */}
        <div className="mt-12 md:mt-24 group">
          <div className="relative overflow-hidden flex flex-col items-center border border-amber-900/40 bg-[#120a05]/80 backdrop-blur-xl px-10 py-4 md:px-12 md:py-5 hover:bg-[#1f1007] hover:border-amber-700/50 transition-all duration-700">
            {/* Cutout edges effect to look like an admission ticket */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#080605] border-r border-amber-900/40 group-hover:border-amber-700/50 transition-colors duration-700" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#080605] border-l border-amber-900/40 group-hover:border-amber-700/50 transition-colors duration-700" />

            <p className="text-xs md:text-sm font-medium tracking-[0.4em] md:tracking-[0.5em] text-amber-500 uppercase">
              Coming Soon
            </p>
            <p className="mt-1.5 text-[10px] tracking-[0.25em] text-amber-700/80 uppercase font-[family-name:var(--font-geist-mono)]">
              Admit One
            </p>
          </div>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mt-8">

        {/* Core Arts Navigation/List & Media Call Link */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex gap-3 md:gap-6 items-center">
            <span className="text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-amber-700/90 uppercase font-[family-name:var(--font-geist-mono)]">
              Sangeetham
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-800/50"></span>
            <span className="text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-amber-700/90 uppercase font-[family-name:var(--font-geist-mono)]">
              Nritham
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-800/50"></span>
            <span className="text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-amber-700/90 uppercase font-[family-name:var(--font-geist-mono)]">
              Natyam
            </span>
          </div>

          <a href="/media" className="group flex items-center gap-2 border border-amber-900/40 bg-[#120a05]/60 hover:bg-amber-900/30 px-4 py-2 rounded-full transition-all duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-amber-500 group-hover:text-amber-400 font-[family-name:var(--font-geist-mono)]">
              Join Media Team
            </span>
          </a>
        </div>

        <a
          href="https://www.instagram.com/thouryathrikam_gecw/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 md:gap-3 text-amber-600/80 hover:text-amber-400 transition-colors duration-300 pb-2 md:pb-0"
        >
          <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-[family-name:var(--font-geist-mono)]">
            @thouryathrikam_gecw
          </span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}