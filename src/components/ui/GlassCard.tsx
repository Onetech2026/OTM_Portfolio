import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  /** Enable the cyan hover lift + border glow micro-interaction. */
  interactive?: boolean
}

/** Reusable glassmorphism card wrapper. */
export default function GlassCard({
  children,
  interactive = false,
  className = '',
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-[10px] ${className}`}
      whileHover={
        interactive
          ? { y: -4, borderColor: 'rgba(0,200,255,0.25)' }
          : undefined
      }
      transition={{ duration: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
