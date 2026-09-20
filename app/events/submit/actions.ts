const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxzGJ9V_itGjzT24JlXbxim21DeoFnKd6zuTHOV59S1UDm471h0nATDGiN6AFXr0GwO/exec";

export interface EventSubmissionPayload {
  department: string;
  degree?: string; // <-- ADD THIS LINE
  submitterName: string;
  submitterPhone: string;
  submitterSemester: string;
  eventId: string;
  eventName: string;
  category: string;
  stageType: string;
  eventType: string;
  participants: string;
  notes?: string;
}

export async function submitEventRegistration(data: EventSubmissionPayload) {
  try {
    const params = new URLSearchParams({
      type: "event_registration",
      sheet: "Event Submissions",
      department: data.department,
      submitterName: data.submitterName,
      submitterPhone: data.submitterPhone,
      submitterSemester: data.submitterSemester,
      eventId: data.eventId,
      eventName: data.eventName,
      category: data.category,
      stageType: data.stageType,
      eventType: data.eventType,
      participants: data.participants,
      notes: data.notes || "",
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
