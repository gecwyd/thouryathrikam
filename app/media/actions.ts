const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxySmAaLjG-ydSgo3uCdhgkIoGxuW0dZXFnm1nGcyhu_Ic1gCoOWrNoyHrrmtRvN8iX/exec";

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

    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Form Submit Error:", error);
    return { success: false, error: error.message };
  }
}
