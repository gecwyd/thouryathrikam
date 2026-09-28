import type { RegistrationSheet } from "./registrations-types";

const SPREADSHEET_ID = "1jCLEcVtqIKLGLRX1NfBz12rGmFxVzKZaDMcGxb2zcoQ";

const SHEETS = [
  { name: "Students", columns: ["Name", "Roll No", "Department", "Semester", "Phone", "Timestamp"] },
  { name: "Event Submissions" },
  { name: "Volunteers Call" },
  { name: "Media Call" },
] as const;

type GoogleCell = { v?: string | number | null; f?: string } | null;
type GoogleResponse = {
  status: string;
  errors?: { detailed_message?: string; message?: string }[];
  table?: {
    cols: { label: string }[];
    rows: { c: GoogleCell[] }[];
  };
};

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

function loadSheet(name: string, fallbackColumns?: readonly string[]): Promise<RegistrationSheet> {
  return new Promise((resolve, reject) => {
    const callback = `__registrationSheet_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const url = new URL(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq`);
    url.searchParams.set("sheet", name);
    url.searchParams.set("tqx", `out:json;responseHandler:${callback}`);
    script.src = url.toString();
    script.async = true;

    let settled = false;
    const cleanup = () => {
      window.clearTimeout(timeout);
      script.remove();
      delete window[callback];
    };
    const fail = (message: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(`${name}: ${message}`));
    };

    window[callback] = (response: GoogleResponse) => {
      if (settled) return;
      if (response.status !== "ok" || !response.table) {
        fail(response.errors?.[0]?.detailed_message ?? response.errors?.[0]?.message ?? "Could not load registrations.");
        return;
      }

      const { cols, rows } = response.table;
      const count = fallbackColumns?.length ?? cols.reduce((last, col, index) => col.label.trim() ? index + 1 : last, 0);
      const columns = fallbackColumns
        ? [...fallbackColumns]
        : cols.slice(0, count).map((col, index) => col.label.trim() || `Column ${index + 1}`);

      settled = true;
      cleanup();
      resolve({
        filename: name,
        columns,
        rows: rows
          .map(({ c }) => columns.map((_, index) => {
            const cell = c[index];
            return cell?.f ?? String(cell?.v ?? "");
          }))
          .filter((row) => row.some((value) => value.trim())),
      });
    };
    script.onerror = () => fail("Could not connect to Google Sheets.");
    const timeout = window.setTimeout(() => fail("The request timed out."), 20000);
    document.head.appendChild(script);
  });
}

export async function loadRegistrationSheets() {
  const results = await Promise.allSettled(SHEETS.map((sheet) =>
    loadSheet(sheet.name, "columns" in sheet ? sheet.columns : undefined),
  ));

  return {
    sheets: results.flatMap((result) => result.status === "fulfilled" ? [result.value] : []),
    errors: results.flatMap((result) => result.status === "rejected" ? [String(result.reason)] : []),
  };
}
