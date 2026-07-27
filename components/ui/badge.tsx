import { cn } from "@/lib/utils";

export function Pill({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line-strong bg-cream/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-stone backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-clay",
        className
      )}
    >
      <span className="h-px w-6 bg-clay/50" aria-hidden />
      {children}
    </span>
  );
}
