"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogOut, UserRound } from "lucide-react";
import logo from "@/public/logo-no-bg.webp";
import { loadStudentPortalSheets } from "@/lib/registrations-sheet";
import { findStudentProfile, normalizeRollNumber, type StudentProfile } from "@/lib/student-portal";

export default function StudentLoginPage() {
  const [number, setNumber] = useState("");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rollNo = normalizeRollNumber(number);
    if (!rollNo) {
      setError("Enter your class roll number.");
      return;
    }

    setLoading(true);
    setError("");
    const result = await loadStudentPortalSheets();
    if (!result.students || !result.events) {
      setError("Complete student records are unavailable right now. Please try again.");
    } else {
      const match = findStudentProfile(rollNo, result.students, result.events);
      if (match) setProfile(match);
      else setError("No student or event entry was found for that class roll number.");
    }
    setLoading(false);
  }

  function signOut() {
    setProfile(null);
    setNumber("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#080605] px-4 py-8 text-amber-50 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 flex items-center justify-between gap-4 border-b border-amber-900/40 pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Thouryathrikam home">
            <Image src={logo} alt="" width={52} height={52} />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500 sm:text-xs">Thouryathrikam 2026</span>
          </Link>
          {profile && <button type="button" onClick={signOut} className="inline-flex items-center gap-2 text-sm text-amber-300 hover:text-amber-100"><LogOut size={16} aria-hidden="true" /> Sign out</button>}
        </header>

        {!profile ? (
          <section className="mx-auto max-w-md rounded border border-amber-900/40 bg-[#120c08] p-6 shadow-2xl sm:p-10">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300"><UserRound aria-hidden="true" /></div>
            <h1 className="mb-2 font-[family-name:var(--font-outfit)] text-3xl font-bold">Student login</h1>
            <p className="mb-7 text-sm leading-relaxed text-amber-200/65">Enter your class roll number to see your student details and event entries.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="roll-number" className="mb-2 block text-sm font-medium text-amber-200">Class roll number</label>
                <input id="roll-number" name="roll-number" value={number} onChange={(event) => setNumber(event.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} placeholder="e.g. 23B139" className="w-full rounded border border-amber-900/60 bg-[#080605] px-4 py-3 text-amber-50 outline-none placeholder:text-amber-200/30 focus:border-amber-500" />
              </div>
              {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded border border-amber-500/60 bg-amber-500/20 px-5 py-3 font-semibold text-amber-100 transition-colors hover:bg-amber-500/30 disabled:opacity-50">
                {loading ? "Checking records…" : "View my records"}<ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>
            <p className="mt-6 text-xs leading-relaxed text-amber-200/45">This number only looks up existing records. It does not verify your identity or create a private account.</p>
          </section>
        ) : (
          <div className="space-y-8">
            <section className="rounded border border-amber-900/40 bg-[#120c08] p-6 sm:p-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-amber-500">Student records</p>
              <h1 className="mb-6 font-[family-name:var(--font-outfit)] text-3xl font-bold">{profile.name}</h1>
              <dl className="grid gap-5 text-sm sm:grid-cols-3">
                <div><dt className="mb-1 text-amber-200/55">Class roll number</dt><dd className="font-semibold text-amber-100">{profile.rollNo}</dd></div>
                <div><dt className="mb-1 text-amber-200/55">Department</dt><dd className="font-semibold text-amber-100">{profile.department || "—"}</dd></div>
                <div><dt className="mb-1 text-amber-200/55">Semester</dt><dd className="font-semibold text-amber-100">{profile.semester || "—"}</dd></div>
              </dl>
              {!profile.studentRecordFound && <p className="mt-6 text-sm text-amber-300/80">Your event entries were found, but there is no matching record in the Students sheet.</p>}
            </section>

            <section aria-labelledby="my-events-heading">
              <div className="mb-4 flex items-end justify-between gap-3">
                <h2 id="my-events-heading" className="text-xl font-semibold">My event entries</h2>
                <span className="text-sm text-amber-200/60">{profile.events.length} {profile.events.length === 1 ? "event" : "events"}</span>
              </div>
              {profile.events.length === 0 ? (
                <p className="rounded border border-amber-900/40 bg-[#120c08] p-8 text-center text-sm text-amber-200/60">No event entries were found for this roll number.</p>
              ) : (
                <ul className="space-y-2">
                  {profile.events.map((entry, index) => (
                    <li key={`${entry.stage}-${entry.name}-${index}`} className="flex flex-wrap items-center justify-between gap-2 rounded border border-amber-900/40 bg-[#120c08] px-5 py-4">
                      <span className="font-medium text-amber-100">{entry.name}</span>
                      <span className="text-xs uppercase tracking-wider text-amber-300/70">{entry.type || "Event"} · {entry.stage || "Stage unknown"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
