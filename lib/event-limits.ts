import type { RegistrationSheet } from "./registrations-types";

type EventType = "individual" | "group";

export type EventLimitViolation = {
  name: string;
  rollNo: string;
  department: string;
  individualCount: number;
  groupCount: number;
  individualEvents: string[];
  groupEvents: string[];
};

type Entry = {
  name: string;
  normalizedName: string;
  rollNo: string;
  department: string;
  semester: string;
  eventId: string;
  eventName: string;
  type: EventType;
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function columnIndex(sheet: RegistrationSheet, label: string) {
  return sheet.columns.findIndex((column) => normalize(column).toLowerCase() === label);
}

export function findEventLimitViolations(sheet?: RegistrationSheet) {
  if (!sheet) return { participants: [] as EventLimitViolation[], skipped: 0 };

  const indexes = Object.fromEntries(
    ["department", "semester", "event", "event id", "stage", "type", "participants"]
      .map((label) => [label, columnIndex(sheet, label)]),
  );
  if (["event", "stage", "type", "participants"].some((label) => indexes[label] < 0)) {
    return { participants: [] as EventLimitViolation[], skipped: sheet.rows.length };
  }

  const entries: Entry[] = [];
  let skipped = 0;

  for (const row of sheet.rows) {
    const value = (label: string) => normalize(row[indexes[label]] ?? "");
    const stage = value("stage").toLowerCase().replace(/\s+/g, "-");
    if (stage !== "off-stage") continue;
    const rawType = value("type").toLowerCase();
    const type: EventType = rawType === "solo" || rawType === "individual" ? "individual" : "group";
    if (type === "group" && rawType !== "group") continue;

    const eventName = value("event");
    if (!eventName) {
      skipped += 1;
      continue;
    }

    for (const participant of value("participants").split(/\s*\|\s*/)) {
      const match = participant.match(/^(.*)\(([^()]*)\s*-\s*([^()]*)\)$/);
      const name = normalize(match?.[1] ?? "");
      if (!name) {
        skipped += 1;
        continue;
      }

      entries.push({
        name,
        normalizedName: name.toLocaleLowerCase(),
        rollNo: normalize(match?.[2] ?? "").replace(/\s/g, "").toUpperCase(),
        department: value("department").toUpperCase(),
        semester: normalize(match?.[3] ?? value("semester")).toUpperCase(),
        eventId: (value("event id") || eventName).toLocaleLowerCase(),
        eventName,
        type,
      });
    }
  }

  // Attach entries without roll numbers to a known student only when their name,
  // department, and semester point to exactly one roll number.
  const rollsByIdentity = new Map<string, Set<string>>();
  const identity = (entry: Entry) => `${entry.normalizedName}|${entry.department}|${entry.semester}`;
  for (const entry of entries) {
    if (!entry.rollNo) continue;
    const key = identity(entry);
    if (!rollsByIdentity.has(key)) rollsByIdentity.set(key, new Set());
    rollsByIdentity.get(key)?.add(entry.rollNo);
  }

  const groups = new Map<string, { sample: Entry; individual: Map<string, string>; group: Map<string, string> }>();
  for (const entry of entries) {
    const possibleRolls = rollsByIdentity.get(identity(entry));
    const resolvedRoll = entry.rollNo || (possibleRolls?.size === 1 ? [...possibleRolls][0] : "");
    const key = resolvedRoll ? `roll:${resolvedRoll}` : `name:${identity(entry)}`;
    if (!groups.has(key)) groups.set(key, { sample: entry, individual: new Map(), group: new Map() });
    const group = groups.get(key)!;
    if (!group.sample.rollNo && resolvedRoll) group.sample = { ...entry, rollNo: resolvedRoll };
    group[entry.type].set(entry.eventId, entry.eventName);
  }

  const participants = [...groups.values()]
    .map(({ sample, individual, group }) => ({
      name: sample.name,
      rollNo: sample.rollNo,
      department: sample.department,
      individualCount: individual.size,
      groupCount: group.size,
      individualEvents: [...individual.values()].sort(),
      groupEvents: [...group.values()].sort(),
    }))
    .filter((participant) => participant.individualCount > 5 || participant.groupCount > 3)
    .sort((a, b) =>
      Math.max(b.individualCount - 5, b.groupCount - 3) - Math.max(a.individualCount - 5, a.groupCount - 3)
      || a.name.localeCompare(b.name),
    );

  return { participants, skipped };
}
