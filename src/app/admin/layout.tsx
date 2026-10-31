"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./login/actions";
import {
  Activity,
  Compass,
  FileText,
  LayoutDashboard,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // On login page, render cleanly without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/idea-radar",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Oportunidades",
      href: "/admin/idea-radar/opportunities",
      icon: Compass,
      exact: false,
    },
    {
      label: "Decision Review",
      href: "/admin/idea-radar/decision-review",
      icon: FileText,
      exact: false,
    },
    {
      label: "Runs & Logs",
      href: "/admin/idea-radar/runs",
      icon: Activity,
      exact: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-[var(--bg-surface)] border-b md:border-b-0 md:border-r border-[var(--border-subtle)] flex flex-col justify-between p-4 md:p-6">
        <div>
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-[var(--text-primary)]">
                Idea Radar
              </div>
              <div className="text-[10px] text-[var(--text-secondary)] font-mono-tech uppercase">
                Control Center v1.0
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? "bg-[var(--accent-primary)] text-white shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Portfolio Público</span>
            </span>
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
