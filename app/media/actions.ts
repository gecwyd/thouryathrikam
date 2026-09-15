"use server";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxySmAaLjG-ydSgo3uCdhgkIoGxuW0dZXFnm1nGcyhu_Ic1gCoOWrNoyHrrmtRvN8iX/exec"
export async function submitMediaForm(data: {
  name: string;
  semester: string;
  department: string;
  phone: string;
  roles: string;
}) {
  try {
    const params = new URLSearchParams({
      name: data.name,
      semester: data.semester,
      department: data.department,
      phone: data.phone,
      roles: data.roles,
    });

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    const result = await response.text();

    if (!response.ok) {
      console.error("GAS responded with non-OK status:", response.status, result);
      return { success: false, error: `Server responded with status ${response.status}` };
    }

    if (result.toLowerCase().includes("error") || result.toLowerCase().includes("unable to open")) {
      console.error("GAS returned error response:", result.slice(0, 200));
      return { success: false, error: "Script returned an error" };
    }

    try {
      const parsed = JSON.parse(result);
      if (parsed.status === "error" || parsed.error) {
        return { success: false, error: parsed.error || parsed.message };
      }
      return { success: true, data: parsed };
    } catch {
      return { success: true, data: result };
    }
  } catch (error: any) {
    console.error("Server Action Fetch Error:", error);
    return { success: false, error: error.message };
  }
}
