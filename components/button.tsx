import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonStyleProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonStyleProps &
  (
    | {
        href: string;
        target?: string;
        rel?: string;
        onClick?: MouseEventHandler<HTMLElement>;
      }
    | (Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children" | "onClick"
      > & {
        href?: never;
        target?: never;
        rel?: never;
        onClick?: MouseEventHandler<HTMLElement>;
      })
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-400 text-slate-950 hover:bg-amber-300 active:bg-amber-500 focus-visible:outline-amber-400 disabled:bg-amber-100 disabled:text-slate-600",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 hover:text-white active:bg-slate-950 active:text-white focus-visible:outline-amber-400 disabled:bg-slate-300 disabled:text-slate-700 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-100 dark:hover:text-slate-950 dark:active:bg-white dark:active:text-slate-950 dark:disabled:bg-slate-700 dark:disabled:text-slate-200",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:border-slate-900 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 active:text-slate-900 focus-visible:outline-amber-500 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-700 dark:active:text-white dark:disabled:border-slate-700 dark:disabled:bg-slate-800 dark:disabled:text-slate-300",
};

function getButtonClassName(variant: ButtonVariant, className: string) {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none ${variantClasses[variant]} ${className}`;
}

export function Button(props: ButtonProps) {
  const {
    href,
    target,
    rel,
    onClick,
    children,
    className = "",
    variant = "primary",
    ...nativeProps
  } = props;
  const buttonClassName = getButtonClassName(variant, className);

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={buttonClassName}
      >
        {children}
      </Link>
    );
  }

  return (
    <button {...nativeProps} onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
}
