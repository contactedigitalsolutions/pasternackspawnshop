import * as React from "react";
export function Button({ className = "", variant, size, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: "outline"|"ghost"|"default", size?: "lg"|"sm"|"md"}) {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  const variants: Record<string,string> = { default: "bg-black text-white hover:opacity-90", outline: "border border-current bg-transparent hover:bg-black/5", ghost: "bg-transparent hover:bg-black/5" };
  const sizes: Record<string,string> = { sm: "h-9 px-3", md: "h-10 px-4", lg: "h-11 px-6 text-base" };
  return <button className={`${base} ${variants[variant||"default"]} ${sizes[size||"md"]} ${className}`} {...props} />;
}