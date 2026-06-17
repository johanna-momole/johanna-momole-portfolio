"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { PauseIcon, PlayIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Tracks only the user's manual toggle decision
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const prefersReduced = useReducedMotion()

  // Derived: the video is considered playing when the user hasn't paused it
  // and the OS reduced-motion preference is not active
  const isPlaying = !manuallyPaused && prefersReduced !== true

  // Sync the video element whenever the derived playing state changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isPlaying])

  // Page Visibility API: pause when tab is hidden, resume when visible
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else if (isPlaying) {
        video.play().catch(() => {})
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isPlaying])

  const togglePlayPause = useCallback(() => {
    setManuallyPaused((prev) => !prev)
  }, [])

  return (
    <>
      {/* Fixed video layer — behind all page content at z-0 */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Fallback background color if video is unavailable */}
        <div className="absolute inset-0 bg-[#050713]" />

        {/* TODO: Add poster="/images/dna-poster.jpg" for faster initial paint once generated */}
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "object-center sm:object-[58%_center] xl:object-[62%_center]"
          )}
          autoPlay={prefersReduced !== true}
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          disablePictureInPicture
        >
          <source src="/video/dna-background.mp4" type="video/mp4" />
        </video>

        {/* Base dark overlay — tones the video without obscuring it */}
        <div className="absolute inset-0 bg-[#050713]/50" />

        {/* Bottom gradient — ensures content transitions read cleanly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 15%, rgba(5,7,19,0.22) 55%, rgba(5,7,19,0.68) 100%)",
          }}
        />

        {/* Edge vignette — softens the video frame */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(5,7,19,0.42) 100%)",
          }}
        />
      </div>

      {/* Pause/play control — fixed bottom-right, receives focus after all page content */}
      <button
        type="button"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex size-8 items-center justify-center rounded-full",
          "border border-white/20 bg-white/[0.08] text-white/55",
          "backdrop-blur-md",
          "hover:bg-white/[0.16] hover:text-white",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        )}
      >
        {isPlaying ? (
          <PauseIcon className="size-3" aria-hidden="true" />
        ) : (
          <PlayIcon className="size-3" aria-hidden="true" />
        )}
      </button>
    </>
  )
}
