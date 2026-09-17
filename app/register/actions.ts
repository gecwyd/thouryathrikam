// We use the same Google Apps Script URL
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxzGJ9V_itGjzT24JlXbxim21DeoFnKd6zuTHOV59S1UDm471h0nATDGiN6AFXr0GwO/exec";

export interface StudentRegistrationPayload {
  name: string;
  rollNo: string;
  regNo: string;
  department: string;
  semester: string;
  phone: string;
}

export async function submitStudentRegistration(data: StudentRegistrationPayload) {
  try {
    const params = new URLSearchParams({
      type: "student_registration", // New type for Google Apps Script to differentiate
      sheet: "Students", // Name of the sheet to save students
      name: data.name,
      rollNo: data.rollNo,
      regNo: data.regNo,
      department: data.department,
      semester: data.semester,
      phone: data.phone,
    });

    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit";
    return { success: false, error: message };
  }
}
