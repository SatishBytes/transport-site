import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`surface-card p-6 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${className}`}
      {...props}
    />
  );
}
