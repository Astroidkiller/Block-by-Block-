import {ButtonHTMLAttributes,AnchorHTMLAttributes,ReactNode} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";

type BaseProps = {
  v?: "primary" | "ghost" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  v = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 active:scale-[0.98] select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cad disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#22223B] text-white hover:bg-[#4A4E69] shadow-md border border-[#22223B] font-semibold",
    ghost:
      "border border-[#C9ADA7] bg-white text-[#22223B] hover:bg-[#F2E9E4] font-medium",
    secondary:
      "bg-[#F2E9E4] text-[#22223B] hover:bg-[#C9ADA7]/40 border border-[#C9ADA7] font-semibold",
    success:
      "bg-[#22223B] text-white border border-[#22223B] font-semibold",
    danger:
      "bg-[#FAF8F5] text-[#22223B] border-2 border-[#C9ADA7] font-semibold",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const classes = cn(base, variants[v], sizes[size], className);

  if ("href" in props && props.href) {
    const {href, ...rest} = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
