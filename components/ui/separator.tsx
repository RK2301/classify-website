"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

interface SeparatorProps {
  /**indicate the variant of the Separator */
  variant?: 'light' | 'default'
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-[var(--color-grey-200)]/80 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        `${variant == 'light' ? "bg-[var(--color-grey-200)]/30" : ""}`,
        className
      )}
      {...props}
    />
  )
}

export { Separator }
