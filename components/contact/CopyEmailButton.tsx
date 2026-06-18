"use client"

import { useState, useCallback } from "react"
import { CopyIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyEmailButtonProps {
  email: string
  className?: string
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        // execCommand fallback for environments without Clipboard API
        const el = document.createElement("input")
        el.value = email
        el.setAttribute("aria-hidden", "true")
        el.style.position = "absolute"
        el.style.left = "-9999px"
        document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body.removeChild(el)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard unavailable — silently no-op; the visible address remains accessible
    }
  }, [email])

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Email address copied to clipboard" : "Copy email address to clipboard"}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          copied
            ? "border-chartreuse/35 bg-chartreuse/[0.08] text-chartreuse"
            : "border-white/15 bg-white/[0.04] text-white/65 hover:border-white/25 hover:bg-white/[0.08] hover:text-white",
          className
        )}
      >
        {copied ? (
          <CheckIcon className="size-4 shrink-0" aria-hidden="true" />
        ) : (
          <CopyIcon className="size-4 shrink-0" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy email"}
      </button>

      {/* Live region announces copy status to screen readers */}
      <span
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  )
}
