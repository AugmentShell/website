"use client";

import { useRef, useState } from "react";
import { Button } from "../Button";
import { useDialog } from "../DialogProvider"; // import hook

type Status = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { closeDialog } = useDialog(); //  access close function

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    setErrorMsg("");

    const body = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", { method: "POST", body });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        setStatus("error");
        setErrorMsg(data?.error || "Submission failed. Please try again.");
        return;
      }

      setStatus("success");
      formRef.current?.reset();

      // ✅ auto-close after a short delay (optional)
      setTimeout(() => closeDialog(), 2000);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "pending") {
    return (
      <div className="w-full min-h-[40vh] flex items-center justify-center text-center p-6">
        <div className="space-y-3">
          <h1>Submitting…</h1>
          <p className="body-2 opacity-80">Please wait while we process your message.</p>
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="w-full min-h-[40vh] flex items-center justify-center text-center p-6">
        <div className="space-y-3">
          <h1>Thanks</h1>
          <p className="body-2 opacity-80">
            We’ve received your message and will get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="w-full space-y-4 flex flex-col items-center"
    >
      <h1>Waitlist</h1>
      <hr className="h-px w-full border-0 bg-current mt-[-1rem]" />

      {/* Name */}
      <div className="w-full">
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
          placeholder="Name"
        />
      </div>

      {/* Email */}
      <div className="w-full">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
          placeholder="Email"
        />
      </div>

      {/* Message */}
      <div className="w-full">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
          placeholder="Message…"
        />
      </div>

      {/* Honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      {status === "error" && (
        <div aria-live="polite" className="min-h-[1.5rem] text-sm text-center text-error">
          {errorMsg}
        </div>
      )}

      <Button type="submit" variant="link">
        <h3>Submit</h3>
      </Button>
    </form>
  );
}