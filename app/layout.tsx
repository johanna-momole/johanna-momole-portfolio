import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import { SiteHeader } from "@/components/layout/SiteHeader"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: {
    default: "Johanna Momole — Biomedical Informatics & Healthcare Analytics",
    template: "%s | Johanna Momole",
  },
  description:
    "Biomedical informatics and healthcare analytics professional. I turn healthcare data into evidence people can act on — across pharmacovigilance, real-world evidence, and healthcare operations.",
  authors: [{ name: "Johanna Momole" }],
  creator: "Johanna Momole",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Johanna Momole — Biomedical Informatics & Healthcare Analytics",
    description:
      "Biomedical informatics and healthcare analytics professional. I turn healthcare data into evidence people can act on.",
    siteName: "Johanna Momole",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johanna Momole — Biomedical Informatics & Healthcare Analytics",
    description:
      "Biomedical informatics and healthcare analytics professional. I turn healthcare data into evidence people can act on.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        playfair.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main id="main-content" className="flex flex-col flex-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
