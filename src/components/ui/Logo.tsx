/** Onetechmated wordmark — "One" in cyan, "techmated" in white. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`select-none font-bold tracking-tight ${className}`}
      style={{ fontSize: '1.25rem' }}
    >
      <span className="text-accent-cyan">One</span>
      <span className="text-text-primary">techmated</span>
    </span>
  )
}
