import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-foreground placeholder:text-muted-foreground focus-visible:bg-mustard focus-visible:text-navy focus-visible:placeholder:text-navy/60 aria-invalid:border-destructive flex min-h-32 w-full border-[3px] bg-background px-4 py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
