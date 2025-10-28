const apiUrl =
  "http://ec2-51-20-249-56.eu-north-1.compute.amazonaws.com:3000/api";
export async function sendEmail(payload: {
  name: string;
  token: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  track: boolean;
}) {
  const res = await fetch(`${apiUrl}/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to send email");
  }

  return res.json();
}
