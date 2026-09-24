"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bgArt from "@/public/bg-art.webp";
import logoNoBg from "@/public/logo-no-bg.webp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitCseRegistration } from "./actions";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Music2,
  Phone,
  RotateCcw,
  User,
} from "lucide-react";

const SEMESTERS = ["S1", "S3", "S5", "S7"];

const CSE_ITEMS = [
  "Group Song (Indian)",
  "Group Song (Western)",
  "Patriotic Song",
  "Ganamela",
  "Thiruvathira (W)",
  "Kolkali (M)",
  "Duff Mutt (M)",
  "Oppana (W)",
  "Vattapattu (M)",
  "Margamkali (W)",
  "Parichamuttu (M)",
  "Poorakali (M)",
  "Drama",
  "Mime",
  "Skit",
  "Group Dance (Classical)",
  "Nadanpattu",
  "Vanchipattu",
  "Film Song (Duet)",
  "Synchro",
  "Chavittunadakam",
  "Arabanamuttu",
  "Mappilappattu (Group)",
  "Duet Dance",
  "Western Dance (Group)",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function CseRegistrationPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [semester, setSemester] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !semester || !item) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    if (phone.trim().length < 8) {
      setValidationError("Please enter a valid phone number.");
      return;
    }

    setStatus("loading");
    setValidationError("");

    const result = await submitCseRegistration({
      name: name.trim(),
      phone: phone.trim(),
      semester,
      item,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setValidationError(result.error || "Submission failed. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setSemester("");
    setItem("");
    setStatus("idle");
    setValidationError("");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080605] px-4 py-10 text-amber-50 selection:bg-amber-900/50 sm:px-6">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src={bgArt} alt="Background" fill className="object-cover opacity-[0.2] mix-blend-luminosity" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080605] via-[#080605]/85 to-[#080605]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 transition-transform hover:scale-105">
            <Image src={logoNoBg} alt="Thouryathrikam" width={76} height={76} className="drop-shadow-2xl" />
          </Link>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-6 bg-amber-600/50" />
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] font-light uppercase tracking-[0.45em] text-amber-400/90">Thouryathrikam 2026</p>
            <span className="h-px w-6 bg-amber-600/50" />
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-900/60 sm:text-4xl">
            CSE Registration
          </h1>
          <p className="mt-3 max-w-md font-mono text-xs uppercase tracking-widest text-amber-500/80">
            Individual registration for CSE arts events
          </p>
        </div>

        <div className="relative overflow-hidden rounded-sm border border-amber-900/30 bg-[#120a05]/75 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="absolute left-0 top-0 h-3 w-3 border-l border-t border-amber-600/60" />
          <div className="absolute right-0 top-0 h-3 w-3 border-r border-t border-amber-600/60" />
          <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-amber-600/60" />
          <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-amber-600/60" />

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10">
                <CheckCircle2 className="h-10 w-10 text-amber-400" />
              </div>
              <h2 className="mb-2 font-[family-name:var(--font-outfit)] text-2xl font-bold uppercase tracking-widest text-amber-200 sm:text-3xl">Registration Successful</h2>
              <p className="mb-8 max-w-md font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-widest text-amber-500/90">Your CSE event registration has been recorded.</p>
              <div className="mb-8 w-full max-w-sm space-y-3 rounded border border-amber-800/40 bg-[#180e08]/90 p-5 text-left font-mono text-xs text-amber-200/90">
                {[
                  ["Name", name],
                  ["Semester", semester],
                  ["Item", item],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-amber-900/30 pb-2 last:border-0 last:pb-0">
                    <span className="text-amber-500">{label}:</span>
                    <span className="text-right font-semibold text-amber-100">{value}</span>
                  </div>
                ))}
              </div>
              <button type="button" onClick={resetForm} className="flex cursor-pointer items-center gap-2 border border-amber-500/50 bg-amber-500/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-amber-100 transition-colors hover:bg-amber-500/30">
                <RotateCcw className="h-3.5 w-3.5" /> Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {validationError && (
                <div className={`flex items-center justify-center gap-2 border p-4 text-center text-xs tracking-wider ${status === "error" ? "border-red-900/60 bg-red-950/40 text-red-200" : "border-amber-700/60 bg-amber-950/40 text-amber-200"}`}>
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="flex items-center gap-2 border-b border-amber-900/30 pb-3">
                <User className="h-4 w-4 text-amber-400" />
                <h3 className="font-[family-name:var(--font-geist-mono)] text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Participant Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="name">Full Name <span className="text-amber-400">*</span></Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700" />
                    <Input id="name" value={name} onChange={(e) => { setName(e.target.value); setValidationError(""); }} placeholder="e.g. Rahul K" className="h-12 pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-amber-400">*</span></Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700" />
                    <Input id="phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setValidationError(""); }} placeholder="+91 9876543210" className="h-12 pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester <span className="text-amber-400">*</span></Label>
                  <Select value={semester} onValueChange={(value) => { setSemester(value); setValidationError(""); }}>
                    <SelectTrigger id="semester" className="h-12"><SelectValue placeholder="Select Semester" /></SelectTrigger>
                    <SelectContent>
                      {SEMESTERS.map((value) => (
                        <SelectItem key={value} value={value}><span className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-amber-400" />{value} Semester</span></SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item">Event Item <span className="text-amber-400">*</span></Label>
                <Select value={item} onValueChange={(value) => { setItem(value); setValidationError(""); }}>
                  <SelectTrigger id="item" className="h-12"><SelectValue placeholder="Select an event item" /></SelectTrigger>
                  <SelectContent>
                    {CSE_ITEMS.map((value) => <SelectItem key={value} value={value}><span className="flex items-center gap-2"><Music2 className="h-3.5 w-3.5 text-amber-400" />{value}</span></SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <button type="submit" disabled={status === "loading"} className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden border border-amber-500/60 bg-amber-500/20 px-10 py-4 transition-all duration-300 hover:border-amber-400 hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-40">
                <span className="relative z-10 flex items-center gap-2 font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase tracking-[0.25em] text-amber-100">
                  {status === "loading" ? "Registering..." : <>Submit Registration <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
