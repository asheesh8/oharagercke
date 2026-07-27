import { NextResponse } from "next/server";
import { z } from "zod";
import { hasDatabase, prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "A valid email is required")
    .max(160),
  phone: z.string().max(40).optional().default(""),
  message: z.string().min(1, "Message is required").max(4000),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }

  if (hasDatabase && prisma) {
    try {
      await prisma.contactSubmission.create({ data: parsed.data });
    } catch {
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
