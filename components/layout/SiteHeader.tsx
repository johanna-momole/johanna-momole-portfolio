"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { siteConfig } from "@/content/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <motion.header
      initial={{ opacity: 0, y: prefersReduced ? 0 : -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 md:top-6"
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex items-center justify-between gap-4 rounded-[28px] border border-white/[0.12]",
          "bg-[#0B1728]/82 backdrop-blur-2xl",
          "px-5 py-3 shadow-[0_2px_28px_rgba(0,0,0,0.45)]"
        )}
      >
        {/* Logo / monogram */}
        <Link
          href="/"
          aria-label="Johanna Momole — home"
          className="flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold tracking-wide"
            aria-hidden="true"
          >
            JM
          </span>
          <span className="hidden text-sm font-medium text-white/80 sm:block">
            Johanna Momole
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {siteConfig.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium text-white/60",
                  "transition-colors hover:text-white hover:bg-white/[0.08]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="sm"
            className="rounded-full bg-[#7FE7F2] text-[#050713] font-semibold hover:opacity-90"
            asChild
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" id="mobile-nav" className="w-72 bg-[#0B1728]">
          <SheetHeader className="pb-6">
            <SheetTitle className="text-left font-medium">
              {siteConfig.name}
            </SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1" role="list">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-xl px-4 py-3 text-base font-medium",
                        "text-white/65 hover:text-white hover:bg-white/[0.08]",
                        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 px-4">
            <Button
              size="lg"
              className="w-full rounded-full bg-[#7FE7F2] text-[#050713] font-semibold hover:opacity-90"
              asChild
            >
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}
