import React from "react";
import Link from "next/link";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    isExternal?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] active:bg-[#1D4ED8] shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_16px_rgba(59,130,246,0.35)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.5),0_0_24px_rgba(59,130,246,0.45)]",
  secondary:
    "bg-[#131B2A] text-[#F8FAFC] border border-[#1E293B] hover:border-[#334155] hover:bg-[#1E293B] active:bg-[#0F172A]",
  outline:
    "bg-transparent text-[#F8FAFC] border border-[#1E293B] hover:border-[#334155] hover:bg-[#111827] active:bg-[#0B0F17]",
  ghost:
    "bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/60 active:bg-[#1E293B]",
};

const sizeStyles: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "text-xs px-3.5 py-2 min-h-[38px] rounded-lg gap-1.5",
  md: "text-sm px-5 py-2.5 min-h-[44px] rounded-lg gap-2",
  lg: "text-base px-6 py-3.5 min-h-[48px] rounded-xl gap-2.5 font-medium",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]";
  const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0 transition-transform duration-200">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform duration-200">{icon}</span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, isExternal, ...anchorProps } = props as ButtonAsLink;
    if (isExternal || href.startsWith("http") || href.startsWith("https://wa.me") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal || href.startsWith("http") ? "_blank" : undefined}
          rel={isExternal || href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(props as ButtonAsButton)}>
      {content}
    </button>
  );
};
