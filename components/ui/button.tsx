import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bone disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-clay text-cream hover:bg-clay-deep shadow-[0_10px_30px_-12px_rgba(168,69,47,0.6)] hover:shadow-[0_16px_40px_-14px_rgba(168,69,47,0.7)] hover:-translate-y-0.5",
  dark: "bg-ink text-cream hover:bg-graphite hover:-translate-y-0.5 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)]",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink/[0.03]",
  ghost: "text-ink hover:bg-ink/[0.05]",
  light:
    "bg-cream text-ink hover:bg-white hover:-translate-y-0.5 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base py-3.5",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}

type ButtonLinkProps = {
  variant?: Variant;
  size?: Size;
  href: string;
} & Omit<React.ComponentProps<typeof Link>, "href">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
