"use client";

import { useEffect, useRef } from "react";

// Matches the landing page FadeIn rhythm without hiding server-rendered content.
// Observe each small beat once; no scroll listeners, parallax or perpetual loops.
export function useStoryReveal() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    if (!root.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (media.matches || entry.target.contains(document.activeElement)) return;
        const animation = entry.target.animate(
          [{ opacity: .35, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 700, delay: Number((entry.target as HTMLElement).dataset.storyDelay || 0), easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" }
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: .18 });
    root.current.querySelectorAll("[data-story-reveal]").forEach(node => observer.observe(node));
    const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const onPreference = () => { if (media.matches) cancel(); };
    const element = root.current;
    element.addEventListener("focusin", cancel);
    media.addEventListener("change", onPreference);
    return () => { observer.disconnect(); cancel(); element.removeEventListener("focusin", cancel); media.removeEventListener("change", onPreference); };
  }, []);
  return root;
}
