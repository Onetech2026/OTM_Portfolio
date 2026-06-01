import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import LanguageSwitcher from './ui/LanguageSwitcher'
import Logo from './ui/Logo'

const NAV_LINKS = [
  { id: 'about', key: 'nav.about' },
  { id: 'services', key: 'nav.services' },
  { id: 'work', key: 'nav.work' },
  { id: 'contact', key: 'nav.contact' },
] as const

const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const { t } = useTranslation()
  const scrolled = useScrollProgress(80)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNav = (id: string) => {
    setMobileOpen(false)
    scrollToId(id)
  }

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(10, 15, 30, 0.85)' : 'rgba(10, 15, 30, 0)',
        borderColor: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0)',
      }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-40 border-b"
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Onetechmated home"
        >
          <Logo />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className={`text-sm transition-colors ${
                active === link.id
                  ? 'text-accent-cyan'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t(link.key)}
            </button>
          ))}
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-bg-primary transition-transform hover:scale-[1.03]"
            style={{ background: 'linear-gradient(135deg, #00c8ff, #3b82f6)' }}
          >
            {t('nav.cta')}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="text-text-primary"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.07] md:hidden"
            style={{ background: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNav(link.id)}
                  className={`py-2 text-start text-base transition-colors ${
                    active === link.id
                      ? 'text-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t(link.key)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="mt-2 rounded-lg px-4 py-3 text-center text-sm font-semibold text-bg-primary"
                style={{ background: 'linear-gradient(135deg, #00c8ff, #3b82f6)' }}
              >
                {t('nav.cta')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
