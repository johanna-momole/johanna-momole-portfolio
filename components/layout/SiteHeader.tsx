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
import { ThemeToggle } from "@/components/shared/ThemeToggle"

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
          "flex items-center justify-between gap-4 rounded-[28px] border border-black/8 dark:border-white/10",
          "bg-ivory/80 dark:bg-deep-blue/90 backdrop-blur-xl",
          "px-5 py-3 shadow-[0_2px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Logo / monogram */}
        <Link
          href="/"
          aria-label="Johanna Momole — home"
          className="flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            className="flex size-8 items-center justify-center rounded-full bg-near-black text-ivory text-xs font-bold tracking-wide dark:bg-ivory dark:text-near-black"
            aria-hidden="true"
          >
            JM
          </span>
          <span className="hidden text-sm font-medium sm:block">
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
                  "rounded-full px-4 py-1.5 text-sm font-medium text-foreground/70",
                  "transition-colors hover:text-foreground hover:bg-black/5 dark:hover:bg-white/8",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            size="sm"
            className="rounded-full bg-near-black text-ivory dark:bg-ivory dark:text-near-black hover:opacity-80"
            asChild
          >
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
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
        <SheetContent side="right" id="mobile-nav" className="w-72 bg-ivory dark:bg-deep-blue">
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
                        "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/8",
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
              className="w-full rounded-full bg-near-black text-ivory dark:bg-ivory dark:text-near-black hover:opacity-80"
              asChild
            >
              <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}
