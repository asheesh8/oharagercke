import { cn } from "@/lib/utils";

export const adminField =
  "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-mist transition-colors focus:border-clay/50 focus:outline-none focus:ring-4 focus:ring-clay/10";
export const adminLabel = "mb-1.5 block text-sm font-medium text-graphite";

export function AdminHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-stone">{description}</p>
        )}
      </div>
      {children && <div className="flex shrink-0 gap-2">{children}</div>}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-cream p-6 shadow-[0_20px_50px_-45px_rgba(27,25,22,0.4)]",
        className
      )}
    >
      {children}
    </div>
  );
}
