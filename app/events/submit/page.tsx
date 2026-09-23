"use client";

import { useState, useMemo } from "react";
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
import {
  DEPARTMENTS,
  FESTIVAL_EVENTS,
  EventCategory,
  FestivalEvent,
  StageType,
} from "@/lib/events-data";
import { submitEventRegistration } from "./actions";
import { StudentSearch } from "@/components/ui/student-search";
import {
  Sparkles,
  Users,
  User,
  Clock,
  Music,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowRight,
  ArrowLeft,
  Building2,
  Phone,
  GraduationCap,
  FileCheck,
  RotateCcw,
  Theater,
  Mic2,
  ChevronRight,
  Trash2,
  Plus,
} from "lucide-react";

const ON_STAGE_CATEGORIES: EventCategory[] = [
  "Music",
  "Musical Instruments",
  "Dance",
  "Theatre",
];

const OFF_STAGE_CATEGORIES: EventCategory[] = [
  "Literary & Oratory",
  "Fine Arts & Visual Arts",
];

const SEMESTERS = ["S1", "S3", "S5", "S7"];

export default function EventSubmissionPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [department, setDepartment] = useState("");
  const [submitterDegree, setSubmitterDegree] = useState<"B.Tech" | "M.Tech">("B.Tech");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterPhone, setSubmitterPhone] = useState("");
  const [submitterSemester, setSubmitterSemester] = useState("");

  const [selectedStageType, setSelectedStageType] = useState<StageType | "">("");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");

  const [participants, setParticipants] = useState<{name: string, rollNo: string, semester: string}[]>([{name: "", rollNo: "", semester: ""}]);
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const availableCategories = useMemo<EventCategory[]>(() => {
    if (selectedStageType === "on-stage") return ON_STAGE_CATEGORIES;
    if (selectedStageType === "off-stage") return OFF_STAGE_CATEGORIES;
    return [];
  }, [selectedStageType]);

  const filteredEvents = useMemo<FestivalEvent[]>(() => {
    if (!selectedStageType) return [];
    return FESTIVAL_EVENTS.filter((ev) => {
      const matchesStage = ev.stageType === selectedStageType;
      const matchesCategory = !selectedCategory || ev.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStage && matchesCategory && matchesSearch;
    });
  }, [selectedStageType, selectedCategory, searchQuery]);

  const selectedEvent = useMemo<FestivalEvent | undefined>(
    () => FESTIVAL_EVENTS.find((e) => e.id === selectedEventId),
    [selectedEventId]
  );

  const handleSelectStageType = (stage: StageType) => {
    setSelectedStageType(stage);
    setSelectedCategory("");
    setSelectedEventId("");
    setParticipants([{name: "", rollNo: "", semester: ""}]);
    setValidationError("");
  };

  const handleSelectCategory = (cat: EventCategory) => {
    setSelectedCategory(cat === selectedCategory ? "" : cat);
    setSelectedEventId("");
    setParticipants([{name: "", rollNo: "", semester: ""}]);
    setValidationError("");
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setValidationError("");
    const ev = FESTIVAL_EVENTS.find((e) => e.id === eventId);
    if (ev) {
      const count =
        ev.type === "group" && typeof ev.participantsCount === "number"
          ? Math.min(ev.participantsCount, 4)
          : 1;
      setParticipants(Array(Math.max(1, count)).fill({name: "", rollNo: "", semester: ""}));
    }
  };

  const addParticipantField = () => setParticipants([...participants, {name: "", rollNo: "", semester: ""}]);

  const removeParticipantField = (index: number) => {
    if (participants.length <= 1) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (index: number, field: "name" | "rollNo" | "semester", value: string) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  const goToStep2 = () => {
    setValidationError("");
    if (!department) { setValidationError("Please select your department."); return; }
    if (!submitterDegree) { setValidationError("Please select B.Tech or M.Tech."); return; }
    if (!submitterSemester) { setValidationError("Please select your semester."); return; }
    if (!submitterName.trim()) { setValidationError("Please enter the representative name."); return; }
    if (!submitterPhone.trim() || submitterPhone.trim().length < 8) { setValidationError("Please enter a valid contact number."); return; }
    setCurrentStep(2);
  };

  const goToStep3 = () => {
    setValidationError("");
    if (!selectedEvent) { setValidationError("Please select an event before proceeding."); return; }
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!department || !selectedEvent) { setValidationError("Missing required details."); return; }
    
    const filledParticipants = participants.filter((p) => p.name.trim());
    if (filledParticipants.length === 0) { setValidationError("Please provide at least one participant name."); return; }
    
    setStatus("loading");
    setValidationError("");
    try {
      const res = await submitEventRegistration({
        department,
        degree: submitterDegree,
        submitterName,
        submitterPhone,
        submitterSemester,
        eventId: selectedEvent.id,
        eventName: selectedEvent.name,
        category: selectedEvent.category,
        stageType: selectedEvent.stageType,
        eventType: selectedEvent.type,
        participants: filledParticipants.map(p => `${p.name.trim()} (${p.rollNo.trim()} - ${p.semester.trim()})`).join(" | "),
        notes,
      });
      setStatus(res.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const resetForAnotherSubmission = () => {
    setStatus("idle");
    setSelectedStageType("");
    setSelectedCategory("");
    setSelectedEventId("");
    setParticipants([{name: "", rollNo: "", semester: ""}]);
    setNotes("");
    setValidationError("");
    setCurrentStep(2);
  };

  const resetFullForm = () => {
    setStatus("idle");
    setDepartment("");
    setSubmitterDegree("B.Tech");
    setSubmitterName("");
    setSubmitterPhone("");
    setSubmitterSemester("");
    setSelectedStageType("");
    setSelectedCategory("");
    setSelectedEventId("");
    setParticipants([{name: "", rollNo: "", semester: ""}]);
    setNotes("");
    setValidationError("");
    setCurrentStep(1);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080605] text-amber-50 selection:bg-amber-900/50 py-10 px-4 sm:px-6">
      <div className="absolute inset-0 z-0 fixed pointer-events-none">
        <Image src={bgArt} alt="Background" fill className="object-cover opacity-[0.2] mix-blend-luminosity" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080605] via-[#080605]/85 to-[#080605]" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="mb-4 hover:scale-105 transition-transform">
            <Image src={logoNoBg} alt="Thouryathrikam" width={76} height={76} className="drop-shadow-2xl" />
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-px bg-amber-600/50"></span>
            <p className="text-[10px] tracking-[0.45em] uppercase text-amber-400/90 font-light font-[family-name:var(--font-geist-mono)]">Thouryathrikam 2026</p>
            <span className="w-6 h-px bg-amber-600/50"></span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase font-[family-name:var(--font-outfit)] tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-900/60">
            Event Registration Portal
          </h1>
        </div>

        {status !== "success" && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {(["1: Department", "2: Event", "3: Participants"] as const).map((label, i) => {
                const step = (i + 1) as 1 | 2 | 3;
                const isActive = currentStep === step;
                const isDone = currentStep > step;
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => {
                      if (step === 1) setCurrentStep(1);
                      else if (step === 2 && (isDone || (department && submitterName && submitterPhone && submitterSemester))) setCurrentStep(2);
                      else if (step === 3 && selectedEvent) setCurrentStep(3);
                    }}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded border transition-all duration-300 ${
                      isActive ? "bg-amber-500/15 border-amber-500/80 text-amber-200 shadow-lg shadow-amber-950/50"
                        : isDone ? "bg-[#140b06]/80 border-amber-800/40 text-amber-400/90 hover:border-amber-600/60 cursor-pointer"
                        : "bg-[#0c0704]/40 border-amber-950/50 text-amber-700/60 cursor-default"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isActive ? "bg-amber-400 text-[#080605]"
                        : isDone ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-amber-950/40 text-amber-800"
                    }`}>{step}</span>
                    <div className="text-center sm:text-left">
                      <p className="text-[10px] uppercase font-mono tracking-wider">Step {step}</p>
                      <p className="text-xs font-semibold font-[family-name:var(--font-outfit)] hidden sm:block">{label.split(": ")[1]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-[#120a05]/75 border border-amber-900/30 backdrop-blur-xl p-6 sm:p-10 rounded-sm relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-600/60" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-600/60" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-600/60" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-600/60" />

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/40">
                <CheckCircle2 className="w-10 h-10 text-amber-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-widest text-amber-200 mb-2 uppercase font-[family-name:var(--font-outfit)]">Registration Submitted</h2>
              <p className="text-amber-500/90 tracking-widest text-xs uppercase font-[family-name:var(--font-geist-mono)] max-w-md mb-8">Your entry has been recorded in the arts portal.</p>
              <div className="w-full max-w-md bg-[#180e08]/90 border border-amber-800/40 rounded p-5 text-left space-y-3 font-mono text-xs text-amber-200/90 mb-8">
                {[
                  { label: "Event", value: selectedEvent?.name },
                  { label: "Program", value: submitterDegree },
                  { label: "Department", value: department },
                  { label: "Submitter", value: `${submitterName} (${submitterSemester})` },
                  { label: "Participants", value: participants.filter((p) => p.name.trim()).map((p) => p.name).join(", ") },
                  ...(notes ? [{ label: "Notes", value: notes }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b border-amber-900/30 pb-2 last:border-0 last:pb-0">
                    <span className="text-amber-500">{label}:</span>
                    <span className="font-semibold text-amber-100 text-right max-w-[200px] truncate">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <button type="button" onClick={resetForAnotherSubmission} className="px-7 py-3 text-xs tracking-[0.2em] uppercase bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 transition-colors text-amber-100 cursor-pointer flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5" /> Submit Another Event for {department}
                </button>
                <button type="button" onClick={resetFullForm} className="px-7 py-3 text-xs tracking-[0.2em] uppercase bg-transparent hover:bg-amber-950/40 border border-amber-900/40 transition-colors text-amber-300 cursor-pointer">Change Department</button>
                <Link href="/" className="px-7 py-3 text-xs tracking-[0.2em] uppercase bg-transparent hover:bg-amber-950/40 border border-amber-900/40 transition-colors text-amber-400">Home</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {validationError && (
                <div className="p-4 bg-amber-950/40 border border-amber-700/60 text-amber-200 text-xs tracking-wider text-center flex items-center justify-center gap-2 animate-in fade-in duration-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-950/40 border border-red-900/60 text-red-200 text-xs tracking-wider text-center flex items-center justify-center gap-2 animate-in fade-in duration-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Submission failed. Please try again.</span>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="flex items-center gap-2 pb-3 border-b border-amber-900/30">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.3em] text-amber-300 font-[family-name:var(--font-geist-mono)] font-semibold">Step 1: Department & Submitter Details</h3>
                      <p className="text-[11px] text-amber-600 tracking-wider">Specify your branch and department contact lead</p>
                    </div>
                  </div>

                  {/* Program / Degree Selection (B.Tech / M.Tech) */}
                  <div className="space-y-2">
                    <Label className="text-amber-400/90">Program / Degree <span className="text-amber-400">*</span></Label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["B.Tech", "M.Tech"] as const).map((deg) => (
                        <button
                          key={deg}
                          type="button"
                          onClick={() => { setSubmitterDegree(deg); setValidationError(""); }}
                          className={`py-3 px-4 rounded border text-xs font-semibold uppercase tracking-wider transition-all duration-200 font-[family-name:var(--font-geist-mono)] cursor-pointer ${
                            submitterDegree === deg
                              ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-950/60 ring-1 ring-amber-500/50"
                              : "bg-[#090503]/70 border-amber-900/40 text-amber-500/70 hover:border-amber-700/60 hover:text-amber-300"
                          }`}
                        >
                          {deg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Select Department <span className="text-amber-400">*</span></Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {DEPARTMENTS.map((dept) => {
                        const isSelected = department === dept.code;
                        return (
                          <button key={dept.code} type="button" onClick={() => { setDepartment(dept.code); setValidationError(""); }}
                            className={`p-3.5 rounded border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${isSelected ? "bg-amber-500/20 border-amber-500 text-amber-100 shadow-md shadow-amber-950/60 ring-1 ring-amber-500/50" : "bg-[#090503]/70 border-amber-900/40 text-amber-400/80 hover:border-amber-700/60 hover:bg-[#150a04]"}`}>
                            <span className="text-base font-bold font-[family-name:var(--font-outfit)] text-amber-200">{dept.code}</span>
                            <span className="text-[10px] line-clamp-2 text-amber-500/80 mt-1 font-sans">{dept.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="submitterSemester">Semester <span className="text-amber-400">*</span></Label>
                      <Select value={submitterSemester} onValueChange={(val) => { setSubmitterSemester(val); setValidationError(""); }}>
                        <SelectTrigger id="submitterSemester" className="h-12"><SelectValue placeholder="Select Semester" /></SelectTrigger>
                        <SelectContent>
                          {SEMESTERS.map((s) => (
                            <SelectItem key={s} value={s}>
                              <div className="flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-amber-400" /><span>{s} Semester</span></div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="submitterName">Lead Participant/Participant1 <span className="text-amber-400">*</span></Label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                        <Input id="submitterName" type="text" value={submitterName} onChange={(e) => { setSubmitterName(e.target.value); setValidationError(""); }} placeholder="e.g. Rahul K" className="pl-10 h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="submitterPhone">WhatsApp Contact <span className="text-amber-400">*</span></Label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                        <Input id="submitterPhone" type="tel" value={submitterPhone} onChange={(e) => { setSubmitterPhone(e.target.value); setValidationError(""); }} placeholder="+91 9876543210" className="pl-10 h-12" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="button" onClick={goToStep2} className="group flex items-center gap-2 px-8 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/60 transition-all duration-300 text-amber-200 text-xs font-semibold tracking-[0.2em] uppercase font-[family-name:var(--font-outfit)] cursor-pointer">
                      <span>Proceed to Select Event</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-900/30">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-amber-300 font-[family-name:var(--font-geist-mono)] font-semibold">Step 2: Choose Festival Event</h3>
                        <p className="text-[11px] text-amber-600 tracking-wider">
                          Submitting for <span className="text-amber-300 font-semibold">{department} ({submitterDegree})</span> ({submitterName})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500">1. Select Stage Type</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleSelectStageType("on-stage")}
                        className={`relative group p-6 rounded border transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer overflow-hidden ${
                          selectedStageType === "on-stage"
                            ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-950/60 ring-1 ring-amber-500/50"
                            : "bg-[#090503]/70 border-amber-900/40 hover:border-amber-700/50 hover:bg-[#150a04]"
                        }`}
                      >
                        <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${selectedStageType === "on-stage" ? "opacity-10" : "group-hover:opacity-5"} bg-gradient-to-br from-amber-300 to-orange-500`} />
                        <Mic2 className={`w-8 h-8 transition-colors ${selectedStageType === "on-stage" ? "text-amber-400" : "text-amber-700"}`} />
                        <div className="text-center">
                          <p className="text-sm font-bold font-[family-name:var(--font-outfit)] text-amber-100 tracking-wider uppercase">On Stage</p>
                          <p className="text-[10px] font-mono text-amber-500/80 mt-0.5">Music · Instruments · Dance · Theatre</p>
                        </div>
                        {selectedStageType === "on-stage" && <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-amber-400" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectStageType("off-stage")}
                        className={`relative group p-6 rounded border transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer overflow-hidden ${
                          selectedStageType === "off-stage"
                            ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-950/60 ring-1 ring-amber-500/50"
                            : "bg-[#090503]/70 border-amber-900/40 hover:border-amber-700/50 hover:bg-[#150a04]"
                        }`}
                      >
                        <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${selectedStageType === "off-stage" ? "opacity-10" : "group-hover:opacity-5"} bg-gradient-to-br from-amber-300 to-orange-500`} />
                        <Theater className={`w-8 h-8 transition-colors ${selectedStageType === "off-stage" ? "text-amber-400" : "text-amber-700"}`} />
                        <div className="text-center">
                          <p className="text-sm font-bold font-[family-name:var(--font-outfit)] text-amber-100 tracking-wider uppercase">Off Stage</p>
                          <p className="text-[10px] font-mono text-amber-500/80 mt-0.5">Literary · Fine Arts · Visual Arts</p>
                        </div>
                        {selectedStageType === "off-stage" && <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-amber-400" />}
                      </button>
                    </div>
                  </div>

                  {selectedStageType && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500">2. Filter by Category (Optional)</p>
                      <div className="flex flex-wrap gap-2">
                        {availableCategories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => handleSelectCategory(cat)}
                            className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer font-[family-name:var(--font-geist-mono)] ${
                              selectedCategory === cat
                                ? "bg-amber-500/25 border-amber-500 text-amber-100 shadow-md"
                                : "bg-[#090503]/80 border-amber-900/40 text-amber-500/90 hover:text-amber-200 hover:border-amber-700/60"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedStageType && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500">3. Select Event</p>
                        <span className="text-[10px] font-mono text-amber-600">{filteredEvents.length} events</span>
                      </div>

                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700 pointer-events-none" />
                        <Input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11" />
                      </div>

                      <div className="max-h-72 overflow-y-auto pr-1 space-y-1.5 border border-amber-950/60 rounded p-2 bg-[#090503]/50">
                        {filteredEvents.length === 0 ? (
                          <div className="py-8 text-center text-xs text-amber-700 font-mono">No events found.</div>
                        ) : (
                          filteredEvents.map((ev, idx) => {
                            const isSelected = selectedEventId === ev.id;
                            return (
                              <div
                                key={ev.id}
                                onClick={() => handleSelectEvent(ev.id)}
                                className={`p-3 rounded border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                                  isSelected
                                    ? "bg-amber-500/20 border-amber-500/80 shadow-md ring-1 ring-amber-500/40"
                                    : "bg-[#140b06]/60 border-amber-900/30 hover:border-amber-700/50 hover:bg-[#1c0f08]"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${isSelected ? "bg-amber-400 text-black font-bold" : "bg-amber-950/60 text-amber-500"}`}>
                                    {idx + 1}
                                  </span>
                                  <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-amber-100 font-[family-name:var(--font-outfit)] truncate">{ev.name}</h4>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70">{ev.category}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/40 text-amber-300">{ev.type}</span>
                                  {ev.duration && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/40 text-amber-400/80 hidden sm:block">{ev.duration}</span>}
                                  <ChevronRight className={`w-3.5 h-3.5 transition-colors ${isSelected ? "text-amber-400" : "text-amber-700"}`} />
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}

                  {selectedEvent && (
                    <div className="p-4 bg-[#170e08] border border-amber-700/40 rounded space-y-3 animate-in fade-in duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          <h4 className="text-sm font-bold text-amber-100 font-[family-name:var(--font-outfit)]">Selected: {selectedEvent.name}</h4>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-amber-300">
                            {selectedEvent.type === "solo" ? "Solo" : `Group — ${selectedEvent.participantsCount}`}
                          </span>
                          {selectedEvent.duration && (
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-amber-300 flex items-center gap-1">
                              <Clock className="w-3 h-3" />{selectedEvent.duration}
                            </span>
                          )}
                          {selectedEvent.accompanistsCount && (
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-amber-300 flex items-center gap-1">
                              <Music className="w-3 h-3" />{selectedEvent.accompanistsCount} Accompanists
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Rules & Guidelines</p>
                        <ul className="space-y-1 pl-4 list-disc marker:text-amber-500 text-xs text-amber-200/90 leading-relaxed">
                          {selectedEvent.guidelines.map((g, i) => <li key={i}>{g}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button type="button" onClick={() => setCurrentStep(1)} className="flex items-center gap-2 px-6 py-3 border border-amber-900/40 hover:bg-amber-950/40 transition-colors text-amber-400 text-xs font-semibold tracking-wider uppercase font-[family-name:var(--font-geist-mono)] cursor-pointer">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="button" onClick={goToStep3} disabled={!selectedEvent} className="group flex items-center gap-2 px-8 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/60 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-amber-200 text-xs font-semibold tracking-[0.2em] uppercase font-[family-name:var(--font-outfit)] cursor-pointer">
                      <span>Proceed to Participants</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && selectedEvent && (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-900/30">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] text-amber-300 font-[family-name:var(--font-geist-mono)] font-semibold">Step 3: Participant List & Final Submission</h3>
                        <p className="text-[11px] text-amber-600 tracking-wider">
                          {department} ({submitterDegree}) · <span className="text-amber-400">{selectedEvent.name}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      {selectedEvent.type} · {selectedEvent.stageType}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center gap-2">Participant List <span className="text-amber-400">*</span></Label>
                    
                    <div className="space-y-3">
                      {participants.map((p, idx) => (
                        <div key={idx} className="relative p-3 rounded border border-amber-900/40 bg-[#120a05]/60 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <Label className="text-amber-500/80 text-[10px] font-mono uppercase tracking-wider">Participant {idx + 1} {idx === 0 && "(Lead)"}</Label>
                            {selectedEvent.type === "group" && participants.length > 1 && (
                              <button type="button" onClick={() => removeParticipantField(idx)} className="text-red-500 hover:text-red-400 p-1 cursor-pointer transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Input
                              type="text"
                              value={p.name}
                              onChange={(e) => handleParticipantChange(idx, "name", e.target.value)}
                              placeholder="Full Name"
                              className="h-11"
                            />
                            <Input
                              type="text"
                              value={p.rollNo}
                              onChange={(e) => handleParticipantChange(idx, "rollNo", e.target.value.toUpperCase())}
                              placeholder="Roll No (e.g. 23B139)"
                              className="h-11 uppercase"
                            />
                            <Select value={p.semester} onValueChange={(val) => handleParticipantChange(idx, "semester", val)}>
                              <SelectTrigger className="h-11"><SelectValue placeholder="Semester" /></SelectTrigger>
                              <SelectContent>
                                {SEMESTERS.map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                      
                      {selectedEvent.type === "group" && (
                        <button type="button" onClick={addParticipantField} className="w-full py-4 mt-2 border border-dashed border-amber-800/60 hover:border-amber-500/80 rounded-lg text-amber-500/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest cursor-pointer">
                          <Plus className="w-4 h-4" /> Add Next Participant
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Specifications — Language / Instrument / Theme (Optional)</Label>
                    <Input id="notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Malayalam, Violin, Hindustani, or Theme Details" className="h-12" />
                  </div>

                  <div className="p-4 bg-[#180e08]/90 border border-amber-900/40 rounded space-y-2">
                    <h5 className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5" /> Registration Summary
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-amber-200/90 pt-1">
                      {[
                        { label: "PROGRAM", value: submitterDegree },
                        { label: "DEPARTMENT", value: department },
                        { label: "SUBMITTER", value: `${submitterName} (${submitterSemester})` },
                        { label: "EVENT", value: selectedEvent.name },
                        { label: "PARTICIPANTS", value: participants.filter((x) => x.name.trim().length > 0).length.toString() },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <span className="text-amber-600 block text-[10px]">{label}</span>
                          <span className="truncate block">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button type="button" onClick={() => setCurrentStep(2)} className="flex items-center gap-2 px-6 py-3 border border-amber-900/40 hover:bg-amber-950/40 transition-colors text-amber-400 text-xs font-semibold tracking-wider uppercase font-[family-name:var(--font-geist-mono)] cursor-pointer w-full sm:w-auto justify-center">
                      <ArrowLeft className="w-4 h-4" /> Back to Event List
                    </button>
                    <button type="submit" disabled={status === "loading"} className="group relative overflow-hidden flex items-center justify-center px-10 py-4 bg-amber-500/20 border border-amber-500/60 hover:bg-amber-500/30 hover:border-amber-400 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto">
                      <div className="absolute -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-[shimmer_1.5s_infinite]" />
                      <span className="relative z-10 text-sm font-semibold tracking-[0.25em] uppercase text-amber-100 font-[family-name:var(--font-outfit)]">
                        {status === "loading" ? "Submitting..." : "Confirm & Submit Entry"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}