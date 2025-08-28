export async function POST(req: Request) {
  // If you used a <form> with FormData, read it like this:
  const form = await req.formData();

  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const message = String(form.get("message") || "");
  const honeypot = String(form.get("company") || ""); // empty if real human

  // Basic validation
  if (!name || !email || !message || honeypot) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid input" }), { status: 400 });
  }

  // TODO: send an email, write to DB, forward to your helpdesk, etc.
  // e.g., await sendEmail({ name, email, message })

  // You can return JSON (the browser will navigate to a JSON page),
  // or redirect back with a query param to show a "Thanks" message.
  return Response.json({ ok: true });
}