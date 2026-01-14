import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeumorphicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

const NeumorphicButton = ({
  children,
  variant = "secondary",
  size = "md",
  className,
  href,
  ...props
}: NeumorphicButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "neu-btn-primary",
    secondary: "neu-btn-secondary",
    icon: "neu-circle w-12 h-12",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    variant !== "icon" && sizeStyles[size],
    className
  );

  if (href) {
    const isInternal = href.startsWith("#");
    return (
      <a
        href={href}
        className={combinedClassName}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default NeumorphicButton;
