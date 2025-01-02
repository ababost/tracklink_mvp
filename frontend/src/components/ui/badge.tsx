import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-secondary hover:bg-primary/80",
        secondary:
          "bg-primary-light text-primary hover:bg-primary-light/80",
        success:
          "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900 dark:text-green-100",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border-2 border-primary text-primary hover:bg-primary hover:text-secondary",
        pending:
          "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900 dark:text-yellow-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
