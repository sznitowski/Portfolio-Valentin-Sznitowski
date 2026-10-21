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
    "bg-[#D97706] text-[#0A0B0D] font-semibold hover:bg-[#F59E0B] active:bg-[#B45309] shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_12px_rgba(217,119,6,0.2)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.5),0_0_20px_rgba(245,158,11,0.3)]",
  secondary:
    "bg-[#1A1D22] text-[#F3F4F6] border border-[#242830] hover:border-[#3A404A] hover:bg-[#22262C] active:bg-[#16181C]",
  outline:
    "bg-transparent text-[#F3F4F6] border border-[#242830] hover:border-[#3A404A] hover:bg-[#121417] active:bg-[#0A0B0D]",
  ghost:
    "bg-transparent text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1D22]/60 active:bg-[#1A1D22]",
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
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B0D]";
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
