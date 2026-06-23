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

  // Reinforce mobile autoplay requirements and register an interaction retry
  // if the initial play() call is blocked by the browser's autoplay policy.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // iOS Safari requires muted and playsInline set as DOM *properties*, not
    // just HTML attributes. React's JSX props only set attributes on the
    // server-rendered HTML; the properties must be assigned imperatively.
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    if (!isPlaying) {
      video.pause()
      return
    }

    // Guard against the race where cleanup runs before the .catch() microtask
    let active = true

    const removeRetry = () => {
      window.removeEventListener("touchstart", onInteraction)
      window.removeEventListener("pointerdown", onInteraction)
      window.removeEventListener("scroll", onInteraction, true)
    }

    // Listeners are removed only after play() *succeeds*, so a failed gesture
    // leaves them active and allows further interaction attempts to retry.
    const onInteraction = () => {
      video
        .play()
        .then(() => {
          removeRetry()
        })
        .catch(() => {
          // Keep listeners active so a later interaction can retry.
        })
    }

    // Resume after returning to the page (tab switch, app switch, lock/unlock).
    // Registered here so it shares the same isPlaying closure and cleanup path.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && isPlaying) {
        video.play().catch(() => {})
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)

    // Attempt autoplay immediately; if the browser blocks it, wait for the
    // first user gesture (touchstart / pointerdown / scroll).
    video.play().catch(() => {
      if (!active) return
      window.addEventListener("touchstart", onInteraction, { passive: true })
      window.addEventListener("pointerdown", onInteraction, { passive: true })
      window.addEventListener("scroll", onInteraction, { capture: true, passive: true })
    })

    return () => {
      active = false
      removeRetry()
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [isPlaying])

  // Pause when the page is hidden (tab/window loses visibility, phone locked).
  // Resume is owned by the effect above; this only handles the pause direction.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleHidden = () => {
      if (document.hidden) video.pause()
    }

    document.addEventListener("visibilitychange", handleHidden)
    return () => document.removeEventListener("visibilitychange", handleHidden)
  }, [])

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
        {/* Solid fallback — visible while video loads or if autoplay is blocked */}
        <div className="absolute inset-0 bg-[#050713]" />

        {/*
          autoPlay is unconditional so it is present in both the SSR HTML and
          the client hydration, avoiding any hydration mismatch. The effect
          above calls video.pause() for reduced-motion users after mount.
        */}
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "object-center sm:object-[58%_center] xl:object-[62%_center]"
          )}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/dna-hero.jpg"
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
