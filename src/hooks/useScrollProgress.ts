import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has scrolled past a given threshold (default 80px).
 * Used by the navbar to toggle its blurred/bordered scrolled state.
 */
export const useScrollProgress = (threshold = 80): boolean => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
