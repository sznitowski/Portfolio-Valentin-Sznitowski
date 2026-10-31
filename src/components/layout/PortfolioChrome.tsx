"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PortfolioChromeProps {
  children: React.ReactNode;
}

export const PortfolioChrome: React.FC<PortfolioChromeProps> = ({ children }) => {
  const pathname = usePathname();
  const isExcludedRoute =
    pathname?.startsWith("/demos") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/experiments");

  if (isExcludedRoute) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
};
