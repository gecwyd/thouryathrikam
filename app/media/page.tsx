"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { submitMediaForm } from "./actions";

export default function MediaTeamForm() {
  const [formData, setFormData] = useState({
    name: "",
    semester: "",
    department: "",
    phone: "",
    roles: [] as string[],
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const rolesList = [
    "Poster Design",
    "Video Editing",
    "Photography",
    "Videography",
    "Content Writing",
    "Social Media Management",
    "UI/UX Design",
  ];

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.roles.length === 0) {
      alert("Please select at least one role.");
      return;
    }

    setStatus("loading");
    try {
      const response = await submitMediaForm({
        name: formData.name,
        semester: formData.semester,
        department: formData.department,
        phone: formData.phone,
        roles: formData.roles.join(", "),
      });

      if (response.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080605] text-amber-50 selection:bg-amber-900/50 py-12 px-4 sm:px-6">
      
      {/* ── CINEMATIC BACKGROUND ── */}
      <div className="absolute inset-0 z-0 fixed">
        <Image
          src="/bg-art.webp"
          alt="Classical Indian Art"
          fill
          className="object-cover opacity-[0.25] mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080605] via-[#080605]/80 to-[#080605]" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="mb-8 hover:scale-105 transition-transform">
            <Image src="/logo-no-bg.webp" alt="Logo" width={80} height={80} className="drop-shadow-2xl" />
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-amber-600/50"></span>
            <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-amber-400/90 font-light font-[family-name:var(--font-geist-mono)]">
              Thouryathrikam
            </p>
            <span className="w-8 h-px bg-amber-600/50"></span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-[family-name:var(--font-outfit)] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-900/60 text-center">
            Media Team Call
          </h1>
          <p className="mt-4 text-amber-700/80 text-xs sm:text-sm tracking-widest uppercase font-[family-name:var(--font-geist-mono)] text-center max-w-xl leading-relaxed">
            Join the creative force behind GECW's biggest arts festival. We are looking for passionate individuals.
          </p>
        </div>

        {/* ── FORM CONTAINER ── */}
        <div className="bg-[#120a05]/60 border border-amber-900/30 backdrop-blur-xl p-6 sm:p-10 rounded-sm relative overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-600/50" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-600/50" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-600/50" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-600/50" />

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/30">
                <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-widest text-amber-200 mb-2 uppercase font-[family-name:var(--font-outfit)]">Application Submitted</h2>
              <p className="text-amber-700/80 tracking-widest text-xs uppercase font-[family-name:var(--font-geist-mono)]">We will get back to you soon.</p>
              <button
                onClick={() => { setStatus("idle"); setFormData({ name: "", semester: "", department: "", phone: "", roles: [] }); }}
                className="mt-8 px-8 py-3 text-xs tracking-[0.2em] uppercase bg-amber-900/40 hover:bg-amber-800/60 border border-amber-700/50 transition-colors text-amber-100"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {status === "error" && (
                <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-200 text-sm tracking-wider text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#080605]/50 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 px-3 py-3 outline-none transition-colors text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">WhatsApp Number</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#080605]/50 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 px-3 py-3 outline-none transition-colors text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <label htmlFor="semester" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">Semester</label>
                  <select
                    id="semester"
                    required
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full bg-[#080605]/50 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 px-3 py-3 outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">Select Semester</option>
                    {["S1", "S3", "S5", "S7"].map(s => <option key={s} value={s} className="bg-[#120a05]">{s}</option>)}
                  </select>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label htmlFor="department" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">Department</label>
                  <select
                    id="department"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#080605]/50 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 px-3 py-3 outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">Select Department</option>
                    {["CSE", "ECE", "EEE", "ME", "CE", "AI&DS"].map(d => <option key={d} value={d} className="bg-[#120a05]">{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-4 pt-4">
                <label className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)] flex justify-between">
                  <span>Roles of Interest</span>
                  <span className="text-amber-800/60">* Select multiple</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {rolesList.map((role) => {
                    const isSelected = formData.roles.includes(role);
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className={`text-left px-4 py-3 border text-xs tracking-wider transition-all duration-300 flex items-center justify-between ${
                          isSelected 
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-200" 
                            : "border-amber-900/30 bg-[#080605]/50 text-amber-700/80 hover:border-amber-700/50"
                        }`}
                      >
                        {role}
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative overflow-hidden flex items-center justify-center px-12 py-4 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/60 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 text-sm font-semibold tracking-[0.3em] uppercase text-amber-200 font-[family-name:var(--font-outfit)]">
                    {status === "loading" ? "Submitting..." : "Submit Application"}
                  </span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
