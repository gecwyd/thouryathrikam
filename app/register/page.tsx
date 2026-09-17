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
import { DEPARTMENTS } from "@/lib/events-data";
import { submitStudentRegistration } from "./actions";
import {
  User,
  CheckCircle2,
  AlertCircle,
  Phone,
  GraduationCap,
  Building2,
  FileBadge,
  ArrowRight,
  RotateCcw
} from "lucide-react";

const SEMESTERS = ["S1", "S3", "S5", "S7"];

export default function StudentRegistrationPage() {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [regNo, setRegNo] = useState("");
  const [phone, setPhone] = useState("");
  const [semester, setSemester] = useState("");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!department || !name.trim() || !rollNo.trim() || !regNo.trim() || !phone.trim() || !semester) {
      setValidationError("Please fill in all required fields.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStatus("loading");
    setValidationError("");

    const payload = {
      name: name.trim(),
      rollNo: rollNo.trim().toUpperCase(),
      regNo: regNo.trim().toUpperCase(),
      department,
      semester,
      phone: phone.trim(),
    };

    const result = await submitStudentRegistration(payload);

    if (result.success) {
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("error");
      setValidationError(result.error || "Submission failed. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetForm = () => {
    setDepartment("");
    setName("");
    setRollNo("");
    setRegNo("");
    setPhone("");
    setSemester("");
    setStatus("idle");
    setValidationError("");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080605] text-amber-50 selection:bg-amber-900/50 py-10 px-4 sm:px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 fixed pointer-events-none">
        <Image src={bgArt} alt="Background" fill className="object-cover opacity-[0.2] mix-blend-luminosity" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080605] via-[#080605]/85 to-[#080605]" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <Link href="/" className="mb-4 hover:scale-105 transition-transform">
            <Image src={logoNoBg} alt="Thouryathrikam" width={76} height={76} className="drop-shadow-2xl" />
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-amber-600/50"></span>
            <p className="text-[10px] tracking-[0.45em] uppercase text-amber-400/90 font-light font-[family-name:var(--font-geist-mono)]">Thouryathrikam 2026</p>
            <span className="w-6 h-px bg-amber-600/50"></span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase font-[family-name:var(--font-outfit)] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-900/60">
            Student Registration
          </h1>
          <p className="text-amber-500/80 text-xs mt-3 max-w-md font-mono tracking-widest uppercase">
            Register yourself before entering festival events
          </p>
        </div>

        <div className="bg-[#120a05]/75 border border-amber-900/30 backdrop-blur-xl p-6 sm:p-10 rounded-sm relative overflow-hidden shadow-2xl">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-600/60" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-600/60" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-600/60" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-600/60" />

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/40">
                <CheckCircle2 className="w-10 h-10 text-amber-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-widest text-amber-200 mb-2 uppercase font-[family-name:var(--font-outfit)]">Registration Successful</h2>
              <p className="text-amber-500/90 tracking-widest text-xs uppercase font-[family-name:var(--font-geist-mono)] max-w-md mb-8">You are now registered in the Thouryathrikam database.</p>
              
              <div className="w-full max-w-sm bg-[#180e08]/90 border border-amber-800/40 rounded p-5 text-left space-y-3 font-mono text-xs text-amber-200/90 mb-8">
                {[
                  { label: "Name", value: name },
                  { label: "Roll No", value: rollNo.toUpperCase() },
                  { label: "Reg No", value: regNo.toUpperCase() },
                  { label: "Department", value: department },
                  { label: "Semester", value: semester },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b border-amber-900/30 pb-2 last:border-0 last:pb-0">
                    <span className="text-amber-500">{label}:</span>
                    <span className="font-semibold text-amber-100">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button type="button" onClick={resetForm} className="px-7 py-3 text-xs tracking-[0.2em] uppercase bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 transition-colors text-amber-100 cursor-pointer flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5" /> Register Another Student
                </button>
                <Link href="/events/submit" className="px-7 py-3 text-xs tracking-[0.2em] uppercase bg-transparent hover:bg-amber-950/40 border border-amber-900/40 transition-colors text-amber-400">Go to Event Registration</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
              {validationError && (
                <div className="p-4 bg-amber-950/40 border border-amber-700/60 text-amber-200 text-xs tracking-wider text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-950/40 border border-red-900/60 text-red-200 text-xs tracking-wider text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Submission failed. Please try again or check your connection.</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-amber-900/30">
                  <User className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-amber-300 font-[family-name:var(--font-geist-mono)] font-semibold">Personal Details</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-amber-400">*</span></Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                      <Input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); setValidationError(""); }} placeholder="e.g. Adhil Mohammed" className="pl-10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Class Roll No. <span className="text-amber-400">*</span></Label>
                    <div className="relative">
                      <FileBadge className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                      <Input id="rollNo" type="text" value={rollNo} onChange={(e) => { setRollNo(e.target.value); setValidationError(""); }} placeholder="e.g. 23B139" className="pl-10 h-12 uppercase" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="regNo">KTU Register No. <span className="text-amber-400">*</span></Label>
                    <div className="relative">
                      <FileBadge className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                      <Input id="regNo" type="text" value={regNo} onChange={(e) => { setRegNo(e.target.value); setValidationError(""); }} placeholder="e.g. WYD23CS004" className="pl-10 h-12 uppercase" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">WhatsApp Contact <span className="text-amber-400">*</span></Label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                      <Input id="phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setValidationError(""); }} placeholder="+91 9876543210" className="pl-10 h-12" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 pb-3 border-b border-amber-900/30">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-amber-300 font-[family-name:var(--font-geist-mono)] font-semibold">Academic Details</h3>
                </div>

                <div className="space-y-3">
                  <Label>Department <span className="text-amber-400">*</span></Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {DEPARTMENTS.map((dept) => {
                      const isSelected = department === dept.code;
                      return (
                        <button key={dept.code} type="button" onClick={() => { setDepartment(dept.code); setValidationError(""); }}
                          className={`p-3 rounded border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${isSelected ? "bg-amber-500/20 border-amber-500 text-amber-100 shadow-md shadow-amber-950/60 ring-1 ring-amber-500/50" : "bg-[#090503]/70 border-amber-900/40 text-amber-400/80 hover:border-amber-700/60 hover:bg-[#150a04]"}`}>
                          <span className="text-sm font-bold font-[family-name:var(--font-outfit)] text-amber-200">{dept.code}</span>
                          <span className="text-[10px] line-clamp-1 text-amber-500/80 mt-1 font-sans">{dept.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester (Odd) <span className="text-amber-400">*</span></Label>
                  <Select value={semester} onValueChange={(val) => { setSemester(val); setValidationError(""); }}>
                    <SelectTrigger id="semester" className="h-12 w-full sm:w-1/2"><SelectValue placeholder="Select Semester" /></SelectTrigger>
                    <SelectContent>
                      {SEMESTERS.map((s) => (
                        <SelectItem key={s} value={s}>
                          <div className="flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-amber-400" /><span>{s} Semester</span></div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" disabled={status === "loading"} className="group relative overflow-hidden flex items-center justify-center px-10 py-4 bg-amber-500/20 border border-amber-500/60 hover:bg-amber-500/30 hover:border-amber-400 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full">
                  <div className="absolute -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-[0.25em] uppercase text-amber-100 font-[family-name:var(--font-outfit)]">
                    {status === "loading" ? "Registering..." : (
                      <>Submit Registration <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
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
