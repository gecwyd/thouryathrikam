"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileSpreadsheet, RefreshCw } from "lucide-react";
import logo from "@/public/logo-no-bg.webp";
import type { RegistrationSheet } from "@/lib/registrations-types";
import { loadRegistrationSheets } from "@/lib/registrations-sheet";
import { findEventLimitViolations } from "@/lib/event-limits";

export default function AdminPage() {
  const [sheets, setSheets] = useState<RegistrationSheet[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"lists" | "limits">("lists");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await loadRegistrationSheets();
    setSheets(result.sheets);
    setError(result.errors.join(" "));
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    void loadRegistrationSheets().then((result) => {
      if (!active) return;
      setSheets(result.sheets);
      setError(result.errors.join(" "));
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const total = sheets.reduce((count, sheet) => count + sheet.rows.length, 0);
  const eventSheet = sheets.find((sheet) => sheet.filename === "Event Submissions");
  const limitReport = useMemo(() => findEventLimitViolations(eventSheet), [eventSheet]);

  return (
    <main className="min-h-screen bg-[#080605] px-4 py-8 text-amber-50 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/40 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Thouryathrikam home">
              <Image src={logo} alt="" width={50} height={50} />
            </Link>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-amber-500">Thouryathrikam 2026</p>
              <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold sm:text-3xl">Registrations</h1>
            </div>
          </div>
          {sheets.length > 0 && (
            <p className="text-sm text-amber-200/80">{total} {total === 1 ? "registration" : "registrations"} across {sheets.length} {sheets.length === 1 ? "list" : "lists"}</p>
          )}
        </header>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => void refresh()} disabled={loading} className="inline-flex items-center gap-2 rounded border border-amber-500/50 bg-amber-500/15 px-5 py-3 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-500/25 disabled:opacity-50">
            <RefreshCw size={17} aria-hidden="true" />
            {loading ? "Loading…" : "Refresh lists"}
          </button>
          <p className="text-sm text-amber-200/60">The registration lists load from Google Sheets.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 border-b border-amber-900/40 pb-5" aria-label="Registration views">
          <button type="button" onClick={() => setView("lists")} aria-pressed={view === "lists"} className={`rounded border px-4 py-2 text-sm transition-colors ${view === "lists" ? "border-amber-500 bg-amber-500/20 text-amber-100" : "border-amber-900/50 text-amber-300/70 hover:border-amber-600"}`}>All registrations</button>
          <button type="button" onClick={() => setView("limits")} aria-pressed={view === "limits"} className={`rounded border px-4 py-2 text-sm transition-colors ${view === "limits" ? "border-amber-500 bg-amber-500/20 text-amber-100" : "border-amber-900/50 text-amber-300/70 hover:border-amber-600"}`}>Over event limits{eventSheet ? ` (${limitReport.participants.length})` : ""}</button>
        </div>

        {error && <p role="alert" className="mb-8 rounded border border-red-800/60 bg-red-950/30 p-4 text-sm text-red-200">{error}</p>}

        {view === "limits" ? (
          <section aria-labelledby="limits-heading">
            <h2 id="limits-heading" className="mb-2 text-xl font-semibold text-amber-100">Students over event limits</h2>
            <p className="mb-5 text-sm text-amber-200/65">Off-stage events only. A student appears here after entering more than 5 distinct individual events or more than 3 distinct group events. Repeat submissions for the same event count once.</p>
            {limitReport.skipped > 0 && <p className="mb-4 text-sm text-amber-300">{limitReport.skipped} participant {limitReport.skipped === 1 ? "entry could" : "entries could"} not be matched and {limitReport.skipped === 1 ? "was" : "were"} excluded.</p>}
            {!eventSheet ? (
              <p className="rounded border border-amber-900/40 bg-[#120c08] p-8 text-center text-amber-200/70">{loading ? "Loading event submissions…" : "Event submissions are unavailable."}</p>
            ) : limitReport.participants.length === 0 ? (
              <p className="rounded border border-amber-900/40 bg-[#120c08] p-8 text-center text-amber-200/70">No students exceed either limit in the available off-stage submissions.</p>
            ) : (
              <div className="overflow-x-auto rounded border border-amber-900/40 bg-[#120c08]">
                <table className="w-full min-w-max border-collapse text-left text-sm">
                  <thead className="bg-amber-950/50 text-xs uppercase tracking-wider text-amber-300">
                    <tr>
                      <th scope="col" className="border-b border-amber-900/40 px-4 py-3">Student</th>
                      <th scope="col" className="border-b border-amber-900/40 px-4 py-3">Roll No</th>
                      <th scope="col" className="border-b border-amber-900/40 px-4 py-3">Department</th>
                      <th scope="col" className="border-b border-amber-900/40 px-4 py-3">Individual / 5</th>
                      <th scope="col" className="border-b border-amber-900/40 px-4 py-3">Group / 3</th>
                      <th scope="col" className="border-b border-amber-900/40 px-4 py-3">Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {limitReport.participants.map((participant, index) => (
                      <tr key={`${participant.rollNo || participant.name}-${index}`} className="border-b border-amber-900/20 last:border-0 align-top hover:bg-amber-900/10">
                        <th scope="row" className="px-4 py-3 font-semibold text-amber-100">{participant.name}</th>
                        <td className="px-4 py-3">{participant.rollNo || "—"}</td>
                        <td className="px-4 py-3">{participant.department || "—"}</td>
                        <td className={`px-4 py-3 font-semibold ${participant.individualCount > 5 ? "text-red-300" : "text-amber-200/70"}`}>{participant.individualCount}</td>
                        <td className={`px-4 py-3 font-semibold ${participant.groupCount > 3 ? "text-red-300" : "text-amber-200/70"}`}>{participant.groupCount}</td>
                        <td className="max-w-md whitespace-normal px-4 py-3 text-amber-200/70">
                          {participant.individualEvents.length > 0 && <p><span className="font-semibold text-amber-300">Individual:</span> {participant.individualEvents.join(", ")}</p>}
                          {participant.groupEvents.length > 0 && <p className="mt-1"><span className="font-semibold text-amber-300">Group:</span> {participant.groupEvents.join(", ")}</p>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : sheets.length === 0 ? (
          <div className="rounded border border-amber-900/40 bg-[#120c08] px-6 py-20 text-center">
            <FileSpreadsheet className="mx-auto mb-5 text-amber-500/70" size={38} aria-hidden="true" />
            <h2 className="mb-2 text-xl font-semibold">No registrations loaded</h2>
            <p className="text-sm text-amber-200/60">{loading ? "Loading the registration sheets…" : "No registrations are available. Try refreshing."}</p>
          </div>
        ) : (
          <div className="space-y-9">
            {sheets.map((sheet, sheetIndex) => (
              <details key={`${sheet.filename}-${sheetIndex}`} open={sheetIndex === 0} className="group">
                <summary className="mb-3 flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 border-b border-amber-900/40 pb-3 marker:hidden">
                  <span className="flex items-center gap-3 break-all text-lg font-semibold text-amber-100"><span aria-hidden="true" className="text-amber-500 transition-transform group-open:rotate-90">›</span>{sheet.filename}</span>
                  <span className="text-sm text-amber-200/60">{sheet.rows.length} {sheet.rows.length === 1 ? "registration" : "registrations"}</span>
                </summary>
                <div className="overflow-x-auto rounded border border-amber-900/40 bg-[#120c08]">
                  <table className="w-full min-w-max border-collapse text-left text-sm">
                    <thead className="bg-amber-950/50 text-xs uppercase tracking-wider text-amber-300">
                      <tr>
                        <th scope="col" className="border-b border-amber-900/40 px-4 py-3">#</th>
                        {sheet.columns.map((column, index) => (
                          <th key={index} scope="col" className="border-b border-amber-900/40 px-4 py-3">{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sheet.rows.map((row, index) => (
                        <tr key={index} className="border-b border-amber-900/20 last:border-0 hover:bg-amber-900/10">
                          <th scope="row" className="px-4 py-3 font-normal text-amber-500/70">{index + 1}</th>
                          {row.map((value, cellIndex) => (
                            <td key={cellIndex} className="max-w-md whitespace-pre-wrap break-words px-4 py-3 text-amber-50/85">{value || "—"}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sheet.rows.length === 0 && <p className="px-4 py-8 text-center text-sm text-amber-200/60">This file has no registrations.</p>}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
