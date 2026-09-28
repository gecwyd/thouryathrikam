import assert from "node:assert/strict";
import test from "node:test";
import { findStudentProfile } from "./student-portal.ts";

const students = {
  filename: "Students",
  columns: ["Name", "Roll No", "Department", "Semester", "Phone", "Timestamp"],
  rows: [["A Student", "23B001", "CSE", "S5", "0000000000", "today"]],
};

const events = {
  filename: "Event Submissions",
  columns: ["Department", "Event", "Event ID", "Stage", "Type", "Participants"],
  rows: [
    ["CSE", "Quiz", "quiz", "off-stage", "group", "A Student (23B001 - S5) | B Student (23B002 - S5)"],
    ["CSE", "Quiz", "quiz", "off-stage", "group", "A Student (23B001 - S5) | B Student (23B002 - S5)"],
    ["CSE", "Essay", "essay", "off-stage", "solo", "A Student (23B001 - S5)"],
  ],
};

test("finds a student by class roll and shows distinct event entries", () => {
  const profile = findStudentProfile(" 23b001 ", students, events);
  assert.equal(profile?.name, "A Student");
  assert.equal(profile?.studentRecordFound, true);
  assert.deepEqual(profile?.events.map(({ name }) => name), ["Essay", "Quiz"]);
});

test("finds a group participant even without a Students sheet row", () => {
  const profile = findStudentProfile("23B002", students, events);
  assert.equal(profile?.name, "B Student");
  assert.equal(profile?.studentRecordFound, false);
  assert.deepEqual(profile?.events.map(({ name }) => name), ["Quiz"]);
});

test("rejects an unknown class roll", () => {
  assert.equal(findStudentProfile("23B999", students, events), null);
});
