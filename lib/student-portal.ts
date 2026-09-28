import type { RegistrationSheet } from "./registrations-types";

export type StudentEvent = {
  name: string;
  stage: string;
  type: string;
};

export type StudentProfile = {
  name: string;
  rollNo: string;
  department: string;
  semester: string;
  studentRecordFound: boolean;
  events: StudentEvent[];
};

export function normalizeRollNumber(value: string) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

function column(sheet: RegistrationSheet, label: string) {
  return sheet.columns.findIndex((value) => value.trim().toLowerCase() === label);
}

export function findStudentProfile(
  rollNumber: string,
  students?: RegistrationSheet,
  eventSheet?: RegistrationSheet,
): StudentProfile | null {
  const rollNo = normalizeRollNumber(rollNumber);
  if (!rollNo) return null;

  const studentRollColumn = students ? column(students, "roll no") : -1;
  const studentRows = studentRollColumn < 0 ? [] : students!.rows.filter((row) =>
    normalizeRollNumber(row[studentRollColumn] ?? "") === rollNo,
  );
  const studentRow = studentRows.at(-1);
  const studentValue = (label: string) => {
    if (!students || !studentRow) return "";
    const index = column(students, label);
    return index < 0 ? "" : (studentRow[index] ?? "").trim();
  };

  const events = new Map<string, StudentEvent>();
  let participantName = "";
  let participantSemester = "";
  let participantDepartment = "";
  if (eventSheet) {
    const indexes = Object.fromEntries(
      ["event", "event id", "stage", "type", "participants", "department"]
        .map((label) => [label, column(eventSheet, label)]),
    );
    if (indexes.participants >= 0 && indexes.event >= 0) {
      for (const row of eventSheet.rows) {
        const rawParticipants = row[indexes.participants] ?? "";
        for (const participant of rawParticipants.split(/\s*\|\s*/)) {
          const match = participant.trim().match(/^(.*)\(([^()]*)\s*-\s*([^()]*)\)$/);
          if (!match || normalizeRollNumber(match[2]) !== rollNo) continue;
          const eventName = (row[indexes.event] ?? "").trim();
          if (!eventName) continue;
          participantName = match[1].trim() || participantName;
          participantSemester = match[3].trim() || participantSemester;
          participantDepartment = (row[indexes.department] ?? "").trim() || participantDepartment;
          const stage = (row[indexes.stage] ?? "").trim();
          const type = (row[indexes.type] ?? "").trim();
          const eventId = (row[indexes["event id"]] ?? eventName).trim().toLowerCase();
          events.set(`${stage}|${eventId}`, { name: eventName, stage, type });
        }
      }
    }
  }

  if (!studentRow && events.size === 0) return null;

  return {
    name: studentValue("name") || participantName || "Student",
    rollNo,
    department: studentValue("department") || participantDepartment,
    semester: studentValue("semester") || participantSemester,
    studentRecordFound: Boolean(studentRow),
    events: [...events.values()].sort((a, b) => a.name.localeCompare(b.name)),
  };
}
