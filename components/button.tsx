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
    "button-primary focus-visible:outline-accent",
  secondary:
    "button-secondary focus-visible:outline-accent",
  outline:
    "button-outline focus-visible:outline-accent",
};

function getButtonClassName(variant: ButtonVariant, className: string) {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none ${variantClasses[variant]} ${className}`;
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
