import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue-200/10 text-slate-100 border border-blue-200/20 hover:bg-blue-200/20",
        destructive:
          "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
        outline:
          "border border-slate-600/60 bg-slate-400/5 text-slate-50 shadow-sm hover:bg-slate-600/60 hover:text-slate-50",
        /*ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
          link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50'*/
        secondary: "bg-blue-300 text-slate-800  hover:bg-blue-400",
      },
      size: {
        default: "h-10 px-5 py-2.5 rounded-full text-sm font-semibold",
        sm: "h-8 rounded-full px-3 text-xs font-semibold",
        lg: "h-12 rounded-full px-8 font-semibold",
        icon: "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
