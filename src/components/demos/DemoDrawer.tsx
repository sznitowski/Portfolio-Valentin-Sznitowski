"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface DemoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: "md" | "lg" | "xl";
}

export const DemoDrawer: React.FC<DemoDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "lg",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  }[width];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen ${widthClasses} transform bg-[#0B0F17] border-l border-[#1E293B] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1E293B] px-6 py-4 bg-[#111827]">
            <div>
              <h2 id="drawer-title" className="text-base font-bold text-white tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E293B] text-slate-400 hover:text-white hover:bg-[#1E293B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-colors"
              aria-label="Cerrar panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
            {children}
          </div>

          {/* Footer */}
          <div className="border-t border-[#1E293B] px-6 py-3.5 bg-[#0B0F17] flex items-center justify-between text-xs text-slate-500">
            <span>Visualización interactiva demostrativa</span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-[#1E293B] text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
