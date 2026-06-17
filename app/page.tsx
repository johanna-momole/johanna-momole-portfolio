import { HeroSection } from "@/components/sections/HeroSection"
import { ImpactMetrics } from "@/components/sections/ImpactMetrics"
import { FeaturedProjects } from "@/components/projects/FeaturedProjects"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactMetrics />
      <FeaturedProjects />
    </>
  )
}
