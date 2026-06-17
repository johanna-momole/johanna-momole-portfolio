import Link from "next/link"
import { siteConfig } from "@/content/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/10 bg-[#060A13]/65 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-8 py-10 md:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Name + tagline */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              {siteConfig.title}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {year} {siteConfig.name}. Built with Next.js and Tailwind CSS.
          </p>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label={`Email ${siteConfig.name}`}
          >
            {siteConfig.social.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
