"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export type TocItem = {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry (closest to top of viewport)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      // Section is "active" when its heading enters the top 15% of the viewport
      { rootMargin: "-80px 0px -82% 0px", threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <nav aria-label="Page sections">
      <p className="mb-4 text-[9px] font-medium tracking-[0.18em] uppercase text-white/28">
        Contents
      </p>
      <ul className="space-y-0.5">
        {items.map(({ id, label }) => {
          const isActive = activeId === id
          return (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-left text-[11px] leading-snug",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                  isActive
                    ? "text-aqua"
                    : "text-white/40 hover:text-white/65"
                )}
                aria-current={isActive ? "location" : undefined}
              >
                {/* Active indicator dot */}
                <span
                  className={cn(
                    "size-1 shrink-0 rounded-full transition-all duration-200",
                    isActive ? "bg-aqua" : "bg-white/20 group-hover:bg-white/35"
                  )}
                  aria-hidden="true"
                />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
