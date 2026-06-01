interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

/** Small uppercase cyan label shown above each section heading. */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-accent-cyan font-medium uppercase ${className}`}
      style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
    >
      {children}
    </span>
  )
}
