import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "./utils";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <article
      ref={ref}
      className={cn(
        "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <header ref={ref} className={cn("mb-4 flex items-baseline justify-between", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-display text-xl", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[var(--color-muted)]", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";
