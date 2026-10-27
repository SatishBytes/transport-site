import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md ${className}`}
      {...props}
    />
  );
}
