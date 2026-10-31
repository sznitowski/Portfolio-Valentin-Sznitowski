"use client";

import React, { useActionState } from "react";
import { loginAction, LoginState } from "./actions";
import { Shield, Lock, Mail, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)]">
      <div className="w-full max-w-md surface-card p-8 rounded-xl border border-[var(--border-subtle)] shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">App Idea Radar</h1>
            <p className="text-xs text-[var(--text-secondary)]">Centro de Control & Administración</p>
          </div>
        </div>

        <div className="mb-6 p-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
          <Shield className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
          <span>Acceso privado restringido para el operador del sistema.</span>
        </div>

        {state?.error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Email Administrador
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="admin@valentin.dev"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold"
            >
              <span>{isPending ? "Validando sesión..." : "Ingresar al Radar"}</span>
              {!isPending && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] text-center">
          <p className="text-[11px] text-[var(--text-muted)] font-mono-tech">
            App Idea Radar · Phase 6B Local MVP
          </p>
        </div>
      </div>
    </div>
  );
}
