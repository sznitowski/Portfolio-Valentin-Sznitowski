"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signSession } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";

  if (!email || !password) {
    return { error: "Por favor complete todos los campos." };
  }

  const expectedEmail = process.env.ADMIN_EMAIL || "";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || "";

  if (!expectedEmail || !expectedPassword || !sessionSecret) {
    return { error: "Configuración de autenticación incompleta en el servidor." };
  }

  // Case-insensitive email check & direct password comparison (server-side only)
  if (
    email.toLowerCase() !== expectedEmail.toLowerCase() ||
    password !== expectedPassword
  ) {
    return { error: "Credenciales inválidas." };
  }

  // Create signed session token
  const sessionToken = await signSession(expectedEmail, sessionSecret);

  // Set HttpOnly signed cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin/idea-radar");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
