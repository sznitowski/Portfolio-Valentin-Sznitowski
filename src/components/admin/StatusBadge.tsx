import React from "react";
import { Badge } from "@/components/ui/Badge";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const norm = status?.toUpperCase() || "OBSERVED";

  switch (norm) {
    case "BUILD_CANDIDATE":
      return (
        <Badge variant="live" className={className}>
          BUILD CANDIDATE
        </Badge>
      );
    case "VALIDATION_REQUIRED":
      return (
        <Badge
          variant="accent"
          className={`bg-amber-950/30 text-amber-300 border-amber-500/40 ${className}`}
        >
          VALIDATION REQUIRED
        </Badge>
      );
    case "PROMISING":
      return (
        <Badge variant="accent" className={className}>
          PROMISING
        </Badge>
      );
    case "KILL_TEST_APPROVED":
      return (
        <Badge variant="tech" className={`text-sky-300 border-sky-500/30 ${className}`}>
          KILL-TEST APPROVED
        </Badge>
      );
    case "KILL_TEST_RUNNING":
      return (
        <Badge variant="live" className={`text-emerald-400 border-emerald-500/40 ${className}`}>
          KILL-TEST RUNNING
        </Badge>
      );
    case "KILL_TEST_PASSED":
      return (
        <Badge variant="live" className={`text-teal-300 border-teal-500/40 ${className}`}>
          KILL-TEST PASSED
        </Badge>
      );
    case "KILL_TEST_FAILED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/40 text-rose-300 border border-rose-500/30 ${className}`}
        >
          KILL-TEST FAILED
        </span>
      );
    case "REJECTED":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/30 text-rose-400 border border-rose-500/25 ${className}`}
        >
          REJECTED
        </span>
      );
    case "OBSERVED":
    default:
      return (
        <Badge variant="default" className={className}>
          OBSERVED
        </Badge>
      );
  }
};
