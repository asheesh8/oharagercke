"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const field =
  "w-full rounded-2xl border border-line bg-bone/60 px-4 py-3 text-ink placeholder:text-mist transition-colors focus:border-clay/50 focus:bg-paper focus:outline-none focus:ring-4 focus:ring-clay/10";
const label = "mb-1.5 block text-sm font-medium text-graphite";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      toast.success("Thanks — your message is on its way. We'll be in touch shortly.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Phone <span className="text-mist">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            maxLength={40}
            placeholder="802.000.0000"
            className={field}
          />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={160}
          placeholder="you@example.com"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor="message">
          About your project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Tell us where you're building, your timeline, and what you have in mind…"
          className={`${field} resize-none`}
        />
      </div>
      <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
        {loading ? "Sending…" : "Send message"}
        {!loading && <Send className="size-4" />}
      </Button>
    </form>
  );
}
