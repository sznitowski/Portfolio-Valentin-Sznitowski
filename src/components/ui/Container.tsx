import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: "default" | "narrow" | "wide";
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className = "",
  size = "default",
  children,
  ...props
}) => {
  const maxWidths = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidths[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
