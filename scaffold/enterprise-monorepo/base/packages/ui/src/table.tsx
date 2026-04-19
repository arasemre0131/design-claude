import { forwardRef, type HTMLAttributes, type TableHTMLAttributes } from "react";
import { cn } from "./utils";

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className={cn("w-full border-collapse text-sm tabular-nums", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

export const Thead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("border-b border-[var(--color-border)]", className)} {...props} />
  ),
);
Thead.displayName = "Thead";

export const Tr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface)]",
        className,
      )}
      {...props}
    />
  ),
);
Tr.displayName = "Tr";

export const Th = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-4 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]",
        className,
      )}
      {...props}
    />
  ),
);
Th.displayName = "Th";

export const Td = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("px-4 py-3", className)} {...props} />
  ),
);
Td.displayName = "Td";
