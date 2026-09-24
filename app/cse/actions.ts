const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw1Z6xtv7FLbavQ7khzb93gHYAAzrXVH6sZ1upSwvA5puvH8Vp6SuoWAanyv94ztio5/exec";

export interface CseRegistrationPayload {
  name: string;
  phone: string;
  semester: string;
  item: string;
}

export async function submitCseRegistration(data: CseRegistrationPayload) {
  try {
    const params = new URLSearchParams({
      Name: data.name,
      Phone: data.phone,
      Semester: data.semester,
      Item: data.item,
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
