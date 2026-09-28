import assert from "node:assert/strict";
import test from "node:test";
import { findEventLimitViolations } from "./event-limits.ts";

const columns = ["Department", "Semester", "Event", "Event ID", "Stage", "Type", "Participants"];
const row = (event, type, participants, stage = "off-stage") =>
  ["CSE", "S5", event, event.toLowerCase().replaceAll(" ", "-"), stage, type, participants];

test("counts distinct individual events and includes each group participant", () => {
  const rows = [
    ...Array.from({ length: 6 }, (_, index) => row(`Solo ${index + 1}`, "solo", "A Student (23B001 - S5)")),
    row("Solo 1", "solo", "A Student (23B001 - S5)"),
    ...Array.from({ length: 4 }, (_, index) => row(`Group ${index + 1}`, "group", "A Student (23B001 - S5) | B Student (23B002 - S5)")),
    row("Group 5", "group", "A Student (23B001 - S5)", "on-stage"),
  ];
  const report = findEventLimitViolations({ filename: "Event Submissions", columns, rows });

  assert.equal(report.skipped, 0);
  assert.deepEqual(report.participants.map(({ rollNo, individualCount, groupCount }) =>
    ({ rollNo, individualCount, groupCount })), [
    { rollNo: "23B001", individualCount: 6, groupCount: 4 },
    { rollNo: "23B002", individualCount: 0, groupCount: 4 },
  ]);
});

test("matches blank roll entries when name, department, and semester identify one roll", () => {
  const rows = [
    row("Quiz", "group", "C Student (23B003 - S5)"),
    row("Debate", "group", "C Student ( - S5)"),
    row("Art", "group", "C Student ( - S5)"),
    row("Music", "group", "C Student ( - S5)"),
  ];
  const report = findEventLimitViolations({ filename: "Event Submissions", columns, rows });
  assert.equal(report.participants.length, 1);
  assert.equal(report.participants[0].rollNo, "23B003");
  assert.equal(report.participants[0].groupCount, 4);
});
