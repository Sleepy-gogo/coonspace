import * as React from "react";

import { cn } from "~/lib/utils";

/*
My button for color reference:
bg-blue-200/10 text-slate-100 border border-blue-200/20 hover:bg-blue-200/20
*/

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-blue-300/20 bg-blue-200/5 px-3 py-1 text-base text-slate-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-50 placeholder:text-slate-300 hover:bg-blue-200/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/60 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
