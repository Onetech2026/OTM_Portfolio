import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../lib/animations'

gsap.registerPlugin(ScrollTrigger)

interface CounterProps {
  /** Display value like "3+", "2", "120" — numeric part is animated, suffix preserved. */
  value: string
  className?: string
}

/** Animates a number from 0 to its target when scrolled into view (GSAP). */
export default function Counter({ value, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/(\d+(?:\.\d+)?)/)
    const target = match ? parseFloat(match[1]) : 0
    const suffix = match ? value.slice(match.index! + match[0].length) : value
    const prefix = match ? value.slice(0, match.index!) : ''

    if (!match || prefersReducedMotion()) {
      el.textContent = value
      return
    }

    const counter = { val: 0 }
    el.textContent = `${prefix}0${suffix}`

    const tween = gsap.to(counter, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.val)}${suffix}`
      },
    })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
    })

    return () => {
      trigger.kill()
      tween.kill()
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
