const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwEy3Stnt9OUrxBIcxeA4kKukG4rdHKzwkyQaNf7HPd_p8OgLMLCrEG4yfYC7peEk3F/exec";

export async function submitVolunteerForm(data: {
  name: string;
  semester: string;
  department: string;
  phone: string;
  committee: string;
}) {
  try {
    const params = new URLSearchParams({
      type: "volunteer",
      sheet: "Volunteers Call",
      name: data.name,
      semester: data.semester,
      department: data.department,
      phone: data.phone,
      committee: data.committee,
      roles: data.committee,
    });

    await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
