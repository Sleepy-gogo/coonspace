import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-slate-800/80 text-white border border-slate-700/50 hover:bg-slate-700/80 hover:border-slate-600/50",
        primary: "bg-blue-500 text-white hover:bg-blue-400 btn-glow",
        ghost: "text-slate-300 hover:bg-slate-800/50 hover:text-white",
        outline:
          "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800/50 hover:border-slate-500",
      },
      size: {
        default: "h-11 px-6 rounded-xl text-sm",
        sm: "h-9 px-4 rounded-lg text-sm",
        lg: "h-12 px-8 rounded-xl text-base",
        icon: "size-10 rounded-lg",
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
