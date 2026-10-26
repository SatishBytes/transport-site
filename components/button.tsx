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
    "bg-amber-400 text-slate-950 hover:bg-amber-300 focus-visible:outline-amber-400",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:border-slate-900 hover:bg-slate-50 focus-visible:outline-slate-900",
};

function getButtonClassName(variant: ButtonVariant, className: string) {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`;
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
