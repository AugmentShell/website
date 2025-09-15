import { createClient } from "@supabase/supabase-js";

const createSupabaseServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

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

  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("submissions").insert({
    name,
    email,
    message,
  });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}