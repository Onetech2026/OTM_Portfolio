import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../../lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  /** When true, children stagger in; wrap each child in <AnimatedItem>. */
  staggerChildren?: boolean
}

/** Section wrapper that fades + translates its content in on scroll into view. */
export default function AnimatedSection({
  children,
  id,
  className = '',
  staggerChildren = false,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={staggerChildren ? stagger : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.section>
  )
}

/** Child item to use inside a staggered AnimatedSection. */
export function AnimatedItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}
