"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bgArt from "@/public/bg-art.webp";
import logoNoBg from "@/public/logo-no-bg.webp";

import { submitVolunteerForm } from "./actions";

export default function VolunteerCallForm() {
  const [formData, setFormData] = useState({
    name: "",
    semester: "",
    department: "",
    phone: "",
    committee: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const committeesList = [
    "Announcements",
    "Decoration Committee",
    "Sponsorship",
    "Event Management",
    "Registration Committee",
    "Creative and Design Committee",
    "Executive Committee",
    "Volunteers",
    "Medical and Emergency",
    "Finance Committee",
    "Documentation",
    "Stage Management",
    "Program Committee",
    "Media Committee",
    "Guest and Hospitality",
  ];

  const handleCommitteeSelect = (committee: string) => {
    setValidationError("");
    setFormData((prev) => ({
      ...prev,
      committee: prev.committee === committee ? "" : committee,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.committee) {
      setValidationError("Please select one committee to proceed.");
      return;
    }

    setStatus("loading");
    setValidationError("");
    try {
      const response = await submitVolunteerForm({
        name: formData.name,
        semester: formData.semester,
        department: formData.department,
        phone: formData.phone,
        committee: formData.committee,
      });

      if (response.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080605] text-amber-50 selection:bg-amber-900/50 py-12 px-4 sm:px-6">
      <div className="absolute inset-0 z-0 fixed">
        <Image
          src={bgArt}
          alt="Classical Indian Art"
          fill
          className="object-cover opacity-[0.25] mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080605] via-[#080605]/80 to-[#080605]" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="mb-8 hover:scale-105 transition-transform">
            <Image src={logoNoBg} alt="Logo" width={80} height={80} className="drop-shadow-2xl" />
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="w-8 h-px bg-amber-600/50"></span>
            <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-amber-400/90 font-light font-[family-name:var(--font-geist-mono)]">
              Thouryathrikam
            </p>
            <span className="w-8 h-px bg-amber-600/50"></span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-[family-name:var(--font-outfit)] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-900/60 text-center">
            Volunteer Call
          </h1>
          <p className="mt-4 text-amber-700/80 text-xs sm:text-sm tracking-widest uppercase font-[family-name:var(--font-geist-mono)] text-center max-w-xl leading-relaxed">
            Be part of the team driving GECW&apos;s grand cultural festival. Choose your committee and join us.
          </p>
        </div>

        <div className="bg-[#120a05]/60 border border-amber-900/30 backdrop-blur-xl p-6 sm:p-10 rounded-sm relative overflow-hidden">
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
              <h2 className="text-2xl font-bold tracking-widest text-amber-200 mb-2 uppercase font-[family-name:var(--font-outfit)]">
                Application Submitted
              </h2>
              <p className="text-amber-700/80 tracking-widest text-xs uppercase font-[family-name:var(--font-geist-mono)]">
                We will get back to you soon.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({ name: "", semester: "", department: "", phone: "", committee: "" });
                  setValidationError("");
                }}
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

              {validationError && (
                <div className="p-4 bg-amber-950/40 border border-amber-700/50 text-amber-200 text-xs tracking-wider text-center">
                  {validationError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">
                    Full Name
                  </label>
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

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">
                    WhatsApp Number
                  </label>
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

                <div className="space-y-2">
                  <label htmlFor="semester" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">
                    Semester
                  </label>
                  <select
                    id="semester"
                    required
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full bg-[#080605]/50 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 px-3 py-3 outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">
                      Select Semester
                    </option>
                    {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((s) => (
                      <option key={s} value={s} className="bg-[#120a05]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="department" className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">
                    Department
                  </label>
                  <select
                    id="department"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#080605]/50 border-b border-amber-900/50 focus:border-amber-500 text-amber-100 px-3 py-3 outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled className="text-zinc-600">
                      Select Department
                    </option>
                    {["CSE", "ECE", "EEE", "ME", "CE", "AI&DS"].map((d) => (
                      <option key={d} value={d} className="bg-[#120a05]">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-[family-name:var(--font-geist-mono)]">
                    Select Committee
                  </label>
                  <span className="text-[10px] tracking-wider uppercase text-amber-700/80 font-[family-name:var(--font-geist-mono)]">
                    * Choose 1 Option
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {committeesList.map((committee, index) => {
                    const isSelected = formData.committee === committee;
                    return (
                      <button
                        key={committee}
                        type="button"
                        onClick={() => handleCommitteeSelect(committee)}
                        className={`text-left px-4 py-3 border text-xs tracking-wider transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "border-amber-500/80 bg-amber-500/15 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                            : "border-amber-900/30 bg-[#080605]/50 text-amber-700/80 hover:border-amber-700/50 hover:text-amber-400"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-mono ${isSelected ? "text-amber-400" : "text-amber-800"}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium">{committee}</span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-amber-400 bg-amber-400/20"
                              : "border-amber-900/50 group-hover:border-amber-700/60"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative overflow-hidden flex items-center justify-center px-12 py-4 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/60 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
