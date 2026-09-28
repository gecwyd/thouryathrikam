"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileSpreadsheet, RefreshCw } from "lucide-react";
import logo from "@/public/logo-no-bg.webp";
import type { RegistrationSheet } from "@/lib/registrations-types";
import { loadRegistrationSheets } from "@/lib/registrations-sheet";

export default function AdminPage() {
  const [sheets, setSheets] = useState<RegistrationSheet[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

        {error && <p role="alert" className="mb-8 rounded border border-red-800/60 bg-red-950/30 p-4 text-sm text-red-200">{error}</p>}

        {sheets.length === 0 ? (
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
