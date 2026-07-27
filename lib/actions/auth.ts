"use server";

import { redirect } from "next/navigation";
import {
  verifyCredentials,
  createSessionCookie,
  destroySessionCookie,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Enter your email and password." };

  const admin = await verifyCredentials(email, password);
  if (!admin) return { error: "Invalid email or password." };

  await createSessionCookie(admin);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySessionCookie();
  redirect("/admin/login");
}
