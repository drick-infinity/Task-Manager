import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "w-full rounded-md px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants = {
    primary: "bg-[#00246B] text-white hover:bg-blue-900 focus:ring-blue-900",
    secondary:
      "bg-[#CADCFC] text-gray-800 hover:bg-blue-200 focus:ring-[#CADCFC]",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
