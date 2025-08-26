import { Button } from "../Button";

export function ContactForm() {
  return (
    <form
      method="post"
      action="/api/contact" // <- classic HTML post to your Route Handler
      className="w-full space-y-4 flex flex-col items-center"
    >
      {/* Title */}
      <h1>Waitlist</h1>

      <hr className="h-px w-full border-0 bg-current mt-[-1rem]" />
      {/* Name */}
      <div className="w-full">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
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
        <label htmlFor="email" className="sr-only">
          Email
        </label>
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
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
          placeholder="Message…"
        />
      </div>

      {/* (Optional) Honeypot anti-bot field */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <Button 
        type="submit"
      >
        <h3>Submit</h3>
      </Button>
    </form>
  );
}