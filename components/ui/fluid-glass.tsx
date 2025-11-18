import { ReactNode } from "react";

interface FluidGlassProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export default function FluidGlass({
  children,
  className = "",
  ...props
}: FluidGlassProps) {
  return (
    <div
      className={`
        bg-white/10
        backdrop-blur-md
        border
        border-white/20
        shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
